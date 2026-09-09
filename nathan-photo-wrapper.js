import premiumWorker from "./premium-redesign-worker.js";
import legacyWorker from "./wrapper.js";

function extractNathanPhoto(html) {
  const altMatch = html.match(/<img[^>]+src="([^"]+)"[^>]+alt="Nathan Webster"/i);
  if (altMatch?.[1]) return altMatch[1];
  const cardMatch = html.match(/Nathan Webster[\s\S]{0,8000}?<img[^>]+src="([^"]+)"/i);
  if (cardMatch?.[1]) return cardMatch[1];
  const dataMatch = html.match(/data:image\/jpeg;base64,[A-Za-z0-9+/=]+/);
  return dataMatch?.[0] || "";
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const premiumResponse = await premiumWorker.fetch(request, env, ctx);

    if (request.method !== "GET" || url.pathname !== "/") return premiumResponse;
    const type = premiumResponse.headers.get("content-type") || "";
    if (!type.includes("text/html")) return premiumResponse;

    let html = await premiumResponse.text();

    try {
      const legacyResponse = await legacyWorker.fetch(request, env, ctx);
      const legacyType = legacyResponse.headers.get("content-type") || "";
      if (legacyType.includes("text/html")) {
        const legacyHtml = await legacyResponse.text();
        const photo = extractNathanPhoto(legacyHtml);
        if (photo) {
          html = html.replace(
            '<div class="avatarFallback">NW</div>',
            `<img class="avatar" src="${photo}" alt="Nathan Webster">`
          );
        }
      }
    } catch (_) {}

    const headers = new Headers(premiumResponse.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    headers.set("cache-control", "no-store");
    return new Response(html, {status: premiumResponse.status, headers});
  }
};
