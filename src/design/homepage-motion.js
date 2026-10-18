// Progressive visual enhancement only. Never wrap, replace or rewrite page content.
export const HOMEPAGE_MOTION_CSS = `<style id="nds-homepage-motion-style">
@media (prefers-reduced-motion:no-preference){
html:has(body:has(main.nds-premium-home)){scroll-behavior:smooth}
body:has(main.nds-premium-home) .nds-concept-copy h1{animation:nds-headline-arrive .85s cubic-bezier(.22,1,.36,1) both}
body:has(main.nds-premium-home) .nds-concept-copy :is(.nds-concept-eyebrow,.nds-concept-subtitle,.nds-concept-legacy,.nds-concept-actions,.nds-concept-benefits){animation:nds-copy-arrive .7s cubic-bezier(.22,1,.36,1) both;animation-delay:.12s}
body:has(main.nds-premium-home) .nds-concept-copy .nds-concept-actions{animation-delay:.22s}
body:has(main.nds-premium-home) .nds-concept-copy .nds-concept-benefits{animation-delay:.3s}
body:has(main.nds-premium-home) .nds-concept-visual{animation:nds-device-arrive 1.1s cubic-bezier(.22,1,.36,1) both}
body:has(main.nds-premium-home) .nds-laptop{animation:nds-laptop-float 6s ease-in-out infinite}
body:has(main.nds-premium-home) .nds-mobile-device{animation:nds-phone-float 5s ease-in-out infinite}
body:has(main.nds-premium-home) :is(#services .card,.nds-work-card,#nds-feature-video .nds-feature-video-card){transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s ease,border-color .4s ease}
body:has(main.nds-premium-home) #services .card .icon{transition:transform .4s cubic-bezier(.22,1,.36,1)}
body:has(main.nds-premium-home) .nds-work-art{overflow:hidden;isolation:isolate}
body:has(main.nds-premium-home) .nds-work-art > :is(.nds-art-monogram,.nds-art-lines,.nds-art-window){transition:transform .75s cubic-bezier(.22,1,.36,1)}
body:has(main.nds-premium-home) #nds-feature-video img{transition:transform .75s cubic-bezier(.22,1,.36,1)}
body:has(main.nds-premium-home) :is(.top .navlinks,footer) a{transition:color .25s ease,text-decoration-color .25s ease;text-underline-offset:.3em}
body:has(main.nds-premium-home) :is(.top .navlinks,footer) a:focus-visible{outline:2px solid #086af6;outline-offset:5px}
body:has(main.nds-premium-home) .top .brand{animation:nds-headline-arrive .9s cubic-bezier(.22,1,.36,1) both}
body:has(main.nds-premium-home) :is(.nds-feedback-card,.offerCard,.journeyItem,.nds-process-card){transition:translate .45s cubic-bezier(.22,1,.36,1),box-shadow .45s ease}
body:has(main.nds-premium-home) :is(.nds-concept-actions a,.nds-outline-link,.nds-work-label,.offerCta,.nds-feedback-more,footer a){transition:translate .4s cubic-bezier(.22,1,.36,1),color .3s ease}
body:has(main.nds-premium-home) .nds-feedback-photo{animation:nds-portrait-drift 6s ease-in-out infinite}
body:has(main.nds-premium-home) .nds-feedback-card:nth-child(2) .nds-feedback-photo{animation-delay:-2s}
body:has(main.nds-premium-home) .nds-feedback-card:nth-child(3) .nds-feedback-photo{animation-delay:-4s}
body:has(main.nds-premium-home) :is(.nds-outline-link,.nds-concept-actions a){animation:nds-link-drift 5.5s ease-in-out infinite}
body:has(main.nds-premium-home) .nds-work-art > :is(.nds-art-monogram,.nds-art-window){animation:nds-art-pan 7s ease-in-out infinite}
@supports (animation-timeline:view()){
body:has(main.nds-premium-home) main > section:not(.nds-concept-hero):not(#nds-client-name-marquee) > :is(.wrap,.offerWrap,.answerWrap,.cpWrap){animation:nds-section-travel linear both;animation-timeline:view();animation-range:entry 0% entry 100%}
body:has(main.nds-premium-home) #contact:focus-within > .wrap{animation:none;translate:0 0}
}
@media (hover:hover) and (pointer:fine){
body:has(main.nds-premium-home) :is(.nds-feedback-card,.offerCard,.journeyItem,.nds-process-card):hover{translate:0 -5px}
body:has(main.nds-premium-home) :is(.nds-concept-actions a,.nds-outline-link,.offerCta,.nds-feedback-more):hover{translate:0 -3px}
body:has(main.nds-premium-home) .nds-work-card:hover .nds-work-label{translate:6px 0}
body:has(main.nds-premium-home) #services .card:hover{transform:translateY(-5px);box-shadow:0 22px 44px rgba(7,26,47,.12)!important;border-color:#9ec3f0!important}
body:has(main.nds-premium-home) #services .card:hover .icon{transform:translateY(-2px) rotate(-4deg)}
body:has(main.nds-premium-home) .nds-work-card:hover{transform:translateY(-4px)}
body:has(main.nds-premium-home) .nds-work-card:is(:hover,:focus-visible) .nds-work-art > :is(.nds-art-monogram,.nds-art-lines,.nds-art-window){transform:scale(1.035)}
body:has(main.nds-premium-home) #nds-feature-video button:hover img{transform:scale(1.025)}
body:has(main.nds-premium-home) :is(.top .navlinks,footer) a:hover{text-decoration:underline;text-decoration-color:#16b7d4}
}
@keyframes nds-headline-arrive{from{transform:translateY(16px)}to{transform:translateY(0)}}
@keyframes nds-copy-arrive{from{opacity:.45;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes nds-device-arrive{from{transform:translateY(20px) scale(.98)}to{transform:translateY(0) scale(1)}}
@keyframes nds-link-drift{0%,100%{translate:0 0}50%{translate:0 -4px}}
@keyframes nds-art-pan{0%,100%{translate:0 0;scale:1}50%{translate:0 -8px;scale:1.025}}
@keyframes nds-section-travel{from{translate:0 36px}to{translate:0 0}}
@keyframes nds-portrait-drift{0%,100%{translate:0 0}50%{translate:0 -4px}}
@keyframes nds-laptop-float{0%,100%{translate:0 0}50%{translate:0 -12px}}
@keyframes nds-phone-float{0%,100%{translate:0 0}50%{translate:0 9px}}
body:has(main.nds-premium-home):has(.nds-motion-toggle:checked) :is(main,footer) *{animation-play-state:paused!important}
}
@media (prefers-reduced-motion:reduce){html:has(main.nds-premium-home){scroll-behavior:auto!important}}
</style>`;

// No scroll listeners, dependency downloads, new media, counter rewrites or network calls.
export function initHomepageMotion() {
  const root = document.querySelector('main.nds-premium-home');
  if (!root || root.dataset.ndsMotionInitialized) return;
  root.dataset.ndsMotionInitialized = 'true';
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  let mediaObserver;
  const mediaStates = new Map();
  const running = new Set();
  function reset() {
    observer?.disconnect();
    mediaObserver?.disconnect();
    mediaStates.forEach((state, video) => {video.pause(); video.muted = state.muted; video.loop = state.loop;});
    mediaStates.clear();
    running.forEach(animation => animation.cancel());
    running.clear();
    document.body.classList.remove('nds-home-motion');
  }
  function start() {
    reset();
    if (preference.matches) return;
    document.body.classList.add('nds-home-motion');
    if (!('IntersectionObserver' in window) || typeof Element.prototype.animate !== 'function') return;
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(({target, isIntersecting}) => {
          if (!isIntersecting) return;
          // Reveal again after a section leaves and re-enters the mobile viewport.
          if (running.size > 80) return;
          // Keyboard users never have to wait for a focused control to become visible.
          if (target.contains(document.activeElement)) return;
          const statistics = target.matches('.neloy-stats-grid > div');
          const frames = statistics
            ? [{transform:'translateY(8px)',opacity:.7},{transform:'translateY(0)',opacity:1}]
            : [{transform:'translateY(28px)',opacity:.2},{transform:'translateY(0)',opacity:1}];
          try {
            const animation = target.animate(frames, {
              duration: statistics ? 500 : 680,
              delay: Number(target.dataset.ndsMotionDelay || 0),
              easing:'cubic-bezier(.22,1,.36,1)',
              fill:'backwards'
            });
            running.add(animation);
            const release = () => running.delete(animation);
            animation.addEventListener('finish', release, {once:true});
            animation.addEventListener('cancel', release, {once:true});
          } catch { /* Fail open: source content has no hidden state. */ }
        });
      }, {threshold:.08, rootMargin:'0px 0px -20px 0px'});
      const groups = [
        '#services .sectionHead', '#services .card',
        '.nds-showcase-heading', '.nds-work-card',
        '#business-results .neloy-stats-grid > div',
        '#about-founder .aboutFounderCopy > :is(h2,p)',
        '#about-founder .journeyItem',
        '.nds-concept-process .nds-process-card',
        '#nds-feature-video > .wrap',
        '.nds-feedback-card', '.nds-feedback-card .nds-feedback-person',
        '#contact .contactIntro', '#contact form',
        '#nds-client-offers .offerCard', '#nds-answer-section .answerCard',
        '#nds-creative-partner .cpMini', '#nds-creative-partner .cpCard',
        '#nds-insights .nds-insights-inner',
        'section:not(.nds-concept-hero) h2',
        'section:not(.nds-concept-hero) > .wrap > p',
        '.companyContent p', '#nds-creative-partner p',
        '#nds-answer-section h3', '#nds-client-offers .offerIntro'
      ];
      groups.forEach(selector => {
        root.querySelectorAll(selector).forEach((target, index) => {
          target.dataset.ndsMotionDelay = String((index % 3) * 60);
          observer.observe(target);
        });
      });
      // Existing inline videos only; never load hidden modal media or autoplay audio.
      const videos = [...root.querySelectorAll('video')].filter(video => typeof video.play === 'function');
      if (videos.length && !window.navigator?.connection?.saveData) {
        mediaObserver = new IntersectionObserver(entries => {
          entries.forEach(({target:video,isIntersecting}) => {
            if (!isIntersecting || document.querySelector('.nds-motion-toggle:checked')) { video.pause(); return; }
            videos.forEach(other => {if (other !== video) other.pause();});
            if (!mediaStates.has(video)) mediaStates.set(video,{muted:video.muted,loop:video.loop});
            video.muted = true; video.loop = true; video.playsInline = true;
            video.play()?.catch(() => {}); // Browser may require a tap; original controls remain available.
          });
        }, {threshold:.55});
        videos.forEach(video => mediaObserver.observe(video));
      }
      // Footer lives outside main; keep the enhancement limited to the homepage.
      (document.querySelectorAll?.('footer .footerGrid > div, footer .nds-premium-explore-links') || []).forEach((target, index) => {
        target.dataset.ndsMotionDelay = String((index % 3) * 60);
        observer.observe(target);
      });
    } catch { reset(); }
  }
  if (preference.addEventListener) preference.addEventListener('change', start);
  else if (preference.addListener) preference.addListener(start);
  // Cancel a reveal immediately if a keyboard user tabs into it.
  root.addEventListener('focusin', () => {
    running.forEach(animation => animation.cancel());
    running.clear();
  });
  document.addEventListener('visibilitychange', () => {
    running.forEach(animation => document.hidden ? animation.pause() : animation.play());
  });
  (document.querySelectorAll?.('.nds-motion-toggle') || []).forEach(control => {
    control.addEventListener('change', () => {
      mediaStates.forEach((state, video) => {
        video.pause();
        if (!document.querySelector('.nds-motion-toggle:checked')) {mediaObserver?.unobserve(video);mediaObserver?.observe(video);}
      });
    });
  });
  document.addEventListener('nds:replay-motion', () => {
    reset();
    const style = document.getElementById('nds-homepage-motion-style');
    if (style && !preference.matches) {
      style.disabled = true;
      void root.offsetWidth;
      style.disabled = false;
    }
    start();
  });
  start();
}

export function addHomepageMotion(html, path) {
  if (path !== '/' || !html.includes('class="nds-premium-home"') || html.includes('id="nds-homepage-motion-style"')) return html;
  if (!html.includes('</head>') || !html.includes('</body>')) return html;
  const script = '<script id="nds-homepage-motion-script">(' + initHomepageMotion.toString() + ')();</script>';
  return html.replace('</head>', HOMEPAGE_MOTION_CSS + '</head>').replace('</body>', script + '</body>');
}
