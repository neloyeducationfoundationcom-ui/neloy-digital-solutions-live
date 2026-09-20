import app from "./spam-shield-wrapper.js";

const PREFILL = "Hello, I came from Neloy Digital Solutions website. My name is ___ and I need ___.";

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
      const html = addWhatsAppPrefill(await response.text());
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
