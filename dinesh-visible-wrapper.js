import currentWorker from "./security-hardening-wrapper.js";

const DINESH_PHOTO = "data:image/jpeg;base64,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";

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

function addDinesh(html){
  if(!html.includes('<section id="testimonials"')) return html;

  const card = `<div id="dinesh-testimonial-fixed"><img src="${DINESH_PHOTO}" alt="Dinesh De Silva"><div><div><span class="stars">★★★★★</span><span class="score">5.0 / 5</span></div><p class="quote">“I had a great experience working with Neloy and his team on my graphic design project. They completed the work on time, communicated professionally, and delivered excellent-quality results. I’m very satisfied with their service and would gladly recommend Neloy and his team to anyone looking for reliable and professional graphic design services. Their service was excellent from start to finish.”</p><div class="name">Dinesh De Silva<span class="role">Client Testimonial • Graphic Design Project</span></div></div></div>`;

  const start = html.indexOf('<section id="testimonials"');
  const end = html.indexOf('</section>', start);
  if(end === -1) return html;

  // Replace the current fixed Dinesh card if it exists; otherwise append it once.
  const oldStart = html.indexOf('<div id="dinesh-testimonial-fixed"', start);
  if(oldStart !== -1 && oldStart < end){
    const oldEndMarker = '</div></div></div>';
    const oldEnd = html.indexOf(oldEndMarker, oldStart);
    if(oldEnd !== -1){
      html = html.slice(0, oldStart) + card + html.slice(oldEnd + oldEndMarker.length);
    }
  } else {
    html = html.slice(0, end) + card + html.slice(end);
  }

  if(!html.includes('id="dinesh-visible-style"')) html = html.replace('</head>', STYLE + '</head>');
  html = html.replace(/2 client testimonials\s*•\s*10 stars displayed/gi, '3 client testimonials • 15 stars displayed');
  return html;
}


function addVolusiaProject(html) {
  if (html.includes('id="volusia-info-project"')) return html;
  const card = `<article class="workCard" id="volusia-info-project"><div class="workBody"><span class="tag">Web Design</span><h3>Volusia Info</h3><p class="projectIntro">A local information website featuring business guides, services, events and lifestyle articles for Volusia County, Florida.</p><a class="showcaseLink" href="https://volusiainfo.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Volusia Info website (opens in a new tab)">Visit Website ↗</a></div></article>`;
  const workStart = html.indexOf('<section id="work"');
  if (workStart === -1) return html;
  const workEnd = html.indexOf('</section>', workStart);
  if (workEnd === -1) return html;
  const section = html.slice(workStart, workEnd);
  if (!section.includes('<div class="workGrid">')) return html;
  const updated = section.replace('<div class="workGrid">', '<div class="workGrid">' + card);
  html = html.slice(0, workStart) + updated + html.slice(workEnd);
  const style = `<style id="volusia-project-style">#work #volusia-info-project{margin-bottom:24px!important}#work #volusia-info-project .tag{font-size:14px!important}#work #volusia-info-project .showcaseLink{font-size:16px}#work #volusia-info-project .showcaseLink:focus-visible{outline:3px solid #0A2A5A;outline-offset:4px}</style>`;
  return html.replace('</head>', style + '</head>');
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
      return new Response(addVolusiaProject(addDinesh(html)), {status:response.status, statusText:response.statusText, headers});
    }

    return response;
  }
};
