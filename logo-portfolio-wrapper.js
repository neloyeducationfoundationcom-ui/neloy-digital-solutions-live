import currentWorker from "./dinesh-visible-wrapper.js";

const STYLE=`<style id="logo-portfolio-style">
#logo-design-projects{padding:72px 0 42px}
#logo-design-projects .logo-project-heading{max-width:760px;margin:0 auto 30px;text-align:center}
#logo-design-projects .logo-project-heading .eyebrow{display:inline-block;margin-bottom:8px;font-size:13px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#075DFF}
#logo-design-projects .logo-project-heading h2{margin:0;color:#0A2A5A;font-size:clamp(30px,4vw,46px);line-height:1.08}
#logo-design-projects .logo-project-heading p{margin:12px auto 0;color:#5D7893;font-size:16px;line-height:1.65}
#logo-design-projects .logo-project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:26px;margin-top:30px}
#logo-design-projects .logo-project-card{overflow:hidden;background:#fff;border:1px solid #D9ECF8;border-radius:22px;box-shadow:0 14px 34px rgba(10,42,90,.08);transition:transform .2s ease,box-shadow .2s ease}
#logo-design-projects .logo-project-card:hover{transform:translateY(-3px);box-shadow:0 18px 42px rgba(10,42,90,.12)}
#logo-design-projects .logo-project-image{display:flex;width:100%;height:340px;align-items:center;justify-content:center;background:#fff;padding:22px;box-sizing:border-box;text-decoration:none}
#logo-design-projects .logo-project-image img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;background:#fff;border-radius:12px}
#logo-design-projects .logo-project-meta{padding:18px 20px 22px;border-top:1px solid #EDF5FA}
#logo-design-projects .logo-project-meta span{font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#075DFF}
#logo-design-projects .logo-project-meta h3{margin:7px 0 0;color:#0A2A5A;font-size:21px;line-height:1.25}
@media(max-width:900px){#logo-design-projects .logo-project-image{height:290px}}
@media(max-width:760px){#logo-design-projects{padding-top:52px}#logo-design-projects .logo-project-grid{grid-template-columns:1fr;gap:18px}#logo-design-projects .logo-project-image{height:280px;padding:16px}}
</style>`;

const REVIEW_STYLE=`<style id="testimonial-rating-restore-style">
.reviewStars{display:flex;align-items:center;gap:9px;margin:8px 0 14px;flex-wrap:wrap}
.reviewStars .stars{font-size:23px;line-height:1;letter-spacing:2px;color:#F4B400;text-shadow:0 2px 8px rgba(244,180,0,.18)}
.reviewStars .ratingText{font-size:13px;font-weight:900;color:#496A89;background:#F3FAFF;border:1px solid #C9E8F7;border-radius:999px;padding:5px 9px}
@media(max-width:700px){.reviewStars .stars{font-size:21px}.reviewStars{margin-top:6px}}
</style>`;

const BASE="https://raw.githubusercontent.com/neloyeducationfoundationcom-ui/neloy-digital-solutions-live/main/assets/logo-projects/";
const MAJORITY_URL="https://raw.githubusercontent.com/neloyeducationfoundationcom-ui/neloy-digital-solutions-live/main/assets/majority-media.webp";
const PROJECTS=[
  [MAJORITY_URL,"Majority Media"],
  ["simplicity-in-advertising.jpg","Simplicity in Advertising"],
  ["solid-landscape-design.jpg","SOLID Landscape Design"],
  ["njr-cabinets.jpg","NJR Cabinets"],
  ["womens-club-menifee.jpg","Women’s Club of Menifee"]
];

function addLogoProjects(html){
  if(html.includes('id="logo-design-projects"'))return html;
  const s=html.indexOf('<section id="work"');
  if(s===-1)return html;
  const e=html.indexOf('</section>',s);
  if(e===-1)return html;
  const cards=PROJECTS.map(([file,title])=>{const src=file.startsWith('http')?file:BASE+file;return `<article class="logo-project-card"><a class="logo-project-image" href="${src}" target="_blank" rel="noopener noreferrer" aria-label="Open ${title} logo project"><img src="${src}?v=3" alt="${title} logo design project" loading="lazy" decoding="async"></a><div class="logo-project-meta"><span>Logo Design</span><h3>${title}</h3></div></article>`}).join('');
  const section=`<section id="logo-design-projects"><div class="container"><div class="logo-project-heading"><span class="eyebrow">Selected Client Work</span><h2>Logo Design Projects</h2><p>A selection of logo and brand identity projects created for clients.</p></div><div class="logo-project-grid">${cards}</div></div></section>`;
  html=html.slice(0,e+10)+section+html.slice(e+10);
  if(!html.includes('id="logo-portfolio-style"'))html=html.replace('</head>',STYLE+'</head>');
  return html;
}

function restoreRatings(html){
  if(!html.includes('reviewStars')){
    html=html.replace(
      '<small>Owner of NDUB BRAND</small></div></div><p class="quote">',
      '<small>Owner of NDUB BRAND</small></div></div><div class="reviewStars" aria-label="5 out of 5 stars"><span class="stars">★★★★★</span><span class="ratingText">5.0 out of 5</span></div><p class="quote">'
    );
    html=html.replace(
      '<small>Owner of Simplicity Advertising</small></div></div><p class="quote">',
      '<small>Owner of Simplicity Advertising</small></div></div><div class="reviewStars" aria-label="5 out of 5 stars"><span class="stars">★★★★★</span><span class="ratingText">5.0 out of 5</span></div><p class="quote">'
    );
  }
  if(!html.includes('id="testimonial-rating-restore-style"'))html=html.replace('</head>',REVIEW_STYLE+'</head>');
  return html;
}

function seoConfig(pathname,origin){
  const portfolio=pathname==="/showcase"||pathname==="/showcase/"||pathname==="/portfolio"||pathname==="/portfolio/";
  return portfolio?{
    title:"Logo Design, Web Design & Digital Portfolio | Neloy Digital Solutions",
    description:"Explore selected logo design, branding, web design and digital projects by Neloy Digital Solutions for businesses and entrepreneurs.",
    canonical:origin+"/showcase"
  }:{
    title:"Neloy Digital Solutions | Logo Design, Web Design, Automation & Digital Services",
    description:"Neloy Digital Solutions provides professional logo design, web design, video editing, social media creative, coding, CRM and AI automation services for businesses.",
    canonical:origin+"/"
  };
}

function addSeo(html,url,env){
  if(html.includes('id="neloy-seo-meta"'))return html;
  const cfg=seoConfig(url.pathname,url.origin);
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${cfg.title}</title>`);
  if(/<meta\s+name=["']description["'][^>]*>/i.test(html)){
    html=html.replace(/<meta\s+name=["']description["'][^>]*>/i,`<meta name="description" content="${cfg.description}">`);
  }
  const schema=JSON.stringify({
    "@context":"https://schema.org",
    "@type":"ProfessionalService",
    "name":"Neloy Digital Solutions",
    "url":url.origin,
    "description":"Professional logo design, web design, video editing, social media creative, coding, CRM and AI automation services.",
    "areaServed":"Worldwide",
    "serviceType":["Logo Design","Brand Identity","Web Design","Video Editing","Social Media Design","Coding","CRM Software","AI Automation"]
  }).replace(/</g,"\\u003c");
  const meta=`<meta id="neloy-seo-meta" name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${cfg.canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Neloy Digital Solutions">
<meta property="og:title" content="${cfg.title}">
<meta property="og:description" content="${cfg.description}">
<meta property="og:url" content="${cfg.canonical}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${cfg.title}">
<meta name="twitter:description" content="${cfg.description}">
<script type="application/ld+json">${schema}</script>`;
  let pixel="";
  const pixelId=env&&env.META_PIXEL_ID?String(env.META_PIXEL_ID).replace(/[^0-9]/g,""):"";
  if(pixelId){
    pixel=`<script id="meta-pixel">!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');</script><noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"></noscript>`;
  }
  return html.replace('</head>',meta+pixel+'</head>');
}

function robots(origin){
  return `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;
}

function sitemap(origin){
  const urls=[origin+"/",origin+"/showcase"];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`<url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${u.endsWith('/showcase')?'0.8':'1.0'}</priority></url>`).join('')}</urlset>`;
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(request.method==="GET"&&url.pathname==="/robots.txt")return new Response(robots(url.origin),{headers:{"content-type":"text/plain; charset=utf-8","cache-control":"public, max-age=3600"}});
    if(request.method==="GET"&&url.pathname==="/sitemap.xml")return new Response(sitemap(url.origin),{headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public, max-age=3600"}});

    const response=await currentWorker.fetch(request,env,ctx);
    const type=response.headers.get("content-type")||"";

    if(request.method==="GET"&&type.includes("text/html")&&url.pathname==="/"){
      const html=addSeo(restoreRatings(await response.text()),url,env);
      const headers=new Headers(response.headers);
      headers.set("content-type","text/html; charset=utf-8");
      headers.set("cache-control","no-store");
      return new Response(html,{status:response.status,statusText:response.statusText,headers});
    }

    if(request.method==="GET"&&type.includes("text/html")&&(url.pathname==="/showcase"||url.pathname==="/showcase/"||url.pathname==="/portfolio"||url.pathname==="/portfolio/")){
      const html=addSeo(restoreRatings(addLogoProjects(await response.text())),url,env);
      const headers=new Headers(response.headers);
      headers.set("content-type","text/html; charset=utf-8");
      headers.set("cache-control","no-store");
      return new Response(html,{status:response.status,statusText:response.statusText,headers});
    }
    return response;
  }
};