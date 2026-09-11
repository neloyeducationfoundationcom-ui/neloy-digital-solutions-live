import currentWorker from "./terms-page-wrapper.js";
import EL_PATRON_IMAGE from "./el-patron-marketing-image.js";

const EL_PATRON_STYLE = `
<style id="el-patron-testimonial-style">
#el-patron-marketing-testimonial{display:block!important;visibility:visible!important;opacity:1!important;background:#fff!important;border:1px solid #c9e8f7!important;border-radius:22px!important;padding:24px!important;text-align:center!important;box-shadow:0 14px 36px rgba(7,93,255,.10)!important}
#el-patron-marketing-testimonial img{width:112px!important;height:112px!important;object-fit:cover!important;border-radius:20px!important;border:2px solid #29dfff!important;display:block!important;margin:0 auto 14px!important;background:#fff!important}
#el-patron-marketing-testimonial h3{margin:0 0 4px!important;color:#0a2a5a!important;font-size:24px!important}
#el-patron-marketing-testimonial .clientRole{color:#60758c!important;font-size:14px!important;font-weight:800!important;margin-bottom:10px!important}
#el-patron-marketing-testimonial .reviewStars{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;flex-wrap:wrap!important;margin:8px 0 14px!important}
#el-patron-marketing-testimonial .stars{color:#f4b400!important;font-size:23px!important;letter-spacing:2px!important;line-height:1!important}
#el-patron-marketing-testimonial .ratingText{font-size:13px!important;font-weight:900!important;color:#496a89!important;background:#f3faff!important;border:1px solid #c9e8f7!important;border-radius:999px!important;padding:5px 9px!important}
#el-patron-marketing-testimonial .quote{font-size:16px!important;line-height:1.75!important;color:#5d7690!important;margin:0!important}
@media(max-width:700px){#el-patron-marketing-testimonial{padding:20px!important}#el-patron-marketing-testimonial img{width:96px!important;height:96px!important}#el-patron-marketing-testimonial .quote{font-size:15px!important}}
</style>`;

const EL_PATRON_CARD = `<article class="testCard" id="el-patron-marketing-testimonial">
  <img src="${EL_PATRON_IMAGE}" alt="El Patron Marketing logo">
  <h3>El Patron Marketing</h3>
  <div class="clientRole">Podcast Video Editing Client</div>
  <div class="reviewStars" aria-label="5 out of 5 stars"><span class="stars">★★★★★</span><span class="ratingText">5.0 / 5</span></div>
  <p class="quote">“We’ve worked with Neloy Digital Solutions on many of our podcast videos, and we’re very happy with the results. Their editing style, motion graphics, captions, and audio-synced text give our content a professional, premium look. They understand our style and consistently deliver quality work.”</p>
</article>`;

function removePortfolioClientName(html) {
  return html.replace(/El\s+Patronn?\s+Release/gi, "Podcast Editing Sample");
}

function updateReviewTotals(html) {
  return html
    .replace(/15\s*out\s*of\s*15/gi, "20 out of 20")
    .replace(/3\s*client\s*testimonials\s*[•·|\-]\s*15\s*stars\s*displayed/gi, "4 client testimonials • 20 stars displayed")
    .replace(/15\s*stars\s*displayed/gi, "20 stars displayed");
}

function addElPatronTestimonial(html) {
  if (html.includes('id="el-patron-marketing-testimonial"')) return html;

  if (!html.includes('id="el-patron-testimonial-style"') && html.includes('</head>')) {
    html = html.replace('</head>', EL_PATRON_STYLE + '</head>');
  }

  const gridRe = /(<section\b[^>]*\bid=["']testimonials["'][^>]*>[\s\S]*?<div\s+class=["']testGrid["']>)/i;
  if (gridRe.test(html)) return html.replace(gridRe, '$1' + EL_PATRON_CARD);

  const contactRe = /<section\b[^>]*\bid=["']contact["'][^>]*>/i;
  if (contactRe.test(html)) {
    const fallback = `<section class="testimonials" id="el-patron-review-fallback"><div class="wrap"><div class="sectionHead"><span class="eyebrow">Testimonial</span><h2>Podcast editing client review</h2></div><div class="testGrid">${EL_PATRON_CARD}</div></div></section>`;
    return html.replace(contactRe, fallback + '$&');
  }

  return html;
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const type = response.headers.get("content-type") || "";
    const url = new URL(request.url);

    if (request.method !== "GET" || !response.ok || !type.includes("text/html") || url.pathname.startsWith("/admin")) {
      return response;
    }

    let html = await response.text();
    html = removePortfolioClientName(html);
    html = updateReviewTotals(html);
    if (url.pathname === "/" || url.pathname === "") html = addElPatronTestimonial(html);

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    headers.set("cache-control", "no-store");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
