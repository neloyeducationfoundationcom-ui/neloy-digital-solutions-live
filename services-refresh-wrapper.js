import currentWorker from "./security-hardening-wrapper.js";

const SERVICE_CARDS = [
  `<article class="card"><div class="icon">FLY</div><h3>Flyer Design</h3><p>Professional promotional flyers designed for businesses, events, campaigns and social media.</p></article>`,
  `<article class="card"><div class="icon">BAN</div><h3>Banner Design</h3><p>Clean, attention-grabbing banners for websites, advertising, social platforms and promotions.</p></article>`,
  `<article class="card"><div class="icon">TMP</div><h3>Template Design</h3><p>Reusable branded templates for social media, presentations, marketing and business content.</p></article>`,
  `<article class="card"><div class="icon">UX</div><h3>UX Design</h3><p>User-focused website and interface design built for clarity, usability and better customer journeys.</p></article>`,
  `<article class="card"><div class="icon">AI</div><h3>AI-Friendly Automation Bots</h3><p>Smart website and messaging bots for lead guidance, automatic replies, customer support and workflow automation.</p></article>`
];

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
