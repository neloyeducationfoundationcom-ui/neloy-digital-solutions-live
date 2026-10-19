// Presentation only. Preserve the Worker pipeline, published content and media behavior.
export const CINEMATIC_PATHS = new Set(['/', '/showcase', '/portfolio', '/website', '/website-design', '/logo-design', '/social-media-design', '/video-editing', '/digital-marketing', '/team']);

const STYLE = `<style id="nds-premium-motion-style">
/* Retire competing legacy animation on these public pages. The name wall is excluded. */
body:has(#nds-premium-motion-script) main *:not(#nds-client-name-marquee):not(#nds-client-name-marquee *),
body:has(#nds-premium-motion-script) main :not(#nds-client-name-marquee):not(#nds-client-name-marquee *):before,
body:has(#nds-premium-motion-script) main :not(#nds-client-name-marquee):not(#nds-client-name-marquee *):after,
body:has(#nds-premium-motion-script) .pageFx span{animation:none!important}
.nds-motion-word{display:inline-block;max-width:100%;overflow-wrap:anywhere;vertical-align:baseline}
.nds-page-motion-control{display:flex;justify-content:center;padding:18px 16px}
.nds-page-motion-control button{font:inherit;font-size:12px;border:1px solid #7894b1;border-radius:999px;padding:9px 16px;background:transparent;color:inherit;cursor:pointer;min-height:44px}
.nds-page-motion-control button:focus-visible{outline:3px solid #086af6;outline-offset:4px}
@media(prefers-reduced-motion:reduce){
html:has(#nds-premium-motion-script){scroll-behavior:auto!important}
body:has(#nds-premium-motion-script){scroll-behavior:auto!important}
body:has(#nds-premium-motion-script) main *:not(#nds-client-name-marquee):not(#nds-client-name-marquee *){transition:none!important;scroll-behavior:auto!important}
.nds-page-motion-control{display:none}
}
</style>`;

export function initCinematicMotion() {
  function start() {
    const main = document.querySelector('main');
    if (!main || main.dataset.ndsCinematic === 'ready' || !window.IntersectionObserver || !Element.prototype.animate) return;
    main.dataset.ndsCinematic = 'ready';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 767px), (pointer: coarse)');
    const exclude = '#nds-client-name-marquee, #nds-working-locations, form, [role="dialog"], dialog, .ndsModal, #nds-video-modal, [aria-hidden="true"], [hidden]';
    const protectedNode = node => !!node.closest(exclude);
    const cardSelector = '.nds-work-card,.nds-feedback-card,.nds-sc-card,.workCard,.testCard,.gpCard,.wpCard,.web-project-card,.wdCard,.spCard,.mkCard,.svCard,.vpCard,.card,.offerCard,.journeyItem,.ndsProcessCard,.nds-process-steps>li,.spStep,.mkStep';
    const videoFrames = '.ndsVideoThumb,.svPlayer,.nds-new-showreel-player,.vwPlayer,.vpPlayer';
    const effects = new Set(), entered = new WeakSet(), tracks = new Map(), visible = new Set();
    let userPaused = false, frame = 0;
    const paused = () => reduced.matches || userPaused || document.hidden;
    const control = document.createElement('div');
    control.className = 'nds-page-motion-control';
    const button = document.createElement('button');
    button.type = 'button'; button.id = 'nds-page-motion-toggle';
    button.textContent = 'Pause page motion'; button.setAttribute('aria-pressed', 'false');
    control.append(button);
    // Independent of the existing name wall's own pause control.
    (document.querySelector('body > footer') || main.parentElement).append(control);

    function animate(node, keyframes, delay = 0, duration = 820) {
      if (paused() || protectedNode(node) || node.contains(document.activeElement)) return;
      const effect = node.animate(keyframes, {duration: compact.matches ? duration * .78 : duration, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards'});
      effects.add(effect);
      effect.onfinish = () => {effects.delete(effect); effect.cancel();};
      effect.oncancel = () => effects.delete(effect);
    }
    function words(heading) {
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
      const result = [];
      nodes.forEach(text => {
        if (!text.textContent.trim() || text.parentElement.closest('a,button,svg,.nds-motion-word,[aria-hidden]')) return;
        const fragment = document.createDocumentFragment();
        text.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) fragment.append(document.createTextNode(part));
          else {const word = document.createElement('nds-word');word.className = 'nds-motion-word';word.textContent = part;fragment.append(word);result.push(word);}
        });
        text.replaceWith(fragment);
      });
      return result;
    }
    const targets = new Map();
    function add(selector, type) {
      main.querySelectorAll(selector).forEach(node => {
        if (protectedNode(node) || node.closest(cardSelector) && type !== 'card') return;
        if (type === 'card' && node.parentElement.closest(cardSelector)) return;
        if (!targets.has(node)) targets.set(node, type);
      });
    }
    add(cardSelector, 'card');
    add('h1,h2', 'heading');
    add('.nds-concept-eyebrow,.nds-concept-subtitle,.nds-concept-legacy,.nds-section-kicker,.spEyebrow,.mkEyebrow,.sectionHead>p,.nds-center-heading>p,.nds-showcase-heading p,.gpIntro,.wpIntro,.spLead,.mkLead,.showcaseHero .wrap>p,.companyContentArticle>p,.aboutFounderCopy>p,.cpCopy>p', 'copy');
    add('.nds-concept-visual', 'hero');
    add(videoFrames, 'video');
    const observer = new IntersectionObserver(entries => {
      // Nearby items share the same timing origin and a short stagger.
      const incoming = entries.filter(e => e.isIntersecting && !entered.has(e.target));
      incoming.sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top || a.boundingClientRect.left-b.boundingClientRect.left);
      incoming.forEach(({target}, index) => {
        entered.add(target); observer.unobserve(target);
        if (paused()) return;
        const type = targets.get(target), delay = Math.min(index * 65, 195);
        const distance = compact.matches ? 12 : 24;
        if (type === 'heading') {
          // Keep long headings in one effect rather than creating a large word animation set.
          const parts = (target.textContent || '').trim().split(/\s+/).length > 16 ? [target] : words(target);
          parts.forEach((word, i) => animate(word, [{opacity:.2,translate:'0 '+distance+'px'},{opacity:1,translate:'0 0'}], delay + Math.min(i * (compact.matches ? 20 : 28), compact.matches ? 140 : 220), 940));
        } else if (type === 'hero') {
          animate(target, [{opacity:.5,translate:'0 '+(compact.matches?22:44)+'px',scale:'.97'},{opacity:1,translate:'0 0',scale:'1'}], 160, 1250);
        } else if (type === 'video') {
          // Only the frame enters. Captions, playback, controls and media URLs are untouched.
          animate(target, [{opacity:.5,translate:'0 '+distance+'px'},{opacity:1,translate:'0 0'}], delay, 1050);
        } else {
          animate(target, [{opacity:type==='card'?.45:.3,translate:'0 '+distance+'px'},{opacity:1,translate:'0 0'}], delay, type==='card'?1000:800);
        }
      });
    }, {threshold:.08, rootMargin:'0px 0px -4% 0px'});

    // Scrub only project imagery, within its existing frame. Never translate captions or controls.
    const projectImages = [...main.querySelectorAll('.web-project-image img,.wdImage img,.wpClientVisual img')].filter(node => !protectedNode(node));
    const artworks = [...main.querySelectorAll('.nds-work-art > .nds-art-window,.nds-work-art > .nds-art-monogram')].filter(node => !protectedNode(node));
    function track(node) {
      if (tracks.has(node) || paused()) return;
      const owner = node.closest('.web-project-image,.wdImage,.wpClientVisual,.nds-work-art');
      if (!owner) return;
      if (node.tagName === 'IMG' && (!node.complete || !node.naturalWidth)) return;
      if (node.tagName === 'IMG' && getComputedStyle(node).objectFit !== 'cover') return;
      const image = node.tagName === 'IMG';
      const effect = node.animate(image ? [{objectPosition:'50% 0%'},{objectPosition:'50% 100%'}] : [{translate:'0 8px'},{translate:'0 -8px'}], {duration:1000,fill:'both',easing:'linear'});
      effect.pause();tracks.set(node, {effect,owner}); mediaObserver.observe(owner);
    }
    const mediaObserver = new IntersectionObserver(entries => {
      entries.forEach(({target,isIntersecting}) => {if(isIntersecting)visible.add(target);else visible.delete(target);});
      schedule();
    }, {rootMargin:'80px'});
    function paint() {
      frame = 0;if(paused())return;
      // Read each visible frame once, before any animation writes.
      const rects = new Map();
      visible.forEach(owner=>{if(!owner.contains(document.activeElement))rects.set(owner,owner.getBoundingClientRect());});
      tracks.forEach(({effect,owner}) => {
        const rect=rects.get(owner);if(!rect)return;
        const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
        const time=progress*1000;
        if(effect.currentTime===null || Math.abs(effect.currentTime-time)>=1)effect.currentTime=time;
      });
    }
    function schedule() {if(!frame&&visible.size&&!paused())frame=requestAnimationFrame(paint);}
    function clear() {
      effects.forEach(effect=>effect.cancel());effects.clear();
      tracks.forEach(({effect})=>effect.cancel());tracks.clear();visible.clear();mediaObserver.disconnect();
      if(frame){cancelAnimationFrame(frame);frame=0;}
    }
    function setup() {
      if(paused())return;
      targets.forEach((_,node)=>{if(!entered.has(node))observer.observe(node);});
      projectImages.forEach(track);artworks.forEach(track);schedule();
    }
    projectImages.forEach(node=>node.addEventListener('load',()=>{track(node);schedule();},{once:true}));
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    if(window.ResizeObserver){const resize=new ResizeObserver(schedule);resize.observe(main);}
    // Focus and interaction immediately settle the relevant elements.
    main.addEventListener('focusin',event=>{
      effects.forEach(effect=>{const node=effect.effect?.target;if(node&&(node.contains(event.target)||event.target.contains(node)))effect.cancel();});
      tracks.forEach(({effect,owner},node)=>{if(owner.contains(event.target)){effect.cancel();tracks.delete(node);}});
    });
    main.addEventListener('focusout',setup);
    // React to manual testimonial navigation without replacing its existing handlers.
    main.addEventListener('click',event=>{
      if(paused()||!event.target.closest('.nds-sc-controls button'))return;
      const active=main.querySelector('.nds-sc-active');
      if(active)animate(active,[{translate:'8px 0'},{translate:'0 0'}],0,500);
    });
    button.addEventListener('click',()=>{
      userPaused=!userPaused;button.setAttribute('aria-pressed',String(userPaused));button.textContent=userPaused?'Resume page motion':'Pause page motion';
      clear();observer.disconnect();if(!userPaused)setup();
    });
    reduced.addEventListener('change',()=>{clear();observer.disconnect();if(!reduced.matches)setup();});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();else setup();});
    if(!reduced.matches)setup();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}

export function addCinematicMotion(html) {
  if (!/<main\b/.test(html) || !html.includes('</head>') || !html.includes('</body>') || html.includes('id="nds-premium-motion-script"')) return html;
  // Wrangler's name-preserving bundler adds __name calls inside serialized functions.
  // The browser does not inherit the Worker's module scope; provide that helper locally.
  const script='<script id="nds-premium-motion-script">(()=>{const __name=(fn)=>fn;('+initCinematicMotion.toString()+')();})();</script>';
  return html.replace('</head>',STYLE+'</head>').replace('</body>',script+'</body>');
}
