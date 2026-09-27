import app from "./spam-shield-wrapper.js";
import { addFavicon } from "./src/assets/favicon.js";
import { addWhatsAppPrefill } from "./src/contact/whatsapp-prefill.js";

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
