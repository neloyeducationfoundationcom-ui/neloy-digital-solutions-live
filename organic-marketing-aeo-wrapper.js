import app from "./creative-partner-aeo-wrapper.js";

const PAGE_PATH="/digital-marketing";
const TITLE="Organic Digital Marketing, SEO & AEO | Neloy Digital Solutions";
const DESCRIPTION="Neloy Digital Solutions helps businesses improve online visibility through organic digital marketing, SEO, AEO, content strategy, web design, branding and video content.";

const STYLE=`<style id="nds-marketing-page-style">
#nds-marketing-page{background:#fff;color:#173357;font-family:inherit}
#nds-marketing-page *{box-sizing:border-box}
#nds-marketing-page .mkWrap{width:min(1140px,calc(100% - 32px));margin:auto}
#nds-marketing-page .mkHero{padding:82px 0 66px;background:radial-gradient(circle at 85% 10%,rgba(44,164,255,.16),transparent 28%),linear-gradient(135deg,#071a35,#0b3471 58%,#0b58b7);color:#fff}
#nds-marketing-page .mkEyebrow{display:inline-block;color:#9ed7ff;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px}
#nds-marketing-page h1{max-width:900px;margin:0;font-size:clamp(40px,7vw,70px);line-height:1.02;letter-spacing:-.035em;color:#fff}
#nds-marketing-page .mkLead{max-width:790px;margin:20px 0 0;color:#dcecff;font-size:18px;line-height:1.75}
#nds-marketing-page .mkBtns{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
#nds-marketing-page .mkBtn{display:inline-flex;padding:13px 19px;border-radius:12px;background:#fff;color:#075dff!important;text-decoration:none;font-weight:900}
#nds-marketing-page .mkBtn.alt{background:transparent;color:#fff!important;border:1px solid rgba(255,255,255,.38)}
#nds-marketing-page .mkSection{padding:66px 0}
#nds-marketing-page .mkSection.soft{background:#f6fbff;border-block:1px solid #dcecf5}
#nds-marketing-page .mkHead{max-width:820px;margin:0 auto 30px;text-align:center}
#nds-marketing-page .mkHead h2{margin:0;color:#0a2a5a;font-size:clamp(31px,5vw,46px);line-height:1.1}
#nds-marketing-page .mkHead p{margin:12px 0 0;color:#60758c;line-height:1.75}
#nds-marketing-page .mkGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
#nds-marketing-page .mkCard{padding:24px;background:#fff;border:1px solid #cce8f8;border-radius:20px;box-shadow:0 12px 28px rgba(7,93,255,.07)}
#nds-marketing-page .mkCard b{display:block;color:#075dff;font-size:12px;letter-spacing:.09em;text-transform:uppercase;margin-bottom:8px}
#nds-marketing-page .mkCard h3{margin:0 0 9px;color:#0a2a5a;font-size:22px}
#nds-marketing-page .mkCard p{margin:0;color:#60758c;line-height:1.7}
#nds-marketing-page .mkSteps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:13px}
#nds-marketing-page .mkStep{padding:20px;border-radius:18px;background:#fff;border:1px solid #cce8f8}
#nds-marketing-page .mkStep span{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#075dff;color:#fff;font-weight:1000;margin-bottom:12px}
#nds-marketing-page .mkStep strong{display:block;color:#0a2a5a;margin-bottom:7px}
#nds-marketing-page .mkStep p{margin:0;color:#60758c;font-size:14px;line-height:1.58}
#nds-marketing-page .mkAnswer{max-width:930px;margin:auto;padding:28px;border-radius:22px;background:linear-gradient(135deg,#eef8ff,#fff);border:1px solid #cce8f8}
#nds-marketing-page .mkAnswer h2{margin:0 0 12px;color:#0a2a5a;font-size:30px}
#nds-marketing-page .mkAnswer p{margin:0 0 14px;color:#60758c;line-height:1.78}
#nds-marketing-page .mkLinks{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
#nds-marketing-page .mkLinks a{display:inline-flex;padding:11px 15px;border-radius:10px;background:#075dff;color:#fff!important;text-decoration:none;font-weight:900}
#nds-marketing-page .mkLinks a.alt{background:#fff;color:#075dff!important;border:1px solid #add7ff}
#nds-marketing-page .mkFaq{max-width:920px;margin:auto}
#nds-marketing-page .mkFaq article{padding:20px 0;border-bottom:1px solid #dcecf5}
#nds-marketing-page .mkFaq h3{margin:0 0 7px;color:#173357;font-size:21px}
#nds-marketing-page .mkFaq p{margin:0;color:#60758c;line-height:1.72}
#nds-marketing-page .mkCta{padding:58px 0;text-align:center;background:linear-gradient(135deg,#0a2a5a,#075dff);color:#fff}
#nds-marketing-page .mkCta h2{margin:0;color:#fff;font-size:clamp(30px,5vw,46px)}
#nds-marketing-page .mkCta p{max-width:700px;margin:12px auto 0;color:#e5f4ff;line-height:1.72}
#nds-marketing-page .mkCta a{display:inline-flex;margin-top:22px;padding:13px 19px;border-radius:12px;background:#fff;color:#075dff!important;text-decoration:none;font-weight:900}
@media(max-width:900px){#nds-marketing-page .mkGrid{grid-template-columns:1fr 1fr}#nds-marketing-page .mkSteps{grid-template-columns:1fr 1fr}}
@media(max-width:640px){#nds-marketing-page .mkHero{padding:58px 0 50px}#nds-marketing-page .mkSection{padding:48px 0}#nds-marketing-page .mkGrid,#nds-marketing-page .mkSteps{grid-template-columns:1fr}}
</style>`;

function page(){
return `<main id="nds-marketing-page">
<section class="mkHero"><div class="mkWrap">
<span class="mkEyebrow">Organic Growth • SEO • AEO • Content Strategy</span>
<h1>Digital Marketing Built Around Visibility, Trust & Better Customer Journeys</h1>
<p class="mkLead">Neloy Digital Solutions helps businesses strengthen their online presence through organic digital marketing, SEO, AEO, content strategy, brand identity, web design and video content — without forcing every business into the same marketing formula.</p>
<div class="mkBtns"><a class="mkBtn" href="/#contact">Discuss Your Marketing Goal</a><a class="mkBtn alt" href="/showcase">View Portfolio</a></div>
</div></section>

<section class="mkSection"><div class="mkWrap">
<div class="mkHead"><h2>What Does Organic Digital Marketing Mean for Your Business?</h2><p>Organic marketing is the work that helps customers discover, understand and trust your business without relying only on paid advertising.</p></div>
<div class="mkGrid">
<article class="mkCard"><b>Visibility</b><h3>SEO for Search Discovery</h3><p>Improve how clearly your website communicates its services to search engines through page structure, useful content, internal linking and search-focused metadata.</p></article>
<article class="mkCard"><b>Answer Visibility</b><h3>AEO for AI & Answer Engines</h3><p>Structure helpful questions, direct answers, service explanations and schema so search and AI systems can better understand what your business provides.</p></article>
<article class="mkCard"><b>Content</b><h3>Helpful Social & Article Strategy</h3><p>Create educational posts, articles, portfolio stories and customer-focused content that demonstrates expertise instead of repeating the same sales message.</p></article>
<article class="mkCard"><b>Brand Trust</b><h3>Consistent Brand Identity</h3><p>Use consistent messaging and visual presentation across your website, social channels and client touchpoints so prospects recognise the business more easily.</p></article>
<article class="mkCard"><b>Conversion</b><h3>Web Experience & Clear CTAs</h3><p>Connect marketing to pages that explain the service clearly, show proof of work and make the next customer action easy to understand.</p></article>
<article class="mkCard"><b>Engagement</b><h3>Video & Creative Content</h3><p>Use reels, branded video, motion content and visual storytelling to explain ideas quickly and create stronger attention across digital channels.</p></article>
</div></div></section>

<section class="mkSection soft"><div class="mkWrap">
<div class="mkHead"><h2>Our Organic Client-Acquisition Framework</h2><p>The goal is not to post everywhere without a plan. Each channel should move the right audience toward useful information and a clear conversation.</p></div>
<div class="mkSteps">
<div class="mkStep"><span>1</span><strong>Attract</strong><p>Useful posts, articles, video and search-friendly content create discovery.</p></div>
<div class="mkStep"><span>2</span><strong>Educate</strong><p>Explain customer problems, options, process and practical solutions.</p></div>
<div class="mkStep"><span>3</span><strong>Prove</strong><p>Use portfolio work, case-style examples and clear service information.</p></div>
<div class="mkStep"><span>4</span><strong>Guide</strong><p>Send visitors to the most relevant service page instead of always using the homepage.</p></div>
<div class="mkStep"><span>5</span><strong>Convert</strong><p>Use a simple CTA to start a requirement, budget or project conversation.</p></div>
</div></div></section>

<section class="mkSection"><div class="mkWrap">
<div class="mkAnswer">
<h2>How does Neloy Digital Solutions help businesses with marketing?</h2>
<p>Neloy Digital Solutions combines creative strategy, organic digital marketing, SEO, AEO, brand identity, professional web design and video content to help businesses become easier to understand and easier to discover online.</p>
<p>Instead of treating marketing as a separate activity, we connect content to the pages and services customers actually need. A logo post can lead to a logo-design page, a website topic can lead to a web-design page, and a video topic can lead to a professional video-editing page.</p>
<div class="mkLinks"><a href="/logo-design">Professional Logo Design</a><a href="/video-editing">Professional Video Editing</a><a class="alt" href="/website-design">Professional Web Design</a></div>
</div></div></section>

<section class="mkSection soft"><div class="mkWrap">
<div class="mkHead"><h2>Digital Marketing Questions Businesses Commonly Ask</h2><p>Clear answers help prospects understand the strategy before choosing what to work on first.</p></div>
<div class="mkFaq">
<article><h3>Do I need paid ads to start digital marketing?</h3><p>No. Businesses can begin with organic content, useful service pages, SEO, AEO, internal linking, portfolio proof and direct outreach. Paid advertising can be considered separately when it fits the business goal and budget.</p></article>
<article><h3>What is AEO?</h3><p>Answer Engine Optimization focuses on making information easy for search engines and AI assistants to understand and surface as useful answers. Clear questions, direct explanations, structured content and schema can support this.</p></article>
<article><h3>How is SEO different from AEO?</h3><p>SEO focuses broadly on search visibility and discoverability. AEO focuses more specifically on structuring information so answer engines and AI systems can understand and present clear responses. They work best together.</p></article>
<article><h3>Can social media posts help website visibility?</h3><p>Social posts can create branded discovery, referral traffic and additional content touchpoints. They do not guarantee search rankings, but they can support a wider digital visibility strategy when connected to useful website pages.</p></article>
</div></div></section>

<section class="mkCta"><div class="mkWrap">
<h2>Start With the Marketing Goal</h2>
<p>Tell us what you want customers to understand, discover or do. We can then identify which combination of content, design, website, SEO or AEO work makes sense for the project.</p>
<a href="/#contact">Discuss Your Project</a>
</div></section>
</main>`;
}

function esc(v){return String(v).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function metaName(html,name,value){
  const tag=`<meta name="${name}" content="${esc(value)}">`;
  const re=new RegExp('<meta\\b(?=[^>]*\\bname\\s*=\\s*["\\\']'+name+'["\\\'])[^>]*>','i');
  return re.test(html)?html.replace(re,tag):html.replace(/<\/head>/i,tag+'\n</head>');
}
function metaProp(html,name,value){
  const tag=`<meta property="${name}" content="${esc(value)}">`;
  const re=new RegExp('<meta\\b(?=[^>]*\\bproperty\\s*=\\s*["\\\']'+name+'["\\\'])[^>]*>','i');
  return re.test(html)?html.replace(re,tag):html.replace(/<\/head>/i,tag+'\n</head>');
}
function schema(origin){
  return {
    "@context":"https://schema.org",
    "@graph":[
      {
        "@type":"Service",
        "@id":`${origin}${PAGE_PATH}#service`,
        name:"Organic Digital Marketing, SEO & AEO Services",
        description:DESCRIPTION,
        serviceType:["Organic Digital Marketing","SEO","AEO","Content Strategy","Brand Strategy","Website Marketing","Video Content Marketing"],
        areaServed:"Worldwide",
        provider:{"@type":"Organization",name:"Neloy Digital Solutions",url:`${origin}/`},
        url:`${origin}${PAGE_PATH}`
      },
      {
        "@type":"FAQPage",
        "@id":`${origin}${PAGE_PATH}#faq`,
        mainEntity:[
          {"@type":"Question",name:"Do I need paid ads to start digital marketing?",acceptedAnswer:{"@type":"Answer",text:"No. Businesses can begin with organic content, useful service pages, SEO, AEO, internal linking, portfolio proof and direct outreach."}},
          {"@type":"Question",name:"What is AEO?",acceptedAnswer:{"@type":"Answer",text:"Answer Engine Optimization structures useful questions, direct answers, service information and schema so search engines and AI assistants can better understand the business."}},
          {"@type":"Question",name:"How is SEO different from AEO?",acceptedAnswer:{"@type":"Answer",text:"SEO focuses broadly on search visibility and discoverability, while AEO focuses on making information easier for answer engines and AI systems to understand and present."}}
        ]
      }
    ]
  };
}

function enhanceMarketing(html,origin){
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${TITLE}</title>`);
  html=metaName(html,"description",DESCRIPTION);
  html=metaName(html,"keywords","organic digital marketing, SEO, AEO, answer engine optimization, content strategy, brand growth, web design, video editing, Neloy Digital Solutions");
  html=metaName(html,"robots","index,follow,max-image-preview:large,max-snippet:-1");
  html=metaProp(html,"og:title",TITLE);
  html=metaProp(html,"og:description",DESCRIPTION);
  html=metaProp(html,"og:type","website");
  html=metaProp(html,"og:url",`${origin}${PAGE_PATH}`);
  const canonical=`<link rel="canonical" href="${origin}${PAGE_PATH}">`;
  const canRe=/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/i;
  html=canRe.test(html)?html.replace(canRe,canonical):html.replace(/<\/head>/i,canonical+'\n</head>');
  if(!html.includes('id="nds-marketing-page-style"')) html=html.replace(/<\/head>/i,STYLE+'\n</head>');
  const json=JSON.stringify(schema(origin)).replace(/</g,"\\u003c");
  html=html.replace(/<script\b[^>]*id=["']nds-marketing-aeo-schema["'][^>]*>[\s\S]*?<\/script>\s*/i,"");
  html=html.replace(/<\/head>/i,`<script id="nds-marketing-aeo-schema" type="application/ld+json">${json}</script>\n</head>`);
  if(/<main\b[^>]*>[\s\S]*?<\/main>/i.test(html)) html=html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/i,page());
  else html=html.replace(/<\/body>/i,page()+'\n</body>');
  return html;
}


const SHOWCASE_VIDEO_STYLE=`<style id="nds-showcase-video-style">
#nds-showcase-video{padding:72px 0;background:linear-gradient(180deg,#071a35,#0a2a5a);color:#fff}
#nds-showcase-video *{box-sizing:border-box}
#nds-showcase-video .svWrap{width:min(1120px,calc(100% - 32px));margin:auto}
#nds-showcase-video .svHead{text-align:center;max-width:820px;margin:0 auto 30px}
#nds-showcase-video .svEyebrow{display:inline-block;color:#12DFF3;font-size:12px;font-weight:1000;letter-spacing:.14em;text-transform:uppercase}
#nds-showcase-video h2{margin:10px 0 10px;color:#fff;font-size:clamp(34px,5vw,50px);line-height:1.06}
#nds-showcase-video .svHead p{margin:0;color:#d7e9f7;font-size:16px;line-height:1.7}
#nds-showcase-video .svGrid{display:grid;grid-template-columns:1fr 1fr;gap:22px}
#nds-showcase-video .svCard{background:#fff;border:1px solid #bfe7f8;border-radius:24px;padding:22px;box-shadow:0 18px 44px rgba(0,0,0,.18)}
#nds-showcase-video .svTag{display:inline-block;padding:6px 10px;border-radius:999px;background:#eaf8ff;color:#075DFF;font-size:11px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
#nds-showcase-video h3{margin:12px 0 8px;color:#0A2A5A;font-size:26px}
#nds-showcase-video .svCard p{margin:0;color:#60758c;line-height:1.65}
#nds-showcase-video .svPlayer{margin-top:18px;padding:10px;background:#06162d;border-radius:16px}
#nds-showcase-video .svPlayer video{display:block;width:100%;background:#000;border-radius:10px}
#nds-showcase-video .svReel video{max-height:560px;aspect-ratio:9/16;object-fit:contain}
#nds-showcase-video .svPodcast video{aspect-ratio:16/9;object-fit:cover}
#nds-showcase-video .svCta{text-align:center;margin-top:26px}
#nds-showcase-video .svCta a{display:inline-flex;padding:12px 18px;border-radius:11px;background:#12DFF3;color:#062347!important;text-decoration:none;font-weight:1000}
@media(max-width:820px){#nds-showcase-video .svGrid{grid-template-columns:1fr}}
</style>`;

const SHOWCASE_VIDEO_SECTION=`<section id="nds-showcase-video" aria-labelledby="nds-showcase-video-title">
<div class="svWrap">
  <div class="svHead">
    <span class="svEyebrow">Video Editing Portfolio</span>
    <h2 id="nds-showcase-video-title">Selected Video Editing Work</h2>
    <p>Watch two video-editing examples from Neloy Digital Solutions, including short-form reel editing and podcast video editing.</p>
  </div>
  <div class="svGrid">
    <article class="svCard svReel">
      <span class="svTag">Video Editing · Reels</span>
      <h3>Short Video Editing</h3>
      <p>Branded short-form editing with motion graphics, pacing, audio and social-media-ready presentation.</p>
      <div class="svPlayer"><video controls playsinline preload="metadata" aria-label="Neloy Digital Solutions short video editing portfolio"><source src="/showcase-media/neloy-approved-laptop-podcast.mp4?v=1" type="video/mp4">Your browser does not support embedded video.</video></div>
    </article>
    <article class="svCard svPodcast">
      <span class="svTag">Video Editing · Podcast</span>
      <h3>Podcast Video Editing Portfolio</h3>
      <p>Podcast editing focused on clean cuts, captions, pacing, branded framing and professional presentation.</p>
      <div class="svPlayer"><video controls playsinline preload="metadata" aria-label="Neloy Digital Solutions podcast video editing portfolio"><source src="/showcase-media/neloy-real-portfolio-laptop-60s.mp4?v=1" type="video/mp4">Your browser does not support embedded video.</video></div>
    </article>
  </div>
  <div class="svCta"><a href="/video-editing">Explore Video Editing Services →</a></div>
</div>
</section>`;

function addShowcaseVideos(html){
  if(html.includes('id="nds-showcase-video"')) return html;
  if(!html.includes('id="nds-showcase-video-style"') && /<\/head>/i.test(html)){
    html=html.replace(/<\/head>/i,SHOWCASE_VIDEO_STYLE+'\n</head>');
  }
  const section=SHOWCASE_VIDEO_SECTION;
  const markers=[
    '<section id="nds-web-projects-2026"',
    '<section class="partner"',
    '<section id="testimonials"',
    '<section class="testimonials"'
  ];
  for(const marker of markers){
    const pos=html.indexOf(marker);
    if(pos!==-1) return html.slice(0,pos)+section+'\n'+html.slice(pos);
  }
  if(/<\/main>/i.test(html)) return html.replace(/<\/main>/i,section+'\n</main>');
  return html.replace(/<\/body>/i,section+'\n</body>');
}

function addHomeMarketingLink(html){
  if(html.includes('href="/digital-marketing"')) return html;
  const marker='<a class="alt" href="/website-design">Professional Web Design</a>';
  if(html.includes(marker)) return html.replace(marker,marker+'\n          <a class="alt" href="/digital-marketing">Organic Marketing & AEO</a>');
  return html;
}
function addToSitemap(xml,origin){
  const loc=`${origin}${PAGE_PATH}`;
  if(xml.includes(loc)||!/<urlset\b/i.test(xml)||!/<\/urlset>/i.test(xml)) return xml;
  return xml.replace(/<\/urlset>/i,`  <url><loc>${loc}</loc><lastmod>2026-09-18</lastmod></url>\n</urlset>`);
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    const path=url.pathname.replace(/\/$/,"")||"/";

    if(request.method==="GET"&&path===PAGE_PATH){
      const homeUrl=new URL(request.url); homeUrl.pathname="/"; homeUrl.search="";
      const base=await app.fetch(new Request(homeUrl.toString(),{method:"GET",headers:request.headers}),env,ctx);
      const type=(base.headers.get("content-type")||"").toLowerCase();
      if(!base.ok||!type.includes("text/html")) return base;
      const html=enhanceMarketing(await base.text(),url.origin);
      const headers=new Headers(base.headers); headers.delete("content-length"); headers.delete("etag"); headers.set("content-type","text/html; charset=utf-8"); headers.set("cache-control","no-store");
      return new Response(html,{status:200,headers});
    }

    const response=await app.fetch(request,env,ctx);

    if(request.method==="GET"&&path==="/sitemap.xml"&&response.ok){
      const type=(response.headers.get("content-type")||"").toLowerCase();
      if(type.includes("xml")||type.includes("text/plain")){
        const xml=addToSitemap(await response.text(),url.origin);
        const headers=new Headers(response.headers); headers.delete("content-length"); headers.delete("etag"); headers.set("content-type","application/xml; charset=utf-8"); headers.set("cache-control","no-store");
        return new Response(xml,{status:response.status,statusText:response.statusText,headers});
      }
    }

    const type=(response.headers.get("content-type")||"").toLowerCase();
    if(request.method!=="GET"||!response.ok||!type.includes("text/html")||path.startsWith("/admin")) return response;
    let html=await response.text();
    if(path==="/"||path==="") html=addHomeMarketingLink(html);
    if(path==="/showcase"||path==="/portfolio") html=addShowcaseVideos(html);
    const headers=new Headers(response.headers); headers.delete("content-length"); headers.delete("etag"); headers.set("cache-control","no-store");
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
};
