import currentWorker from "./testimonial-final-fix-wrapper.js";

const PAGE_STYLE = `<style id="testimonial-page-only-style">
body.testimonial-page-mode main>section:not(#testimonials):not(#testimonial-page-hero){display:none!important}
body.testimonial-page-mode .paymentMethods{display:none!important}
body.testimonial-page-mode #testimonial-page-hero{display:block!important;padding:64px 0 34px!important;background:radial-gradient(circle at 85% 15%,rgba(41,223,255,.18),transparent 34%),linear-gradient(180deg,#f9fdff,#eef8ff)!important;border-bottom:1px solid #d9ecf8!important}
body.testimonial-page-mode #testimonial-page-hero .testimonialPageWrap{width:min(980px,calc(100% - 32px));margin:0 auto;text-align:center}
body.testimonial-page-mode #testimonial-page-hero .eyebrow{display:inline-block;margin-bottom:10px;padding:7px 11px;border-radius:999px;background:#eaf7ff;border:1px solid #bfe7f8;color:#075dff;font-size:12px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
body.testimonial-page-mode #testimonial-page-hero h1{margin:0;color:#0a2a5a;font-size:clamp(36px,7vw,58px);line-height:1.05;letter-spacing:-.035em}
body.testimonial-page-mode #testimonial-page-hero p{max-width:690px;margin:14px auto 0;color:#60758c;font-size:17px;line-height:1.7}
body.testimonial-page-mode #testimonial-page-hero .reviewBadge{display:inline-flex;align-items:center;gap:9px;margin-top:18px;padding:9px 13px;border-radius:999px;background:#fff;border:1px solid #c9e8f7;color:#496a89;font-weight:900;box-shadow:0 9px 24px rgba(7,93,255,.07)}
body.testimonial-page-mode #testimonial-page-hero .reviewBadge .stars{color:#f4b400;letter-spacing:2px}
body.testimonial-page-mode #testimonial-page-hero .backHome{display:inline-flex;margin-top:18px;text-decoration:none;color:#075dff;font-weight:900}
body.testimonial-page-mode #testimonials{display:block!important;padding-top:42px!important;padding-bottom:70px!important}
body.testimonial-page-mode #testimonials .container,body.testimonial-page-mode #testimonials .wrap{width:min(980px,calc(100% - 32px))!important;margin-left:auto!important;margin-right:auto!important}
body.testimonial-page-mode #dinesh-testimonial-fixed,body.testimonial-page-mode #el-patron-marketing-testimonial{max-width:980px!important;margin-left:auto!important;margin-right:auto!important}
#testimonial-page-footer-link{display:inline-flex!important;align-items:center!important;margin-top:10px!important;color:#bfeaff!important;text-decoration:none!important;font-weight:800!important}
@media(max-width:760px){
 body.testimonial-page-mode #testimonial-page-hero{padding:44px 0 28px!important}
 body.testimonial-page-mode #testimonial-page-hero h1{font-size:38px!important}
 body.testimonial-page-mode #testimonial-page-hero p{font-size:15px!important}
 body.testimonial-page-mode #testimonials{padding-top:28px!important;padding-bottom:52px!important}
}
</style>`;

const HERO = `<section id="testimonial-page-hero">
  <div class="testimonialPageWrap">
    <span class="eyebrow">Client Testimonials</span>
    <h1>What our clients say</h1>
    <p>A dedicated page for feedback from completed Neloy Digital Solutions projects. New client testimonials can be added here without changing the portfolio section.</p>
    <div class="reviewBadge"><span class="stars">★★★★★</span><span>20 out of 20 reviews</span></div><br>
    <a class="backHome" href="/">← Back to Home</a>
  </div>
</section>`;

function addPageStyle(html){
  if(!html.includes('id="testimonial-page-only-style"') && html.includes('</head>')) html=html.replace('</head>',PAGE_STYLE+'</head>');
  return html;
}

function addFooterLink(html){
  if(html.includes('id="testimonial-page-footer-link"')) return html;
  const link='<div><a id="testimonial-page-footer-link" href="/testimonials">Client Testimonials</a></div>';
  if(html.includes('</footer>')) return html.replace('</footer>',link+'</footer>');
  return html;
}

function makeTestimonialsPage(html){
  html=addPageStyle(html);
  html=html.replace(/<title>[\s\S]*?<\/title>/i,'<title>Client Testimonials | Neloy Digital Solutions</title>');
  html=html.replace(/<meta\s+name=["']description["'][^>]*>/i,'<meta name="description" content="Client testimonials and project reviews for Neloy Digital Solutions.">');
  html=html.replace(/<body([^>]*)>/i,(m,attrs)=>`<body${attrs} class="testimonial-page-mode">`);
  html=html.replace(/<main([^>]*)>/i,(m,attrs)=>`<main${attrs}>${HERO}`);
  html=addFooterLink(html);
  return html;
}

async function testimonialsResponse(request,env,ctx){
  const url=new URL(request.url);
  url.pathname='/';
  url.search='';
  const homeRequest=new Request(url.toString(),{method:'GET',headers:request.headers});
  const homeResponse=await currentWorker.fetch(homeRequest,env,ctx);
  const type=homeResponse.headers.get('content-type')||'';
  if(!homeResponse.ok||!type.includes('text/html')) return homeResponse;
  const html=makeTestimonialsPage(await homeResponse.text());
  const headers=new Headers(homeResponse.headers);
  headers.delete('content-length');
  headers.delete('etag');
  headers.set('content-type','text/html; charset=utf-8');
  headers.set('cache-control','no-store, no-cache, must-revalidate');
  return new Response(html,{status:200,headers});
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(request.method==='GET'&&(url.pathname==='/testimonials'||url.pathname==='/testimonials/'||url.pathname==='/reviews'||url.pathname==='/reviews/')){
      return testimonialsResponse(request,env,ctx);
    }

    const response=await currentWorker.fetch(request,env,ctx);
    const type=response.headers.get('content-type')||'';
    if(request.method!=='GET'||!response.ok||!type.includes('text/html')||url.pathname.startsWith('/admin')) return response;

    let html=await response.text();
    html=addPageStyle(html);
    html=addFooterLink(html);
    const headers=new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('etag');
    headers.set('cache-control','no-store');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
};
