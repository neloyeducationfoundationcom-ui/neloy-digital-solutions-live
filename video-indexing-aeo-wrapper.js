import app from "./website-design-aeo-portfolio-wrapper.js";

const PAGE_PATH = "/video-editing";
const VIDEO_PATH = "/showcase-media/neloy-project-process.mp4?v=3";
const THUMB_PATH = "/showcase-media/neloy-project-process-thumbnail.jpg?v=3";
const TITLE = "Video Editing, Reels & Motion Graphics | Neloy Digital Solutions";
const DESCRIPTION = "Professional video editing, reels, motion graphics, promotional videos and branded social media video production by Neloy Digital Solutions.";
const VIDEO_TITLE = "Neloy Digital Solutions Video Editing & Project Process Showcase";
const VIDEO_DESCRIPTION = "Watch how Neloy Digital Solutions approaches video editing projects, including project requirements, demo approval, editing direction and professional final delivery.";
const UPLOAD_DATE = "2026-09-12T19:21:28Z";

const STYLE = `<style id="nds-video-page-style">
#nds-video-watch{padding:62px 0;background:#fff}#nds-video-watch *{box-sizing:border-box}#nds-video-watch .vwWrap{width:min(1040px,calc(100% - 32px));margin:auto}#nds-video-watch .vwHead{text-align:center;max-width:820px;margin:0 auto 28px}#nds-video-watch .vwHead span{display:inline-block;color:#075DFF;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}#nds-video-watch .vwHead h2{margin:9px 0 10px;color:#0A2A5A;font-size:clamp(30px,5vw,46px);line-height:1.08}#nds-video-watch .vwHead p{margin:0;color:#60758c;font-size:16px;line-height:1.7}#nds-video-watch .vwPlayer{width:min(920px,100%);margin:auto;padding:12px;background:#07182a;border-radius:24px;box-shadow:0 20px 55px rgba(8,55,96,.20)}#nds-video-watch video{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#000;border-radius:15px}#nds-video-watch .vwMeta{max-width:920px;margin:20px auto 0;padding:18px 20px;border:1px solid #c9e8f7;background:#f7fcff;border-radius:16px;color:#60758c;line-height:1.65}#nds-video-watch .vwMeta strong{color:#0A2A5A}#nds-video-watch .vwLinks{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:20px}#nds-video-watch .vwLinks a{display:inline-flex;padding:12px 18px;border-radius:11px;background:#075DFF;color:#fff;text-decoration:none;font-weight:900}#nds-video-watch .vwLinks a.alt{background:#fff;color:#075DFF;border:1px solid #9edcf5}
.nds-video-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.nds-video-grid .spCard{height:100%}.nds-video-page .spFaqItem a{color:#075DFF;font-weight:800}.nds-video-home-link{display:block;text-align:center;margin:18px auto 0;color:#075DFF;font-weight:900;text-decoration:none}
@media(max-width:850px){.nds-video-grid{grid-template-columns:1fr 1fr}}@media(max-width:620px){.nds-video-grid{grid-template-columns:1fr}#nds-video-watch{padding:46px 0}#nds-video-watch .vwPlayer{padding:7px;border-radius:17px}}
</style>`;

function escapeAttr(value){return String(value).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function escapeXml(value){return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}

function replaceMetaName(html,name,content){
  const tag=`<meta name="${name}" content="${escapeAttr(content)}">`;
  const re=new RegExp(`<meta\\b(?=[^>]*\\bname\\s*=\\s*["']${name}["'])[^>]*>`,`i`);
  return re.test(html)?html.replace(re,tag):html.replace(/<\/head>/i,`${tag}\n</head>`);
}
function replaceMetaProperty(html,property,content){
  const tag=`<meta property="${property}" content="${escapeAttr(content)}">`;
  const re=new RegExp(`<meta\\b(?=[^>]*\\bproperty\\s*=\\s*["']${property}["'])[^>]*>`,`i`);
  return re.test(html)?html.replace(re,tag):html.replace(/<\/head>/i,`${tag}\n</head>`);
}

function videoPage(origin){
  return `<main class="nds-service-page nds-video-page" id="main">
<section class="spHero"><div class="spWrap"><span class="spEyebrow">Video Editing & Motion Graphics</span><h1>Professional Video Editing, Reels & Motion Graphics</h1><p class="spLead">Neloy Digital Solutions creates branded reels, promotional videos, motion graphics and social media edits. We first understand your project requirements and budget, prepare a short demo direction when appropriate, and continue with the full edit after approval.</p><div class="spBtns"><a class="spBtn" href="#watch-video">Watch Our Video</a><a class="spBtn alt" href="/showcase">View Full Portfolio</a></div></div></section>
<section id="nds-video-watch" aria-labelledby="watch-video"><div class="vwWrap"><div class="vwHead"><span>Featured Video Portfolio</span><h2 id="watch-video">${VIDEO_TITLE}</h2><p>${VIDEO_DESCRIPTION}</p></div><div class="vwPlayer"><video controls playsinline preload="metadata" poster="${THUMB_PATH}" aria-label="${VIDEO_TITLE}"><source src="${VIDEO_PATH}" type="video/mp4">Your browser does not support embedded video. <a href="${VIDEO_PATH}">Watch the video file</a>.</video></div><div class="vwMeta"><strong>What this video shows:</strong> our project process across requirements, budget, video editing demo approval and final delivery. The video is hosted directly on this website so search engines can access the media file and thumbnail.</div><div class="vwLinks"><a href="${VIDEO_PATH}">Open Video File</a><a class="alt" href="/#contact">Discuss a Video Project</a></div></div></section>
<section class="spSection soft"><div class="spWrap"><div class="spTitle"><h2>Video Editing Services</h2><p>Professional editing for brand content, social media and promotional campaigns.</p></div><div class="nds-video-grid"><article class="spCard"><strong>Reels & Short-Form Video</strong><p>Fast-paced vertical edits for Instagram, Facebook and short-form social content.</p></article><article class="spCard"><strong>Motion Graphics</strong><p>Animated text, graphic movement, branded transitions and visual effects that support the message.</p></article><article class="spCard"><strong>Promotional Videos</strong><p>Business and service promotion edits with clear pacing, branding and calls to action.</p></article><article class="spCard"><strong>Podcast Video Editing</strong><p>Clean cuts, captions, pacing, branded framing and social-ready delivery.</p></article><article class="spCard"><strong>Social Media Ads</strong><p>Video creatives structured for attention, product or service messaging and campaign use.</p></article><article class="spCard"><strong>Logo & Brand Animation</strong><p>Animated brand elements, logo reveals and motion assets for video intros and outros.</p></article></div></div></section>
<section class="spSection"><div class="spWrap"><div class="spTitle"><h2>Our Video Editing Process</h2></div><div class="spSteps"><div class="spStep"><b>01</b><strong>Requirements & Budget</strong><p>We first understand the project, audience, style and budget.</p></div><div class="spStep"><b>02</b><strong>Demo Direction</strong><p>When appropriate, we prepare a short sample from part of the footage.</p></div><div class="spStep"><b>03</b><strong>Client Approval</strong><p>You review the demo direction and confirm the editing style.</p></div><div class="spStep"><b>04</b><strong>Full Edit</strong><p>We complete the main edit based on the approved direction.</p></div><div class="spStep"><b>05</b><strong>Final Delivery</strong><p>We prepare the final files in the agreed format and dimensions.</p></div></div></div></section>
<section class="spSection soft"><div class="spWrap spFaq"><div class="spTitle"><h2>Video Editing FAQ</h2><p>Quick answers for search engines, AI assistants and clients.</p></div><div class="spFaqItem"><h3>Does Neloy Digital Solutions provide professional video editing?</h3><p>Yes. Neloy Digital Solutions provides reels, promotional video editing, motion graphics, podcast editing, social media video and branded video content.</p></div><div class="spFaqItem"><h3>Can clients review a demo before the full video is edited?</h3><p>For suitable projects, we can prepare a short demo from a small section of the footage so the client can confirm the editing direction before the full edit continues.</p></div><div class="spFaqItem"><h3>Can you edit videos for Facebook and Instagram?</h3><p>Yes. We can prepare vertical reels, promotional videos and social media edits based on the required platform dimensions and project scope.</p></div><div class="spFaqItem"><h3>Where can I see more video editing work?</h3><p>Visit the <a href="/showcase">Neloy Digital Solutions portfolio</a> for additional creative and video projects.</p></div></div></section>
<section class="spCta"><div class="spWrap"><h2>Have a Video Project in Mind?</h2><p>Tell us what you want to create, your preferred editing style and your project requirements.</p><a class="spBtn" href="/#contact">Start a Video Project</a><a class="nds-video-home-link" href="/logo-design" style="color:#fff">Explore Logo Design</a></div></section>
</main>`;
}

function schema(origin){
  const page=`${origin}${PAGE_PATH}`;
  const video=`${origin}/showcase-media/neloy-project-process.mp4?v=3`;
  const thumb=`${origin}/showcase-media/neloy-project-process-thumbnail.jpg?v=3`;
  return {
    "@context":"https://schema.org",
    "@graph":[
      {"@type":"VideoObject","@id":`${page}#video`,name:VIDEO_TITLE,description:VIDEO_DESCRIPTION,thumbnailUrl:[thumb],uploadDate:UPLOAD_DATE,contentUrl:video,url:page,publisher:{"@type":"Organization",name:"Neloy Digital Solutions",url:`${origin}/`}},
      {"@type":"Service","@id":`${page}#service`,name:"Video Editing & Motion Graphics Services",serviceType:["Video Editing","Reels Editing","Motion Graphics","Promotional Video Editing","Podcast Video Editing","Social Media Video Editing","Logo Animation"],description:DESCRIPTION,url:page,provider:{"@type":"Organization",name:"Neloy Digital Solutions",url:`${origin}/`}},
      {"@type":"FAQPage","@id":`${page}#faq`,mainEntity:[
        {"@type":"Question",name:"Does Neloy Digital Solutions provide professional video editing?",acceptedAnswer:{"@type":"Answer",text:"Yes. Neloy Digital Solutions provides reels, promotional video editing, motion graphics, podcast editing, social media video and branded video content."}},
        {"@type":"Question",name:"Can clients review a demo before the full video is edited?",acceptedAnswer:{"@type":"Answer",text:"For suitable projects, Neloy Digital Solutions can prepare a short demo from part of the footage so the client can confirm the editing direction before the full edit continues."}},
        {"@type":"Question",name:"Can you edit videos for Facebook and Instagram?",acceptedAnswer:{"@type":"Answer",text:"Yes. Vertical reels, promotional videos and social media edits can be prepared around the required platform dimensions and agreed project scope."}}
      ]}
    ]
  };
}

function enhanceVideoHtml(html,origin){
  html=html.replace(/<script\b[^>]*id=["']nds-website-service-schema["'][^>]*>[\s\S]*?<\/script>\s*/i,"");
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${TITLE}</title>`);
  html=replaceMetaName(html,"description",DESCRIPTION);
  html=replaceMetaName(html,"robots","index,follow,max-image-preview:large,max-video-preview:-1,max-snippet:-1");
  html=replaceMetaProperty(html,"og:title",TITLE);
  html=replaceMetaProperty(html,"og:description",DESCRIPTION);
  html=replaceMetaProperty(html,"og:type","video.other");
  html=replaceMetaProperty(html,"og:url",`${origin}${PAGE_PATH}`);
  html=replaceMetaProperty(html,"og:image",`${origin}/showcase-media/neloy-project-process-thumbnail.jpg?v=3`);
  html=replaceMetaProperty(html,"og:video",`${origin}/showcase-media/neloy-project-process.mp4?v=3`);
  html=replaceMetaProperty(html,"og:video:type","video/mp4");
  html=replaceMetaName(html,"twitter:card","summary_large_image");
  const canonical=`<link rel="canonical" href="${origin}${PAGE_PATH}">`;
  const canRe=/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/i;
  html=canRe.test(html)?html.replace(canRe,canonical):html.replace(/<\/head>/i,`${canonical}\n</head>`);
  if(!html.includes('id="nds-video-page-style"')) html=html.replace(/<\/head>/i,`${STYLE}\n</head>`);
  const json=JSON.stringify(schema(origin)).replace(/</g,"\\u003c");
  html=html.replace(/<\/head>/i,`<script id="nds-video-aeo-schema" type="application/ld+json">${json}</script>\n</head>`);
  html=html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/i,videoPage(origin));
  return html;
}

function addInternalVideoLink(html,path){
  if(path===PAGE_PATH||html.includes('href="/video-editing"')) return html;
  const offer='<article class="offerCard"><b>Video Editing</b><h3>Short demo before full editing</h3><p>We first prepare a short demo from a small part of the project. After you approve the style, we proceed with the main edit.</p></article>';
  if(html.includes(offer)) html=html.replace(offer,offer.replace('</article>','<a href="/video-editing">Explore Video Editing →</a></article>'));
  if((path==='/'||path==='')&&html.includes('id="nds-feature-video"')){
    html=html.replace(/(<section id="nds-feature-video"[\s\S]*?)(<\/section>)/i,'$1<div style="text-align:center;margin-top:18px"><a href="/video-editing" style="color:#075DFF;font-weight:900;text-decoration:none">Explore Video Editing, Reels & Motion Graphics →</a></div>$2');
  }
  return html;
}

function addVideoToSitemap(xml,origin){
  if(xml.includes(`${origin}${PAGE_PATH}`)) return xml;
  if(!/<urlset\b/i.test(xml)||!/<\/urlset>/i.test(xml)) return xml;
  if(!/xmlns:video=/i.test(xml)) xml=xml.replace(/<urlset\b([^>]*)>/i,'<urlset$1 xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">');
  const page=escapeXml(`${origin}${PAGE_PATH}`);
  const thumb=escapeXml(`${origin}/showcase-media/neloy-project-process-thumbnail.jpg?v=3`);
  const video=escapeXml(`${origin}/showcase-media/neloy-project-process.mp4?v=3`);
  const entry=`\n  <url>\n    <loc>${page}</loc>\n    <lastmod>2026-09-16</lastmod>\n    <video:video>\n      <video:thumbnail_loc>${thumb}</video:thumbnail_loc>\n      <video:title>${escapeXml(VIDEO_TITLE)}</video:title>\n      <video:description>${escapeXml(VIDEO_DESCRIPTION)}</video:description>\n      <video:content_loc>${video}</video:content_loc>\n      <video:publication_date>${UPLOAD_DATE}</video:publication_date>\n    </video:video>\n  </url>\n`;
  return xml.replace(/<\/urlset>/i,entry+'</urlset>');
}

async function templateForVideo(request,env,ctx){
  const url=new URL(request.url);url.pathname="/website-design";url.search="";
  const templateReq=new Request(url.toString(),{method:"GET",headers:request.headers});
  const response=await app.fetch(templateReq,env,ctx);
  const type=(response.headers.get("content-type")||"").toLowerCase();
  if(!response.ok||!type.includes("text/html")) return response;
  const html=enhanceVideoHtml(await response.text(),new URL(request.url).origin);
  const headers=new Headers(response.headers);headers.delete("content-length");headers.delete("etag");headers.set("content-type","text/html; charset=utf-8");headers.set("cache-control","no-store");
  return new Response(html,{status:200,headers});
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);const path=url.pathname.replace(/\/$/,"")||"/";
    if(request.method==="GET"&&path===PAGE_PATH) return templateForVideo(request,env,ctx);

    const response=await app.fetch(request,env,ctx);

    if(request.method==="GET"&&path==="/sitemap.xml"&&response.ok){
      const type=(response.headers.get("content-type")||"").toLowerCase();
      if(type.includes("xml")||type.includes("text/plain")){
        const xml=addVideoToSitemap(await response.text(),url.origin);
        const headers=new Headers(response.headers);headers.delete("content-length");headers.delete("etag");headers.set("content-type","application/xml; charset=utf-8");headers.set("cache-control","no-store");
        return new Response(xml,{status:response.status,statusText:response.statusText,headers});
      }
    }

    const type=(response.headers.get("content-type")||"").toLowerCase();
    if(request.method!=="GET"||!response.ok||!type.includes("text/html")||path.startsWith("/admin")) return response;
    const html=addInternalVideoLink(await response.text(),path);
    const headers=new Headers(response.headers);headers.delete("content-length");headers.delete("etag");headers.set("cache-control","no-store");
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
};
