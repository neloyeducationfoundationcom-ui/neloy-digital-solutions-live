import app from "./video-indexing-aeo-wrapper.js";

const FUNNEL_URL = "https://info-digitalsolutions-neloy.systeme.io/6b5b820f";
const LANDING_PATH = "/web-design-bangladesh";

const CTA = `
<style id="nds-systeme-landing-cta-style">
#nds-systeme-landing-cta{padding:54px 20px;background:linear-gradient(135deg,#071d3d,#0a2a5a);color:#fff;text-align:center}
#nds-systeme-landing-cta .ndsLandingWrap{width:min(900px,100%);margin:0 auto}
#nds-systeme-landing-cta .ndsLandingEyebrow{display:inline-block;margin-bottom:10px;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#8edcff}
#nds-systeme-landing-cta h2{margin:0 0 12px;font-size:clamp(28px,5vw,42px);line-height:1.1;color:#fff}
#nds-systeme-landing-cta p{margin:0 auto 22px;max-width:700px;font-size:16px;line-height:1.7;color:#d9e9fb}
#nds-systeme-landing-cta a{display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:12px;background:#fff;color:#075dff;text-decoration:none;font-weight:900;box-shadow:0 10px 30px rgba(0,0,0,.16)}
#nds-systeme-landing-cta a:hover{transform:translateY(-1px)}
</style>
<section id="nds-systeme-landing-cta" aria-labelledby="nds-systeme-landing-title">
  <div class="ndsLandingWrap">
    <span class="ndsLandingEyebrow">Bangladesh Web Design</span>
    <h2 id="nds-systeme-landing-title">Planning a Business Website?</h2>
    <p>Tell Neloy Digital Solutions what you need, your goals and your budget. Use our dedicated Web Design Bangladesh consultation page to start your enquiry.</p>
    <a href="${FUNNEL_URL}">Get a Free Website Consultation</a>
  </div>
</section>`;

function injectLandingCta(html){
  if (html.includes('id="nds-systeme-landing-cta"')) return html;
  if (/<\/main>/i.test(html)) return html.replace(/<\/main>/i, `${CTA}\n</main>`);
  return html.replace(/<\/body>/i, `${CTA}\n</body>`);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && (url.pathname === LANDING_PATH || url.pathname === `${LANDING_PATH}/`)) {
      return Response.redirect(FUNNEL_URL, 301);
    }

    const response = await app.fetch(request, env, ctx);

    if (request.method !== "GET" || (url.pathname !== "/" && url.pathname !== "")) {
      return response;
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    const html = await response.text();
    const headers = new Headers(response.headers);
    headers.delete("content-length");

    return new Response(injectLandingCta(html), {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
