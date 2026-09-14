import app from "./strict-security-wrapper.js";

const PAGE_META = {
  "/": {
    title: "Neloy Digital Solutions | AEO, Web, Design & Video",
    description: "Neloy Digital Solutions helps businesses grow with AEO, website design, graphic design, video editing and brand identity for stronger digital visibility."
  },
  "/logo-design": {
    title: "Professional Logo Design | Neloy Digital Solutions",
    description: "Get a professional, original logo built around your business, audience and brand identity. Clear, memorable logo design by Neloy Digital Solutions."
  },
  "/showcase": {
    title: "Creative Portfolio & Showcase | Neloy Digital Solutions",
    description: "Explore Neloy Digital Solutions projects across branding, logo design, websites, graphic design and video editing. See how we turn ideas into digital work."
  },
  "/portfolio": {
    title: "Creative Portfolio & Showcase | Neloy Digital Solutions",
    description: "Explore Neloy Digital Solutions projects across branding, logo design, websites, graphic design and video editing. See how we turn ideas into digital work."
  }
};

const AEO_TOPICS = [
  "Answer Engine Optimisation (AEO)",
  "AI Search Optimisation",
  "Website Design",
  "Graphic Design",
  "Logo Design",
  "Brand Identity",
  "Video Editing",
  "Social Media Design",
  "Digital Marketing Support",
  "AI Automation"
];

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function updateMeta(html, meta) {
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  const descriptionTag = `<meta name="description" content="${escapeAttr(meta.description)}">`;
  html = html.replace(/<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/ig, "");
  html = html.replace(/<\/head>/i, `${descriptionTag}\n</head>`);

  return html;
}

function enhanceSchema(html) {
  return html.replace(
    /<script\s+id=["']nds-schema["'][^>]*>([\s\S]*?)<\/script>/i,
    (full, rawJson) => {
      try {
        const schema = JSON.parse(rawJson);
        const graph = Array.isArray(schema?.["@graph"]) ? schema["@graph"] : [];
        const organization = graph.find((node) => node?.["@type"] === "Organization");
        const business = graph.find((node) => node?.["@type"] === "ProfessionalService");
        const website = graph.find((node) => node?.["@type"] === "WebSite");

        if (organization) {
          organization.description = "Neloy Digital Solutions provides AEO, AI search optimisation, website design, graphic design, logo design, video editing, brand identity and AI automation services for businesses.";
          organization.knowsAbout = AEO_TOPICS;
          organization.sameAs = Array.from(new Set([
            ...(Array.isArray(organization.sameAs) ? organization.sameAs : []),
            "https://www.facebook.com/profile.php?id=61594451692541",
            "https://www.instagram.com/neloydigital.solutions/",
            "https://www.linkedin.com/company/neloy-digital-solutions/"
          ]));
        }

        if (business) {
          business.description = "Digital services including Answer Engine Optimisation (AEO), AI search optimisation, website design, graphic design, logo design, video editing, brand identity, social media design and AI automation.";
          business.serviceType = AEO_TOPICS;
          business.hasOfferCatalog = {
            "@type": "OfferCatalog",
            name: "Neloy Digital Solutions Services",
            itemListElement: AEO_TOPICS.map((name) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name }
            }))
          };
        }

        if (website) {
          website.inLanguage = "en";
        }

        const enhanced = JSON.stringify(schema).replace(/</g, "\\u003c");
        return `<script id="nds-schema" type="application/ld+json">${enhanced}</script>`;
      } catch {
        return full;
      }
    }
  );
}

function llmsText(origin) {
  return `# Neloy Digital Solutions\n\nWebsite: ${origin}/\n\nNeloy Digital Solutions is a digital services agency focused on Answer Engine Optimisation (AEO), AI search optimisation, website design, graphic design, logo design, brand identity, video editing, social media design, digital marketing support and AI automation.\n\n## Main pages\n- Home: ${origin}/\n- Logo Design: ${origin}/logo-design\n- Website Design: ${origin}/website-design\n- Social Media Design: ${origin}/social-media-design\n- Portfolio / Showcase: ${origin}/showcase\n\n## Social profiles\n- Facebook: https://www.facebook.com/profile.php?id=61594451692541\n- Instagram: https://www.instagram.com/neloydigital.solutions/\n- LinkedIn: https://www.linkedin.com/company/neloy-digital-solutions/\n`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/llms.txt") {
      return new Response(llmsText(url.origin), {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "cache-control": "public, max-age=3600"
        }
      });
    }

    const response = await app.fetch(request, env, ctx);
    const path = url.pathname.replace(/\/$/, "") || "/";
    const meta = PAGE_META[path];
    const type = (response.headers.get("content-type") || "").toLowerCase();

    if (!type.includes("text/html")) {
      return response;
    }

    let html = await response.text();
    if (meta) html = updateMeta(html, meta);
    html = enhanceSchema(html);

    const headers = new Headers(response.headers);
    headers.delete("content-length");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
