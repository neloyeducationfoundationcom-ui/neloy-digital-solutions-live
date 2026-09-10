import currentWorker from "./duck-private-email-wrapper.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin"
};

function withLeadCors(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) headers.set(key, value);
  headers.set("Cross-Origin-Resource-Policy", "cross-origin");
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();
    const isLeadEndpoint = url.pathname === "/api/leads";

    // Facebook/Instagram in-app browsers can preflight JSON submissions.
    // This endpoint is intentionally public because website visitors submit leads here.
    if (isLeadEndpoint && method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (isLeadEndpoint && method === "POST") {
      // Some in-app browsers supply an opaque or app origin. The inner security
      // wrapper requires same-origin for /api routes, so remove Origin only for
      // this public POST endpoint. Admin GET/PATCH routes are untouched.
      const headers = new Headers(request.headers);
      headers.delete("origin");

      const body = await request.arrayBuffer();
      const forwarded = new Request(request.url, {
        method: "POST",
        headers,
        body
      });

      const response = await currentWorker.fetch(forwarded, env, ctx);
      return withLeadCors(response);
    }

    return currentWorker.fetch(request, env, ctx);
  }
};
