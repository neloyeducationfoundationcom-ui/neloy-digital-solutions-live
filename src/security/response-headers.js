function hardenResponse(response, url) {
  const headers = new Headers(response.headers);

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  headers.delete("Server");
  headers.delete("X-Powered-By");

  if (url.pathname === "/api/leads" || url.pathname.startsWith("/admin")) {
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    headers.set("Pragma", "no-cache");
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  // The public website submits leads from the same origin. Do not advertise
  // this private endpoint as a cross-origin API.
  if (url.pathname === "/api/leads") {
    headers.delete("Access-Control-Allow-Origin");
    headers.delete("Access-Control-Allow-Methods");
    headers.delete("Access-Control-Allow-Headers");
    headers.delete("Access-Control-Max-Age");
    headers.delete("Cross-Origin-Resource-Policy");
  }

  return headers;
}

export { hardenResponse };
