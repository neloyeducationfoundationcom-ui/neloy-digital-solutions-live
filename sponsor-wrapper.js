import currentWorker from "./wrapper.js";

const TOP_NOTCH_LOGO = "data:image/webp;base64,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";

function addSponsorSection(html) {
  const section = `
<section id="partners" class="alt">
  <div class="wrap">
    <div class="sectionHead">
      <span class="eyebrow">Sponsor Partner</span>
      <h2>Top Notch Assignment</h2>
      <p>Official sponsor partner supporting clients across the U.K., Malaysia, and Bangladesh.</p>
    </div>
    <div class="card" style="display:grid;grid-template-columns:180px 1fr;gap:28px;align-items:center;max-width:760px;margin:auto">
      <img src="${TOP_NOTCH_LOGO}" alt="Top Notch Assignment logo" style="width:165px;height:147px;object-fit:cover;border-radius:24px;display:block;margin:auto">
      <div>
        <h3 style="margin-top:0;font-size:28px">Top Notch Assignment</h3>
        <p style="margin:8px 0;color:#9fb7cf">Sponsor Partner</p>
        <p style="margin:8px 0"><strong>Office locations:</strong> U.K. • Malaysia • Bangladesh</p>
      </div>
    </div>
  </div>
</section>`;

  if (html.includes('<section id="testimonials"')) {
    return html.replace('<section id="testimonials"', section + '<section id="testimonials"');
  }
  return html.replace('</main>', section + '</main>');
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
        return new Response(addSponsorSection(html), { status: response.status, headers });
      }
    }
    return response;
  }
};
