import app from "./web-portfolio-aeo-wrapper.js";

const PROJECTS = [
  {
    name: "Nervicia Construction",
    title: "Construction & Remodeling Website",
    url: "https://nerviciaconstruction.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnerviciaconstruction.com%2F?w=1200",
    alt: "Nervicia Construction website design project by Neloy Digital Solutions",
    description: "A service-focused construction and remodeling website with clear service navigation, project visibility, enquiry paths and mobile-friendly presentation.",
    keywords: "Construction Website Design • Remodeling Website • Service Business Website"
  },
  {
    name: "Monarch Sustainable Landscaping",
    title: "Sustainable Landscaping Website",
    url: "https://monarchsustainablelandscaping.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmonarchsustainablelandscaping.com%2F?w=1200",
    alt: "Monarch Sustainable Landscaping website design project by Neloy Digital Solutions",
    description: "A sustainability-focused landscaping website structured around outdoor services, educational content, client trust and clear quote-focused calls to action.",
    keywords: "Landscaping Website Design • Sustainable Business Website • Lead Generation"
  },
  {
    name: "Meta Shades",
    title: "Sports Sunglasses E-commerce Website",
    url: "https://www.metashadesog.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.metashadesog.com%2F?w=1200",
    alt: "Meta Shades ecommerce website design project by Neloy Digital Solutions",
    description: "An e-commerce website for an active-lifestyle sunglasses brand with product discovery, shopping paths, brand storytelling and responsive browsing across devices.",
    keywords: "E-commerce Website Design • Product Website • Sports Brand Website"
  }
];

const TITLE = "Website Design Services & Portfolio | Neloy Digital Solutions";
const DESCRIPTION = "Responsive website design for businesses, WordPress and e-commerce, with selected Neloy Digital Solutions projects built for leads and search visibility.";

const STYLE = `<style id="nds-website-portfolio-style">
#nds-website-portfolio{padding:64px 0;background:#f7fcff;border-block:1px solid #dcecf5}
#nds-website-portfolio *{box-sizing:border-box}
#nds-website-portfolio .wdWrap{width:min(1120px,calc(100% - 32px));margin:auto}
#nds-website-portfolio .wdHead{max-width:820px;margin:0 auto 30px;text-align:center}
#nds-website-portfolio .wdEyebrow{display:inline-block;color:#075DFF;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
#nds-website-portfolio h2{margin:8px 0 10px;color:#0A2A5A;font-size:clamp(30px,5vw,46px);line-height:1.08}
#nds-website-portfolio .wdIntro{margin:0;color:#60758c;font-size:16px;line-height:1.7}
#nds-website-portfolio .wdGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:30px}
#nds-website-portfolio .wdCard{overflow:hidden;background:#fff;border:1px solid #c9e8f7;border-radius:22px;box-shadow:0 14px 34px rgba(7,93,255,.08)}
#nds-website-portfolio .wdImage{display:block;aspect-ratio:16/10;overflow:hidden;background:#edf7fc}
#nds-website-portfolio .wdImage img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
#nds-website-portfolio .wdBody{padding:20px}
#nds-website-portfolio .wdType{display:block;color:#075DFF;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
#nds-website-portfolio h3{margin:7px 0 5px;color:#0A2A5A;font-size:22px;line-height:1.25}
#nds-website-portfolio .wdName{margin:0 0 10px;color:#173357;font-weight:800}
#nds-website-portfolio .wdDesc{margin:0;color:#60758c;font-size:15px;line-height:1.65}
#nds-website-portfolio .wdKeywords{margin:13px 0 0;color:#52708c;font-size:12px;line-height:1.5}
#nds-website-portfolio .wdLink{display:inline-flex;margin-top:16px;color:#075DFF;font-weight:900;text-decoration:none}
#nds-website-portfolio .wdAnswer{max-width:900px;margin:38px auto 0;padding:24px;background:#fff;border:1px solid #c9e8f7;border-radius:20px}
#nds-website-portfolio .wdAnswer h3{margin-top:0;text-align:center}
#nds-website-portfolio .wdAnswer p{margin:0;color:#60758c;line-height:1.7;text-align:center}
#nds-website-portfolio .wdLinks{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:18px}
#nds-website-portfolio .wdLinks a{color:#075DFF;font-weight:900;text-decoration:none}
@media(max-width:900px){#nds-website-portfolio .wdGrid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){#nds-website-portfolio{padding:48px 0}#nds-website-portfolio .wdGrid{grid-template-columns:1fr}}
</style>`;

function escapeAttr(value){
  return String(value)
    .replace(/&/g,"&amp;")
    .replace(/"/g,"&quot;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}

function cards(){
  return PROJECTS.map((project) => `<article class="wdCard" itemscope itemtype="https://schema.org/CreativeWork"><a class="wdImage" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeAttr(project.name)} live website"><img src="${project.screenshot}" alt="${escapeAttr(project.alt)}" loading="lazy" decoding="async"></a><div class="wdBody"><span class="wdType">Selected Web Design Project</span><h3 itemprop="name">${project.title}</h3><p class="wdName">${project.name}</p><p class="wdDesc" itemprop="description">${project.description}</p><p class="wdKeywords">${project.keywords}</p><a class="wdLink" itemprop="url" href="${project.url}" target="_blank" rel="noopener noreferrer">View Live Website →</a></div></article>`).join("");
}

function portfolioSection(){
  return `<section id="nds-website-portfolio" aria-labelledby="nds-website-portfolio-title"><div class="wdWrap"><div class="wdHead"><span class="wdEyebrow">Selected Website Work</span><h2 id="nds-website-portfolio-title">Website Design Portfolio</h2><p class="wdIntro">Explore selected website projects across construction, sustainable landscaping and e-commerce. Each example shows how clear structure, responsive design, brand presentation and customer journeys can support a business online.</p></div><div class="wdGrid">${cards()}</div><div class="wdAnswer"><h3>What kind of website design work does Neloy Digital Solutions provide?</h3><p>Neloy Digital Solutions works on business websites, service websites, landing pages, WordPress projects, e-commerce experiences, lead-generation forms and selected AI or automation integrations based on the approved project scope.</p><div class="wdLinks"><a href="/logo-design">Logo Design</a><a href="/social-media-design">Social Media Design</a><a href="/showcase">Full Portfolio</a><a href="/#contact">Start a Project</a></div></div></div></section>`;
}

function schema(origin){
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${origin}/website-design#service`,
        name: "Website Design Services",
        serviceType: [
          "Website Design",
          "Business Website Design",
          "WordPress Website Design",
          "E-commerce Website Design",
          "Landing Page Design",
          "Lead Generation Website Design"
        ],
        provider: {
          "@type": "Organization",
          name: "Neloy Digital Solutions",
          url: `${origin}/`
        },
        url: `${origin}/website-design`,
        description: DESCRIPTION
      },
      {
        "@type": "ItemList",
        "@id": `${origin}/website-design#portfolio`,
        name: "Neloy Digital Solutions Website Design Portfolio",
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
      }
    ]
  };
}

function replaceOrInsertMeta(html, name, content){
  const tag = `<meta name="${name}" content="${escapeAttr(content)}">`;
  const re = new RegExp(`<meta\\b(?=[^>]*\\bname\\s*=\\s*["']${name}["'])[^>]*>`, "i");
  if(re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `${tag}\n</head>`);
}

function replaceOrInsertProperty(html, property, content){
  const tag = `<meta property="${property}" content="${escapeAttr(content)}">`;
  const re = new RegExp(`<meta\\b(?=[^>]*\\bproperty\\s*=\\s*["']${property}["'])[^>]*>`, "i");
  if(re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `${tag}\n</head>`);
}

function enhance(html, origin){
  if(/<title>[\s\S]*?<\/title>/i.test(html)) html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${TITLE}</title>`);
  else html = html.replace(/<\/head>/i, `<title>${TITLE}</title>\n</head>`);

  html = replaceOrInsertMeta(html, "description", DESCRIPTION);
  html = replaceOrInsertProperty(html, "og:title", TITLE);
  html = replaceOrInsertProperty(html, "og:description", DESCRIPTION);
  html = replaceOrInsertProperty(html, "og:type", "website");
  html = replaceOrInsertProperty(html, "og:url", `${origin}/website-design`);

  const canonical = `<link rel="canonical" href="${origin}/website-design">`;
  if(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/i.test(html)) html = html.replace(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/i, canonical);
  else html = html.replace(/<\/head>/i, `${canonical}\n</head>`);

  if(!html.includes('id="nds-website-portfolio-style"')) html = html.replace(/<\/head>/i, `${STYLE}\n</head>`);

  if(!html.includes('id="nds-website-service-schema"')){
    const json = JSON.stringify(schema(origin)).replace(/</g,"\\u003c");
    html = html.replace(/<\/head>/i, `<script id="nds-website-service-schema" type="application/ld+json">${json}</script>\n</head>`);
  }

  if(!html.includes('id="nds-website-portfolio"')){
    const section = portfolioSection();
    const processMarker = '<section class="spSection soft">';
    const processPos = html.indexOf(processMarker);
    if(processPos !== -1) html = html.slice(0, processPos) + section + html.slice(processPos);
    else {
      const ctaMarker = '<section class="spCta">';
      const ctaPos = html.indexOf(ctaMarker);
      if(ctaPos !== -1) html = html.slice(0, ctaPos) + section + html.slice(ctaPos);
      else if(html.includes('</main>')) html = html.replace('</main>', `${section}</main>`);
    }
  }

  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await app.fetch(request, env, ctx);
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";
    const type = (response.headers.get("content-type") || "").toLowerCase();

    if(request.method !== "GET" || path !== "/website-design" || !type.includes("text/html")) return response;

    const html = enhance(await response.text(), url.origin);
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
