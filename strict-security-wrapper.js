import app from "./seo-aeo-offer-wrapper.js";
import { hardenResponse } from "./src/security/response-headers.js";

const BLOCKED_PATHS = [
  "/.env",
  "/.git",
  "/.git/config",
  "/wp-admin",
  "/wp-login.php",
  "/xmlrpc.php",
  "/phpmyadmin",
  "/server-status",
  "/config.php",
  "/composer.json",
  "/vendor/phpunit"
];

function isBlockedPath(pathname) {
  const p = pathname.toLowerCase();
  return BLOCKED_PATHS.some((x) => p === x || p.startsWith(x + "/"));
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
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

    if (url.pathname === "/api/leads") {
      // Same-origin browser requests do not need CORS preflight. Rejecting
      // OPTIONS here prevents another website from using this endpoint.
      if (method === "OPTIONS") return reject(403, "Forbidden");

      if (method === "POST") {
        if (!isSameOrigin(request)) return reject(403, "Forbidden");

        const type = (request.headers.get("content-type") || "").toLowerCase();
        if (!type.includes("application/json")) return reject(415, "JSON required");

        const len = Number(request.headers.get("content-length") || "0");
        if (Number.isFinite(len) && len > 20000) return reject(413, "Payload Too Large");
      }
    }

    const response = await app.fetch(request, env, ctx);
    const headers = hardenResponse(response, url);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
