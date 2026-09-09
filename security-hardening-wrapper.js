import currentWorker from "./two-page-motion-wrapper.js";
import legacySponsorWorker from "./final-wrapper.js";

const BLOCKED_PATHS = [
  "/.env", "/.git", "/.git/config", "/wp-admin", "/wp-login.php", "/xmlrpc.php",
  "/phpmyadmin", "/server-status", "/config.php", "/composer.json", "/vendor/phpunit"
];

function isBlockedPath(pathname) {
  const p = pathname.toLowerCase();
  return BLOCKED_PATHS.some(x => p === x || p.startsWith(x + "/"));
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function secureHeaders(headers, url, contentType) {
  const h = new Headers(headers);
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()");
  h.set("X-Frame-Options", "DENY");
  h.set("Cross-Origin-Opener-Policy", "same-origin");
  h.set("Cross-Origin-Resource-Policy", "same-origin");
  h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  h.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests");
  h.delete("Server");
  h.delete("X-Powered-By");

  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/")) {
    h.set("Cache-Control", "no-store, no-cache, must-revalidate");
    h.set("Pragma", "no-cache");
    h.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  if ((contentType || "").includes("text/html")) {
    h.set("Cache-Control", "no-store");
  }
  return h;
}

function reject(status, message) {
  return new Response(message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}

async function getTopNotchLogo(request, env, ctx) {
  try {
    const u = new URL(request.url);
    u.pathname = "/";
    u.search = "";
    const r = await legacySponsorWorker.fetch(new Request(u.toString(), {
      method: "GET",
      headers: request.headers
    }), env, ctx);
    const type = r.headers.get("content-type") || "";
    if (!type.includes("text/html")) return "";
    const html = await r.text();
    const m = html.match(/<img[^>]+src="([^"]+)"[^>]+alt="Top Notch Assignment logo"/i);
    return m ? m[1] : "";
  } catch {
    return "";
  }
}

function applyPublicSiteChanges(html, sponsorLogo) {
  // Hide only the public Admin Leads link. The /admin page itself still works.
  html = html.replace(/<a\b[^>]*href=["']\/admin\/?["'][^>]*>[\s\S]*?<\/a>/gi, "");
  html = html.replace(/\s*Admin Leads\s*/gi, "");

  // Remove the Top Notch office-location sentence from the public website.
  html = html.replace(/<p\b[^>]*>[\s\S]*?Top Notch Assignments?[^<]*offices based in[^<]*U\.?K\.?[^<]*Malaysia[^<]*Bangladesh[^<]*<\/p>/gi, "");
  html = html.replace(/Top Notch Assignments? operates with offices based in the U\.?K\.?,?\s*Malaysia\s*(?:,?\s*and|\s*&amp;|\s*&)\s*Bangladesh\.?/gi, "");
  html = html.replace(/Official sponsor partner with offices based in the U\.?K\.?,?\s*Malaysia\s*(?:,?\s*and|\s*&amp;|\s*&)\s*Bangladesh\.?/gi, "");

  // Restore the real Top Notch Assignments sponsor logo in the sponsorship card.
  if (sponsorLogo) {
    const logoBlock = `<div class="partnerLogo" style="background:#fff;padding:8px;overflow:hidden"><img src="${sponsorLogo}" alt="Top Notch Assignments logo" style="width:100%;height:100%;object-fit:contain;display:block;border-radius:16px"></div>`;
    html = html.replace(/<div class="partnerLogo">[\s\S]*?<\/div>/i, logoBlock);
  }

  return html;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    if (isBlockedPath(url.pathname)) return reject(404, "Not Found");

    if (["TRACE", "CONNECT", "PUT", "DELETE"].includes(method)) {
      return reject(405, "Method Not Allowed");
    }

    if (url.pathname.startsWith("/api/")) {
      if (!sameOrigin(request)) return reject(403, "Forbidden");

      if (["POST", "PATCH"].includes(method)) {
        const type = (request.headers.get("content-type") || "").toLowerCase();
        if (!type.includes("application/json")) return reject(415, "JSON required");
        const len = Number(request.headers.get("content-length") || "0");
        if (Number.isFinite(len) && len > 20000) return reject(413, "Payload Too Large");
      }
    }

    const response = await currentWorker.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    const headers = secureHeaders(response.headers, url, contentType);

    if (method === "GET" && contentType.includes("text/html") && !url.pathname.startsWith("/admin")) {
      const html = await response.text();
      const sponsorLogo = await getTopNotchLogo(request, env, ctx);
      return new Response(applyPublicSiteChanges(html, sponsorLogo), {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
