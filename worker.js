export default {
  async fetch(request, env, ctx) {
    return new Response("Neloy Digital Solutions is working!", {
      headers: {
        "content-type": "text/plain; charset=UTF-8"
      }
    });
  }
};
