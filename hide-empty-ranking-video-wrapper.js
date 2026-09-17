import app from "./ranking-progress-wrapper.js";

const HIDE_EMPTY_RANKING_VIDEO_STYLE = `<style id="nds-hide-empty-ranking-video">
#nds-ranking-progress .rpVideo{display:none!important}
#nds-ranking-progress .rpGrid{display:block!important}
#nds-ranking-progress .rpCopy{max-width:900px;margin:0 auto}
</style>`;

export default {
  async fetch(request, env, ctx) {
    const response = await app.fetch(request, env, ctx);
    const url = new URL(request.url);
    const contentType = response.headers.get("content-type") || "";

    if (
      request.method !== "GET" ||
      (url.pathname !== "/" && url.pathname !== "") ||
      !response.ok ||
      !contentType.includes("text/html")
    ) {
      return response;
    }

    let html = await response.text();
    if (!html.includes('id="nds-hide-empty-ranking-video"')) {
      html = html.replace(/<\/head>/i, `${HIDE_EMPTY_RANKING_VIDEO_STYLE}\n</head>`);
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    headers.set("cache-control", "no-store");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
