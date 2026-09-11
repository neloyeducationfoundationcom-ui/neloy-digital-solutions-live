import currentWorker from "./lead-cors-wrapper.js";

const SERVICE_CARDS = [
  `<article class="card"><div class="icon">FLY</div><h3>Flyer Design</h3><p>Professional promotional flyers designed for businesses, events, campaigns and social media.</p></article>`,
  `<article class="card"><div class="icon">BAN</div><h3>Banner Design</h3><p>Clean, attention-grabbing banners for websites, advertising, social platforms and promotions.</p></article>`,
  `<article class="card"><div class="icon">TMP</div><h3>Template Design</h3><p>Reusable branded templates for social media, presentations, marketing and business content.</p></article>`,
  `<article class="card"><div class="icon">UX</div><h3>UX Design</h3><p>User-focused website and interface design built for clarity, usability and better customer journeys.</p></article>`,
  `<article class="card"><div class="icon">AI</div><h3>AI-Friendly Automation Bots</h3><p>Smart website and messaging bots for lead guidance, automatic replies, customer support and workflow automation.</p></article>`
];


const BUSINESS_STATS = `<section id="business-results" class="neloy-business-stats" aria-label="Neloy Digital Solutions in numbers"><div class="wrap"><h2 class="neloy-stats-title">Neloy Digital Solutions in Numbers</h2><dl class="neloy-stats-grid"><div><dt>Projects Completed</dt><dd>100+</dd></div><div><dt>Years Experience</dt><dd>10+</dd></div><div><dt>Happy Clients</dt><dd>40+</dd></div><div><dt>Team Members</dt><dd>10+</dd></div><div><dt>Reviews</dt><dd class="neloy-review-count">15 out of 15</dd></div></dl></div></section>`;
const BUSINESS_STATS_STYLE = `<style id="neloy-business-stats-style">
#business-results{display:block!important;visibility:visible!important;opacity:1!important;transform:none!important;position:relative;padding:24px 0;background:#edf8ff;border-block:1px solid #c5e6fa;scroll-margin-top:110px}
#business-results .wrap{width:calc(100% - 32px);max-width:1160px;margin-inline:auto;box-sizing:border-box}
#business-results .neloy-stats-title{margin:0 0 18px;text-align:center;font-size:clamp(18px,2.3vw,26px);line-height:1.35;color:#10376b!important}
#business-results *{box-sizing:border-box}
.neloy-stats-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px;margin:0}
.neloy-stats-grid>div{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-width:0;padding:22px 12px;background:#fff;border:1px solid #c5e6fa;border-radius:18px;text-align:center}
.neloy-stats-grid dt{color:#173b61!important;font-size:16px;font-weight:600;line-height:1.5}
.neloy-stats-grid dd{order:-1;margin:0;color:#0866ca!important;font-size:clamp(28px,3vw,40px);font-weight:800;line-height:1.15}
.neloy-stats-grid dd.neloy-review-count{font-size:clamp(22px,2vw,28px)}
@media(max-width:800px){.neloy-stats-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.neloy-stats-grid>div:last-child{grid-column:1/-1}}
@media(max-width:400px){.neloy-stats-grid{gap:10px}.neloy-stats-grid>div{padding:22px 8px}.neloy-stats-grid dt{font-size:14px}}
</style>`;

function replaceCard(html, title, replacement) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<article class="card">(?:(?!<\\/article>)[\\s\\S])*?<h3>${escaped}<\\/h3>(?:(?!<\\/article>)[\\s\\S])*?<\\/article>`, "i");
  return html.replace(re, replacement);
}

function refreshServices(html) {
  if (!html.includes('id="services"')) return html;

  html = replaceCard(html, "Email Setup", SERVICE_CARDS[0]);
  html = replaceCard(html, "Virtual Business Support", SERVICE_CARDS[1]);
  html = replaceCard(html, "AI Automation", SERVICE_CARDS[4]);

  if (!html.includes("<h3>Template Design</h3>")) {
    const aiCard = SERVICE_CARDS[4];
    html = html.replace(aiCard, SERVICE_CARDS[2] + SERVICE_CARDS[3] + aiCard);
  }

  html = html.replace('<option>Email Setup</option>', '<option>Flyer Design</option>');
  html = html.replace('<option>Virtual Business Support</option>', '<option>Banner Design</option>');
  html = html.replace('<option>AI Automation</option>', '<option>Template Design</option><option>UX Design</option><option>AI-Friendly Automation Bots</option>');

  html = html.replace(/<b>7\+<\/b><span>Core services<\/span>/i, '<b>10+</b><span>Core services</span>');
  if (!html.includes('class="neloy-business-stats"')) {
    html = html.replace(/(<main\b[^>]*>)/i, '$1' + BUSINESS_STATS);
    html = html.replace('</head>', BUSINESS_STATS_STYLE + '</head>');
  }
  return html;
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const url = new URL(request.url);
    const type = response.headers.get("content-type") || "";

    if (request.method === "GET" && type.includes("text/html") && !url.pathname.startsWith("/admin")) {
      const html = refreshServices(await response.text());
      const headers = new Headers(response.headers);
      headers.set("content-type", "text/html; charset=utf-8");
      headers.set("cache-control", "no-store");
      return new Response(html, {status: response.status, statusText: response.statusText, headers});
    }

    return response;
  }
};
