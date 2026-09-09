import currentWorker from "./lead-admin-wrapper.js";

const MOBILE_CSS = `
<style id="mobile-fixes">
html,body{max-width:100%;overflow-x:hidden}
img,video,iframe{max-width:100%;height:auto}
@media(max-width:880px){
  .wrap{width:min(100% - 24px,1140px)}
  .nav{height:auto;min-height:68px;padding:10px 0;align-items:flex-start}
  .brand{max-width:72%}.mark{width:42px;height:42px;border-radius:12px}.brand strong{font-size:14px;line-height:1.2}.brand small{font-size:8px;letter-spacing:.1em}
  .navlinks{gap:8px}.navlinks a:not(:last-child){display:none}.navlinks a:last-child{font-size:13px;padding:9px 11px;border:1px solid var(--line);border-radius:10px}
  .hero{padding:46px 0}.heroGrid{grid-template-columns:1fr;gap:28px}.heroCard{min-height:290px;border-radius:22px}.heroLogo .n{font-size:88px}.heroLogo strong{font-size:24px}
  h1{font-size:clamp(38px,12vw,56px);line-height:1.03}.lead{font-size:17px}.actions{gap:10px}.actions .btn{flex:1 1 100%;width:100%}
  section{padding:52px 0}.grid{grid-template-columns:1fr}.card,.workCard,.testCard{padding:19px}.sectionHead{margin-bottom:20px}
  .contactGrid{grid-template-columns:1fr;gap:22px}.two{grid-template-columns:1fr}form{padding:18px}.contactBox{padding:18px}
  .chat{right:8px;left:8px;bottom:82px;width:auto;height:min(72vh,560px)}.chatBtn,.waFloat{right:14px;width:54px;height:54px}.waFloat{bottom:80px;display:grid!important}.chatBtn{bottom:16px}
  #partners .card{grid-template-columns:1fr!important;text-align:center!important;gap:18px!important;padding:20px!important}#partners .card img{width:min(180px,70vw)!important;height:auto!important}
  .testCard img,.testimonialPhoto{max-width:120px!important}
}
@media(max-width:520px){
  .wrap{width:min(100% - 18px,1140px)}
  h1{font-size:40px}.hero{padding:34px 0}.heroCard{min-height:245px}.heroLogo .n{font-size:76px}.heroLogo strong{font-size:21px}
  h2{font-size:32px}.eyebrow{font-size:10px}.lead{font-size:16px}
  .card,.workCard,.testCard,form,.contactBox{border-radius:16px;padding:16px}
  input,select,textarea{font-size:16px}.btn{min-height:46px}
  .chat{height:68vh}.msgs{padding:10px}.msg{max-width:92%}
}
</style>`;

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      const type = response.headers.get("content-type") || "";
      if (type.includes("text/html")) {
        let html = await response.text();
        const wa = String(env?.whatsapp || "60183946761").replace(/\D/g, "");
        const waHref = `https://wa.me/${wa}?text=${encodeURIComponent("Hello Neloy Digital Solutions, I would like to discuss a project.")}`;
        html = html.replace('<a class="waFloat" id="waFloat"', `<a class="waFloat show" id="waFloat" href="${waHref}"`);
        html = html.replace('<a class="btn waBtn waContact" id="heroWhatsApp"', `<a class="btn waBtn waContact show" id="heroWhatsApp" href="${waHref}"`);
        html = html.replace('<a class="btn waBtn waContact" id="contactWhatsApp"', `<a class="btn waBtn waContact show" id="contactWhatsApp" href="${waHref}"`);
        const out = html.includes("</head>") ? html.replace("</head>", MOBILE_CSS + "</head>") : html;
        const headers = new Headers(response.headers);
        headers.set("content-type", "text/html; charset=utf-8");
        headers.set("cache-control", "no-store");
        return new Response(out, {status: response.status, headers});
      }
    }
    return response;
  }
};
