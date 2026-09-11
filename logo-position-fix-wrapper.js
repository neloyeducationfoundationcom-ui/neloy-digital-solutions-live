import currentWorker from "./portfolio-name-cleanup-wrapper.js";

const LOGO_POSITION_STYLE = `
<style id="logo-position-restore-style">
img[src*="assets/logo-projects/"]{
  display:block!important;
  width:100%!important;
  max-width:100%!important;
  height:auto!important;
  max-height:none!important;
  object-fit:contain!important;
  object-position:center center!important;
  margin:0 auto!important;
  padding:0!important;
  transform:none!important;
}
.projectVisual:has(img[src*="assets/logo-projects/"]){
  height:auto!important;
  min-height:0!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  overflow:visible!important;
  padding:0!important;
  background:#fff!important;
}
</style>`;

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const type = response.headers.get("content-type") || "";
    const url = new URL(request.url);

    if (request.method !== "GET" || !response.ok || !type.includes("text/html") || url.pathname.startsWith("/admin")) {
      return response;
    }

    let html = await response.text();
    if (!html.includes('id="logo-position-restore-style"') && html.includes('</head>')) {
      html = html.replace('</head>', LOGO_POSITION_STYLE + '</head>');
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
