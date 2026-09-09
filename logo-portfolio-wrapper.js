import currentWorker from "./dinesh-visible-wrapper.js";

const STYLE = `<style id="logo-portfolio-style">
#logo-projects{padding:72px 0 30px}.logoProjectsHead{text-align:center;margin-bottom:28px}.logoProjectsHead .eyebrow{display:inline-block;padding:7px 12px;border-radius:999px;background:#eef7ff;color:#075dff;font-weight:900;font-size:13px;letter-spacing:.04em;text-transform:uppercase}.logoProjectsHead h2{margin:12px 0 8px;color:#0a2a5a;font-size:clamp(30px,5vw,48px)}.logoProjectsHead p{max-width:720px;margin:0 auto;color:#607d98;line-height:1.7}.logoProjectGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.logoProjectCard{overflow:hidden;background:#fff;border:1px solid #d9ebf7;border-radius:22px;box-shadow:0 16px 36px rgba(10,42,90,.08)}.logoProjectCard img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#fff}.logoProjectBody{padding:18px 20px 20px}.logoProjectBody span{font-size:12px;font-weight:900;color:#075dff;text-transform:uppercase;letter-spacing:.05em}.logoProjectBody h3{margin:6px 0 0;color:#0a2a5a;font-size:21px}.logoProjectBody p{margin:7px 0 0;color:#607d98;line-height:1.6;font-size:14px}@media(max-width:760px){.logoProjectGrid{grid-template-columns:1fr}#logo-projects{padding-top:50px}}
</style>`;

function addLogoProjects(html){
  if(html.includes('id="logo-projects"')) return html;
  const section = `<section id="logo-projects" class="section"><div class="container"><div class="logoProjectsHead"><span class="eyebrow">Logo Design Portfolio</span><h2>Selected Logo Projects</h2><p>A selection of custom logo concepts created for advertising, landscaping, cabinetry and community brands.</p></div><div class="logoProjectGrid"><article class="logoProjectCard"><img src="/portfolio/simplicity-in-advertising.jpg" alt="Simplicity in Advertising logo design"><div class="logoProjectBody"><span>Logo Design</span><h3>Simplicity in Advertising</h3><p>Technology-inspired advertising identity with a bold yellow and navy visual system.</p></div></article><article class="logoProjectCard"><img src="/portfolio/solid-landscape-design.jpg" alt="Solid Landscape Design logo concepts"><div class="logoProjectBody"><span>Logo Design</span><h3>Solid Landscape Design</h3><p>Nature-focused landscape logo concepts combining greenery, trees and irrigation details.</p></div></article><article class="logoProjectCard"><img src="/portfolio/njr-cabinets.jpg" alt="NJR Cabinets logo concepts"><div class="logoProjectBody"><span>Logo Design</span><h3>NJR Cabinets</h3><p>Residential cabinetry branding using a clean roof-and-home symbol with a strong red and black palette.</p></div></article><article class="logoProjectCard"><img src="/portfolio/womens-club-menifee.jpg" alt="Women's Club of Menifee logo concepts"><div class="logoProjectBody"><span>Logo Design</span><h3>Women's Club of Menifee</h3><p>Elegant butterfly-inspired concepts centered on empowerment, community and feminine identity.</p></div></article></div></div></section>`;
  const workStart = html.indexOf('<section id="work"');
  if(workStart === -1) return html;
  const workEnd = html.indexOf('</section>', workStart);
  if(workEnd === -1) return html;
  html = html.slice(0, workEnd + 10) + section + html.slice(workEnd + 10);
  if(!html.includes('id="logo-portfolio-style"')) html = html.replace('</head>', STYLE + '</head>');
  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    const type = response.headers.get("content-type") || "";
    if(request.method === "GET" && type.includes("text/html") && (url.pathname === "/showcase" || url.pathname === "/showcase/" || url.pathname === "/portfolio" || url.pathname === "/portfolio/")){
      const html = await response.text();
      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=utf-8");
      headers.set("cache-control", "no-store");
      return new Response(addLogoProjects(html), {status:response.status, statusText:response.statusText, headers});
    }
    return response;
  }
};