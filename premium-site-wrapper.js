import currentWorker from "./mahe-testimonial-wrapper.js";
import { PREMIUM_THEME, PREMIUM_CONCEPT_CSS } from "./src/design/premium-theme.js";
import { insightsSection } from "./src/insights/medium.js";
import { privacyPage } from "./src/privacy/page.js";
import { upgradeHomepage } from "./src/design/homepage-concept.js";
import { upgradeShowcaseTestimonials } from "./src/design/showcase-testimonials.js";
import { PREMIUM_PAGES_CSS } from "./src/design/premium-pages.js";
import { hardenResponse } from "./src/security/response-headers.js";

import { renderBlog, appendBlogSitemap } from "./src/blog/pages.js";


// Homepage-only social sharing image. Preserve existing titles, canonicals, schema, and layout.
const SOCIAL_PREVIEW_IMAGE = "https://neloydigitalsolutions.com/neloy-social-preview.png";

function addHomepageSocialPreview(html) {
  // Prevent conflicting images without modifying any other Open Graph fields.
  html = html.replace(/<meta\b(?=[^>]*\b(?:name|property)\s*=\s*["'](?:og:image(?::[\w-]+)?|twitter:image)["'])[^>]*>\s*/gi, "");
  const tags = [
    `<meta property="og:image" content="${SOCIAL_PREVIEW_IMAGE}">`,
    `<meta property="og:image:secure_url" content="${SOCIAL_PREVIEW_IMAGE}">`,
    '<meta property="og:image:type" content="image/png">',
    '<meta property="og:image:width" content="1314">',
    '<meta property="og:image:height" content="637">',
    '<meta property="og:image:alt" content="Neloy Digital Solutions official website — creative digital services">',
    `<meta name="twitter:image" content="${SOCIAL_PREVIEW_IMAGE}">`
  ].join("\n");
  return html.replace(/<\/head>/i, tags + "\n</head>");
}

const GA4_ID = "G-KWCBEDVHST";
const ADSENSE_ACCOUNT_META = '<meta name="google-adsense-account" content="ca-pub-2614503198735373">';
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

function addAdSenseAccountMeta(html) {
  if (html.includes('name="google-adsense-account"')) return html;
  return html.replace("</head>", ADSENSE_ACCOUNT_META + "</head>");
}


const NEW_SHOWREEL_EMBED = "https://share.descript.com/embed/dzzZKRognDy";
const NEW_SHOWREEL_PAGE = "https://share.descript.com/view/dzzZKRognDy";

function newestShowreelPlayer() {
  return `<div class="nds-new-showreel-player" style="position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border-radius:12px;background:#06162d">
    <iframe src="${NEW_SHOWREEL_EMBED}" title="Neloy Digital Solutions video editing project showcase" loading="lazy" allow="encrypted-media; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>
  </div>`;
}

function addNewShowreel(html, path) {
  const id = "nds-video-editing-showreel-2026";
  if (html.includes(`id="${id}"`)) return html;
  if (path === "/showcase" || path === "/portfolio") {
    const card = `<article class="workCard" id="${id}"><div class="workBody">
      <span class="tag">Video Editing · Motion Graphics</span>
      <h3>Video Editing Project Showreel</h3>
      <p class="projectIntro">A 49-second Full HD presentation of video editing, branded motion graphics, social videos and other creative work.</p>
      ${newestShowreelPlayer()}
      <p style="margin:12px 0 0"><a href="${NEW_SHOWREEL_PAGE}" target="_blank" rel="noopener noreferrer">Watch full video in a new tab ↗</a></p>
    </div></article>`;
    return html.replace(/(<section\b[^>]*\bid=["']work["'][^>]*>[\s\S]*?<div class="workGrid">)/i, "$1" + card);
  }
  if (path === "/video-editing") {
    const card = `<article class="vpCard" id="${id}">
      <span class="vpTag">Video Editing · Featured Projects</span>
      <h3>Video Editing Project Showreel</h3>
      <p>Watch this 49-second Full HD selection of creative editing, motion graphics and branded video projects.</p>
      <div class="vpPlayer">${newestShowreelPlayer()}</div>
      <p style="margin:12px 0 0"><a href="${NEW_SHOWREEL_PAGE}" target="_blank" rel="noopener noreferrer">Watch full video in a new tab ↗</a></p>
    </article>`;
    return html.replace(/(<section\b[^>]*\bid=["']nds-video-portfolio["'][^>]*>[\s\S]*?<div class="vpGrid">)/i, "$1" + card);
  }
  return html;
}

// Permit only the published Descript player on pages containing this portfolio video.
// All other CSP directives and all admin/API security controls stay unchanged.
function allowNewShowreelFrame(headers) {
  const oldCsp = headers.get("content-security-policy");
  if (!oldCsp || oldCsp.includes("https://share.descript.com")) return;
  let csp;
  if (/\bframe-src\b/i.test(oldCsp)) {
    csp = oldCsp.replace(/\bframe-src\s+[^;]+/i, part => part + " https://share.descript.com");
  } else {
    csp = oldCsp.replace(/;?\s*$/, "; frame-src 'self' https://share.descript.com");
  }
  headers.set("content-security-policy", csp);
}

function allowGa4(headers) {
  const csp = headers.get("content-security-policy");
  if (!csp) return;
  headers.set("content-security-policy", csp
    .replace(/(script-src[^;]*)/i, "$1 https://www.googletagmanager.com")
    .replace(/(connect-src[^;]*)/i, "$1 https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com"));
}

const FOOTER_EXPLORE_LINKS = '<nav class="nds-premium-explore-links" aria-label="Explore Neloy services"><a href="/showcase">Showcase</a><a href="/website-design">Website Design</a><a href="/logo-design">Logo Design</a><a href="/social-media-design">Social Media Design</a><a href="/video-editing">Video Editing</a><a href="/digital-marketing">Digital Marketing</a><a href="https://neloydigitalsolutions.com/blog">Blog</a></nav>';

function addExploreLinks(html) {
  if (html.includes('class="nds-premium-explore-links"')) return html;
  const lastFooter = html.lastIndexOf("</footer>");
  return lastFooter < 0 ? html : html.slice(0, lastFooter) + FOOTER_EXPLORE_LINKS + html.slice(lastFooter);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    if (url.pathname === "/blog" || url.pathname.startsWith("/blog/")) {
      if (!["GET", "HEAD"].includes(request.method)) {
        return new Response("Method Not Allowed", {status:405, headers:{Allow:"GET, HEAD", "cache-control":"no-store"}});
      }
      // Reuse the established public response security policy without changing it.
      const templateURL = new URL(request.url);
      templateURL.pathname = "/website-design";
      templateURL.search = "";
      const template = await currentWorker.fetch(new Request(templateURL, {method:"GET", headers:request.headers}), env, ctx);
      const headers = hardenResponse(template, url);
      await template.body?.cancel();
      headers.delete("content-length");
      headers.delete("etag");
      headers.set("content-type", "text/html; charset=utf-8");
      headers.set("cache-control", "no-store");
      const page = renderBlog(path);
      if (page.status === 404) headers.set("x-robots-tag", "noindex, follow");
      allowGa4(headers);
      return new Response(request.method === "HEAD" ? null : addAdSenseAccountMeta(addGa4(page.html)), {status:page.status, headers});
    }

    if (request.method === "GET" && path === "/privacy") {
      const privacyHtml = addAdSenseAccountMeta(addGa4(addExploreLinks(privacyPage(url.origin).replace("<main>", '<main class="nds-premium-privacy">').replace("</head>", PREMIUM_PAGES_CSS + "</head>"))));
      const response = new Response(privacyHtml, {headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}});
      const headers = hardenResponse(response,url);
      allowGa4(headers);
      return new Response(response.body, {status:200, headers});
    }

    const response = await currentWorker.fetch(request, env, ctx);
    if (request.method !== "GET" || !response.ok) return response;

    if (url.pathname === "/sitemap.xml" && (response.headers.get("content-type") || "").includes("xml")) {
      const xml = appendBlogSitemap(await response.text());
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
    if (path === "/showcase" || path === "/portfolio" || path === "/video-editing") html = addNewShowreel(html, path);
    if (path === "/") html = html.replace('<main id="top">', '<main id="top" class="nds-premium-home">');
    if (path === "/website") html = html.replace('<main id="top">', '<main id="top" class="nds-premium-website">');
    if (path === "/showcase" || path === "/portfolio") html = html.replace('<main id="top">', '<main id="top" class="nds-premium-showcase">');
    if (path === "/showcase") html = upgradeShowcaseTestimonials(html);
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
    // Keep the blog discoverable in the existing top navigation, including mobile.
    if (html.includes('class="navlinks"') && !html.includes('class="nds-top-blog-link"')) {
      html = html.replace(/(<nav class="navlinks">)([\s\S]*?)(<a href="[^"]*" class="navCta">)/,
        '$1$2<a class="nds-top-blog-link" href="https://neloydigitalsolutions.com/blog">View My Blog</a>$3');
      html = html.replace("</head>", '<style id="nds-top-blog-link-style">.top .navlinks a.nds-top-blog-link{display:inline-flex!important;align-items:center;white-space:nowrap}@media(max-width:980px){.top .nav{flex-wrap:wrap;gap:10px;padding-block:12px}.top .navlinks{margin-left:auto;gap:12px}}</style></head>');
    }
    if (path === "/") html = addHomepageSocialPreview(html);
    html = addAdSenseAccountMeta(addGa4(addExploreLinks(html)));
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    allowGa4(headers);
    if (html.includes('id="nds-video-editing-showreel-2026"')) allowNewShowreelFrame(headers);
    return new Response(html, {status:response.status,statusText:response.statusText,headers});
  }
};

