import currentWorker from "./terms-page-wrapper.js";
import EL_PATRON_IMAGE from "./el-patron-marketing-image.js";

const EL_PATRON_STYLE = `
<style id="el-patron-testimonial-style">
#el-patron-marketing-testimonial{margin-top:22px!important;display:grid!important;grid-template-columns:180px minmax(0,1fr)!important;gap:24px!important;align-items:center!important;width:100%!important;box-sizing:border-box!important;background:#fff!important;border:1px solid #C9E8F7!important;border-radius:24px!important;padding:24px!important;box-shadow:0 16px 38px rgba(7,93,255,.09)!important;opacity:1!important;visibility:visible!important;transform:none!important}
#el-patron-marketing-testimonial .elPatronLogoWrap{width:160px!important;height:160px!important;border-radius:20px!important;border:4px solid #fff!important;box-shadow:0 12px 28px rgba(10,42,90,.16)!important;background:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;justify-self:center!important}
#el-patron-marketing-testimonial img{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center center!important;margin:0!important;padding:6px!important;background:#fff!important;transform:none!important}
#el-patron-marketing-testimonial .stars{font-size:25px!important;letter-spacing:3px!important;color:#F4B400!important;font-weight:900!important;line-height:1!important}
#el-patron-marketing-testimonial .score{display:inline-block!important;margin-left:10px!important;padding:6px 10px!important;border-radius:999px!important;background:#F3FAFF!important;border:1px solid #C9E8F7!important;color:#075DFF!important;font-size:13px!important;font-weight:900!important}
#el-patron-marketing-testimonial .quote{margin:14px 0 0!important;color:#496A89!important;font-size:16px!important;line-height:1.7!important;font-style:italic!important}
#el-patron-marketing-testimonial .name{margin-top:15px!important;color:#0A2A5A!important;font-size:20px!important;font-weight:1000!important}
#el-patron-marketing-testimonial .role{display:block!important;margin-top:2px!important;color:#6B86A0!important;font-size:13px!important;font-weight:800!important}
@media(max-width:760px){
  #el-patron-marketing-testimonial{grid-template-columns:1fr!important;padding:20px!important;gap:18px!important}
  #el-patron-marketing-testimonial .elPatronLogoWrap{width:140px!important;height:140px!important;margin:0 auto!important;justify-self:center!important;align-self:center!important}
  #el-patron-marketing-testimonial>div:nth-child(2){min-width:0!important;width:100%!important}
}
</style>`;

const EL_PATRON_CARD = `<div id="el-patron-marketing-testimonial">
  <div class="elPatronLogoWrap"><img src="${EL_PATRON_IMAGE}" alt="El Patron Marketing logo"></div>
  <div>
    <div><span class="stars">★★★★★</span><span class="score">5.0 / 5</span></div>
    <p class="quote">“We’ve worked with Neloy Digital Solutions on many of our podcast videos, and we’re very happy with the results. Their editing style, motion graphics, captions, and audio-synced text give our content a professional, premium look. They understand our style and consistently deliver quality work.”</p>
    <div class="name">El Patron Marketing<span class="role">Client Testimonial • Podcast Video Editing</span></div>
  </div>
</div>`;

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

  const testimonialStart = html.search(/<section\b[^>]*\bid=["']testimonials["'][^>]*>/i);
  if (testimonialStart !== -1) {
    const testimonialEnd = html.indexOf('</section>', testimonialStart);
    if (testimonialEnd !== -1) {
      return html.slice(0, testimonialEnd) + EL_PATRON_CARD + html.slice(testimonialEnd);
    }
  }

  const dineshStart = html.indexOf('id="dinesh-testimonial-fixed"');
  if (dineshStart !== -1) {
    const statsMarker = html.indexOf('id="business-results"', dineshStart);
    if (statsMarker !== -1) {
      const sectionBeforeStats = html.lastIndexOf('<section', statsMarker);
      if (sectionBeforeStats !== -1) return html.slice(0, sectionBeforeStats) + EL_PATRON_CARD + html.slice(sectionBeforeStats);
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
