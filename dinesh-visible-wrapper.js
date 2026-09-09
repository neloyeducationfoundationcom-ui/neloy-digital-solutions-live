import currentWorker from "./security-hardening-wrapper.js";
import dineshWorker from "./dinesh-testimonial-wrapper.js";

const STYLE = `<style id="dinesh-visible-style">
#dinesh-testimonial-fixed{margin-top:28px!important;display:grid!important;grid-template-columns:180px 1fr;gap:24px;align-items:center;background:#fff;border:1px solid #C9E8F7;border-radius:24px;padding:24px;box-shadow:0 16px 38px rgba(7,93,255,.09);opacity:1!important;visibility:visible!important;transform:none!important}
#dinesh-testimonial-fixed img{width:160px;height:160px;object-fit:cover;border-radius:20px;border:4px solid #fff;box-shadow:0 12px 28px rgba(10,42,90,.16)}
#dinesh-testimonial-fixed .stars{font-size:25px;letter-spacing:3px;color:#F4B400;font-weight:900}
#dinesh-testimonial-fixed .score{display:inline-block;margin-left:10px;padding:6px 10px;border-radius:999px;background:#F3FAFF;border:1px solid #C9E8F7;color:#075DFF;font-size:13px;font-weight:900}
#dinesh-testimonial-fixed .quote{margin:14px 0 0;color:#496A89;font-size:16px;line-height:1.7;font-style:italic}
#dinesh-testimonial-fixed .name{margin-top:15px;color:#0A2A5A;font-size:20px;font-weight:1000}
#dinesh-testimonial-fixed .role{display:block;margin-top:2px;color:#6B86A0;font-size:13px;font-weight:800}
@media(max-width:760px){#dinesh-testimonial-fixed{grid-template-columns:1fr;padding:20px}#dinesh-testimonial-fixed img{width:140px;height:140px}}
</style>`;

async function getPhoto(request, env, ctx){
  try{
    const u = new URL(request.url); u.pathname = "/"; u.search = "";
    const r = await dineshWorker.fetch(new Request(u.toString(), {method:"GET", headers:request.headers}), env, ctx);
    if(!(r.headers.get("content-type")||"").includes("text/html")) return "";
    const html = await r.text();

    // First try the exact Dinesh image markup.
    let m = html.match(/<img[^>]*class=["']dineshPhoto["'][^>]*src=["']([^"']+)["'][^>]*>/i)
      || html.match(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']Dinesh De Silva["'][^>]*>/i)
      || html.match(/<img[^>]*alt=["']Dinesh De Silva["'][^>]*src=["']([^"']+)["'][^>]*>/i);
    if(m && m[1]) return m[1];

    // Robust fallback: find the embedded data image nearest to Dinesh's name.
    const nameIndex = html.indexOf("Dinesh De Silva");
    if(nameIndex !== -1){
      const before = html.slice(Math.max(0, nameIndex - 30000), nameIndex);
      const dataIndex = Math.max(before.lastIndexOf("data:image/jpeg;base64,"), before.lastIndexOf("data:image/png;base64,"), before.lastIndexOf("data:image/webp;base64,"));
      if(dataIndex !== -1){
        const candidate = before.slice(dataIndex).match(/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+/i);
        if(candidate) return candidate[0];
      }
    }

    return "";
  }catch{return "";}
}

function addDinesh(html, photo){
  if(!html.includes('<section id="testimonials"')) return html;
  html = html.replace(/<div id=["']dinesh-testimonial-fixed["'][\s\S]*?<\/div>\s*<\/div>/i, "");
  const photoHtml = photo ? `<img src="${photo}" alt="Dinesh De Silva">` : `<div style="width:140px;height:140px;border-radius:20px;background:#EDF8FF;display:grid;place-items:center;color:#075DFF;font-size:34px;font-weight:1000">DD</div>`;
  const card = `<div id="dinesh-testimonial-fixed">${photoHtml}<div><div><span class="stars">★★★★★</span><span class="score">5.0 / 5</span></div><p class="quote">“I had a great experience working with Neloy and his team on my graphic design project. They completed the work on time, communicated professionally, and delivered excellent-quality results. I’m very satisfied with their service and would gladly recommend Neloy and his team to anyone looking for reliable and professional graphic design services. Their service was excellent from start to finish.”</p><div class="name">Dinesh De Silva<span class="role">Client Testimonial • Graphic Design Project</span></div></div></div>`;
  const start = html.indexOf('<section id="testimonials"');
  const end = html.indexOf('</section>', start);
  if(end === -1) return html;
  html = html.slice(0,end) + card + html.slice(end);
  if(!html.includes('id="dinesh-visible-style"')) html = html.replace('</head>', STYLE + '</head>');
  html = html.replace(/2 client testimonials\s*•\s*10 stars displayed/gi, '3 client testimonials • 15 stars displayed');
  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    const type = response.headers.get("content-type") || "";
    if(request.method === "GET" && type.includes("text/html") && (url.pathname === "/showcase" || url.pathname === "/showcase/" || url.pathname === "/portfolio" || url.pathname === "/portfolio/")){
      const html = await response.text();
      const photo = await getPhoto(request, env, ctx);
      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=utf-8");
      headers.set("cache-control", "no-store");
      return new Response(addDinesh(html, photo), {status:response.status, statusText:response.statusText, headers});
    }
    return response;
  }
};
