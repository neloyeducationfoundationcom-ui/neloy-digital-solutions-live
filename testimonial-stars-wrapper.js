import currentWorker from "./dinesh-testimonial-wrapper.js";

const STAR_STYLE = `
<style id="testimonial-star-style">
.reviewStars{display:flex;align-items:center;gap:9px;margin:8px 0 14px;flex-wrap:wrap}
.reviewStars .stars{font-size:23px;line-height:1;letter-spacing:2px;color:#F4B400;text-shadow:0 2px 8px rgba(244,180,0,.18)}
.reviewStars .ratingText{font-size:13px;font-weight:900;color:#496A89;background:#F3FAFF;border:1px solid #C9E8F7;border-radius:999px;padding:5px 9px}
.testimonialSummary{display:inline-flex;align-items:center;gap:8px;margin-top:8px;background:#F3FAFF;border:1px solid #C9E8F7;border-radius:999px;padding:7px 11px;color:#075DFF;font-size:13px;font-weight:900}
@media(max-width:700px){.reviewStars .stars{font-size:21px}.reviewStars{margin-top:6px}.testimonialSummary{font-size:12px}}
</style>`;

function addStars(html){
  html = html.replace(
    '<span class="eyebrow">Testimonials</span><h2>What clients say</h2>',
    '<span class="eyebrow">Testimonials</span><h2>What clients say</h2><div class="testimonialSummary">3 client testimonials • 15 stars displayed</div>'
  );

  html = html.replace(
    '<small>Owner of NDUB BRAND</small></div></div><p class="quote">',
    '<small>Owner of NDUB BRAND</small></div></div><div class="reviewStars" aria-label="5 out of 5 stars"><span class="stars">★★★★★</span><span class="ratingText">5.0 / 5</span></div><p class="quote">'
  );

  html = html.replace(
    '<small>Owner of Simplicity Advertising</small></div></div><p class="quote">',
    '<small>Owner of Simplicity Advertising</small></div></div><div class="reviewStars" aria-label="5 out of 5 stars"><span class="stars">★★★★★</span><span class="ratingText">5.0 / 5</span></div><p class="quote">'
  );

  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    if(request.method === "GET" && url.pathname === "/"){
      const type = response.headers.get("content-type") || "";
      if(type.includes("text/html")){
        let html = addStars(await response.text());
        if(html.includes('</head>')) html = html.replace('</head>', STAR_STYLE + '</head>');
        const headers = new Headers(response.headers);
        headers.set('content-type','text/html; charset=utf-8');
        headers.set('cache-control','no-store');
        return new Response(html,{status:response.status,headers});
      }
    }
    return response;
  }
};
