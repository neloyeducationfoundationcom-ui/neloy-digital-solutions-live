import currentWorker from "./two-page-motion-wrapper.js";

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
    h.set("Cache-Control", url.pathname.startsWith("/admin") ? "no-store" : "no-store");
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

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
