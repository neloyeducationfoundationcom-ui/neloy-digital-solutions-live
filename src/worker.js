import { flushAlerts } from './chat/alerts.js';
import { withPageCleanup } from './page-cleanup.js';
// Keep the existing Worker pipeline intact while giving routing a stable entry.
import existingWorker from "../premium-site-wrapper.js";
import { withChat } from "./chat/worker.js";
const currentWorker = withChat(existingWorker);

const CANONICAL_ORIGIN = "https://neloydigitalsolutions.com";
// Only this exact branch-review host bypasses the existing public redirect.
const MOTION_PREVIEW_HOST = "preview-premium-cinematic-motion-neloy-digital-solutions-live.info-digitalsolutions-neloy-b7a.workers.dev";

// Showcase video-section MP4s routed Worker-first (wrangler.toml run_worker_first) for byte-range support.
const RANGE_VIDEO_PATHS = new Set([
  "/showcase-media/neloy-approved-laptop-podcast.mp4",
  "/showcase-media/neloy-real-portfolio-laptop-60s.mp4",
  "/showcase-media/bitcoin-2d-explainer-animation.mp4",
]);
async function serveVideoWithRange(request, env) {
  const assetUrl = new URL(request.url); assetUrl.search = "";
  const full = await env.ASSETS.fetch(new Request(assetUrl, { method: "GET" }));
  if (full.status !== 200) return full;
  const headers = new Headers(full.headers);
  headers.set("accept-ranges", "bytes");
  const match = /^bytes=(\d*)-(\d*)$/.exec((request.headers.get("range") || "").trim());
  if (!match || (match[1] === "" && match[2] === "")) {
    return new Response(request.method === "HEAD" ? null : full.body, { status: 200, headers });
  }
  const body = await full.arrayBuffer();
  const size = body.byteLength;
  let start, end;
  if (match[1] === "") { start = Math.max(0, size - Number(match[2])); end = size - 1; }
  else { start = Number(match[1]); end = match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1); }
  if (start >= size || end < start) {
    headers.set("content-range", `bytes */${size}`); headers.delete("content-length");
    return new Response(null, { status: 416, headers });
  }
  headers.set("content-range", `bytes ${start}-${end}/${size}`);
  headers.set("content-length", String(end - start + 1));
  return new Response(request.method === "HEAD" ? null : body.slice(start, end + 1), { status: 206, headers });
}

export default {
  scheduled(event, env, ctx) {ctx.waitUntil(flushAlerts(env));},
  fetch(request, env, ctx) {
    const url = new URL(request.url);
    // iOS Safari needs 206 range responses for MP4; static assets return 200 for the whole file.
    if (RANGE_VIDEO_PATHS.has(url.pathname) && env.ASSETS && (request.method === "GET" || request.method === "HEAD")) {
      return serveVideoWithRange(request, env);
    }
    if (url.hostname === MOTION_PREVIEW_HOST) {
      const headers = {"x-robots-tag":"noindex, nofollow, noarchive", "cache-control":"no-store"};
      // A review version shares Worker bindings. Never use it to submit or inspect data.
      if (!["GET", "HEAD"].includes(request.method) || url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) {
        return new Response("Forms, chat and admin are disabled in this read-only preview.", {status:403,headers});
      }
      // Render against the public origin so media URLs, links, metadata and schema stay intact.
      const publicURL = new URL(request.url); publicURL.host = new URL(CANONICAL_ORIGIN).host;
      return Promise.resolve(currentWorker.fetch(new Request(publicURL, request), env, ctx)).then(response => {
        const secured = new Headers(response.headers);
        Object.entries(headers).forEach(([key,value])=>secured.set(key,value));
        const csp=secured.get("content-security-policy");
        if(csp)secured.set("content-security-policy",csp.replace(/script-src[^;]*/i,"script-src 'self' 'unsafe-inline' data:").replace(/connect-src[^;]*/i,"connect-src 'self'"));
        return new Response(response.body,{status:response.status,statusText:response.statusText,headers:secured});
      });
    }
    // Redirect only public GET/HEAD requests on this Worker's default hostname.
    // Preserve admin, API, and non-public methods for existing integrations.
    if (
      url.hostname.endsWith(".workers.dev") &&
      (request.method === "GET" || request.method === "HEAD") &&
      !url.pathname.startsWith("/admin") &&
      !url.pathname.startsWith("/api/")
    ) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301);
    }
    return withPageCleanup(request, currentWorker.fetch(request, env, ctx));
  },
};
