import currentWorker from "./two-page-motion-wrapper.js";
import legacySponsorWorker from "./final-wrapper.js";
import dineshWorker from "./dinesh-testimonial-wrapper.js";

const BLOCKED_PATHS = [
  "/.env", "/.git", "/.git/config", "/wp-admin", "/wp-login.php", "/xmlrpc.php",
  "/phpmyadmin", "/server-status", "/config.php", "/composer.json", "/vendor/phpunit"
];

const ABOUT_STYLE = `<style id="founder-about-style">
.aboutFounder{padding:76px 0;background:linear-gradient(135deg,#F8FDFF,#EAF8FF);position:relative;overflow:hidden}
.aboutFounder:before{content:"";position:absolute;width:260px;height:260px;border-radius:50%;background:rgba(18,223,243,.16);right:-90px;top:-90px}
.aboutFounderGrid{display:grid;grid-template-columns:1.12fr .88fr;gap:28px;align-items:stretch;position:relative;z-index:2}
.aboutFounderCopy,.aboutFounderJourney{background:rgba(255,255,255,.9);border:1px solid #C9E8F7;border-radius:26px;padding:30px;box-shadow:0 18px 48px rgba(7,93,255,.08)}
.aboutFounder h2{font-size:clamp(36px,4.5vw,54px);line-height:1.05;margin:10px 0 18px;color:#0A2A5A}
.aboutFounder p{color:#58738E;font-size:16px;margin:0 0 15px}
.aboutFounder .founderName{font-weight:1000;color:#075DFF}
.aboutFounderJourney h3{margin:0 0 18px;color:#0A2A5A;font-size:24px}
.journeyItem{display:grid;grid-template-columns:54px 1fr;gap:14px;align-items:start;padding:13px 0;border-bottom:1px solid #E2F1F8}
.journeyItem:last-child{border-bottom:0}.journeyYear{width:54px;height:38px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#075DFF,#12DFF3);color:#fff;font-weight:1000;font-size:12px}.journeyItem b{display:block;color:#173357;margin-bottom:3px}.journeyItem span{color:#6A8298;font-size:14px}
.aboutFounderTags{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}.aboutFounderTags span{padding:7px 10px;border-radius:999px;background:#EDF8FF;border:1px solid #BFE6F6;color:#075DFF;font-size:11px;font-weight:900}
@media(max-width:820px){.aboutFounderGrid{grid-template-columns:1fr}.aboutFounder{padding:58px 0}.aboutFounderCopy,.aboutFounderJourney{padding:22px}}
</style>`;

const ABOUT_SECTION = `<section id="about-founder" class="aboutFounder"><div class="wrap"><div class="aboutFounderGrid"><div class="aboutFounderCopy"><span class="eyebrow">About Me</span><h2>From freelancer to founder of Neloy Digital Solutions.</h2><p><span class="founderName">I'm Al Mustafa, the founder behind the Neloy brand and Neloy Digital Solutions.</span> My professional journey started in 2013, working as a content writer, article writer and data-entry freelancer.</p><p>As I began receiving larger freelance projects, I built a team and expanded into SEO-friendly content and wider digital services. Over time, that journey grew into graphic design, video editing, website design, coding, automation and practical business support.</p><p>Today, my focus is helping entrepreneurs and growing businesses build a professional digital presence with creative work, technology and reliable support.</p><div class="aboutFounderTags"><span>FOUNDER</span><span>FREELANCE SINCE 2013</span><span>DESIGN</span><span>WEB</span><span>CODING</span><span>AUTOMATION</span></div></div><div class="aboutFounderJourney"><h3>My Journey</h3><div class="journeyItem"><div class="journeyYear">2013</div><div><b>Freelancing began</b><span>Content writing, article writing and data-entry work.</span></div></div><div class="journeyItem"><div class="journeyYear">NEXT</div><div><b>Built a team</b><span>Expanded capacity for larger client projects and SEO-focused content.</span></div></div><div class="journeyItem"><div class="journeyYear">GROW</div><div><b>Expanded digital skills</b><span>Graphic design, video editing, web design, coding and business support.</span></div></div><div class="journeyItem"><div class="journeyYear">NOW</div><div><b>Neloy Digital Solutions</b><span>Creative digital services and automation designed to help businesses grow.</span></div></div></div></div></div></section>`;

function isBlockedPath(pathname) {
  const p = pathname.toLowerCase();
  return BLOCKED_PATHS.some(x => p === x || p.startsWith(x + "/"));
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function secureHeaders(headers, url, contentType) {
  const h = new Headers(headers);
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()");
  h.set("X-Frame-Options", "DENY");
  h.set("Cross-Origin-Opener-Policy", "same-origin");
  h.set("Cross-Origin-Resource-Policy", "same-origin");
  h.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  h.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests");
  h.delete("Server");
  h.delete("X-Powered-By");

  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/")) {
    h.set("Cache-Control", "no-store, no-cache, must-revalidate");
    h.set("Pragma", "no-cache");
    h.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  if ((contentType || "").includes("text/html")) {
    h.set("Cache-Control", "no-store");
  }
  return h;
}

function reject(status, message) {
  return new Response(message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}

async function getTopNotchLogo(request, env, ctx) {
  try {
    const u = new URL(request.url);
    u.pathname = "/";
    u.search = "";
    const r = await legacySponsorWorker.fetch(new Request(u.toString(), {
      method: "GET",
      headers: request.headers
    }), env, ctx);
    const type = r.headers.get("content-type") || "";
    if (!type.includes("text/html")) return "";
    const html = await r.text();
    const m = html.match(/<img[^>]+src="([^"]+)"[^>]+alt="Top Notch Assignment logo"/i);
    return m ? m[1] : "";
  } catch {
    return "";
  }
}

async function getDineshAssets(request, env, ctx) {
  try {
    const u = new URL(request.url);
    u.pathname = "/";
    u.search = "";
    const r = await dineshWorker.fetch(new Request(u.toString(), {
      method: "GET",
      headers: request.headers
    }), env, ctx);
    const type = r.headers.get("content-type") || "";
    if (!type.includes("text/html")) return {card:"", style:""};
    const source = await r.text();

    let style = "";
    const styleStart = source.indexOf('<style id="dinesh-testimonial-style">');
    if (styleStart !== -1) {
      const styleEnd = source.indexOf('</style>', styleStart);
      if (styleEnd !== -1) style = source.slice(styleStart, styleEnd + 8);
    }

    let card = "";
    const sectionStart = source.indexOf('<section id="testimonials"');
    const cardStart = source.indexOf('<div class="dineshReview"', sectionStart);
    if (cardStart !== -1) {
      const sectionEnd = source.indexOf('</section>', cardStart);
      if (sectionEnd !== -1) card = source.slice(cardStart, sectionEnd).trim();
    }
    return {card, style};
  } catch {
    return {card:"", style:""};
  }
}

function injectDinesh(html, assets) {
  if (!assets || !assets.card || html.includes('class="dineshReview"')) return html;
  const sectionStart = html.indexOf('<section id="testimonials"');
  if (sectionStart === -1) return html;
  const sectionEnd = html.indexOf('</section>', sectionStart);
  if (sectionEnd === -1) return html;
  html = html.slice(0, sectionEnd) + assets.card + html.slice(sectionEnd);
  if (assets.style && !html.includes('id="dinesh-testimonial-style"') && html.includes('</head>')) {
    html = html.replace('</head>', assets.style + '</head>');
  }
  html = html.replace(/2 client testimonials\s*•\s*10 stars displayed/gi, '3 client testimonials • 15 stars displayed');
  return html;
}

function applyPublicSiteChanges(html, sponsorLogo, dineshAssets) {
  // Hide only the public Admin Leads link. The /admin page itself still works.
  html = html.replace(/<a\b[^>]*href=["']\/admin\/?["'][^>]*>[\s\S]*?<\/a>/gi, "");
  html = html.replace(/\s*Admin Leads\s*/gi, "");

  // Remove ONLY the requested office sentence. Keep Sponsor Partner / Official Sponsor Partner visible.
  html = html.replace(/<p\b[^>]*>\s*Top Notch Assignments? operates with offices based in the U\.K\., Malaysia and Bangladesh\.\s*<\/p>/gi, "");

  // Restore the real Top Notch Assignments sponsor logo in the sponsorship card.
  if (sponsorLogo) {
    const logoBlock = `<div class="partnerLogo" style="background:#fff;padding:8px;overflow:hidden"><img src="${sponsorLogo}" alt="Top Notch Assignments logo" style="width:100%;height:100%;object-fit:contain;display:block;border-radius:16px"></div>`;
    html = html.replace(/<div class="partnerLogo">[\s\S]*?<\/div>/i, logoBlock);
  }

  // Force Dinesh's testimonial into the testimonial section if an earlier wrapper misses it.
  html = injectDinesh(html, dineshAssets);

  // Add About Me / Founder section to the Home page only.
  if (html.includes('id="contact"') && !html.includes('id="about-founder"')) {
    if (!html.includes('founder-about-style')) html = html.replace('</head>', ABOUT_STYLE + '</head>');
    html = html.replace('<section id="contact"', ABOUT_SECTION + '<section id="contact"');
    html = html.replace('<a href="#services">Services</a>', '<a href="#services">Services</a><a href="#about-founder">About</a>');
  }

  // Add Milford's Mochas as a Shopify web design portfolio project on Page 2.
  if (!html.includes('milfordsmochas.com') && html.includes('<div class="workGrid">')) {
    const milfordCard = `<article class="workCard" style="overflow:hidden">
      <div class="projectVisual" style="height:230px;padding:20px;background:linear-gradient(135deg,#3b1f16 0%,#8a4d2f 48%,#d99b58 100%);display:flex;align-items:center;justify-content:center">
        <div style="width:100%;max-width:390px;background:#fff;border-radius:16px;box-shadow:0 18px 45px rgba(0,0,0,.24);overflow:hidden;border:1px solid rgba(255,255,255,.45)">
          <div style="height:28px;background:#f5efe9;display:flex;align-items:center;gap:6px;padding:0 10px"><span style="width:7px;height:7px;border-radius:50%;background:#ef6b5f"></span><span style="width:7px;height:7px;border-radius:50%;background:#f2bf4f"></span><span style="width:7px;height:7px;border-radius:50%;background:#62c26b"></span><span style="margin-left:8px;font-size:9px;color:#765b4f;font-weight:800">milfordsmochas.com</span></div>
          <div style="padding:20px 18px 22px;background:linear-gradient(180deg,#fffaf5,#f5e8da);text-align:center">
            <div style="font-size:11px;letter-spacing:.12em;font-weight:1000;color:#8a4d2f">SHOPIFY E-COMMERCE</div>
            <div style="font-size:28px;line-height:1.05;font-weight:1000;color:#3b1f16;margin:8px 0 5px">Milford's Mochas</div>
            <div style="font-size:12px;color:#7c6559">Caffeinated cookies • Product shop • Online checkout</div>
            <div style="display:flex;justify-content:center;gap:8px;margin-top:14px"><span style="padding:6px 9px;border-radius:999px;background:#fff;border:1px solid #ddc4b2;font-size:9px;font-weight:900;color:#8a4d2f">SHOP</span><span style="padding:6px 9px;border-radius:999px;background:#fff;border:1px solid #ddc4b2;font-size:9px;font-weight:900;color:#8a4d2f">MOBILE</span><span style="padding:6px 9px;border-radius:999px;background:#fff;border:1px solid #ddc4b2;font-size:9px;font-weight:900;color:#8a4d2f">CHECKOUT</span></div>
          </div>
        </div>
      </div>
      <div class="workBody">
        <span class="tag">Shopify Web Design</span>
        <h3>Milford's Mochas</h3>
        <p>Shopify e-commerce website for a caffeinated cookie brand, featuring product shopping, brand content, cart and checkout functionality, and a mobile-friendly customer experience.</p>
        <a href="https://www.milfordsmochas.com/" target="_blank" rel="noopener noreferrer" style="display:inline-flex;margin-top:16px;padding:10px 14px;border-radius:11px;background:linear-gradient(135deg,#075DFF,#12DFF3);color:#fff;text-decoration:none;font-weight:900;font-size:13px">View Live Website →</a>
      </div>
    </article>`;
    html = html.replace('<div class="workGrid">', '<div class="workGrid">' + milfordCard);
  }

  return html;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    if (isBlockedPath(url.pathname)) return reject(404, "Not Found");

    if (["TRACE", "CONNECT", "PUT", "DELETE"].includes(method)) {
      return reject(405, "Method Not Allowed");
    }

    if (url.pathname.startsWith("/api/")) {
      if (!sameOrigin(request)) return reject(403, "Forbidden");

      if (["POST", "PATCH"].includes(method)) {
        const type = (request.headers.get("content-type") || "").toLowerCase();
        if (!type.includes("application/json")) return reject(415, "JSON required");
        const len = Number(request.headers.get("content-length") || "0");
        if (Number.isFinite(len) && len > 20000) return reject(413, "Payload Too Large");
      }
    }

    const response = await currentWorker.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    const headers = secureHeaders(response.headers, url, contentType);

    if (method === "GET" && contentType.includes("text/html") && !url.pathname.startsWith("/admin")) {
      const html = await response.text();
      const [sponsorLogo, dineshAssets] = await Promise.all([
        getTopNotchLogo(request, env, ctx),
        getDineshAssets(request, env, ctx)
      ]);
      return new Response(applyPublicSiteChanges(html, sponsorLogo, dineshAssets), {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
