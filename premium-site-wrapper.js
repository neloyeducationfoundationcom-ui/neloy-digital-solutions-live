import currentWorker from "./whatsapp-lead-prefill-wrapper.js";
import { PREMIUM_THEME, PREMIUM_CONCEPT_CSS } from "./src/design/premium-theme.js";
import { insightsSection } from "./src/insights/medium.js";
import { privacyPage } from "./src/privacy/page.js";
import { upgradeHomepage } from "./src/design/homepage-concept.js";
import { PREMIUM_PAGES_CSS } from "./src/design/premium-pages.js";
import { hardenResponse } from "./src/security/response-headers.js";

const GA4_ID = "G-KWCBEDVHST";
const GA4_TAG = `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
<script id="nds-ga4-tag">
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');
</script>`;

function addGa4(html) {
  if (html.includes('id="nds-ga4-tag"')) return html;
  return html.replace("</head>", GA4_TAG + "</head>");
}

function allowGa4(headers) {
  const csp = headers.get("content-security-policy");
  if (!csp) return;
  headers.set("content-security-policy", csp
    .replace(/(script-src[^;]*)/i, "$1 https://www.googletagmanager.com")
    .replace(/(connect-src[^;]*)/i, "$1 https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com"));
}

const FOOTER_EXPLORE_LINKS = '<nav class="nds-premium-explore-links" aria-label="Explore Neloy services"><a href="/showcase">Showcase</a><a href="/website-design">Website Design</a><a href="/logo-design">Logo Design</a><a href="/social-media-design">Social Media Design</a><a href="/video-editing">Video Editing</a><a href="/digital-marketing">Digital Marketing</a></nav>';

function addExploreLinks(html) {
  if (html.includes('class="nds-premium-explore-links"')) return html;
  const lastFooter = html.lastIndexOf("</footer>");
  return lastFooter < 0 ? html : html.slice(0, lastFooter) + FOOTER_EXPLORE_LINKS + html.slice(lastFooter);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    if (request.method === "GET" && path === "/privacy") {
      const privacyHtml = addGa4(addExploreLinks(privacyPage(url.origin).replace("<main>", '<main class="nds-premium-privacy">').replace("</head>", PREMIUM_PAGES_CSS + "</head>")));
      const response = new Response(privacyHtml, {headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}});
      const headers = hardenResponse(response,url);
      allowGa4(headers);
      return new Response(response.body, {status:200, headers});
    }

    const response = await currentWorker.fetch(request, env, ctx);
    if (request.method !== "GET" || !response.ok) return response;

    if (url.pathname === "/sitemap.xml" && (response.headers.get("content-type") || "").includes("xml")) {
      const xml = await response.text();
      const location = `${url.origin}/privacy`;
      if (xml.includes(`<loc>${location}</loc>`)) return new Response(xml, response);
      const entry = `<url><loc>${location}</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>`;
      const headers = new Headers(response.headers);
      headers.delete("content-length");
      headers.delete("etag");
      return new Response(xml.replace("</urlset>", entry + "</urlset>"), {status:response.status,statusText:response.statusText,headers});
    }

    if (url.pathname.startsWith("/admin") || !(response.headers.get("content-type") || "").includes("text/html")) return response;
    let html = await response.text();
    if (path === "/") html = upgradeHomepage(html);
    if (path === "/") html = html.replace('<main id="top">', '<main id="top" class="nds-premium-home">');
    if (path === "/website") html = html.replace('<main id="top">', '<main id="top" class="nds-premium-website">');
    if (path === "/showcase" || path === "/portfolio") html = html.replace('<main id="top">', '<main id="top" class="nds-premium-showcase">');
    if (path === "/team") html = html.replace("<main>", '<main class="nds-premium-team">');
    if (path === "/terms") html = html.replace("<main>", '<main class="nds-premium-terms">');
    if (path === "/" && !html.includes('id="nds-insights"')) {
      const section = insightsSection();
      html = html.replace(/<section\b[^>]*id=["']contact["']/i, section + "$&");
    }
    html = html.replace('© 2013 - 2026<br><strong>Neloy Digital Solutions</strong>', '© 2012–2026 <strong>Neloy Digital Solutions</strong>');
    if (!html.includes('id="nds-premium-theme"')) html = html.replace("</head>", PREMIUM_THEME + "</head>");
    if (!html.includes('id="nds-premium-concept"')) html = html.replace("</head>", PREMIUM_CONCEPT_CSS + "</head>");
    if (!html.includes('id="nds-premium-pages"')) html = html.replace("</head>", PREMIUM_PAGES_CSS + "</head>");
    html = addGa4(addExploreLinks(html));
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    allowGa4(headers);
    return new Response(html, {status:response.status,statusText:response.statusText,headers});
  }
};
