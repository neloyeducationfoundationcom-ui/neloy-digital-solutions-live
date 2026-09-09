import currentWorker from "./majority-logo-wrapper.js";

const SHOWCASE_STYLE = `
<style id="project-showcase-style">
#work .sectionHead{max-width:820px}
#work .sectionHead h2{font-size:clamp(36px,4vw,54px)}
#work .sectionHead p{font-size:18px;max-width:760px}
#work .workGrid{grid-template-columns:minmax(0,820px)!important;justify-content:center!important;gap:22px!important}
#work .workCard{border-radius:26px!important;box-shadow:0 18px 46px rgba(87,57,80,.12)!important;overflow:hidden!important;background:#fffef9!important}
#work .projectVisual{height:360px!important;background:#fff!important}
#work .projectVisual img{object-fit:contain!important;background:#fff!important;padding:18px!important}
#work .workBody{padding:28px!important}
#work .tag{font-size:12px!important;padding:7px 11px!important}
#work .completedBadge{display:inline-flex;align-items:center;gap:7px;margin-left:8px;padding:7px 11px;border-radius:999px;background:#e9f7ec;color:#2f7444;font-size:12px;font-weight:900}
#work .completedBadge:before{content:"✓";font-weight:1000}
#work .workBody h3{font-size:32px!important;margin:15px 0 10px!important}
#work .projectIntro{font-size:17px!important;color:#665661!important;margin:0 0 18px!important}
#work .projectDetails{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}
#work .projectDetail{background:#fff7e7;border:1px solid #e0cfaa;border-radius:14px;padding:15px}
#work .projectDetail b{display:block;color:#4e2a49;margin-bottom:4px}
#work .projectDetail span{color:#786a75;font-size:14px}
#work .projectResult{background:#f4ebf2;border-left:4px solid #63385d;border-radius:12px;padding:15px 16px;color:#5d4a58}
#work .portfolioNote{text-align:center;color:#786a75;margin-top:18px;font-size:14px}
@media(max-width:700px){#work .projectVisual{height:260px!important}#work .workBody{padding:20px!important}#work .projectDetails{grid-template-columns:1fr}#work .workBody h3{font-size:27px!important}#work .completedBadge{margin-left:4px}}
</style>`;

function improveProjects(html){
  html = html.replace(
    '<span class="eyebrow">Projects</span><h2>Selected client work</h2><p>A growing showcase of design, branding and digital development projects.</p>',
    '<span class="eyebrow">Completed Client Work</span><h2>Projects we have completed for clients</h2><p>See real examples of work delivered by Neloy Digital Solutions. Each project is presented clearly so new clients can understand what was designed and completed.</p>'
  );

  html = html.replace(
    '<span class="tag">Logo Design</span><h3>Majority Academy</h3><p>Logo and brand identity project for Majority Academy.</p>',
    '<span class="tag">Logo Design</span><span class="completedBadge">Completed Project</span><h3>Majority Academy</h3><p class="projectIntro">A completed logo and brand identity project created for Majority Academy, designed to give the organisation a clear, professional and recognisable visual identity.</p><div class="projectDetails"><div class="projectDetail"><b>What we delivered</b><span>Custom logo design and visual brand direction.</span></div><div class="projectDetail"><b>Project focus</b><span>Professional education branding with a clean, memorable identity.</span></div></div><div class="projectResult"><strong>Completed work:</strong> Final logo concept prepared as a client-ready brand asset for digital and promotional use.</div>'
  );

  html = html.replace('<article class="workCard"><div class="projectVisual">WEB</div><div class="workBody"><span class="tag">Web Design</span><h3>Business Website Project</h3><p>Responsive website design focused on trust, clarity and conversions.</p></div></article>','');
  html = html.replace('<article class="workCard"><div class="projectVisual">AI</div><div class="workBody"><span class="tag">Automation</span><h3>Lead Support System</h3><p>Simple lead capture, admin tracking and customer response workflow.</p></div></article>','');

  if(html.includes('</section>') && !html.includes('More verified client projects will be added')){
    const marker = '</div></div></section>\n<section class="partner">';
    if(html.includes(marker)){
      html = html.replace(marker,'<p class="portfolioNote">More verified client projects will be added here as the portfolio grows.</p></div></div></section>\n<section class="partner">');
    }
  }
  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    if(request.method === "GET" && url.pathname === "/"){
      const type = response.headers.get("content-type") || "";
      if(type.includes("text/html")){
        let html = improveProjects(await response.text());
        if(html.includes('</head>')) html = html.replace('</head>', SHOWCASE_STYLE + '</head>');
        const headers = new Headers(response.headers);
        headers.set('content-type','text/html; charset=utf-8');
        headers.set('cache-control','no-store');
        return new Response(html,{status:response.status,headers});
      }
    }
    return response;
  }
};
