import app from "./spam-shield-wrapper.js";

const PREFILL = "Hello, I came from Neloy Digital Solutions website. My name is ___ and I need ___.";

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#075DFF"/><stop offset="1" stop-color="#12DFF3"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#g)"/><text x="32" y="43" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="white">N</text></svg>`;
const FAVICON_TAG = `<link id="nds-favicon" rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}">`;

function addFavicon(html){
  const lower = html.toLowerCase();
  if (
    html.includes('id="nds-favicon"') ||
    lower.includes('rel="icon"') ||
    lower.includes("rel='icon'") ||
    lower.includes('rel="shortcut icon"') ||
    lower.includes("rel='shortcut icon'")
  ) return html;

  const headClose = lower.indexOf("</head>");
  return headClose >= 0
    ? html.slice(0, headClose) + FAVICON_TAG + "\n" + html.slice(headClose)
    : FAVICON_TAG + html;
}

function addWhatsAppPrefill(html){
  if(html.includes('id="nds-whatsapp-prefill"')) return html;

  const script = `<script id="nds-whatsapp-prefill">
(() => {
  const msg = ${JSON.stringify(PREFILL)};
  const selector = 'a[href*="wa.me/"],a[href*="api.whatsapp.com/send"],a[href*="whatsapp.com/send"]';

  function rewrite(){
    document.querySelectorAll(selector).forEach(a => {
      try{
        const u = new URL(a.href, location.href);
        u.searchParams.set("text", msg);
        const next = u.toString();
        if(a.href !== next) a.href = next;
      }catch(_){}
    });
  }

  let scheduled = false;
  function scheduleRewrite(){
    if(scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      rewrite();
    });
  }

  rewrite();

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", rewrite, {once:true});
  }

  // Only watch for newly inserted DOM nodes. Do not observe href changes:
  // observing href while rewriting href creates a MutationObserver feedback loop
  // that can make the page unresponsive.
  new MutationObserver((mutations) => {
    if(mutations.some(m => m.addedNodes && m.addedNodes.length)){
      scheduleRewrite();
    }
  }).observe(document.documentElement,{subtree:true,childList:true});
})();
</script>`;

  return html.includes("</body>") ? html.replace("</body>",script+"</body>") : html+script;
}

export default{
  async fetch(request,env,ctx){
    const response = await app.fetch(request,env,ctx);
    const type = response.headers.get("content-type") || "";
    const url = new URL(request.url);

    if(request.method==="GET" && response.ok && type.includes("text/html") && !url.pathname.startsWith("/admin")){
      let html = await response.text();
      html = addFavicon(html);
      html = addWhatsAppPrefill(html);
      const headers = new Headers(response.headers);
      headers.delete("content-length");
      headers.delete("etag");
      headers.set("content-type","text/html; charset=utf-8");
      headers.set("cache-control","no-store");
      return new Response(html,{status:response.status,statusText:response.statusText,headers});
    }

    return response;
  }
};
