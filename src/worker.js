// Keep the existing Worker pipeline intact while giving routing a stable entry.
import currentWorker from "../premium-site-wrapper.js";

export default {
  fetch(request, env, ctx) {
    return currentWorker.fetch(request, env, ctx);
  },
};
