import app from "./ranking-progress-wrapper.js";

const HOME_META_DESCRIPTION = "Neloy Digital Solutions helps businesses turn ideas into impact through creative strategy, professional logo design, web design, video editing and digital growth.";

const STYLE = `<style id="nds-creative-partner-style">
#nds-creative-partner{padding:78px 20px;background:radial-gradient(circle at 16% 18%,rgba(74,144,226,.18),transparent 30%),linear-gradient(135deg,#071a35 0%,#0b2f63 52%,#0b4ea2 100%);color:#fff;font-family:inherit;position:relative;overflow:hidden}
#nds-creative-partner *{box-sizing:border-box}
#nds-creative-partner:before,#nds-creative-partner:after{content:"";position:absolute;border-radius:50%;filter:blur(1px);pointer-events:none}
#nds-creative-partner:before{width:260px;height:260px;right:-90px;top:-70px;background:rgba(255,255,255,.06)}
#nds-creative-partner:after{width:190px;height:190px;left:-70px;bottom:-80px;background:rgba(92,190,255,.12)}
#nds-creative-partner .cpWrap{width:min(1180px,100%);margin:0 auto;position:relative;z-index:1}
#nds-creative-partner .cpHead{max-width:880px;margin:0 auto 44px;text-align:center}
#nds-creative-partner .cpEyebrow{display:inline-block;font-size:13px;font-weight:900;letter-spacing:.13em;text-transform:uppercase;color:#9ed7ff;margin-bottom:12px}
#nds-creative-partner h2{margin:0 0 16px;font-size:clamp(34px,5vw,54px);line-height:1.06;color:#fff}
#nds-creative-partner .cpLead{margin:0 auto;color:#dcecff;font-size:18px;line-height:1.72;max-width:820px}
#nds-creative-partner .cpGrid{display:grid;grid-template-columns:minmax(300px,.9fr) minmax(340px,1.1fr);gap:46px;align-items:center}
#nds-creative-partner .cpVisual{position:relative;min-height:420px}
#nds-creative-partner .cpCenter{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:150px;height:150px;border-radius:50%;display:grid;place-items:center;text-align:center;background:linear-gradient(145deg,#0a67d9,#2ea8ff);box-shadow:0 0 0 12px rgba(255,255,255,.06),0 28px 70px rgba(0,0,0,.28);font-weight:1000;font-size:24px;line-height:1.05}
#nds-creative-partner .cpNode{position:absolute;width:112px;height:112px;border-radius:50%;display:grid;place-items:center;text-align:center;background:rgba(255,255,255,.96);color:#0b3d78;font-weight:1000;letter-spacing:.04em;box-shadow:0 15px 36px rgba(0,0,0,.22);border:4px solid #82c9ff}
#nds-creative-partner .cpNode:after{content:"";position:absolute;width:72px;height:2px;background:linear-gradient(90deg,#7cc8ff,rgba(124,200,255,.08));transform-origin:left center;z-index:-1}
#nds-creative-partner .n1{left:5%;top:10%}.n1:after{left:90px;top:80px;transform:rotate(34deg)}
#nds-creative-partner .n2{right:4%;top:12%}.n2:after{right:88px;top:80px;transform:rotate(146deg)}
#nds-creative-partner .n3{left:0;bottom:10%}.n3:after{left:91px;top:30px;transform:rotate(-32deg)}
#nds-creative-partner .n4{right:0;bottom:10%}.n4:after{right:88px;top:30px;transform:rotate(212deg)}
#nds-creative-partner .cpCopy{background:rgba(255,255,255,.97);color:#17324d;border-radius:26px;padding:30px;box-shadow:0 26px 70px rgba(0,0,0,.2)}
#nds-creative-partner .cpCopy h3{margin:0 0 14px;color:#0a2a5a;font-size:30px;line-height:1.2}
#nds-creative-partner .cpCopy p{margin:0 0 16px;color:#506a82;font-size:16px;line-height:1.78}
#nds-creative-partner .cpPoints{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:22px 0}
#nds-creative-partner .cpPoint{padding:14px 15px;border-radius:14px;background:#eef7ff;border:1px solid #d5eaff;color:#17324d}
#nds-creative-partner .cpPoint strong{display:block;color:#075dff;margin-bottom:4px}
#nds-creative-partner .cpLinks{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
#nds-creative-partner .cpLinks a{display:inline-flex;align-items:center;padding:12px 16px;border-radius:10px;text-decoration:none;font-weight:900;background:#075dff;color:#fff}
#nds-creative-partner .cpLinks a.alt{background:#fff;color:#075dff;border:1px solid #a8d4ff}
#nds-creative-partner .cpMini{margin-top:18px!important;font-size:13px!important;color:#6b8196!important}
@media(max-width:820px){#nds-creative-partner{padding:56px 18px}#nds-creative-partner .cpGrid{grid-template-columns:1fr;gap:24px}#nds-creative-partner .cpVisual{min-height:360px;max-width:520px;width:100%;margin:0 auto}#nds-creative-partner .cpCenter{width:130px;height:130px;font-size:21px}#nds-creative-partner .cpNode{width:96px;height:96px;font-size:13px}#nds-creative-partner .cpPoints{grid-template-columns:1fr}}
</style>`;

const SECTION = `<section id="nds-creative-partner" aria-labelledby="nds-creative-partner-title">
  <div class="cpWrap">
    <div class="cpHead">
      <span class="cpEyebrow">Creative Strategy • Business-Focused Execution</span>
      <h2 id="nds-creative-partner-title">Why Clients Choose the Right Creative Partner</h2>
      <p class="cpLead">Strong creative work starts before the software opens. We begin with the business goal, audience, project direction and the result the work needs to support.</p>
    </div>
    <div class="cpGrid">
      <div class="cpVisual" aria-label="Neloy Digital Solutions idea to trust process">
        <div class="cpCenter">BUILD<br>WITH<br>PURPOSE</div>
        <div class="cpNode n1">IDEA</div>
        <div class="cpNode n2">GOAL</div>
        <div class="cpNode n3">PLAN</div>
        <div class="cpNode n4">TRUST</div>
      </div>
      <div class="cpCopy">
        <h3>Understand First. Create With Purpose.</h3>
        <p><strong>Why work with Neloy Digital Solutions?</strong> Because a logo, website, video or digital asset should not only look professional. It should help the business communicate clearly, build trust and move toward a real objective.</p>
        <div class="cpPoints">
          <div class="cpPoint"><strong>Understand</strong>Business, audience, requirement and objective.</div>
          <div class="cpPoint"><strong>Direction</strong>Clear creative strategy before full production.</div>
          <div class="cpPoint"><strong>Reduce Risk</strong>Better communication and fewer unnecessary revisions.</div>
          <div class="cpPoint"><strong>Build</strong>Creative execution connected to a business goal.</div>
        </div>
        <p>Our approach connects <strong>creative strategy</strong>, <strong>brand identity</strong>, <strong>professional web design</strong>, <strong>video editing</strong>, SEO and AEO-friendly digital growth so each project has a clear purpose.</p>
        <div class="cpLinks">
          <a href="/logo-design">Professional Logo Design</a>
          <a href="/video-editing">Professional Video Editing</a>
          <a class="alt" href="/website-design">Professional Web Design</a>
        </div>
        <p class="cpMini">Neloy Digital Solutions • Ideas → Strategy → Creative Execution → Digital Growth</p>
      </div>
    </div>
  </div>
</section>`;

function replaceOrAddMeta(html, name, value){
  const re = new RegExp('<meta\\s+[^>]*name=["\\\']' + name + '["\\\'][^>]*>', 'i');
  const tag = `<meta name="${name}" content="${value}">`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, tag + '\n</head>');
}

function replaceOrAddProperty(html, property, value){
  const re = new RegExp('<meta\\s+[^>]*property=["\\\']' + property + '["\\\'][^>]*>', 'i');
  const tag = `<meta property="${property}" content="${value}">`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, tag + '\n</head>');
}

function addAeoSchema(html, origin){
  if (html.includes('id="nds-creative-partner-schema"')) return html;
  const schema = {
    "@context":"https://schema.org",
    "@type":"Service",
    name:"Creative Strategy and Digital Design Services",
    description:HOME_META_DESCRIPTION,
    provider:{
      "@type":"Organization",
      name:"Neloy Digital Solutions",
      url:`${origin}/`
    },
    areaServed:"Worldwide",
    serviceType:[
      "Creative Strategy",
      "Professional Logo Design",
      "Professional Web Design",
      "Professional Video Editing",
      "Brand Identity",
      "SEO",
      "AEO"
    ],
    url:`${origin}/#nds-creative-partner`
  };
  return html.replace(/<\/head>/i, `<script id="nds-creative-partner-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g,"\\u003c")}</script>\n</head>`);
}

function enhanceHomepage(html, origin){
  html = replaceOrAddMeta(html, "description", HOME_META_DESCRIPTION);
  html = replaceOrAddMeta(html, "keywords", "creative strategy, professional logo design, professional web design, professional video editing, brand identity, digital marketing, SEO, AEO, Neloy Digital Solutions");
  html = replaceOrAddProperty(html, "og:description", HOME_META_DESCRIPTION);
  html = addAeoSchema(html, origin);

  if (!html.includes('id="nds-creative-partner-style"')) {
    html = html.replace(/<\/head>/i, STYLE + '\n</head>');
  }
  if (html.includes('id="nds-creative-partner"')) return html;

  if (html.includes('id="nds-ranking-progress"')) {
    return html.replace(/<section id="nds-ranking-progress"/i, SECTION + '\n<section id="nds-ranking-progress"');
  }
  if (html.includes('id="nds-systeme-landing-cta"')) {
    return html.replace(/<section id="nds-systeme-landing-cta"/i, SECTION + '\n<section id="nds-systeme-landing-cta"');
  }
  if (/<\/main>/i.test(html)) return html.replace(/<\/main>/i, SECTION + '\n</main>');
  return html.replace(/<\/body>/i, SECTION + '\n</body>');
}

export default {
  async fetch(request, env, ctx){
    const url = new URL(request.url);
    const response = await app.fetch(request, env, ctx);
    if (request.method !== "GET" || (url.pathname !== "/" && url.pathname !== "")) return response;
    const type = response.headers.get("content-type") || "";
    if (!type.includes("text/html")) return response;

    const html = await response.text();
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control","no-store");

    return new Response(enhanceHomepage(html, url.origin), {
      status:response.status,
      statusText:response.statusText,
      headers
    });
  }
};
