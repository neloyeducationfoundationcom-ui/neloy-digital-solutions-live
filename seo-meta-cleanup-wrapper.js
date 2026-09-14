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
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, descriptionTag);
  } else {
    html = html.replace(/<\/head>/i, `${descriptionTag}\n</head>`);
  }

  return html;
}

export default {
  async fetch(request, env, ctx) {
    const response = await app.fetch(request, env, ctx);
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";
    const meta = PAGE_META[path];
    const type = (response.headers.get("content-type") || "").toLowerCase();

    if (!meta || !type.includes("text/html")) {
      return response;
    }

    const html = await response.text();
    const headers = new Headers(response.headers);
    headers.delete("content-length");

    return new Response(updateMeta(html, meta), {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
