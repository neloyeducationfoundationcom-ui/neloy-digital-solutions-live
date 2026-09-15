import app from "./seo-meta-cleanup-wrapper.js";

const PROJECTS = [
  {
    name: "Nervicia Construction",
    title: "Construction & Remodeling Website",
    url: "https://nerviciaconstruction.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnerviciaconstruction.com%2F?w=1200",
    alt: "Nervicia Construction remodeling and construction website project",
    description: "A service-focused construction and remodeling website with clear kitchen, bathroom and home-construction content, project visibility, FAQ information and strong paths for customer enquiries.",
    keywords: "Construction Website Design • Remodeling Website • Service Business Website"
  },
  {
    name: "Monarch Sustainable Landscaping",
    title: "Sustainable Landscaping Website",
    url: "https://monarchsustainablelandscaping.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmonarchsustainablelandscaping.com%2F?w=1200",
    alt: "Monarch Sustainable Landscaping eco friendly landscaping website project",
    description: "A landscaping website structured around sustainable outdoor services, native planting, water-wise irrigation, service education, client trust and quote-focused calls to action.",
    keywords: "Landscaping Website Design • Eco-Friendly Business Website • Lead Generation"
  },
  {
    name: "Meta Shades",
    title: "Sports Sunglasses E-commerce Website",
    url: "https://www.metashadesog.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.metashadesog.com%2F?w=1200",
    alt: "Meta Shades sports sunglasses ecommerce website project",
    description: "An e-commerce website for an active-lifestyle sunglasses brand, combining product collections, shopping links, customer galleries, brand storytelling and mobile-friendly product discovery.",
    keywords: "E-commerce Website Design • Product Website • Sports Brand Website"
  }
];

const PORTFOLIO_DESCRIPTION = "Explore Neloy Digital Solutions web design projects for construction, landscaping and e-commerce brands—responsive, SEO-ready websites built for leads and visibility.";

const STYLE = `<style id="nds-web-portfolio-aeo-style">
#nds-web-projects-2026{padding:72px 0;background:linear-gradient(180deg,#fff,#f6fbff);border-top:1px solid #dcecf5}
#nds-web-projects-2026 *{box-sizing:border-box}
#nds-web-projects-2026 .wpWrap{width:min(1120px,calc(100% - 32px));margin:auto}
#nds-web-projects-2026 .wpHead{max-width:820px;margin:0 auto 30px;text-align:center}
#nds-web-projects-2026 .wpEyebrow{display:inline-block;color:#075DFF;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
#nds-web-projects-2026 h2{margin:8px 0 10px;color:#0A2A5A;font-size:clamp(32px,5vw,48px);line-height:1.08}
#nds-web-projects-2026 .wpIntro{margin:0;color:#60758c;font-size:16px;line-height:1.7}
#nds-web-projects-2026 .wpGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:30px}
#nds-web-projects-2026 .wpCard{overflow:hidden;background:#fff;border:1px solid #cfe8f6;border-radius:22px;box-shadow:0 14px 34px rgba(10,42,90,.08)}
#nds-web-projects-2026 .wpImage{display:block;aspect-ratio:16/10;overflow:hidden;background:#edf7fc}
#nds-web-projects-2026 .wpImage img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
#nds-web-projects-2026 .wpBody{padding:20px}
#nds-web-projects-2026 .wpType{display:block;color:#075DFF;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
#nds-web-projects-2026 h3{margin:7px 0 5px;color:#0A2A5A;font-size:22px;line-height:1.25}
#nds-web-projects-2026 .wpName{margin:0 0 10px;color:#173357;font-weight:800}
#nds-web-projects-2026 .wpDesc{margin:0;color:#60758c;font-size:15px;line-height:1.65}
#nds-web-projects-2026 .wpKeywords{margin:13px 0 0;color:#52708c;font-size:12px;line-height:1.5}
#nds-web-projects-2026 .wpLink{display:inline-flex;margin-top:16px;color:#075DFF;font-weight:900;text-decoration:none}
#nds-web-projects-2026 .wpAnswers{max-width:900px;margin:42px auto 0;padding:26px;background:#fff;border:1px solid #cfe8f6;border-radius:22px}
#nds-web-projects-2026 .wpAnswers h3{margin-top:0;text-align:center}
#nds-web-projects-2026 .wpQa{padding:15px 0;border-top:1px solid #e5f0f6}
#nds-web-projects-2026 .wpQa:first-of-type{border-top:0}
#nds-web-projects-2026 .wpQa strong{display:block;color:#173357;margin-bottom:5px}
#nds-web-projects-2026 .wpQa p{margin:0;color:#60758c;line-height:1.65}
@media(max-width:900px){#nds-web-projects-2026 .wpGrid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){#nds-web-projects-2026{padding:52px 0}#nds-web-projects-2026 .wpGrid{grid-template-columns:1fr}}
</style>`;

function escapeAttr(value){
  return String(value).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function projectCards(){
  return PROJECTS.map((project) => `<article class="wpCard" itemscope itemtype="https://schema.org/CreativeWork"><a class="wpImage" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeAttr(project.name)} live website"><img src="${project.screenshot}" alt="${escapeAttr(project.alt)}" loading="lazy" decoding="async"></a><div class="wpBody"><span class="wpType">Web Design Project</span><h3 itemprop="name">${project.title}</h3><p class="wpName">${project.name}</p><p class="wpDesc" itemprop="description">${project.description}</p><p class="wpKeywords">${project.keywords}</p><a class="wpLink" itemprop="url" href="${project.url}" target="_blank" rel="noopener noreferrer">View Live Website →</a></div></article>`).join("");
}

function projectSection(){
  return `<section id="nds-web-projects-2026" aria-labelledby="nds-web-projects-title"><div class="wpWrap"><div class="wpHead"><span class="wpEyebrow">Selected Website Work</span><h2 id="nds-web-projects-title">Web Design Projects</h2><p class="wpIntro">Responsive website design examples across construction, sustainable landscaping and e-commerce. These projects show how service structure, brand presentation, customer journeys and search-friendly content can work together.</p></div><div class="wpGrid">${projectCards()}</div><div class="wpAnswers" aria-label="Web design answers"><h3>Website Design — Quick Answers</h3><div class="wpQa"><strong>What types of websites can Neloy Digital Solutions work on?</strong><p>Business websites, service websites, landing pages, portfolio websites and e-commerce experiences can be structured around the brand, audience, goals and approved project scope.</p></div><div class="wpQa"><strong>Can website projects be prepared for search and AI discovery?</strong><p>Yes. A project can include responsive structure, clear headings, useful service content, metadata and structured information that help search engines and AI answer systems understand the website.</p></div></div></div></section>`;
}

function portfolioSchema(){
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Neloy Digital Solutions Web Design Projects",
    description: PORTFOLIO_DESCRIPTION,
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: `${project.name} - ${project.title}`,
        description: project.description,
        url: project.url,
        keywords: project.keywords
      }
    }))
  };
}

function enhancePortfolio(html){
  if(!html.includes('id="nds-web-projects-2026"')){
    const section = projectSection();
    const marker = '<section id="logo-design-projects"';
    const pos = html.indexOf(marker);
    if(pos !== -1) html = html.slice(0,pos) + section + html.slice(pos);
    else if(html.includes('</main>')) html = html.replace('</main>', section + '</main>');
    else html += section;
  }

  if(!html.includes('id="nds-web-portfolio-aeo-style"') && html.includes('</head>')){
    html = html.replace('</head>', STYLE + '</head>');
  }

  const descriptionTag = `<meta name="description" content="${escapeAttr(PORTFOLIO_DESCRIPTION)}">`;
  if(/<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/i.test(html)){
    html = html.replace(/<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/i, descriptionTag);
  } else if(html.includes('</head>')){
    html = html.replace('</head>', descriptionTag + '\n</head>');
  }

  if(!html.includes('id="nds-web-project-schema"') && html.includes('</head>')){
    const json = JSON.stringify(portfolioSchema()).replace(/</g,"\\u003c");
    html = html.replace('</head>', `<script id="nds-web-project-schema" type="application/ld+json">${json}</script></head>`);
  }

  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await app.fetch(request, env, ctx);
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";
    const type = (response.headers.get("content-type") || "").toLowerCase();
    const isPortfolio = path === "/showcase" || path === "/portfolio";

    if(request.method !== "GET" || !isPortfolio || !type.includes("text/html")) return response;

    const html = enhancePortfolio(await response.text());
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("content-type", "text/html; charset=utf-8");
    headers.set("cache-control", "no-store");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
