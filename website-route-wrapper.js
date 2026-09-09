import currentWorker from "./brand-logo-theme-wrapper.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && (url.pathname === "/website" || url.pathname === "/website/")) {
      url.pathname = "/";
      return Response.redirect(url.toString(), 302);
    }

    return currentWorker.fetch(request, env, ctx);
  }
};
