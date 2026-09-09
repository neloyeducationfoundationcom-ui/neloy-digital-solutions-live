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

  // Remove ONLY the requested office sentence. Keep Sponsor Partner / Official Sponsor Partner visible.
  html = html.replace(/<p\b[^>]*>\s*Top Notch Assignments? operates with offices based in the U\.K\., Malaysia and Bangladesh\.\s*<\/p>/gi, "");

  // Restore the real Top Notch Assignments sponsor logo in the sponsorship card.
  if (sponsorLogo) {
    const logoBlock = `<div class="partnerLogo" style="background:#fff;padding:8px;overflow:hidden"><img src="${sponsorLogo}" alt="Top Notch Assignments logo" style="width:100%;height:100%;object-fit:contain;display:block;border-radius:16px"></div>`;
    html = html.replace(/<div class="partnerLogo">[\s\S]*?<\/div>/i, logoBlock);
  }

  // Add Milford's Mochas as a Shopify web design portfolio project on Page 2.
  if (!html.includes('milfordsmochas.com') && html.includes('<div class="workGrid">')) {
    const milfordCard = `<article class="workCard" style="overflow:hidden">
      <div class="projectVisual" style="height:230px;padding:20px;background:linear-gradient(135deg,#3b1f16 0%,#8a4d2f 48%,#d99b58 100%);display:flex;align-items:center;justify-content:center">
        <div style="width:100%;max-width:390px;background:#fff;border-radius:16px;box-shadow:0 18px 45px rgba(0,0,0,.24);overflow:hidden;border:1px solid rgba(255,255,255,.45)">
          <div style="height:28px;background:#f5efe9;display:flex;align-items:center;gap:6px;padding:0 10px"><span style="width:7px;height:7px;border-radius:50%;background:#ef6b5f"></span><span style="width:7px;height:7px;border-radius:50%;background:#f2bf4f"></span><span style="width:7px;height:7px;border-radius:50%;background:#62c26b"></span><span style="margin-left:8px;font-size:9px;color:#765b4f;font-weight:800">milfordsmochas.com</span></div>
          <div style="padding:20px 18px 22px;background:linear-gradient(180deg,#fffaf5,#f5e8da);text-align:center">
            <div style="font-size:11px;letter-spacing:.12em;font-weight:1000;color:#8a4d2f">SHOPIFY E-COMMERCE</div>
            <div style="font-size:28px;line-height:1.05;font-weight:1000;color:#3b1f16;margin:8px 0 5px">Milford's Mochas</div>
            <div style="font-size:12px;color:#7c6559">Caffeinated cookies • Product shop • Online checkout</div>
            <div style="display:flex;justify-content:center;gap:8px;margin-top:14px"><span style="padding:6px 9px;border-radius:999px;background:#fff;border:1px solid #ddc4b2;font-size:9px;font-weight:900;color:#8a4d2f">SHOP</span><span style="padding:6px 9px;border-radius:999px;background:#fff;border:1px solid #ddc4b2;font-size:9px;font-weight:900;color:#8a4d2f">MOBILE</span><span style="padding:6px 9px;border-radius:999px;background:#fff;border:1px solid #ddc4b2;font-size:9px;font-weight:900;color:#8a4d2f">CHECKOUT</span></div>
          </div>
        </div>
      </div>
      <div class="workBody">
        <span class="tag">Shopify Web Design</span>
        <h3>Milford's Mochas</h3>
        <p>Shopify e-commerce website for a caffeinated cookie brand, featuring product shopping, brand content, cart and checkout functionality, and a mobile-friendly customer experience.</p>
        <a href="https://www.milfordsmochas.com/" target="_blank" rel="noopener noreferrer" style="display:inline-flex;margin-top:16px;padding:10px 14px;border-radius:11px;background:linear-gradient(135deg,#075DFF,#12DFF3);color:#fff;text-decoration:none;font-weight:900;font-size:13px">View Live Website →</a>
      </div>
    </article>`;
    html = html.replace('<div class="workGrid">', '<div class="workGrid">' + milfordCard);
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
