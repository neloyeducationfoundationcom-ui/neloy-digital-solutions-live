import currentWorker from "./logo-position-fix-wrapper.js";
import EL_PATRON_IMAGE from "./el-patron-marketing-image.js";

const STYLE = `<style id="el-patron-final-style">
#el-patron-marketing-testimonial{display:grid!important;grid-template-columns:180px minmax(0,1fr)!important;gap:24px!important;align-items:center!important;width:100%!important;box-sizing:border-box!important;margin:22px 0 0!important;padding:24px!important;background:#fff!important;border:1px solid #c9e8f7!important;border-radius:24px!important;box-shadow:0 16px 38px rgba(7,93,255,.09)!important;visibility:visible!important;opacity:1!important;transform:none!important;grid-column:1/-1!important}
#el-patron-marketing-testimonial .elPatronLogoWrap{width:160px!important;height:160px!important;display:flex!important;align-items:center!important;justify-content:center!important;justify-self:center!important;margin:0!important;padding:0!important;background:#fff!important;border:4px solid #fff!important;border-radius:20px!important;overflow:hidden!important;box-shadow:0 12px 28px rgba(10,42,90,.16)!important}
#el-patron-marketing-testimonial .elPatronLogoWrap img{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;object-position:center center!important;margin:0!important;padding:6px!important;transform:none!important;background:#fff!important}
#el-patron-marketing-testimonial .stars{font-size:25px!important;letter-spacing:3px!important;color:#f4b400!important;font-weight:900!important;line-height:1!important}
#el-patron-marketing-testimonial .score{display:inline-block!important;margin-left:10px!important;padding:6px 10px!important;border-radius:999px!important;background:#f3faff!important;border:1px solid #c9e8f7!important;color:#075dff!important;font-size:13px!important;font-weight:900!important}
#el-patron-marketing-testimonial .quote{margin:14px 0 0!important;color:#496a89!important;font-size:16px!important;line-height:1.7!important;font-style:italic!important}
#el-patron-marketing-testimonial .name{margin-top:15px!important;color:#0a2a5a!important;font-size:20px!important;font-weight:1000!important}
#el-patron-marketing-testimonial .role{display:block!important;margin-top:2px!important;color:#6b86a0!important;font-size:13px!important;font-weight:800!important}
#testimonials #dinesh-testimonial-fixed{grid-column:1/-1!important;width:100%!important;box-sizing:border-box!important}
@media(max-width:760px){
  #el-patron-marketing-testimonial{grid-template-columns:1fr!important;gap:18px!important;padding:20px!important}
  #el-patron-marketing-testimonial .elPatronLogoWrap{width:140px!important;height:140px!important;margin:0 auto!important;justify-self:center!important;align-self:center!important}
  #el-patron-marketing-testimonial>div:nth-child(2){width:100%!important;min-width:0!important}
}
</style>`;

const CARD = `<div id="el-patron-marketing-testimonial">
  <div class="elPatronLogoWrap"><img src="${EL_PATRON_IMAGE}" alt="El Patron Marketing logo"></div>
  <div>
    <div><span class="stars">★★★★★</span><span class="score">5.0 / 5</span></div>
    <p class="quote">“We’ve worked with Neloy Digital Solutions on many of our podcast videos, and we’re very happy with the results. Their editing style, motion graphics, captions, and audio-synced text give our content a professional, premium look. They understand our style and consistently deliver quality work.”</p>
    <div class="name">El Patron Marketing<span class="role">Client Testimonial • Podcast Video Editing</span></div>
  </div>
</div>`;

const SCRIPT = `<script id="el-patron-live-insert-script">
(function(){
  const card = ${JSON.stringify(CARD)};

  function placeTestimonials(){
    const section = document.getElementById('testimonials');
    if(!section) return false;

    const grid = section.querySelector('.testGrid') || section.querySelector('.container,.wrap') || section;
    const dinesh = document.getElementById('dinesh-testimonial-fixed');
    const existing = document.getElementById('el-patron-marketing-testimonial');

    if(existing) existing.remove();

    if(dinesh){
      if(!section.contains(dinesh)) grid.appendChild(dinesh);
      dinesh.insertAdjacentHTML('afterend', card);
    } else {
      grid.insertAdjacentHTML('beforeend', card);
    }

    return true;
  }

  function run(){
    if(placeTestimonials()) return;
    let tries = 0;
    const timer = setInterval(function(){
      tries += 1;
      if(placeTestimonials() || tries >= 24) clearInterval(timer);
    }, 250);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
})();
</script>`;

function updateReviewTotals(html) {
  return html
    .replace(/15\s*out\s*of\s*15/gi, '20 out of 20')
    .replace(/3\s*client\s*testimonials\s*[•·|\-]\s*15\s*stars\s*displayed/gi, '4 client testimonials • 20 stars displayed')
    .replace(/15\s*stars\s*displayed/gi, '20 stars displayed');
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const type = response.headers.get('content-type') || '';
    const url = new URL(request.url);

    if (request.method !== 'GET' || !response.ok || !type.includes('text/html') || url.pathname.startsWith('/admin')) {
      return response;
    }

    let html = updateReviewTotals(await response.text());

    if (!html.includes('id="el-patron-final-style"') && html.includes('</head>')) {
      html = html.replace('</head>', STYLE + '</head>');
    }
    if (!html.includes('id="el-patron-live-insert-script"')) {
      html = html.includes('</body>') ? html.replace('</body>', SCRIPT + '</body>') : html + SCRIPT;
    }

    const headers = new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('etag');
    headers.set('cache-control', 'no-store, no-cache, must-revalidate');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
