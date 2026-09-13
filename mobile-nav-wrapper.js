import currentWorker from "./team-page-wrapper.js";
import termsWorker from "./terms-page-wrapper.js";

const NAV_STYLE = `<style id="nds-center-links-style">
#nds-center-links{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:10px 16px;background:#f8fcff;border-bottom:1px solid #d8e9f7;box-sizing:border-box}
#nds-center-links a{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:9px 14px;border-radius:999px;border:1px solid #c9e4f7;background:#fff;color:#0b5fd7!important;text-decoration:none!important;font-size:13px!important;font-weight:900!important;line-height:1.2!important;box-shadow:0 5px 16px rgba(11,95,215,.07)}
#nds-center-links a:hover{background:#edf7ff}
@media(max-width:620px){
  #nds-center-links{gap:8px;padding:9px 10px;flex-wrap:nowrap;overflow:hidden}
  #nds-center-links a{flex:1 1 0;min-width:0;padding:9px 8px;font-size:12px!important;text-align:center;white-space:normal}
  header .nav{min-height:68px!important;height:auto!important;gap:8px!important;align-items:center!important;padding:8px 0!important}
  header .brand{min-width:0!important;gap:8px!important}
  header .mark{width:42px!important;height:42px!important;min-width:42px!important;border-radius:12px!important;font-size:22px!important}
  header .brand strong{font-size:12px!important;line-height:1.15!important;white-space:nowrap!important}
  header .brand small{font-size:7px!important;letter-spacing:.08em!important;white-space:nowrap!important}
  header .back{font-size:11px!important;padding:7px 9px!important;white-space:nowrap!important}
}
@media(max-width:390px){
  #nds-center-links{padding:8px 8px;gap:6px}
  #nds-center-links a{font-size:11px!important;padding:8px 6px}
  header .brand strong{font-size:11px!important}
  header .brand small{font-size:6.5px!important}
}
</style>`;

const CENTER_LINKS = `<nav id="nds-center-links" aria-label="Important pages"><a href="/team">Team Members</a><a href="/terms">Terms &amp; Agreement</a></nav>`;

function addCenteredLinks(html){
  if(!html.includes('id="nds-center-links-style"') && html.includes('</head>')) html=html.replace('</head>',NAV_STYLE+'</head>');
  if(!html.includes('id="nds-center-links"')){
    const headerEnd=html.indexOf('</header>');
    if(headerEnd>=0){const at=headerEnd+9;html=html.slice(0,at)+CENTER_LINKS+html.slice(at);}
    else if(html.includes('<body>')) html=html.replace('<body>','<body>'+CENTER_LINKS);
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

    const html=addCenteredLinks(await response.text());
    const headers=new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('etag');
    headers.set('cache-control','no-store');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
};
