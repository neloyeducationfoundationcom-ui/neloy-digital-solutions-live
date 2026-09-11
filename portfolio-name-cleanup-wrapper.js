import currentWorker from "./terms-page-wrapper.js";
import EL_PATRON_IMAGE from "./el-patron-marketing-image.js";

const EL_PATRON_STYLE = `
<style id="el-patron-testimonial-style">
.elPatronReview{background:#fff;border:1px solid #c9e8f7;border-radius:22px;padding:24px;text-align:center;box-shadow:0 14px 36px rgba(7,93,255,.08)}
.elPatronReview img{width:112px;height:112px;object-fit:cover;border-radius:20px;border:2px solid #29dfff;display:block;margin:0 auto 14px;background:#fff}
.elPatronReview h3{margin:0 0 4px;color:#0a2a5a!important}
.elPatronReview .clientRole{color:#60758c;font-size:14px;font-weight:800;margin-bottom:10px}
.elPatronReview .reviewStars{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin:8px 0 14px}
.elPatronReview .stars{color:#f4b400;font-size:23px;letter-spacing:2px;line-height:1}
.elPatronReview .ratingText{font-size:13px;font-weight:900;color:#496a89;background:#f3faff;border:1px solid #c9e8f7;border-radius:999px;padding:5px 9px}
.elPatronReview .quote{font-size:16px;line-height:1.75;color:#5d7690!important;margin:0}
@media(max-width:700px){.elPatronReview{padding:20px}.elPatronReview img{width:96px;height:96px}.elPatronReview .quote{font-size:15px}}
</style>`;

const EL_PATRON_CARD = `<article class="testCard elPatronReview" id="el-patron-marketing-testimonial">
  <img src="${EL_PATRON_IMAGE}" alt="El Patron Marketing">
  <h3>El Patron Marketing</h3>
  <div class="clientRole">Podcast Video Editing Client</div>
  <div class="reviewStars" aria-label="5 out of 5 stars"><span class="stars">★★★★★</span><span class="ratingText">5.0 / 5</span></div>
  <p class="quote">“We’ve worked with Neloy Digital Solutions on many of our podcast videos, and we’re very happy with the results. Their editing style, motion graphics, captions, and audio-synced text give our content a professional, premium look. They understand our style and consistently deliver quality work.”</p>
</article>`;

function removePortfolioClientName(html) {
  return html
    .replace(/El\s+Patron\s+Release/gi, "Podcast Editing Sample")
    .replace(/El\s+Patronn?/gi, "Podcast Editing Sample");
}

function updateReviewTotals(html) {
  return html
    .replace(/15\s*out\s*of\s*15/gi, "20 out of 20")
    .replace(/3\s*client\s*testimonials\s*[•·|-]\s*15\s*stars\s*displayed/gi, "4 client testimonials • 20 stars displayed")
    .replace(/15\s*stars\s*displayed/gi, "20 stars displayed");
}

function addElPatronTestimonial(html) {
  if (html.includes('id="el-patron-marketing-testimonial"')) return html;

  if (!html.includes('id="el-patron-testimonial-style"') && html.includes('</head>')) {
    html = html.replace('</head>', EL_PATRON_STYLE + '</head>');
  }

  const gridMarker = '<div class="testGrid">';
  if (html.includes(gridMarker)) {
    return html.replace(gridMarker, gridMarker + EL_PATRON_CARD);
  }

  const sectionStart = html.indexOf('<section id="testimonials"');
  if (sectionStart !== -1) {
    const sectionEnd = html.indexOf('</section>', sectionStart);
    if (sectionEnd !== -1) {
      return html.slice(0, sectionEnd) + EL_PATRON_CARD + html.slice(sectionEnd);
    }
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
