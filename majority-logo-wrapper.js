import currentWorker from "./company-content-wrapper.js";
import legacyProjectWorker from "./project-wrapper.js";

function extractMajorityImage(html) {
  const exact = html.match(/<img[^>]+src="([^"]+)"[^>]+alt="Majority Academy logo design project"/i);
  if (exact?.[1]) return exact[1];
  const nearby = html.match(/Majority Academy[\s\S]{0,5000}?<img[^>]+src="([^"]+)"/i);
  if (nearby?.[1]) return nearby[1];
  return "";
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);

    if (request.method !== "GET" || url.pathname !== "/") return response;
    const type = response.headers.get("content-type") || "";
    if (!type.includes("text/html")) return response;

    let html = await response.text();

    try {
      const legacy = await legacyProjectWorker.fetch(request, env, ctx);
      const legacyType = legacy.headers.get("content-type") || "";
      if (legacyType.includes("text/html")) {
        const legacyHtml = await legacy.text();
        const majorityImage = extractMajorityImage(legacyHtml);
        if (majorityImage) {
          const replacement = `<div class="projectVisual" style="padding:0;overflow:hidden;background:#fff"><img src="${majorityImage}" alt="Majority Academy logo design project" style="width:100%;height:100%;object-fit:cover;display:block"></div>`;
          html = html.replace('<div class="projectVisual">MA</div>', replacement);
        }
      }
    } catch (_) {}

    const headers = new Headers(response.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    headers.set("cache-control", "no-store");
    return new Response(html, {status: response.status, headers});
  }
};
