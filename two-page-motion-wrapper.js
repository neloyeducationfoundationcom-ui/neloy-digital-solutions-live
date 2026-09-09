import currentWorker from "./dinesh-testimonial-wrapper.js";

const MOTION_STYLE = `
<style id="two-page-motion-style">
:root{--fx-blue:#075DFF;--fx-cyan:#12DFF3;--fx-navy:#0A2A5A;--fx-soft:#EDF8FF}
.pageFx{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.pageFx span{position:absolute;border-radius:999px;filter:blur(2px);opacity:.22;animation:orbFloat 11s ease-in-out infinite}
.pageFx .o1{width:260px;height:260px;background:var(--fx-blue);left:-90px;top:12%}
.pageFx .o2{width:210px;height:210px;background:var(--fx-cyan);right:-70px;top:33%;animation-delay:-3s}
.pageFx .o3{width:170px;height:170px;background:#71F2FF;left:35%;bottom:-70px;animation-delay:-6s}
@keyframes orbFloat{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(20px,-26px,0) scale(1.08)}}
.hero{position:relative;isolation:isolate}.hero:before{animation:heroDriftA 8s ease-in-out infinite}.hero:after{animation:heroDriftB 10s ease-in-out infinite}
@keyframes heroDriftA{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-24px,18px) scale(1.08)}}
@keyframes heroDriftB{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(28px,-18px) scale(.95)}}
.heroGrid>div:first-child{animation:heroInLeft .9s cubic-bezier(.2,.8,.2,1) both}.heroPanel{animation:heroInRight 1s .08s cubic-bezier(.2,.8,.2,1) both}
@keyframes heroInLeft{from{opacity:0;transform:translateX(-34px)}to{opacity:1;transform:none}}
@keyframes heroInRight{from{opacity:0;transform:translateX(34px) scale(.96)}to{opacity:1;transform:none}}
.heroPanel .bigCard{position:relative;overflow:hidden}.heroPanel .bigCard:after{content:"";position:absolute;inset:-60% auto -60% -35%;width:36%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.32),transparent);transform:rotate(16deg);animation:shineSweep 5.5s ease-in-out infinite}
@keyframes shineSweep{0%,58%{left:-45%}80%,100%{left:120%}}
.motionReveal{transition:opacity .7s ease,transform .7s cubic-bezier(.2,.75,.2,1)}.motion-ready .motionReveal{opacity:0;transform:translateY(28px)}.motion-ready .motionReveal.inView{opacity:1;transform:none}
.card,.workCard,.testCard,.partnerCard{transition:transform .28s ease,box-shadow .28s ease}.card:hover,.workCard:hover,.testCard:hover{transform:translateY(-7px)}
#work .projectVisual img{transition:transform .6s cubic-bezier(.2,.7,.2,1),filter .6s ease}#work .workCard:hover .projectVisual img{transform:scale(1.035);filter:saturate(1.08)}
#testimonials .testCard{position:relative;overflow:hidden}#testimonials .testCard:before{content:"“";position:absolute;right:18px;top:-16px;font-size:110px;line-height:1;color:rgba(18,223,243,.09);font-family:Georgia,serif}
#testimonials .testCard:nth-child(1){animation:reviewFloatA 6s ease-in-out infinite}#testimonials .testCard:nth-child(2){animation:reviewFloatB 6.8s ease-in-out infinite}
@keyframes reviewFloatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes reviewFloatB{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
#testimonials .stars{display:inline-block;background:linear-gradient(90deg,#F4B400,#FFD95A,#F4B400);background-size:180% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:starGlow 2.8s linear infinite}
@keyframes starGlow{to{background-position:180% 0}}
.showcaseTeaser{padding:58px 0;background:linear-gradient(135deg,#EAF8FF,#F7FDFF);position:relative;overflow:hidden}.showcaseTeaser .box{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;border:1px solid #C9E8F7;background:rgba(255,255,255,.88);border-radius:26px;padding:28px;box-shadow:0 18px 44px rgba(7,93,255,.09)}.showcaseTeaser h2{margin:6px 0 8px}.showcaseTeaser p{margin:0;color:#5D7690}.showcaseLink{display:inline-flex;align-items:center;justify-content:center;padding:14px 18px;border-radius:14px;background:linear-gradient(135deg,var(--fx-blue),var(--fx-cyan));color:#fff;text-decoration:none;font-weight:900;white-space:nowrap;box-shadow:0 12px 28px rgba(7,93,255,.18)}
.showcaseHero{padding:88px 0 64px;position:relative;overflow:hidden;background:radial-gradient(circle at 15% 20%,rgba(18,223,243,.22),transparent 28%),radial-gradient(circle at 85% 15%,rgba(7,93,255,.18),transparent 28%),linear-gradient(135deg,#F8FDFF,#EAF8FF)}.showcaseHero .wrap{position:relative;z-index:2}.showcaseHero h1{max-width:850px;margin:12px 0 18px;font-size:clamp(48px,7vw,82px);color:var(--fx-navy)}.showcaseHero p{max-width:720px;color:#57748F;font-size:18px}.showcaseHero .motionLine{height:2px;width:min(430px,80vw);background:linear-gradient(90deg,var(--fx-blue),var(--fx-cyan),transparent);animation:lineGrow 1.3s .2s both}@keyframes lineGrow{from{transform:scaleX(0);transform-origin:left}to{transform:scaleX(1)}}
.showcaseHero .chips{display:flex;gap:9px;flex-wrap:wrap;margin-top:22px}.showcaseHero .chips span{padding:8px 11px;border-radius:999px;border:1px solid #B8E7F5;background:#fff;color:var(--fx-blue);font-size:12px;font-weight:900;animation:chipIn .6s both}.showcaseHero .chips span:nth-child(2){animation-delay:.08s}.showcaseHero .chips span:nth-child(3){animation-delay:.16s}@keyframes chipIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.showcaseBack{display:inline-flex;margin-top:24px;color:var(--fx-blue);font-weight:900;text-decoration:none}
body.showcasePage #work,body.showcasePage #testimonials,body.showcasePage .partner{position:relative;z-index:1}
body.showcasePage #work .sectionHead,body.showcasePage #testimonials .sectionHead{max-width:860px}
@media(max-width:760px){.showcaseTeaser .box{grid-template-columns:1fr;padding:20px}.showcaseLink{width:100%}.showcaseHero{padding:62px 0 42px}.showcaseHero h1{font-size:46px}#testimonials .testCard:nth-child(1),#testimonials .testCard:nth-child(2){animation:none}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important}.motion-ready .motionReveal{opacity:1!important;transform:none!important}}
</style>`;

const MOTION_SCRIPT = `
<script id="two-page-motion-script">
(()=>{document.documentElement.classList.add('motion-ready');const els=[...document.querySelectorAll('section,.card,.workCard,.testCard,.partnerCard,.companyContentArticle')];els.forEach(e=>e.classList.add('motionReveal'));const io=new IntersectionObserver(es=>{es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('inView');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -40px'});els.forEach(e=>io.observe(e));})();
</script>`;

const FX = `<div class="pageFx" aria-hidden="true"><span class="o1"></span><span class="o2"></span><span class="o3"></span></div>`;

const HOME_NAV = `<nav class="navlinks"><a href="/">Home</a><a href="#services">Services</a><a href="/showcase">Portfolio & Reviews</a><a href="#contact" class="navCta">Contact</a></nav>`;
const SHOWCASE_NAV = `<nav class="navlinks"><a href="/">Home</a><a href="#work">Portfolio</a><a href="#testimonials">Testimonials</a><a href="/#contact" class="navCta">Contact</a></nav>`;

function injectCommon(html){
  if(!html.includes('two-page-motion-style')) html=html.replace('</head>',MOTION_STYLE+'</head>');
  if(!html.includes('class="pageFx"')) html=html.replace('<body>','<body>'+FX);
  if(!html.includes('two-page-motion-script')) html=html.replace('</body>',MOTION_SCRIPT+'</body>');
  return html;
}

function homePage(html){
  html=injectCommon(html);
  html=html.replace(/<nav class="navlinks">[\s\S]*?<\/nav>/i,HOME_NAV);
  html=html.replace(/<section id="work"[\s\S]*?<\/section>/i,'');
  html=html.replace(/<section class="partner">[\s\S]*?<\/section>/i,'');
  html=html.replace(/<section id="testimonials"[\s\S]*?<\/section>/i,'');
  const teaser=`<section class="showcaseTeaser"><div class="wrap"><div class="box"><div><span class="eyebrow">Portfolio & Client Reviews</span><h2>See the work. Meet the clients. Explore the results.</h2><p>Our completed projects and client testimonials now have their own dedicated page with a more creative visual experience.</p></div><a class="showcaseLink" href="/showcase">View Portfolio & Reviews →</a></div></div></section>`;
  if(!html.includes('class="showcaseTeaser"')){
    if(html.includes('<section class="companyContent"')) html=html.replace('<section class="companyContent"',teaser+'<section class="companyContent"');
    else if(html.includes('<section id="contact"')) html=html.replace('<section id="contact"',teaser+'<section id="contact"');
  }
  return html;
}

function showcasePage(html){
  html=injectCommon(html);
  html=html.replace('<body>','<body class="showcasePage">');
  html=html.replace(/<nav class="navlinks">[\s\S]*?<\/nav>/i,SHOWCASE_NAV);
  html=html.replace(/<section class="hero">[\s\S]*?<\/section>/i,`<section class="showcaseHero"><div class="wrap"><span class="eyebrow">Creative Showcase</span><h1>Selected work & client stories.</h1><div class="motionLine"></div><p>A dedicated space for completed projects, brand work and genuine client feedback from Neloy Digital Solutions.</p><div class="chips"><span>PORTFOLIO</span><span>TESTIMONIALS</span><span>5-STAR REVIEWS</span></div><a class="showcaseBack" href="/">← Back to Home</a></div></section>`);
  html=html.replace(/<section id="services"[\s\S]*?<\/section>/i,'');
  html=html.replace(/<section class="companyContent"[\s\S]*?<\/section>/i,'');
  html=html.replace(/<section id="contact"[\s\S]*?<\/section>/i,'');
  return html;
}

async function rootHtml(request,env,ctx){
  const u=new URL(request.url);u.pathname='/';u.search='';
  const r=await currentWorker.fetch(new Request(u.toString(),{method:'GET',headers:request.headers}),env,ctx);
  const type=r.headers.get('content-type')||'';
  if(!type.includes('text/html')) return {response:r,html:null};
  return {response:r,html:await r.text()};
}

function htmlResponse(base,html){
  const headers=new Headers(base.headers);headers.set('content-type','text/html; charset=utf-8');headers.set('cache-control','no-store');
  return new Response(html,{status:200,headers});
}

export default {
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(request.method==='GET' && (url.pathname==='/' || url.pathname==='/website' || url.pathname==='/website/')){
      const {response,html}=await rootHtml(request,env,ctx);if(!html) return response;return htmlResponse(response,homePage(html));
    }
    if(request.method==='GET' && (url.pathname==='/showcase' || url.pathname==='/showcase/' || url.pathname==='/portfolio' || url.pathname==='/portfolio/')){
      const {response,html}=await rootHtml(request,env,ctx);if(!html) return response;return htmlResponse(response,showcasePage(html));
    }
    return currentWorker.fetch(request,env,ctx);
  }
};