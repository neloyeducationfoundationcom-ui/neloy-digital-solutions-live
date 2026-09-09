import currentWorker from "./nathan-photo-wrapper.js";

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/") {
      const type = response.headers.get("content-type") || "";
      if (type.includes("text/html")) {
        let html = await response.text();
        html = html.replaceAll("Top Notch Assignment", "Top Notch Assignments");
        const headers = new Headers(response.headers);
        headers.set("content-type", "text/html; charset=utf-8");
        headers.set("cache-control", "no-store");
        return new Response(html, { status: response.status, headers });
      }
    }
    return response;
  }
};
