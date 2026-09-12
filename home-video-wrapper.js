import currentWorker from "./social-community-wrapper.js";

const VIDEO_PARTS = [
  "/showcase-media/project-process-restored-parts/part-00",
  "/showcase-media/project-process-restored-parts/part-01",
  "/showcase-media/project-process-restored-parts/part-02",
  "/showcase-media/project-process-restored-parts/part-03",
  "/showcase-media/project-process-restored-parts/part-04",
  "/showcase-media/project-process-restored-parts/part-05",
  "/showcase-media/project-process-restored-parts/part-06",
  "/showcase-media/project-process-restored-parts/part-07"
];

const VIDEO_STYLE = `<style id="nds-home-video-style">
#nds-feature-video{padding:58px 0;background:#fff;border-block:1px solid #dcecf5}
#nds-feature-video .ndsVideoWrap{width:min(1050px,calc(100% - 32px));margin:auto;text-align:center}
#nds-feature-video .ndsVideoLabel{display:inline-block;padding:7px 12px;border:1px solid #bfe7f8;border-radius:999px;background:#eef9ff;color:#075dff;font-size:12px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
#nds-feature-video h2{margin:12px 0 8px;color:#0a2a5a;font-size:clamp(30px,5vw,46px);line-height:1.08}
#nds-feature-video p{max-width:720px;margin:0 auto 24px;color:#60758c;line-height:1.65}
#nds-feature-video .ndsVideoThumb{position:relative;display:block;width:min(900px,100%);aspect-ratio:16/9;margin:auto;padding:0;border:0;border-radius:24px;overflow:hidden;background:#07182a;box-shadow:0 20px 55px rgba(8,55,96,.22);cursor:pointer}
#nds-feature-video .ndsVideoThumb img{display:block;width:100%;height:100%;object-fit:cover}
#nds-feature-video .ndsVideoThumb:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,18,35,.68))}
#nds-feature-video .ndsPlay{position:absolute;z-index:2;left:50%;top:50%;width:82px;height:58px;transform:translate(-50%,-50%);display:grid;place-items:center;border-radius:17px;background:#ff0000;box-shadow:0 10px 32px rgba(0,0,0,.35)}
#nds-feature-video .ndsPlay:before{content:"";margin-left:5px;border-top:12px solid transparent;border-bottom:12px solid transparent;border-left:20px solid #fff}
#nds-feature-video .ndsWatch{position:absolute;z-index:2;left:22px;bottom:18px;color:#fff;font-size:16px;font-weight:900}
#nds-video-modal{position:fixed;z-index:9999;inset:0;display:none;align-items:center;justify-content:center;padding:22px;background:rgba(0,10,22,.92)}
#nds-video-modal.open{display:flex}
#nds-video-modal .ndsModalInner{position:relative;width:min(1000px,100%)}
#nds-video-modal video{display:block;width:100%;max-height:82vh;border-radius:18px;background:#000}
#nds-video-modal .ndsClose{position:absolute;right:-8px;top:-48px;width:40px;height:40px;border:1px solid rgba(255,255,255,.5);border-radius:50%;background:#102a42;color:#fff;font-size:28px;line-height:1;cursor:pointer}
@media(max-width:620px){#nds-feature-video{padding:42px 0}#nds-feature-video .ndsPlay{width:66px;height:47px;border-radius:14px}#nds-feature-video .ndsWatch{left:14px;bottom:12px;font-size:13px}}
</style>`;

const VIDEO_SECTION = `<section id="nds-feature-video" aria-label="Neloy Digital Solutions introduction video">
  <div class="ndsVideoWrap">
    <span class="ndsVideoLabel">Watch Our Process</span>
    <h2>See how we bring your project to life</h2>
    <p>Learn how Neloy Digital Solutions works with your requirements and budget across graphic design, video editing and website design.</p>
    <button class="ndsVideoThumb" id="nds-video-open" type="button" aria-label="Play Neloy Digital Solutions project process video">
      <img src="/showcase-media/neloy-project-process-thumbnail.jpg" alt="Neloy Digital Solutions project process video thumbnail" loading="eager">
      <span class="ndsPlay" aria-hidden="true"></span>
      <span class="ndsWatch">▶ Watch the video</span>
    </button>
  </div>
</section>`;

const VIDEO_MODAL = `<div id="nds-video-modal" role="dialog" aria-modal="true" aria-label="Neloy Digital Solutions video">
  <div class="ndsModalInner">
    <button class="ndsClose" id="nds-video-close" type="button" aria-label="Close video">×</button>
    <video id="nds-project-video" controls playsinline preload="metadata" poster="/showcase-media/neloy-project-process-thumbnail.jpg">
      <source src="/showcase-media/neloy-project-process.mp4" type="video/mp4">
    </video>
  </div>
</div>`;

const VIDEO_SCRIPT = `<script id="nds-home-video-script">
(function(){
  var open=document.getElementById('nds-video-open');
  var modal=document.getElementById('nds-video-modal');
  var close=document.getElementById('nds-video-close');
  var video=document.getElementById('nds-project-video');
  if(!open||!modal||!close||!video)return;
  function show(){modal.classList.add('open');document.body.style.overflow='hidden';video.play().catch(function(){});}
  function hide(){video.pause();modal.classList.remove('open');document.body.style.overflow='';}
  open.addEventListener('click',show);
  close.addEventListener('click',hide);
  modal.addEventListener('click',function(e){if(e.target===modal)hide();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open'))hide();});
})();
</script>`;

function addHomeVideo(html,path){
  if(path!=='/'&&path!=='')return html;
  if(!html.includes('id="nds-home-video-style"')&&html.includes('</head>'))html=html.replace('</head>',VIDEO_STYLE+'</head>');
  if(!html.includes('id="nds-feature-video"')){
    const mainStart=html.search(/<main\b[^>]*>/i);
    const firstSectionEnd=mainStart>=0?html.indexOf('</section>',mainStart):-1;
    if(firstSectionEnd>=0){const at=firstSectionEnd+10;html=html.slice(0,at)+VIDEO_SECTION+html.slice(at);}
    else if(html.includes('</header>'))html=html.replace('</header>','</header>'+VIDEO_SECTION);
  }
  if(!html.includes('id="nds-video-modal"')&&html.includes('</body>'))html=html.replace('</body>',VIDEO_MODAL+VIDEO_SCRIPT+'</body>');
  return html;
}

export default{
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(request.method==='GET'&&url.pathname==='/showcase-media/neloy-project-process.mp4'&&env.ASSETS){
      const responses=await Promise.all(VIDEO_PARTS.map(function(path){return env.ASSETS.fetch(new Request(new URL(path,url.origin),request));}));
      if(responses.every(function(response){return response.ok;})){
        const buffers=await Promise.all(responses.map(function(response){return response.arrayBuffer();}));
        const size=buffers.reduce(function(total,buffer){return total+buffer.byteLength;},0);
        const video=new Uint8Array(size);
        let offset=0;
        buffers.forEach(function(buffer){video.set(new Uint8Array(buffer),offset);offset+=buffer.byteLength;});
        return new Response(video,{headers:{'content-type':'video/mp4','content-length':String(size),'cache-control':'public, max-age=86400','accept-ranges':'none'}});
      }
    }
    const response=await currentWorker.fetch(request,env,ctx);
    const type=response.headers.get('content-type')||'';
    if(request.method!=='GET'||!response.ok||!type.includes('text/html')||url.pathname.startsWith('/admin'))return response;
    const html=addHomeVideo(await response.text(),url.pathname);
    const headers=new Headers(response.headers);
    headers.delete('content-length');
    headers.delete('etag');
    headers.set('cache-control','no-store');
    return new Response(html,{status:response.status,statusText:response.statusText,headers});
  }
};
