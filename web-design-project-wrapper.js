import currentWorker from "./facebook-social-wrapper.js";

const NDUB_URL = "https://ndubbrand.com/";
const NDUB_SCREENSHOT = "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fndubbrand.com%2F?w=1200";

const STYLE = `<style id="ndub-web-project-style">
#web-design-projects{padding:72px 0 42px}
#web-design-projects .web-project-heading{max-width:760px;margin:0 auto 30px;text-align:center}
#web-design-projects .web-project-heading .eyebrow{display:inline-block;margin-bottom:8px;font-size:13px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#075DFF}
#web-design-projects .web-project-heading h2{margin:0;color:#0A2A5A;font-size:clamp(30px,4vw,46px);line-height:1.08}
#web-design-projects .web-project-heading p{margin:12px auto 0;color:#5D7893;font-size:16px;line-height:1.65}
#web-design-projects .web-project-card{overflow:hidden;max-width:980px;margin:30px auto 0;background:#fff;border:1px solid #D9ECF8;border-radius:22px;box-shadow:0 14px 34px rgba(10,42,90,.08)}
#web-design-projects .web-project-image{display:block;background:#fff;text-decoration:none}
#web-design-projects .web-project-image img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;object-position:top center;background:#fff}
#web-design-projects .web-project-meta{padding:20px 22px 24px;border-top:1px solid #EDF5FA}
#web-design-projects .web-project-meta span{font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#075DFF}
#web-design-projects .web-project-meta h3{margin:7px 0 8px;color:#0A2A5A;font-size:24px;line-height:1.25}
#web-design-projects .web-project-meta p{margin:0 0 14px;color:#5D7893;line-height:1.6}
#web-design-projects .web-project-link{display:inline-flex;align-items:center;gap:7px;font-weight:850;color:#075DFF;text-decoration:none}
@media(max-width:760px){#web-design-projects{padding-top:52px}#web-design-projects .web-project-meta{padding:17px 18px 20px}}
</style>`;

function addWebProject(html){
  if(html.includes('id="web-design-projects"')) return html;
  const marker = '<section id="logo-design-projects"';
  const pos = html.indexOf(marker);
  const section = `<section id="web-design-projects"><div class="container"><div class="web-project-heading"><span class="eyebrow">Selected Client Work</span><h2>Web Design Project</h2><p>A featured business website project from the Neloy Digital Solutions portfolio.</p></div><article class="web-project-card"><a class="web-project-image" href="${NDUB_URL}" target="_blank" rel="noopener noreferrer" aria-label="Open NDUB Brand website"><img src="${NDUB_SCREENSHOT}" alt="NDUB Brand marketing agency website design project" loading="lazy" decoding="async"></a><div class="web-project-meta"><span>Web Design</span><h3>NDUB Brand – Marketing Agency Website</h3><p>Marketing agency website project focused on clear service presentation, lead generation, brand positioning and conversion-focused content.</p><a class="web-project-link" href="${NDUB_URL}" target="_blank" rel="noopener noreferrer">View Live Website →</a></div></article></div></section>`;
  html = pos !== -1 ? html.slice(0,pos) + section + html.slice(pos) : html.replace('</main>', section + '</main>');
  if(!html.includes('id="ndub-web-project-style"') && html.includes('</head>')) html = html.replace('</head>', STYLE + '</head>');
  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    const type = response.headers.get("content-type") || "";
    const portfolio = url.pathname === "/showcase" || url.pathname === "/showcase/" || url.pathname === "/portfolio" || url.pathname === "/portfolio/";
    if(request.method === "GET" && type.includes("text/html") && portfolio){
      const html = await response.text();
      const headers = new Headers(response.headers);
      headers.set("content-type","text/html; charset=utf-8");
      headers.set("cache-control","no-store");
      return new Response(addWebProject(html), {status:response.status,statusText:response.statusText,headers});
    }
    return response;
  }
};
