export const HOMEPAGE_MOTION_CSS = `<style id="nds-homepage-motion-style">
@media (prefers-reduced-motion:no-preference){
html:has(main:is(.nds-premium-home,.nds-premium-showcase)){scroll-behavior:smooth}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-concept-copy h1{animation:nds-headline-arrive .85s cubic-bezier(.22,1,.36,1) both}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-concept-copy :is(.nds-concept-eyebrow,.nds-concept-subtitle,.nds-concept-legacy,.nds-concept-actions,.nds-concept-benefits){animation:nds-copy-arrive .7s cubic-bezier(.22,1,.36,1) both;animation-delay:.12s}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-concept-copy .nds-concept-actions{animation-delay:.22s}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-concept-copy .nds-concept-benefits{animation-delay:.3s}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-concept-visual{animation:nds-device-arrive 1.1s cubic-bezier(.22,1,.36,1) both}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-laptop{animation:nds-laptop-float 6s ease-in-out infinite}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-mobile-device{animation:nds-phone-float 5s ease-in-out infinite}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(#services .card,.nds-work-card,#nds-feature-video .nds-feature-video-card){transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s ease,border-color .4s ease}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) #services .card .icon{transition:transform .4s cubic-bezier(.22,1,.36,1)}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-work-art{overflow:hidden;isolation:isolate}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-work-art > :is(.nds-art-monogram,.nds-art-lines,.nds-art-window){transition:transform .75s cubic-bezier(.22,1,.36,1)}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) #nds-feature-video img{transition:transform .75s cubic-bezier(.22,1,.36,1)}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.top .navlinks,footer) a{transition:color .25s ease,text-decoration-color .25s ease;text-underline-offset:.3em}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.top .navlinks,footer) a:focus-visible{outline:2px solid #086af6;outline-offset:5px}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .top .brand{animation:nds-headline-arrive .9s cubic-bezier(.22,1,.36,1) both}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.nds-feedback-card,.offerCard,.journeyItem,.nds-process-card){transition:translate .45s cubic-bezier(.22,1,.36,1),box-shadow .45s ease}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.nds-concept-actions a,.nds-outline-link,.nds-work-label,.offerCta,.nds-feedback-more,footer a){transition:translate .4s cubic-bezier(.22,1,.36,1),color .3s ease}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-feedback-photo{animation:nds-portrait-drift 6s ease-in-out infinite}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-feedback-card:nth-child(2) .nds-feedback-photo{animation-delay:-2s}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-feedback-card:nth-child(3) .nds-feedback-photo{animation-delay:-4s}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.nds-outline-link,.nds-concept-actions a){animation:nds-link-drift 5.5s ease-in-out infinite}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-work-art > :is(.nds-art-monogram,.nds-art-window){animation:nds-art-pan 7s ease-in-out infinite}
@supports (animation-timeline:view()){
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) main > section:not(.nds-concept-hero):not(#nds-client-name-marquee) > :is(.wrap,.offerWrap,.answerWrap,.cpWrap){animation:nds-section-travel linear both;animation-timeline:view();animation-range:entry 0% entry 100%}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) #contact:focus-within > .wrap{animation:none;translate:0 0}
}
body:has(main.nds-premium-showcase) :is(.gpCard,.wpCard,.web-project-image){overflow:hidden}
body:has(main.nds-premium-showcase) :is(.gpCard img,.wpCard img,.web-project-image img){animation:nds-art-pan 7s ease-in-out infinite}
body:has(main.nds-premium-showcase) .nds-sc-card{animation:nds-testimonial-drift 6.5s ease-in-out infinite}
body:has(main.nds-premium-showcase) .nds-sc-card:nth-child(even){animation-delay:-3s}
body:has(main.nds-premium-showcase) .nds-sc-card:focus-within{animation-play-state:paused}
.nds-showcase-motion-control{position:fixed;bottom:88px;left:16px;z-index:40;display:flex;align-items:center;gap:6px;margin:0;padding:8px 12px;border:1px solid #bed7f2;border-radius:99px;background:#fff;color:#17365c;font:12px system-ui;box-shadow:0 4px 18px #071a2f15}
.nds-showcase-motion-control input{width:auto;margin:0;accent-color:#086af6}
@media (hover:hover) and (pointer:fine){
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.nds-feedback-card,.offerCard,.journeyItem,.nds-process-card):hover{translate:0 -5px}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.nds-concept-actions a,.nds-outline-link,.offerCta,.nds-feedback-more):hover{translate:0 -3px}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-work-card:hover .nds-work-label{translate:6px 0}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) #services .card:hover{transform:translateY(-5px);box-shadow:0 22px 44px rgba(7,26,47,.12)!important;border-color:#9ec3f0!important}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) #services .card:hover .icon{transform:translateY(-2px) rotate(-4deg)}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-work-card:hover{transform:translateY(-4px)}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-work-card:is(:hover,:focus-visible) .nds-work-art > :is(.nds-art-monogram,.nds-art-lines,.nds-art-window){transform:scale(1.035)}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) #nds-feature-video button:hover img{transform:scale(1.025)}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.top .navlinks,footer) a:hover{text-decoration:underline;text-decoration-color:#16b7d4}
}
@keyframes nds-headline-arrive{from{transform:translateY(16px)}to{transform:translateY(0)}}
@keyframes nds-copy-arrive{from{opacity:.45;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes nds-device-arrive{from{transform:translateY(20px) scale(.98)}to{transform:translateY(0) scale(1)}}
@keyframes nds-testimonial-drift{0%,100%{translate:0 0}50%{translate:0 -5px}}
@keyframes nds-link-drift{0%,100%{translate:0 0}50%{translate:0 -4px}}
@keyframes nds-art-pan{0%,100%{translate:0 0;scale:1}50%{translate:0 -8px;scale:1.025}}
@keyframes nds-section-travel{from{translate:0 36px}to{translate:0 0}}
@keyframes nds-portrait-drift{0%,100%{translate:0 0}50%{translate:0 -4px}}
@keyframes nds-laptop-float{0%,100%{translate:0 0}50%{translate:0 -12px}}
@keyframes nds-phone-float{0%,100%{translate:0 0}50%{translate:0 9px}}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) main:is(.nds-premium-home,.nds-premium-showcase) img{animation:nds-image-drift 8s ease-in-out infinite}
@keyframes nds-image-drift{0%,100%{translate:0 0}50%{translate:0 -7px}}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) main:is(.nds-premium-home,.nds-premium-showcase) > section:where(:not(#nds-client-name-marquee)) > div{animation:nds-section-breathe 9s ease-in-out infinite!important;animation-timeline:auto!important}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) main:is(.nds-premium-home,.nds-premium-showcase) > section:has(form:focus-within) > div{animation:none!important;translate:0 0!important;transform:none!important}
@keyframes nds-section-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
/* Continuous text/card movement works on touch devices without hover or JavaScript. */
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) main:is(.nds-premium-home,.nds-premium-showcase) :is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,figcaption,summary){animation:nds-text-drift 7s ease-in-out infinite}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) main:is(.nds-premium-home,.nds-premium-showcase) :is(p,li,dt,figcaption){--nds-text-distance:-5px}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) main:is(.nds-premium-home,.nds-premium-showcase) :is(h2,h3,dd):nth-child(even){animation-delay:-2.5s}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) main:is(.nds-premium-home,.nds-premium-showcase) :is(.card,.nds-work-card,.nds-feedback-card,.offerCard,.journeyItem,.gpCard,.wpCard,.web-project-card,.svCard){animation:nds-card-drift 8s ease-in-out infinite}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(.top .brand,.top .navlinks a,footer .footerGrid > div,footer .nds-premium-explore-links){animation:nds-text-drift 7s ease-in-out infinite;--nds-text-distance:-4px}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-concept-copy h1{animation:nds-headline-arrive .85s cubic-bezier(.22,1,.36,1) both,nds-text-drift 7s ease-in-out infinite}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) .nds-concept-copy :is(.nds-concept-eyebrow,.nds-concept-subtitle,.nds-concept-legacy){animation:nds-copy-arrive .7s cubic-bezier(.22,1,.36,1) both,nds-text-drift 7s ease-in-out infinite}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)) :is(#contact form:focus-within,#contact form:focus-within *,a:focus-visible,button:focus-visible){animation-play-state:paused!important}
@keyframes nds-text-drift{0%,100%{translate:0 0}50%{translate:0 var(--nds-text-distance,-8px)}}
@keyframes nds-card-drift{0%,100%{translate:0 0}50%{translate:0 -6px}}
body:has(main:is(.nds-premium-home,.nds-premium-showcase)):has(.nds-motion-toggle:checked) :is(main,footer,header) *{animation-play-state:paused!important}
}
@media (prefers-reduced-motion:reduce){.nds-showcase-motion-control{display:none}html:has(main:is(.nds-premium-home,.nds-premium-showcase)){scroll-behavior:auto!important}}
</style><style id="nds-cinematic-motion-style">main{--nds-cinema-x:-24px;--nds-cinema-y:36px;--nds-cinema-pan:20px}
main :is(.nds-work-art,.web-project-image,.wdImage,.gpVisual){overflow:clip}
@media(max-width:767px),(pointer:coarse){
main{--nds-cinema-x:0px;--nds-cinema-y:18px;--nds-cinema-pan:6px}
}
@media(min-width:768px) and (max-width:1199px){
main{--nds-cinema-x:-16px;--nds-cinema-y:28px;--nds-cinema-pan:12px}
}
main :is(a,button):focus-visible{outline:2px solid #086af6;outline-offset:4px}
@media(prefers-reduced-motion:no-preference){
.nds-cinema-curtain{position:fixed;inset:0;z-index:9998;background:#071a2f;pointer-events:none;animation:nds-cinema-opening 1.05s cubic-bezier(.76,0,.24,1) forwards}
@keyframes nds-cinema-opening{0%,15%{clip-path:inset(0 0 0 0)}100%{clip-path:inset(0 0 100% 0);visibility:hidden}}

/* Retire broad bobbing for cinematic motion; devices and portraits keep their gentle float. */
body:has(main) main > section:not(#nds-client-name-marquee) > div,
body:has(main) main :is(h1,h2,h3,h4,h5,h6,p,li,dt,dd,figcaption,summary,.card,.nds-work-card,.nds-feedback-card,.offerCard,.journeyItem,.gpCard,.wpCard,.web-project-card,.svCard,.nds-sc-card):not(#nds-client-name-marquee *){animation:none!important;translate:0 0}

@media(hover:hover) and (pointer:fine){
main :is(.nds-work-card,.gpCard,.wpCard,.web-project-card){transition:box-shadow .5s ease,filter .5s ease}
main :is(.nds-work-card,.gpCard,.wpCard,.web-project-card):hover{box-shadow:0 24px 50px #071a2f22;filter:saturate(1.08)}
}
/* Scroll choreography is driven by visible-element Web Animations on every supported browser. */
}
.nds-cinema-word{display:inline-block;vertical-align:baseline;transform-origin:50% 100%}
@media(prefers-reduced-motion:reduce){.nds-cinema-curtain{display:none!important}}
body:has(.nds-motion-toggle:checked) main :not(#nds-client-name-marquee *):not(#nds-client-name-marquee){animation-play-state:paused!important}
</style>`;
// Progressive motion; original content and routing remain intact.
export function initReferenceMotion(){
 if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initReferenceMotion,{once:true});return}
 const main=document.querySelector('main');
 const root=main&&document.body?.querySelectorAll?document.body:main;
 if(!root||root.dataset.cinemaReady||!window.IntersectionObserver||!Element.prototype.animate)return;
 root.dataset.cinemaReady='true';
 if(!document.querySelector('.nds-motion-toggle')){
  const label=document.createElement('label');label.className='nds-showcase-motion-control';
  const toggle=document.createElement('input');toggle.type='checkbox';toggle.className='nds-motion-toggle';
  label.append(toggle,document.createTextNode('Pause motion'));document.body.append(label);
 }
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const compact=matchMedia('(max-width: 767px), (pointer: coarse)');
 const active=new Set(),seen=new WeakSet(),words=new WeakMap(),loops=new Map();
 const cards='.nds-work-card,.gpCard,.wpCard,.web-project-card,.wdCard,.spCard,.mkCard,.svCard,.partnerCard,.testCard,.nds-sc-card,.nds-feedback-card,.card,.offerCard,.journeyItem,.spStep,.mkStep';
 const media='.nds-work-art,.web-project-image,.wdImage,.gpVisual,.svPlayer,.nds-feature-video-card,video,iframe';
 const projectMedia='.nds-sc-card,.nds-feedback-card,.testCard,.nds-work-card,.gpCard,.wpCard,.web-project-card,.wdCard,.svCard,.wpClientFeature,.wpClientVisual,.svPlayer,.nds-new-showreel-player,.nds-feature-video-card,.wdImage img,.web-project-image img,.gpVisual img,.wpCard img';
 const protectedNode=node=>!!node?.closest?.('#nds-client-name-marquee');
 const paused=()=>reduced.matches||!!document.querySelector('.nds-motion-toggle:checked');
 function intro(){
  if(paused()||document.querySelector('[data-nds-cinema-intro]'))return;
  const curtain=document.createElement('div');curtain.dataset.ndsCinemaIntro='true';
  curtain.setAttribute('aria-hidden','true');curtain.className='nds-cinema-curtain';
  document.body.append(curtain);
  curtain.addEventListener('animationend',()=>curtain.remove(),{once:true});
 }
 function run(node,frames,delay=0,duration=1100){
  if(paused()||protectedNode(node)||!node?.animate)return;
  const adjusted=compact.matches?frames.map(frame=>frame.transform?{...frame,transform:frame.transform.replace(/translateY\((\d+)px\)/g,(_,n)=>'translateY('+Math.round(Number(n)*.45)+'px)')}:frame):frames;
  const effect=node.animate(adjusted,{duration:compact.matches?Math.round(duration*.7):duration,delay:compact.matches?Math.round(delay*.5):delay,fill:'backwards',easing:'cubic-bezier(.16,1,.3,1)'});
  active.add(effect);effect.onfinish=()=>active.delete(effect);
 }
 function titleWords(heading){
  if(words.has(heading))return words.get(heading);
  if(!document.createTreeWalker)return [heading];
  const walker=document.createTreeWalker(heading,4),textNodes=[];
  while(walker.nextNode())textNodes.push(walker.currentNode);
  const result=[];
  textNodes.forEach(text=>{
   if(!text.textContent.trim()||text.parentElement?.closest('button,a,svg'))return;
   const fragment=document.createDocumentFragment();
   text.textContent.split(/(\s+)/).forEach(part=>{
    if(!part)return;
    if(/^\s+$/.test(part))fragment.append(document.createTextNode(part));
    else{const span=document.createElement('nds-word');span.className='nds-cinema-word';span.textContent=part;fragment.append(span);result.push(span)}
   });text.replaceWith(fragment);
  });
  words.set(heading,result);return result.length?result:[heading];
 }
 function cycle(owner,nodes){
  if(paused()||protectedNode(owner)||loops.has(owner))return;
  const effects=nodes.map((node,i)=>node.animate([
   {translate:'0 14px',opacity:.25,clipPath:'inset(0 0 80% 0)',offset:0},
   {translate:'0 0',opacity:1,clipPath:'inset(0)',offset:.12},
   {translate:'0 0',opacity:1,clipPath:'inset(0)',offset:1}
  ],{duration:compact.matches?8500:7500,delay:i*45,iterations:Infinity,easing:'cubic-bezier(.16,1,.3,1)'}));
  loops.set(owner,effects);
 }
 function clearLoops(owner){
  if(owner){loops.get(owner)?.forEach(effect=>effect.cancel());loops.delete(owner)}
  else{loops.forEach(effects=>effects.forEach(effect=>effect.cancel()));loops.clear()}
 }
 const items=new Map();
 [['h1,h2,h3,h4,h5,h6','heading'],['p,strong,.nds-concept-eyebrow,.nds-work-label,.journeyYear,.founderName,.spEyebrow,.mkEyebrow','copy'],['a,button,summary','control'],[cards,'card'],[media,'media'],['.nds-concept-visual','heroVisual']].forEach(([selector,type])=>root.querySelectorAll(selector).forEach((node,index)=>{
  if(protectedNode(node)||node.closest?.('form,[role=dialog],#nds-feature-video .ndsBudget'))return;
  if(type==='copy'&&node.closest('h1,h2,h3,h4,h5,h6,a,button,summary'))return;
  if(!items.has(node))items.set(node,{type,index});
 }));
 root.querySelectorAll('div,span,li,dt,dd,figcaption').forEach(node=>{
  if(items.has(node)||protectedNode(node)||node.closest?.('form,[role=dialog],h1,h2,h3,h4,h5,h6,p,a,button,summary,svg'))return;
  if(node.children?.length===0&&node.textContent?.trim())items.set(node,{type:'copy',index:items.size});
 });
 document.querySelectorAll?.('footer .footerGrid > div,footer h2,footer h3').forEach((node,index)=>{if(!protectedNode(node))items.set(node,{type:'copy',index})});
 const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
  if(!isIntersecting){clearLoops(target);seen.delete(target);return}
  if(paused()||seen.has(target))return;
  const item=items.get(target);if(!item)return;seen.add(target);
  const hero=!!target.closest?.('.nds-concept-hero');
  if(item.type==='heading'){cycle(target,titleWords(target))}
  if(item.type==='heroVisual')run(target,[{opacity:0,transform:'perspective(1100px) translateY(70px) rotateY(-12deg) scale(.9)'},{opacity:1,transform:'perspective(1100px) translateY(0) rotateY(0) scale(1)'}],550,1600);
  if(item.type==='copy'||item.type==='control')cycle(target,[target]);
  if(item.type==='card')run(target,[{opacity:.35,clipPath:'inset(12% 0 0 0)'},{opacity:1,clipPath:'inset(0)'}],(item.index%3)*100,1100);
  if(item.type==='media')run(target,[{opacity:.4,clipPath:'inset(18% 7% 18% 7% round 18px)'},{opacity:1,clipPath:'inset(0 round 0)'}],100,1400);
 }),{threshold:0,rootMargin:'0px 0px -6% 0px'});
 const attach=()=>{observer.disconnect();items.forEach((_,node)=>{seen.delete(node);observer.observe(node)})};
 const stop=()=>{clearLoops();active.forEach(effect=>effect.cancel());active.clear()};
 // One passive scroll listener, one scheduled frame, geometry only for near-visible media.
 const tracks=new Map(),visible=new Set();let frame=0;
 const canScrub=typeof window.requestAnimationFrame==='function';
 function paint(){
  frame=0;if(paused()||document.hidden)return;
  const height=window.innerHeight||800;
  visible.forEach(node=>{
   const rect=node.getBoundingClientRect();
   const progress=Math.max(0,Math.min(1,(height-rect.top)/(height+rect.height)));
   let effect=tracks.get(node);
   if(!effect){
    const isImage=node.tagName==='IMG';
    effect=node.animate(isImage?[
     {transform:'scale(1.12) translateY(12px)'},
     {transform:'scale(1.02) translateY(-12px)'}
    ]:[{translate:'0 56px',scale:'.97'},{translate:'0 0',scale:'1',offset:.5},{translate:'0 -24px',scale:'1'}],{duration:1000,fill:'both',easing:'linear'});
    effect.pause();tracks.set(node,effect);
   }
   effect.currentTime=progress*1000;
  });
 }
 function schedule(){if(canScrub&&!frame&&!paused())frame=window.requestAnimationFrame(paint)}
 const mediaObserver=canScrub?new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>{if(isIntersecting)visible.add(target);else visible.delete(target)});schedule()},{rootMargin:'100px'}):null;
 function setupScrub(){
  if(paused()||!mediaObserver)return;
  root.querySelectorAll(projectMedia).forEach(node=>{if(!protectedNode(node))mediaObserver.observe(node)});schedule();
 }
 function clearScrub(){mediaObserver?.disconnect();visible.clear();tracks.forEach(effect=>effect.cancel());tracks.clear();if(frame){window.cancelAnimationFrame(frame);frame=0}}
 if(canScrub){window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true})}
 const videoStates=new Map(),manualVideos=new WeakSet();let playingVideo=null;
 const savingData=!!window.navigator?.connection?.saveData;
 function pauseVideos(){videoStates.forEach((_,video)=>{if(!manualVideos.has(video))video.pause?.()});playingVideo=null}
 const playbackObserver=new IntersectionObserver(entries=>{
  entries.forEach(({target:video,isIntersecting,intersectionRatio})=>{
   if(manualVideos.has(video))return;
   if(paused()||savingData||!isIntersecting||intersectionRatio<.55||document.hidden){video.pause?.();if(playingVideo===video)playingVideo=null;return}
   if(video.getClientRects&&!video.getClientRects().length)return;
   if(playingVideo&&playingVideo!==video&&!manualVideos.has(playingVideo))playingVideo.pause?.();
   video.muted=true;video.loop=true;video.playsInline=true;playingVideo=video;
   try{video.play?.()?.catch?.(()=>{})}catch{} // Original controls remain available if autoplay is refused.
  });
 },{threshold:[0,.55]});
 root.querySelectorAll('video').forEach(video=>{
  if(protectedNode(video)||video.closest?.('[hidden],[role=dialog],dialog,.ndsModal'))return;
  videoStates.set(video,{muted:video.muted,loop:video.loop,playsInline:video.playsInline});
  ['pointerdown','keydown'].forEach(type=>video.addEventListener?.(type,()=>manualVideos.add(video),{once:true}));
  playbackObserver.observe(video);
 });
 function refreshVideos(){playbackObserver.disconnect();videoStates.forEach((_,video)=>playbackObserver.observe(video))}
 function restoreVideos(){pauseVideos();videoStates.forEach((state,video)=>{if(!manualVideos.has(video))Object.assign(video,state)})}
 // Focus must not cancel motion across unrelated sections.
 root.addEventListener('focusin',event=>{
  items.forEach((_,node)=>{if(node===event.target||node.contains?.(event.target))clearLoops(node)});
  tracks.forEach((effect,node)=>{if(node===event.target||node.contains?.(event.target)){effect.cancel();tracks.delete(node)}});
 });
 root.addEventListener('focusout',()=>{setupScrub();attach()});
 reduced.addEventListener?.('change',()=>{stop();clearScrub();restoreVideos();if(!reduced.matches){attach();setupScrub();refreshVideos()}});
 document.addEventListener('change',event=>{if(event.target.matches?.('.nds-motion-toggle')){stop();clearScrub();if(paused())pauseVideos();if(!paused()){attach();setupScrub();refreshVideos()}}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();pauseVideos()}else{schedule();refreshVideos();attach()}});
 document.addEventListener('nds:replay-motion',()=>{stop();clearScrub();items.forEach((_,node)=>seen.delete(node));observer.disconnect();intro();attach();setupScrub();refreshVideos()});
 const status=document.querySelector('#motion-review-bar small');if(status)status.textContent=reduced.matches?'Reduced motion ON':'Motion targets: '+items.size;
 if(!reduced.matches){intro();attach();setupScrub()}
}

export function addHomepageMotion(html,path){
 if(!['/','/showcase','/portfolio','/website','/website-design','/logo-design','/social-media-design','/video-editing','/digital-marketing','/team','/terms','/privacy','/blog'].includes(path)&&!path.startsWith('/blog/'))return html;
 if(!/<main\b/.test(html)||html.includes('id="nds-cinematic-motion-script"')||!html.includes('</head>')||!html.includes('</body>'))return html;
 const script='<script id="nds-cinematic-motion-script">(()=>{const __name=(fn)=>fn;('+initReferenceMotion.toString()+')();})();</script>';
 return html.replace('</head>',HOMEPAGE_MOTION_CSS+'</head>').replace('</body>',script+'</body>');
}
