import currentWorker from "./team-page-wrapper.js";
import termsWorker from "./terms-page-wrapper.js";
import { addBottomLinks } from "./src/navigation/footer-links.js";

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
