import currentWorker from "./services-refresh-wrapper.js";

const card = `<article class="workCard" id="short-video-editing-project">
<div class="workBody"><span class="tag">Video Editing · Reels</span><h3>Short Video Editing</h3>
<p class="projectIntro">A branded social media reel for Neloy Digital Solutions, featuring motion graphics, a custom blue-and-cyan frame and audio.</p>
<video controls playsinline preload="metadata" aria-label="Neloy Digital Solutions short video editing showcase" style="display:block;width:100%;max-width:380px;max-height:75vh;aspect-ratio:9/16;object-fit:contain;margin:20px auto;background:#06162d;border-radius:12px"><source src="/showcase-media/neloy-short-video.mp4" type="video/mp4">Your browser does not support embedded video. <a href="/showcase-media/neloy-short-video.mp4">Watch the video</a>.</video>
</div></article>`;

export function addReel(html) {
  if (html.includes('id="short-video-editing-project"')) return html;
  return html.replace(/(<section\b[^>]*\bid="work"[^>]*>[\s\S]*?<div class="workGrid">)/, '$1' + card);
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const path = new URL(request.url).pathname;
    if (request.method !== "GET" || !["/showcase", "/showcase/"].includes(path) || !response.ok || !(response.headers.get("content-type") || "").includes("text/html")) return response;
    const html = addReel(await response.text());
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    headers.set("cache-control", "no-store");
    return new Response(html, {status: response.status, headers});
  }
};
