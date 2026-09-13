import currentWorker from "./team-page-wrapper.js";
import termsWorker from "./terms-page-wrapper.js";

const FOOTER_STYLE = `<style id="nds-bottom-center-links-style">
#nds-bottom-center-links{width:100%;display:flex;align-items:center;justify-content:center;gap:14px;margin-top:16px;padding-top:14px;text-align:center;flex-wrap:wrap}
#nds-bottom-center-links a{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:38px!important;padding:9px 14px!important;border-radius:999px!important;background:#ffffff!important;border:1px solid #7cecff!important;color:#075dff!important;text-decoration:none!important;font-size:13px!important;font-weight:900!important;line-height:1.2!important;box-shadow:0 5px 16px rgba(0,0,0,.16)!important}
#nds-bottom-center-links a:hover{background:#eaf8ff!important;color:#082a52!important}
@media(max-width:620px){
  #nds-bottom-center-links{gap:9px;margin-top:13px;padding-top:11px;flex-wrap:wrap}
  #nds-bottom-center-links a{font-size:12px!important;padding:9px 12px!important;min-height:36px!important}
}
</style>`;

const BOTTOM_LINKS = `<div id="nds-bottom-center-links" aria-label="Website information links"><a href="/team">Team Members</a><a href="/terms">Terms &amp; Agreement</a></div>`;

function addBottomLinks(html){
  html=html.replace(/<nav\b[^>]*id=["']nds-center-links["'][\s\S]*?<\/nav>/gi,'');
  html=html.replace(/<style\b[^>]*id=["']nds-center-links-style["'][\s\S]*?<\/style>/gi,'');
  html=html.replace(/<div\b[^>]*id=["']nds-team-footer-link["'][\s\S]*?<\/div>/gi,'');
  html=html.replace(/<div[^>]*>\s*<a[^>]+href=["']\/terms["'][^>]*>Terms Condition and Agreement<\/a>\s*<\/div>/gi,'');

  if(!html.includes('id="nds-bottom-center-links-style"') && html.includes('</head>')) html=html.replace('</head>',FOOTER_STYLE+'</head>');
  if(!html.includes('id="nds-bottom-center-links"')){
    if(html.includes('</footer>')) html=html.replace('</footer>',BOTTOM_LINKS+'</footer>');
    else if(html.includes('</body>')) html=html.replace('</body>',BOTTOM_LINKS+'</body>');
  }
  return html;
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    let response;

    if(request.method==='GET' && (url.pathname==='/terms' || url.pathname==='/terms/')){
      response=await termsWorker.fetch(request,env,ctx);
    }else{
      response=await currentWorker.fetch(request,env,ctx);
    }

    const type=response.headers.get('content-type')||'';
    if(request.method!=='GET'||!response.ok||!type.includes('text/html')||url.pathname.startsWith('/admin')) return response;

    const html=addBottomLinks(await response.text());
    const headers=new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('etag');
    headers.set('cache-control','no-store');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
};
