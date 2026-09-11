import currentWorker from "./services-refresh-wrapper.js";

const META_PIXEL_ID = "1085898767133253";

const META_PIXEL_HEAD = `<!-- Meta Pixel Code -->
<script id="meta-pixel-base-code">
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->`;

const META_PIXEL_NOSCRIPT = `<noscript id="meta-pixel-noscript"><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" alt=""></noscript>`;

const META_LEAD_TRACKER = `<script id="meta-lead-tracker">
(function(){
  if(window.__ndsMetaLeadTrackingInstalled)return;
  window.__ndsMetaLeadTrackingInstalled=true;
  const originalFetch=window.fetch;
  if(typeof originalFetch!=="function")return;

  window.fetch=async function(input,init){
    const response=await originalFetch.apply(this,arguments);
    try{
      const method=String((init&&init.method)||(input&&input.method)||"GET").toUpperCase();
      let rawUrl="";
      if(typeof input==="string")rawUrl=input;
      else if(typeof URL!=="undefined"&&input instanceof URL)rawUrl=input.href;
      else if(input&&input.url)rawUrl=input.url;
      const target=new URL(rawUrl,window.location.href);

      if(response.ok&&method==="POST"&&target.origin===window.location.origin&&target.pathname==="/api/leads"){
        if(typeof window.fbq==="function")window.fbq("track","Lead");
      }
    }catch(_){ }
    return response;
  };
})();
</script>`;

const podcastCard = `<article class="workCard" id="podcast-video-editing-project">
<div class="workBody">
<span class="tag">Video Editing · Podcast</span>
<h3>Podcast Video Editing Portfolio</h3>
<p class="projectIntro">A real podcast editing showcase featuring clean cuts, captions, pacing, branded presentation and social-media-ready delivery.</p>
<div style="max-width:760px;margin:22px auto 16px;padding:12px 12px 25px;background:linear-gradient(145deg,#102743,#06162d);border-radius:22px 22px 14px 14px;box-shadow:0 22px 55px rgba(6,22,45,.28);border:1px solid #2c4b70">
  <div style="position:relative;aspect-ratio:16/9;background:#000;border:2px solid #203b5c;border-radius:11px;overflow:hidden">
    <iframe src="https://drive.google.com/file/d/1ARZNb6WR52SsPTpgrLlifjL6mH4MUrLH/preview" title="Neloy Digital Solutions podcast video editing portfolio" loading="lazy" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0;background:#000"></iframe>
  </div>
  <div style="width:35%;height:7px;background:linear-gradient(90deg,#75879b,#dbe5ee,#75879b);border-radius:0 0 14px 14px;margin:12px auto -18px"></div>
</div>
<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:14px 0 6px">
  <a href="https://drive.google.com/file/d/1ARZNb6WR52SsPTpgrLlifjL6mH4MUrLH/view?usp=sharing" target="_blank" rel="noopener" style="text-decoration:none;padding:8px 11px;border-radius:999px;background:#EAF8FF;border:1px solid #B6E3F5;color:#075DFF;font-size:11px;font-weight:900">I Am the Brand</a>
  <a href="https://drive.google.com/file/d/12KIhGdH-C0w8lBtGzBMyNI0BoE41cOr5/view?usp=sharing" target="_blank" rel="noopener" style="text-decoration:none;padding:8px 11px;border-radius:999px;background:#EAF8FF;border:1px solid #B6E3F5;color:#075DFF;font-size:11px;font-weight:900">Creating Trends</a>
  <a href="https://drive.google.com/file/d/1SAvHpKKqbBYvVH4BhBMLHmJf1GWxjx-1/view?usp=sharing" target="_blank" rel="noopener" style="text-decoration:none;padding:8px 11px;border-radius:999px;background:#EAF8FF;border:1px solid #B6E3F5;color:#075DFF;font-size:11px;font-weight:900">El Patron Release</a>
</div>
<p class="projectResult" style="margin-top:14px"><strong>Portfolio focus:</strong> Podcast editing, captions, pacing, branded framing and short-form social presentation.</p>
</div></article>`;

const card = `<article class="workCard" id="short-video-editing-project">
<div class="workBody"><span class="tag">Video Editing · Reels</span><h3>Short Video Editing</h3>
<p class="projectIntro">A branded social media reel for Neloy Digital Solutions, featuring motion graphics, a custom blue-and-cyan frame and audio.</p>
<video controls playsinline preload="metadata" aria-label="Neloy Digital Solutions short video editing showcase" style="display:block;width:100%;max-width:380px;max-height:75vh;aspect-ratio:9/16;object-fit:contain;margin:20px auto;background:#06162d;border-radius:12px"><source src="/showcase-media/neloy-short-video.mp4" type="video/mp4">Your browser does not support embedded video. <a href="/showcase-media/neloy-short-video.mp4">Watch the video</a>.</video>
</div></article>`;

export function addReel(html) {
  if (html.includes('id="short-video-editing-project"')) return html;
  return html.replace(/(<section\b[^>]*\bid="work"[^>]*>[\s\S]*?<div class="workGrid">)/, '$1' + card);
}

export function addPodcast(html) {
  if (html.includes('id="podcast-video-editing-project"')) return html;
  return html.replace(/(<section\b[^>]*\bid="work"[^>]*>[\s\S]*?<div class="workGrid">)/, '$1' + podcastCard);
}

function addMetaPixel(html) {
  const hasPixel = html.includes('id="meta-pixel-base-code"') || html.includes(`fbq('init', '${META_PIXEL_ID}')`) || html.includes(`fbq('init','${META_PIXEL_ID}')`);

  if (!hasPixel && html.includes('</head>')) {
    html = html.replace('</head>', META_PIXEL_HEAD + '\n</head>');
  }

  if (!hasPixel && !html.includes('id="meta-pixel-noscript"')) {
    if (html.includes('<body')) {
      html = html.replace(/<body([^>]*)>/i, `<body$1>\n${META_PIXEL_NOSCRIPT}`);
    } else if (html.includes('</body>')) {
      html = html.replace('</body>', META_PIXEL_NOSCRIPT + '\n</body>');
    }
  }

  if (!html.includes('id="meta-lead-tracker"') && html.includes('</head>')) {
    html = html.replace('</head>', META_LEAD_TRACKER + '\n</head>');
  }

  return html;
}

function updateCopyrightYear(html) {
  return html
    .replace(/©\s*2012\s*[-–—]\s*2026/gi, '© 2013 - 2026')
    .replace(/&copy;\s*2012\s*[-–—]\s*2026/gi, '&copy; 2013 - 2026')
    .replace(/©\s*2012/gi, '© 2013')
    .replace(/&copy;\s*2012/gi, '&copy; 2013');
}

function addCspSource(csp, directive, source) {
  const re = new RegExp(`(${directive}[^;]*)`, 'i');
  if (!re.test(csp)) return `${csp}; ${directive} ${source}`;
  return csp.replace(re, (block) => block.includes(source) ? block : `${block} ${source}`);
}

function allowMetaPixel(headers) {
  const csp = headers.get('content-security-policy');
  if (!csp) return;

  let next = addCspSource(csp, 'script-src', 'https://connect.facebook.net');
  next = addCspSource(next, 'connect-src', 'https://www.facebook.com');
  next = addCspSource(next, 'connect-src', 'https://connect.facebook.net');
  next = addCspSource(next, 'frame-src', 'https://drive.google.com');
  headers.set('content-security-policy', next);
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const path = new URL(request.url).pathname;
    const type = response.headers.get("content-type") || "";

    if (request.method !== "GET" || !response.ok || !type.includes("text/html")) return response;

    let html = await response.text();
    if (["/showcase", "/showcase/"].includes(path)) {
      html = addReel(html);
      html = addPodcast(html);
    }

    const isPublicPage = !path.startsWith('/admin');
    if (isPublicPage) {
      html = addMetaPixel(html);
      html = updateCopyrightYear(html);
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    headers.set("cache-control", "no-store");
    if (isPublicPage) allowMetaPixel(headers);

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
