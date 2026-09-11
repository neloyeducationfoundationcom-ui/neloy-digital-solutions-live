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

const card = `<article class="workCard" id="short-video-editing-project">
<div class="workBody"><span class="tag">Video Editing · Reels</span><h3>Short Video Editing</h3>
<p class="projectIntro">A branded social media reel for Neloy Digital Solutions, featuring motion graphics, a custom blue-and-cyan frame and audio.</p>
<video controls playsinline preload="metadata" aria-label="Neloy Digital Solutions short video editing showcase" style="display:block;width:100%;max-width:380px;max-height:75vh;aspect-ratio:9/16;object-fit:contain;margin:20px auto;background:#06162d;border-radius:12px"><source src="/showcase-media/neloy-short-video.mp4" type="video/mp4">Your browser does not support embedded video. <a href="/showcase-media/neloy-short-video.mp4">Watch the video</a>.</video>
</div></article>`;

export function addReel(html) {
  if (html.includes('id="short-video-editing-project"')) return html;
  return html.replace(/(<section\b[^>]*\bid="work"[^>]*>[\s\S]*?<div class="workGrid">)/, '$1' + card);
}

function addMetaPixel(html) {
  if (html.includes('id="meta-pixel-base-code"') || html.includes(`fbq('init', '${META_PIXEL_ID}')`)) return html;

  if (html.includes('</head>')) {
    html = html.replace('</head>', META_PIXEL_HEAD + '\n</head>');
  }

  if (html.includes('<body')) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${META_PIXEL_NOSCRIPT}`);
  } else if (html.includes('</body>')) {
    html = html.replace('</body>', META_PIXEL_NOSCRIPT + '\n</body>');
  }

  return html;
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
  headers.set('content-security-policy', next);
}

export default {
  async fetch(request, env, ctx) {
    const response = await currentWorker.fetch(request, env, ctx);
    const path = new URL(request.url).pathname;
    const type = response.headers.get("content-type") || "";

    if (request.method !== "GET" || !response.ok || !type.includes("text/html")) return response;

    let html = await response.text();
    if (["/showcase", "/showcase/"].includes(path)) html = addReel(html);

    const isPublicPage = !path.startsWith('/admin');
    if (isPublicPage) html = addMetaPixel(html);

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
