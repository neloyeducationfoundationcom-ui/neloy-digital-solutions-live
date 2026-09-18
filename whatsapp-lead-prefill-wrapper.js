import app from "./spam-shield-wrapper.js";

const PREFILL = "Hello, I came from Neloy Digital Solutions website. My name is ___ and I need ___.";

function addWhatsAppPrefill(html){
  if(html.includes('id="nds-whatsapp-prefill"')) return html;

  const script = `<script id="nds-whatsapp-prefill">
(() => {
  const msg = ${JSON.stringify(PREFILL)};
  function rewrite(){
    document.querySelectorAll('a[href*="wa.me/"],a[href*="api.whatsapp.com/send"],a[href*="whatsapp.com/send"]').forEach(a => {
      try{
        const u = new URL(a.href, location.href);
        if(u.hostname === "wa.me"){
          u.searchParams.set("text", msg);
        }else{
          u.searchParams.set("text", msg);
        }
        a.href = u.toString();
      }catch(_){}
    });
  }
  rewrite();
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", rewrite, {once:true});
  }
  new MutationObserver(rewrite).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["href"]});
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
