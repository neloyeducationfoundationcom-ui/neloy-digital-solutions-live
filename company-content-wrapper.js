import currentWorker from "./sponsor-text-wrapper.js";

const CONTENT_STYLE = `
<style id="company-content-style">
.companyContent{padding:78px 0;background:#fffaf0}.companyContentGrid{display:grid;grid-template-columns:.9fr 1.1fr;gap:28px;align-items:stretch}.companyContentVisual{border-radius:26px;background:linear-gradient(145deg,#63385d,#8d6281);padding:32px;color:#fff;min-height:330px;display:flex;flex-direction:column;justify-content:space-between}.companyContentVisual small{letter-spacing:.14em;font-weight:900;opacity:.85}.companyContentVisual h3{font-size:38px;line-height:1.05;margin:14px 0;color:#fff}.companyContentVisual p{color:#f5e9ef}.companyContentArticle{background:#fffef9;border:1px solid #e0cfaa;border-radius:26px;padding:30px;box-shadow:0 14px 36px rgba(87,57,80,.08)}.companyContentArticle h2{margin:8px 0 14px;color:#4e2a49}.companyContentArticle p{color:#786a75;font-size:16px}.companyPoints{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px}.companyPoint{background:#fff7e7;border:1px solid #e0cfaa;border-radius:14px;padding:14px}.companyPoint b{display:block;color:#4e2a49;margin-bottom:4px}.companyContentCta{margin-top:20px;display:flex;gap:10px;flex-wrap:wrap}.companyContentCta a{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border-radius:12px;padding:12px 16px;font-weight:900}.companyContentCta .project{background:#63385d;color:#fff}.companyContentCta .whatsapp{background:#25d366;color:#fff}@media(max-width:850px){.companyContentGrid{grid-template-columns:1fr}.companyContentVisual{min-height:260px}.companyPoints{grid-template-columns:1fr}}@media(max-width:560px){.companyContent{padding:56px 0}.companyContentVisual,.companyContentArticle{padding:20px;border-radius:19px}.companyContentVisual h3{font-size:31px}.companyContentCta a{width:100%}}
</style>`;

const CONTENT_SECTION = `
<section class="companyContent" id="company-post">
  <div class="wrap companyContentGrid">
    <article class="companyContentVisual">
      <div>
        <small>ABOUT NELOY DIGITAL SOLUTIONS</small>
        <h3>Creative ideas. Practical digital solutions. Better business growth.</h3>
      </div>
      <p>We support entrepreneurs, small businesses and growing teams with professional digital services designed to make their brand stronger and their work easier.</p>
    </article>
    <article class="companyContentArticle">
      <span class="eyebrow">Company Post</span>
      <h2>Your digital partner for design, development and business support</h2>
      <p>At Neloy Digital Solutions, we believe professional digital support should be clear, practical and affordable. Our goal is to help businesses build a stronger online presence while saving time on the technical and creative work behind it.</p>
      <p>From web design and business logo design to video editing, social media posts, coding, email setup, AI automation and virtual business support, our team focuses on delivering work that is useful, polished and tailored to each client's needs.</p>
      <div class="companyPoints">
        <div class="companyPoint"><b>Professional Design</b><span>Clean, modern work that helps your business look credible.</span></div>
        <div class="companyPoint"><b>Flexible Support</b><span>Choose one service or combine several for a complete project.</span></div>
        <div class="companyPoint"><b>Client Focused</b><span>Clear communication, revisions and practical project support.</span></div>
        <div class="companyPoint"><b>Growth Mindset</b><span>Digital solutions created to support long-term business growth.</span></div>
      </div>
      <p><strong>Need help with your next project?</strong> Send us your requirements and we will review how Neloy Digital Solutions can support your business.</p>
      <div class="companyContentCta">
        <a class="project" href="#contact">Start a Project</a>
        <a class="whatsapp" href="#contact">Contact Us</a>
      </div>
    </article>
  </div>
</section>`;

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      const type = response.headers.get("content-type") || "";
      if (type.includes("text/html")) {
        let html = await response.text();
        if (!html.includes('id="company-post"')) {
          if (html.includes('<section id="contact"')) {
            html = html.replace('<section id="contact"', CONTENT_SECTION + '<section id="contact"');
          } else {
            html = html.replace('</main>', CONTENT_SECTION + '</main>');
          }
        }
        html = html.includes('</head>') ? html.replace('</head>', CONTENT_STYLE + '</head>') : html;
        const headers = new Headers(response.headers);
        headers.set("content-type", "text/html; charset=utf-8");
        headers.set("cache-control", "no-store");
        return new Response(html, {status: response.status, headers});
      }
    }
    return response;
  }
};
