import app from "./systeme-web-design-landing-wrapper.js";
import rankingVideoBase64 from "./ranking-video-data.js";

const VIDEO_PATH = "/showcase-media/neloy-ranking-progress.mp4";
const VIDEO_TITLE = "Neloy Digital Solutions Keyword Ranking & UK Search Visibility Update";
const VIDEO_DESCRIPTION = "A dated search visibility snapshot showing keyword ranking progress for Neloy Digital Solutions across digital services, including web design and graphic design related searches.";

function videoBytes(){
  const binary = atob(rankingVideoBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function serveVideo(request){
  const bytes = videoBytes();
  const size = bytes.length;
  const headers = new Headers({
    "Content-Type":"video/mp4",
    "Accept-Ranges":"bytes",
    "Cache-Control":"public, max-age=31536000, immutable"
  });

  if (request.method === "HEAD") {
    headers.set("Content-Length", String(size));
    return new Response(null, {status:200, headers});
  }

  const range = request.headers.get("Range");
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/i.exec(range.trim());
    if (match) {
      let start = match[1] ? Number(match[1]) : 0;
      let end = match[2] ? Number(match[2]) : size - 1;
      if (!match[1] && match[2]) {
        const suffix = Number(match[2]);
        start = Math.max(0, size - suffix);
        end = size - 1;
      }
      start = Math.max(0, start);
      end = Math.min(size - 1, end);
      if (start <= end) {
        const body = bytes.slice(start, end + 1);
        headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
        headers.set("Content-Length", String(body.length));
        return new Response(body, {status:206, headers});
      }
    }
    headers.set("Content-Range", `bytes */${size}`);
    return new Response(null, {status:416, headers});
  }

  headers.set("Content-Length", String(size));
  return new Response(bytes, {status:200, headers});
}

const STYLE = `<style id="nds-ranking-progress-style">
#nds-ranking-progress{padding:72px 20px;background:linear-gradient(180deg,#eef7ff 0%,#fff 100%);font-family:inherit;color:#102a43;border-top:1px solid #d9ecff;border-bottom:1px solid #d9ecff}
#nds-ranking-progress *{box-sizing:border-box}
#nds-ranking-progress .rpWrap{width:min(1180px,100%);margin:0 auto}
#nds-ranking-progress .rpHead{text-align:center;max-width:900px;margin:0 auto 36px}
#nds-ranking-progress .rpEyebrow{display:inline-block;color:#075DFF;font-size:13px;font-weight:900;letter-spacing:.13em;text-transform:uppercase;margin-bottom:10px}
#nds-ranking-progress h2{margin:0 0 14px;color:#0A2A5A;font-size:clamp(32px,5vw,48px);line-height:1.08}
#nds-ranking-progress .rpLead{margin:0;color:#506a82;font-size:17px;line-height:1.75}
#nds-ranking-progress .rpGrid{display:grid;grid-template-columns:minmax(300px,390px) 1fr;gap:44px;align-items:center}
#nds-ranking-progress .rpVideo{background:#07182a;padding:12px;border:2px solid #2a9dff;border-radius:24px;box-shadow:0 22px 58px rgba(8,55,96,.24);max-width:380px;margin:auto;width:100%}
#nds-ranking-progress .rpVideoLabel{text-align:center;color:#fff;font-size:14px;font-weight:900;letter-spacing:.04em;padding:4px 6px 12px}
#nds-ranking-progress video{display:block;width:100%;aspect-ratio:9/16;object-fit:contain;background:#061322;border-radius:14px}
#nds-ranking-progress .rpCopy{padding:8px 0}
#nds-ranking-progress .rpCopy h3{margin:0 0 14px;color:#0A2A5A;font-size:29px;line-height:1.2}
#nds-ranking-progress .rpCopy p{margin:0 0 15px;color:#506a82;font-size:16px;line-height:1.78}
#nds-ranking-progress .rpKeywords{display:flex;gap:9px;flex-wrap:wrap;margin:20px 0}
#nds-ranking-progress .rpKeywords span{padding:9px 12px;border-radius:999px;background:#e4f2ff;color:#075DFF;font-size:13px;font-weight:900}
#nds-ranking-progress .rpLinks{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
#nds-ranking-progress .rpLinks a{display:inline-flex;padding:12px 17px;border-radius:10px;background:#075DFF;color:#fff;text-decoration:none;font-weight:900}
#nds-ranking-progress .rpLinks a.alt{background:#fff;color:#075DFF;border:1px solid #9fcff0}
#nds-ranking-progress .rpNote{font-size:12px!important;color:#70869b!important;margin-top:16px!important}
@media(max-width:760px){#nds-ranking-progress{padding:50px 18px}#nds-ranking-progress .rpGrid{grid-template-columns:1fr;gap:28px}#nds-ranking-progress .rpVideo{max-width:340px}#nds-ranking-progress .rpCopy{text-align:center}#nds-ranking-progress .rpKeywords,#nds-ranking-progress .rpLinks{justify-content:center}}
</style>`;

const SECTION = `<section id="nds-ranking-progress" aria-labelledby="nds-ranking-progress-title">
  <div class="rpWrap">
    <div class="rpHead">
      <span class="rpEyebrow">Search Visibility Progress</span>
      <h2 id="nds-ranking-progress-title">Neloy Digital Solutions — SEO & AEO Ranking Progress</h2>
      <p class="rpLead">Neloy Digital Solutions provides professional web design, graphic design, video editing, UI/UX design and AI automation services for businesses worldwide. This ranking video documents search visibility progress around our brand and service keywords.</p>
    </div>
    <div class="rpGrid">
      <div class="rpVideo">
        <div class="rpVideoLabel">▶ PLAY RANKING VIDEO</div>
        <video controls playsinline preload="metadata" aria-label="${VIDEO_TITLE}">
          <source src="${VIDEO_PATH}" type="video/mp4">
          Your browser does not support embedded video.
        </video>
      </div>
      <div class="rpCopy">
        <h3>Keyword Ranking & Digital Growth Snapshot</h3>
        <p>This video shows dated ranking snapshots for Neloy Digital Solutions service searches, including UK search visibility. Our website structure is built around clear service pages, useful portfolio content, internal linking and search-friendly information for both traditional search engines and AI assistants.</p>
        <p>Core topics include professional web design services, graphic design agency services, professional video editing, UI/UX design, AI automation, SEO and AEO.</p>
        <div class="rpKeywords" aria-label="Neloy Digital Solutions service topics">
          <span>Neloy Digital Solutions</span><span>Web Design</span><span>Graphic Design</span><span>Video Editing</span><span>UI/UX Design</span><span>AI Automation</span><span>SEO</span><span>AEO</span>
        </div>
        <div class="rpLinks"><a href="${VIDEO_PATH}">Open Ranking Video</a><a href="/showcase">View Our Portfolio</a><a class="alt" href="/video-editing">Video Editing</a><a class="alt" href="/logo-design">Logo Design</a></div>
        <p class="rpNote">Search positions can change over time and may vary by location, device and search personalization. The video represents a ranking snapshot, not a guaranteed future position.</p>
      </div>
    </div>
  </div>
</section>`;

function addSchema(html, origin){
  if (html.includes('id="nds-ranking-progress-schema"')) return html;
  const schema = {
    "@context":"https://schema.org",
    "@type":"VideoObject",
    name: VIDEO_TITLE,
    description: VIDEO_DESCRIPTION,
    uploadDate:"2026-09-17T00:00:00+06:00",
    duration:"PT16S",
    contentUrl:`${origin}${VIDEO_PATH}`,
    url:`${origin}/#nds-ranking-progress`,
    publisher:{"@type":"Organization",name:"Neloy Digital Solutions",url:`${origin}/`},
    keywords:["Neloy Digital Solutions","web design","graphic design","video editing","UI UX design","AI automation","SEO","AEO"]
  };
  return html.replace(/<\/head>/i, `<script id="nds-ranking-progress-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script>\n</head>`);
}

function injectRankingSection(html, origin){
  if (html.includes('id="nds-ranking-progress"')) return addSchema(html, origin);
  if (!html.includes('id="nds-ranking-progress-style"')) html = html.replace(/<\/head>/i, `${STYLE}\n</head>`);
  html = addSchema(html, origin);
  if (html.includes('id="nds-systeme-landing-cta"')) {
    return html.replace(/<section id="nds-systeme-landing-cta"/i, `${SECTION}\n<section id="nds-systeme-landing-cta"`);
  }
  if (/<\/main>/i.test(html)) return html.replace(/<\/main>/i, `${SECTION}\n</main>`);
  return html.replace(/<\/body>/i, `${SECTION}\n</body>`);
}

export default {
  async fetch(request, env, ctx){
    const url = new URL(request.url);
    if ((request.method === "GET" || request.method === "HEAD") && url.pathname === VIDEO_PATH) {
      return serveVideo(request);
    }

    const response = await app.fetch(request, env, ctx);
    if (request.method !== "GET" || (url.pathname !== "/" && url.pathname !== "")) return response;
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    const html = await response.text();
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(injectRankingSection(html, url.origin), {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
