// Keep the existing Worker pipeline intact while giving routing a stable entry.
import existingWorker from "../premium-site-wrapper.js";
import { withChat } from "./chat/worker.js";
const currentWorker = withChat(existingWorker);

const CANONICAL_ORIGIN = "https://neloydigitalsolutions.com";

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Redirect only public GET/HEAD requests on this Worker's default hostname.
    // Preserve admin, API, and non-public methods for existing integrations.
    if (
      url.hostname.endsWith(".workers.dev") &&
      (request.method === "GET" || request.method === "HEAD") &&
      !url.pathname.startsWith("/admin") &&
      !url.pathname.startsWith("/api/")
    ) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301);
    }
    return currentWorker.fetch(request, env, ctx);
  },
};
