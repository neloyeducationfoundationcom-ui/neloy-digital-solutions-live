import currentWorker from "./whatsapp-lead-prefill-wrapper.js";
import { PREMIUM_THEME } from "./src/design/premium-theme.js";
import { insightsSection } from "./src/insights/medium.js";
import { privacyPage } from "./src/privacy/page.js";
import { hardenResponse } from "./src/security/response-headers.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    if (request.method === "GET" && path === "/privacy") {
      const response = new Response(privacyPage(url.origin), {headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}});
      return new Response(response.body, {status:200, headers:hardenResponse(response,url)});
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
    if (path === "/" && !html.includes('id="nds-insights"')) {
      const section = insightsSection();
      html = html.replace(/<section\b[^>]*id=["']contact["']/i, section + "$&");
    }
    html = html.replace('© 2013 - 2026<br><strong>Neloy Digital Solutions</strong>', '© 2012–2026 <strong>Neloy Digital Solutions</strong>');
    if (!html.includes('id="nds-premium-theme"')) html = html.replace("</head>", PREMIUM_THEME + "</head>");
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    return new Response(html, {status:response.status,statusText:response.statusText,headers});
  }
};
