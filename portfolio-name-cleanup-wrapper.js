import currentWorker from "./terms-page-wrapper.js";

function removePortfolioClientName(html) {
  return html
    .replace(/El\s+Patron\s+Release/gi, "Podcast Editing Sample")
    .replace(/El\s+Patronn?/gi, "Podcast Editing Sample");
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const type = response.headers.get("content-type") || "";
    const url = new URL(request.url);

    if (request.method !== "GET" || !response.ok || !type.includes("text/html") || url.pathname.startsWith("/admin")) {
      return response;
    }

    const html = removePortfolioClientName(await response.text());
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    headers.set("cache-control", "no-store");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
