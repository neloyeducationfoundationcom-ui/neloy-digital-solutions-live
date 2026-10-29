// Removes the Sponsor Partner section (/, /showcase, /portfolio) and the homepage
// "Where we work from" block; adds an "Our Offices" section before the homepage footer.
const OFFICES = `<section id="nds-our-offices" style="padding:56px 0"><style>
#nds-our-offices .w{max-width:1180px;margin:0 auto;padding:0 24px}
#nds-our-offices .k{text-align:center;color:#086af6;font-weight:700;letter-spacing:.12em;font-size:12px;text-transform:uppercase}
#nds-our-offices h2{text-align:center;font-size:30px;margin:0 0 8px;color:#0A2A5A}
#nds-our-offices .off{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:28px}
#nds-our-offices .hq{grid-column:1/-1;background:linear-gradient(135deg,#075DFF,#0A2A5A);color:#fff;border-radius:20px;padding:30px;display:flex;align-items:center;gap:18px}
#nds-our-offices .hq b{font-size:26px}
#nds-our-offices .tag{background:#F4B400;color:#071a2f;font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;text-transform:uppercase}
#nds-our-offices .oc{background:#fff;border:1px solid #dce9f8;border-radius:16px;padding:22px;font-weight:700;font-size:19px;color:#0A2A5A}
#nds-our-offices small{display:block;font-weight:500;font-size:13px;color:#60758c;margin-bottom:6px}
#nds-our-offices .hq small{color:#c9e8f7}
#nds-our-offices .fl{font-size:30px}
@media(max-width:700px){#nds-our-offices .off{grid-template-columns:1fr}#nds-our-offices .hq{flex-wrap:wrap}}
</style><div class="w"><div class="k">Global presence</div><h2>Our White-Label Partner Offices</h2>
<div class="off"><div class="hq"><span class="fl">🇬🇧</span><div><small>Headquarters</small><b>United Kingdom</b></div><span class="tag">HQ</span></div>
<div class="oc"><span class="fl">🇲🇾</span><small>Office</small>Malaysia</div><div class="oc"><span class="fl">🇺🇸</span><small>Office</small>United States</div><div class="oc"><span class="fl">🇨🇦</span><small>Office</small>Canada</div></div></div></section>`;

const PARTNER_ROW = `<section id="nds-white-label-partner" style="padding:22px 0 8px"><style>
#nds-white-label-partner .w{max-width:1180px;margin:0 auto;padding:0 24px;text-align:center}
#nds-white-label-partner .k{color:#086af6;font-weight:700;letter-spacing:.12em;font-size:12px;text-transform:uppercase;margin-bottom:12px}
#nds-white-label-partner .pc{display:inline-flex;align-items:center;background:#fff;border:1px solid #dce9f8;border-radius:18px;padding:12px 20px;box-shadow:0 8px 24px rgba(7,26,47,.06)}
#nds-white-label-partner .pc img{height:72px;max-width:200px;object-fit:contain;border-radius:10px;display:block}
@media(max-width:700px){#nds-white-label-partner .pc img{height:60px}}
</style><div class="w"><div class="k">White-Label Partner</div><div class="pc"><img src="/partner-simplicity-in-advertising.png" alt="Simplicity in Advertising" width="200" height="72" loading="lazy" decoding="async"></div></div></section>`;

const PATHS = new Set(["/", "/showcase", "/portfolio"]);

export function cleanupHtml(html, path) {
  html = html.replace(/<section class="partner"><div class="wrap"><div class="sectionHead"><span class="eyebrow">Sponsor Partner<\/span>[\s\S]*?<\/section>/g, "");
  if (path === "/") {
    html = html.replace(/<div id="nds-working-locations"[\s\S]*?<\/div>(?=<\/section>)/, "");
    if (!html.includes('id="nds-white-label-partner"')) html = html.replace('<section id="business-results"', PARTNER_ROW + '<section id="business-results"');
    if (!html.includes('id="nds-our-offices"')) html = html.replace('<footer class="footer">', OFFICES + '<footer class="footer">');
  }
  return html;
}

export async function withPageCleanup(request, responsePromise) {
  const response = await responsePromise;
  const path = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
  if (request.method !== "GET" || !PATHS.has(path)) return response;
  if (!(response.headers.get("content-type") || "").includes("text/html")) return response;
  const html = cleanupHtml(await response.text(), path);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
}
