import currentWorker from "./final-wrapper.js";
import CYNTHIA_PHOTO from "./cynthia-gomez-image.js";

function addCynthiaTestimonial(html) {
  const card = `
<article class="testCard" style="text-align:center">
  <img src="${CYNTHIA_PHOTO}" alt="Cynthia Gomez" style="width:120px;height:120px;object-fit:cover;border-radius:50%;border:3px solid #29dfff;margin:0 auto 14px;display:block">
  <h3 style="margin:0 0 4px">Cynthia Gomez</h3>
  <div style="color:#29dfff;font-weight:800;margin-bottom:14px">Owner of Simplicity Advertising</div>
  <p style="font-size:16px;line-height:1.7">“Neloy and his team are highly skilled creators and designers. They always create the best designs, and I really appreciate how much patience they have when it comes to revisions. I will be working with his team for many years to come. I appreciate their honesty and integrity in their business partnership. I only have very nice things to say about these guys, and I highly recommend them to other entrepreneurs.”</p>
</article>`;

  const placeholder = '<article class="testCard"><h3>Client testimonial slot</h3><p>Add a real testimonial later.</p></article>';
  if (html.includes(placeholder)) return html.replace(placeholder, card);

  const genericPlaceholder = '<article class="testCard"><h3>Client testimonial slot</h3><p>Add a genuine testimonial later.</p></article>';
  if (html.includes(genericPlaceholder)) return html.replace(genericPlaceholder, card);

  const gridStart = '<div class="testGrid">';
  if (html.includes(gridStart)) return html.replace(gridStart, gridStart + card);

  return html;
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      const type = response.headers.get("content-type") || "";
      if (type.includes("text/html")) {
        const html = await response.text();
        const headers = new Headers(response.headers);
        headers.set("content-type", "text/html; charset=utf-8");
        headers.set("cache-control", "no-store");
        return new Response(addCynthiaTestimonial(html), {
          status: response.status,
          headers
        });
      }
    }

    return response;
  }
};
