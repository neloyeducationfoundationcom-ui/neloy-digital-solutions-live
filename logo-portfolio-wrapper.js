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
const PROJECTS=[
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
  const cards=PROJECTS.map(([file,title])=>`<article class="logo-project-card"><a class="logo-project-image" href="${BASE}${file}" target="_blank" rel="noopener noreferrer" aria-label="Open ${title} logo project"><img src="${BASE}${file}?v=2" alt="${title} logo design project" loading="lazy" decoding="async"></a><div class="logo-project-meta"><span>Logo Design</span><h3>${title}</h3></div></article>`).join('');
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

export default{
  async fetch(request,env,ctx){
    const response=await currentWorker.fetch(request,env,ctx);
    const url=new URL(request.url);
    const type=response.headers.get("content-type")||"";

    if(request.method==="GET"&&type.includes("text/html")&&url.pathname==="/"){
      const html=await response.text();
      const headers=new Headers(response.headers);
      headers.set("content-type","text/html; charset=utf-8");
      headers.set("cache-control","no-store");
      return new Response(restoreRatings(html),{status:response.status,statusText:response.statusText,headers});
    }

    if(request.method==="GET"&&type.includes("text/html")&&(url.pathname==="/showcase"||url.pathname==="/showcase/"||url.pathname==="/portfolio"||url.pathname==="/portfolio/")){
      const html=await response.text();
      const headers=new Headers(response.headers);
      headers.set("content-type","text/html; charset=utf-8");
      headers.set("cache-control","no-store");
      return new Response(addLogoProjects(html),{status:response.status,statusText:response.statusText,headers});
    }
    return response;
  }
};