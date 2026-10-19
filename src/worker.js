import { flushAlerts } from './chat/alerts.js';
// Keep the existing Worker pipeline intact while giving routing a stable entry.
import existingWorker from "../premium-site-wrapper.js";
import { withChat } from "./chat/worker.js";
const currentWorker = withChat(existingWorker);

const CANONICAL_ORIGIN = "https://neloydigitalsolutions.com";
// Only this exact branch-review host bypasses the existing public redirect.
const MOTION_PREVIEW_HOST = "preview-premium-cinematic-motion-neloy-digital-solutions-live.info-digitalsolutions-neloy-b7a.workers.dev";

export default {
  scheduled(event, env, ctx) {ctx.waitUntil(flushAlerts(env));},
  fetch(request, env, ctx) {
    const url = new URL(request.url);
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
    return currentWorker.fetch(request, env, ctx);
  },
};
