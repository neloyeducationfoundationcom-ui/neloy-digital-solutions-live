// Read-only route checks. Run: node scripts/verify-public.mjs --local | --live
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const origin = "https://neloydigitalsolutions.com";
const pages = [
  ["/", "Neloy Digital Solutions | AEO, Web, Design & Video", "/"],
  ["/showcase", "Creative Portfolio & Showcase | Neloy Digital Solutions", "/showcase"],
  ["/portfolio", "Creative Portfolio & Showcase | Neloy Digital Solutions", "/showcase"],
  ["/logo-design", "Professional Logo Design | Neloy Digital Solutions", "/logo-design"],
  ["/website-design", "Website Design Services & Portfolio | Neloy Digital Solutions", "/website-design"],
  ["/social-media-design", "Social Media Design Services | Facebook & Instagram Graphics", "/social-media-design"],
  ["/video-editing", "Video Editing, Reels & Motion Graphics | Neloy Digital Solutions", "/video-editing"],
  ["/digital-marketing", "Organic Digital Marketing, SEO & AEO | Neloy Digital Solutions", "/digital-marketing"],
  ["/team", "Neloy Digital Solutions | Graphic Design, Web Design, Video Editing & AI Automation", "/"],
  ["/terms", "Neloy Digital Solutions | Graphic Design, Web Design, Video Editing & AI Automation", "/"],
  ["/website", "Neloy Digital Solutions | Graphic Design, Web Design, Video Editing & AI Automation", "/"],
  ["/website/", "Neloy Digital Solutions | Graphic Design, Web Design, Video Editing & AI Automation", "/"],
];
const redirects = ["/web-design-bangladesh", "/web-design-bangladesh/"];
const files = ["/robots.txt", "/sitemap.xml", "/llms.txt"];
const assets = [
  "/showcase-media/neloy-project-process-thumbnail.jpg",
  "/showcase-media/neloy-ranking-motion-graphics.mp4",
  "/showcase-media/neloy-project-process.mp4",
  "/showcase-media/neloy-short-video.mp4",
];
const missingRootAssets = ["/styles.css", "/script.js", "/assets/brand-logo.svg"];
const digest = (value) => createHash("sha256").update(value).digest("hex");
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&#039;/g, "'");
const tag = (html, name) => decode(html.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1]?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ?? "");
const meta = (html, name) => html.match(new RegExp(`<meta\\b(?=[^>]*\\b(?:name|property)=["']${name}["'])[^>]*\\bcontent=["']([^"']*)["'][^>]*>`, "i"))?.[1] ?? "";
const canonical = (html) => html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1] ?? "";

async function local() {
  const { default: before } = await import("../whatsapp-lead-prefill-wrapper.js");
  const { default: after } = await import("../src/worker.js");
  let checked = 0;
  for (const path of [...pages.map(([p]) => p), ...redirects, ...files, "/admin"]) {
    const run = async (worker) => {
      const response = await worker.fetch(new Request(origin + path), {}, {});
      return {
        status: response.status,
        headers: [...response.headers].sort(),
        body: digest(Buffer.from(await response.arrayBuffer())),
      };
    };
    const oldResult = await run(before);
    const newResult = await run(after);
    assert.deepEqual(newResult, oldResult, `Worker output differs for GET ${path}`);
    console.log(`PASS local GET ${path}: ${newResult.status}, identical headers and SHA-256 body ${newResult.body}`);
    checked++;
  }
  console.log(`PASS ${checked} local old-entry/new-entry comparisons; no production requests or writes`);
}

async function live() {
  let checked = 0;
  async function get(path) {
    const response = await fetch(origin + path, {
      method: "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
      headers: { "user-agent": "NeloyArchitectureReadOnlyVerifier/1.0" },
    });
    return response;
  }
  for (const [path, title, canonicalPath] of pages) {
    const response = await get(path);
    assert.equal(response.status, 200, `GET ${path} status`);
    const html = await response.text();
    assert.equal(tag(html, "title"), title, `GET ${path} title`);
    assert.equal(canonical(html), origin + canonicalPath, `GET ${path} canonical`);
    const h1 = tag(html, "h1");
    assert.ok(h1, `GET ${path} H1`);
    assert.ok(meta(html, "description"), `GET ${path} description`);
    const schemas = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]));
    console.log(`PASS live GET ${path}: 200; title=${JSON.stringify(title)}; canonical=${canonicalPath}; H1=${JSON.stringify(h1)}; JSON-LD=${schemas.length}; description=${JSON.stringify(meta(html, "description"))}`);
    if (path === "/") {
      assert.match(html, /id=["']leadForm["']/);
      assert.match(html, /fetch\(["']\/api\/leads["']/);
      assert.match(html, /wa\.me\//);
      assert.match(html, /google-site-verification/i);
      assert.match(html, /facebook\.net\/en_US\/fbevents\.js|fbq\(/);
      assert.match(html, /cloudflareinsights\.com\/beacon/);
      console.log("PASS live homepage: lead form action, WhatsApp, Search Console tag, Meta Pixel, Cloudflare beacon present");
    }
    checked++;
  }
  for (const path of redirects) {
    const response = await get(path);
    assert.equal(response.status, 301, `GET ${path} redirect status`);
    assert.equal(response.headers.get("location"), "https://info-digitalsolutions-neloy.systeme.io/6b5b820f");
    await response.body?.cancel();
    console.log(`PASS live GET ${path}: 301 -> ${response.headers.get("location")}`);
    checked++;
  }
  const robots = await get("/robots.txt");
  assert.equal(robots.status, 200);
  const robotsText = await robots.text();
  assert.match(robotsText, /User-agent: \*\s+Allow: \/\s+Sitemap: https:\/\/neloydigitalsolutions\.com\/sitemap\.xml/);
  console.log(`PASS live GET /robots.txt: 200; ${JSON.stringify(robotsText)}`);
  checked++;
  const sitemap = await get("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  for (const path of ["/", "/showcase", "/logo-design", "/website-design", "/social-media-design", "/video-editing", "/digital-marketing"]) {
    assert.ok(locs.includes(origin + path), `sitemap ${path}`);
  }
  assert.equal(locs.filter((url) => url.startsWith(origin)).length, 7);
  assert.match(xml, /<video:video>/);
  console.log(`PASS live GET /sitemap.xml: 200; 7 canonical URLs; video entry`);
  checked++;
  const llms = await get("/llms.txt");
  assert.equal(llms.status, 200);
  console.log(`PASS live GET /llms.txt: 200; ${digest(Buffer.from(await llms.arrayBuffer()))}`);
  checked++;
  const admin = await get("/admin");
  assert.equal(admin.status, 200);
  const adminHtml = await admin.text();
  assert.match(adminHtml, /ADMIN_TOKEN/);
  assert.match(admin.headers.get("cache-control") ?? "", /no-store/i);
  assert.match(admin.headers.get("x-robots-tag") ?? "", /noindex, nofollow, noarchive/i);
  console.log(`PASS live GET /admin: 200 interface; no-store; noindex; no lead data requested`);
  checked++;
  for (const name of ["content-security-policy", "strict-transport-security", "x-frame-options", "referrer-policy", "x-content-type-options"]) {
    const response = await get("/");
    assert.ok(response.headers.get(name), `home security header ${name}`);
    await response.body?.cancel();
    console.log(`PASS live home header ${name}: ${response.headers.get(name)}`);
  }
  for (const path of [...assets, ...missingRootAssets]) {
    const response = await get(path);
    assert.equal(response.status, assets.includes(path) ? 200 : 404, `asset ${path}`);
    await response.body?.cancel();
    console.log(`PASS live GET ${path}: ${response.status}`);
    checked++;
  }
  console.log(`PASS ${checked} live route/asset requests and 5 header checks; GET only; no /api/leads or production D1 access`);
}

const mode = process.argv[2];
if (mode === "--local") await local();
else if (mode === "--live") await live();
else {
  console.error("Usage: node scripts/verify-public.mjs --local | --live");
  process.exitCode = 2;
}
