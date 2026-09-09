import currentWorker from "./project-showcase-wrapper.js";

const EXTRA_STYLE = `
<style id="project-visibility-fix">
#work{padding-top:64px!important;padding-bottom:72px!important}
#work .sectionHead{max-width:760px!important;margin-bottom:24px!important}
#work .sectionHead .eyebrow{display:inline-block!important;margin-bottom:8px!important}
#work .sectionHead h2{font-size:clamp(34px,7vw,50px)!important;line-height:1.08!important;margin:8px 0 12px!important}
#work .sectionHead p{font-size:17px!important;line-height:1.6!important;margin:0!important}
#work .workGrid{display:block!important;max-width:820px!important;margin:0 auto!important}
#work .workCard{display:block!important;width:100%!important;background:#fffef9!important;border:1px solid #e0cfaa!important;border-radius:24px!important;overflow:hidden!important;box-shadow:0 16px 38px rgba(87,57,80,.10)!important}
#work .projectVisual{height:auto!important;min-height:0!important;background:#fff!important;padding:0!important;display:block!important;overflow:visible!important}
#work .projectVisual img{display:block!important;width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;object-position:center!important;background:#fff!important;padding:14px!important}
#work .workBody{padding:24px!important}
#work .workBody h3{font-size:30px!important;line-height:1.15!important;margin:14px 0 10px!important}
#work .projectIntro{font-size:16px!important;line-height:1.65!important;margin:0 0 16px!important;color:#665661!important}
#work .projectDetails{display:grid!important;grid-template-columns:1fr 1fr!important;gap:12px!important;margin:16px 0!important}
#work .projectDetail{background:#fff7e7!important;border:1px solid #e0cfaa!important;border-radius:14px!important;padding:14px!important}
#work .projectDetail b{display:block!important;margin-bottom:4px!important;color:#4e2a49!important}
#work .projectDetail span{font-size:14px!important;line-height:1.5!important;color:#786a75!important}
#work .projectResult{margin-top:14px!important;background:#f4ebf2!important;border-left:4px solid #63385d!important;border-radius:12px!important;padding:14px 15px!important;line-height:1.55!important}
#work .completedBadge{display:inline-flex!important;align-items:center!important;margin-left:6px!important;padding:6px 9px!important;border-radius:999px!important;background:#e9f7ec!important;color:#2f7444!important;font-size:11px!important;font-weight:900!important}
#work .portfolioNote{margin:16px 0 0!important;text-align:center!important;color:#786a75!important;font-size:13px!important}
@media(max-width:700px){
  #work{padding-top:48px!important;padding-bottom:58px!important}
  #work .sectionHead{margin-bottom:18px!important}
  #work .sectionHead h2{font-size:38px!important}
  #work .workCard{border-radius:20px!important}
  #work .projectVisual img{padding:8px!important}
  #work .workBody{padding:18px!important}
  #work .workBody h3{font-size:26px!important}
  #work .projectDetails{grid-template-columns:1fr!important}
  .floatWa,.floatAi{width:46px!important;height:46px!important;right:8px!important;opacity:.9!important}
  .floatWa{bottom:64px!important;font-size:14px!important}
  .floatAi{bottom:10px!important;font-size:13px!important}
}
</style>`;

function rebuildWorkSection(html){
  const imageMatch = html.match(/<img[^>]+src="([^"]+)"[^>]+alt="Majority Academy logo design project"/i);
  const image = imageMatch?.[1] || "";
  if (!image) return html;

  const section = `<section id="work" class="work"><div class="wrap"><div class="sectionHead"><span class="eyebrow">Completed Client Work</span><h2>Projects we have completed for clients</h2><p>See real examples of work delivered by Neloy Digital Solutions. Each project is shown clearly so potential clients can understand what we created and what was completed.</p></div><div class="workGrid"><article class="workCard"><div class="projectVisual"><img src="${image}" alt="Majority Academy logo design project"></div><div class="workBody"><span class="tag">Logo Design</span><span class="completedBadge">Completed Project</span><h3>Majority Academy</h3><p class="projectIntro">A completed logo and brand identity project created for Majority Academy. The design was developed to give the organisation a professional, recognisable and education-focused visual identity.</p><div class="projectDetails"><div class="projectDetail"><b>What we delivered</b><span>Custom logo design and visual brand direction.</span></div><div class="projectDetail"><b>Project focus</b><span>Clean education branding suitable for digital and promotional use.</span></div></div><div class="projectResult"><strong>Completed work:</strong> Final client-ready logo prepared as a polished brand asset.</div></div></article><p class="portfolioNote">More verified client projects will be added as our portfolio grows.</p></div></div></section>`;

  const re = /<section id="work" class="work">[\s\S]*?<\/section>(?=\s*<section class="partner">)/i;
  return re.test(html) ? html.replace(re, section) : html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    if(request.method === "GET" && url.pathname === "/"){
      const type = response.headers.get("content-type") || "";
      if(type.includes("text/html")){
        let html = rebuildWorkSection(await response.text());
        if(html.includes('</head>')) html = html.replace('</head>', EXTRA_STYLE + '</head>');
        const headers = new Headers(response.headers);
        headers.set('content-type','text/html; charset=utf-8');
        headers.set('cache-control','no-store');
        return new Response(html,{status:response.status,headers});
      }
    }
    return response;
  }
};
