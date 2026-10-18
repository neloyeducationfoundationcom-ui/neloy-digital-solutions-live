// Progressive visual enhancement only. Never wrap, replace or rewrite page content.
export const HOMEPAGE_MOTION_CSS = `<style id="nds-homepage-motion-style">
@media (prefers-reduced-motion:no-preference){
html:has(body.nds-home-motion){scroll-behavior:smooth}
body.nds-home-motion .nds-concept-copy h1{animation:nds-headline-arrive .85s cubic-bezier(.22,1,.36,1) both}
body.nds-home-motion .nds-concept-copy :is(.nds-concept-eyebrow,.nds-concept-subtitle,.nds-concept-legacy,.nds-concept-actions,.nds-concept-benefits){animation:nds-copy-arrive .7s cubic-bezier(.22,1,.36,1) both;animation-delay:.12s}
body.nds-home-motion .nds-concept-copy .nds-concept-actions{animation-delay:.22s}
body.nds-home-motion .nds-concept-copy .nds-concept-benefits{animation-delay:.3s}
body.nds-home-motion .nds-concept-visual{animation:nds-device-arrive 1.1s cubic-bezier(.22,1,.36,1) both}
body.nds-home-motion .nds-mobile-device{animation:nds-phone-settle 2.8s cubic-bezier(.22,1,.36,1) both}
body.nds-home-motion :is(#services .card,.nds-work-card,#nds-feature-video .nds-feature-video-card){transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s ease,border-color .4s ease}
body.nds-home-motion #services .card .icon{transition:transform .4s cubic-bezier(.22,1,.36,1)}
body.nds-home-motion .nds-work-art{overflow:hidden;isolation:isolate}
body.nds-home-motion .nds-work-art > :is(.nds-art-monogram,.nds-art-lines,.nds-art-window){transition:transform .75s cubic-bezier(.22,1,.36,1)}
body.nds-home-motion #nds-feature-video img{transition:transform .75s cubic-bezier(.22,1,.36,1)}
body.nds-home-motion :is(.top .navlinks,footer) a{transition:color .25s ease,text-decoration-color .25s ease;text-underline-offset:.3em}
body.nds-home-motion :is(.top .navlinks,footer) a:focus-visible{outline:2px solid #086af6;outline-offset:5px}
@media (hover:hover) and (pointer:fine){
body.nds-home-motion #services .card:hover{transform:translateY(-5px);box-shadow:0 22px 44px rgba(7,26,47,.12)!important;border-color:#9ec3f0!important}
body.nds-home-motion #services .card:hover .icon{transform:translateY(-2px) rotate(-4deg)}
body.nds-home-motion .nds-work-card:hover{transform:translateY(-4px)}
body.nds-home-motion .nds-work-card:is(:hover,:focus-visible) .nds-work-art > :is(.nds-art-monogram,.nds-art-lines,.nds-art-window){transform:scale(1.035)}
body.nds-home-motion #nds-feature-video button:hover img{transform:scale(1.025)}
body.nds-home-motion :is(.top .navlinks,footer) a:hover{text-decoration:underline;text-decoration-color:#16b7d4}
}
@keyframes nds-headline-arrive{from{transform:translateY(16px)}to{transform:translateY(0)}}
@keyframes nds-copy-arrive{from{opacity:.45;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes nds-device-arrive{from{transform:translateY(20px) scale(.98)}to{transform:translateY(0) scale(1)}}
@keyframes nds-phone-settle{0%{translate:0 12px}60%{translate:0 -4px}100%{translate:0 0}}
}
@media (prefers-reduced-motion:reduce){body.nds-home-motion,html:has(body.nds-home-motion){scroll-behavior:auto!important}}
</style>`;

// No scroll listeners, dependency downloads, new media, counter rewrites or network calls.
export function initHomepageMotion() {
  const root = document.querySelector('main.nds-premium-home');
  if (!root || root.dataset.ndsMotionInitialized) return;
  root.dataset.ndsMotionInitialized = 'true';
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  const running = new Set();
  function reset() {
    observer?.disconnect();
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
          observer.unobserve(target);
          // Keyboard users never have to wait for a focused control to become visible.
          if (target.contains(document.activeElement)) return;
          const statistics = target.matches('.neloy-stats-grid > div');
          const frames = statistics
            ? [{transform:'translateY(8px)',opacity:.7},{transform:'translateY(0)',opacity:1}]
            : [{transform:'translateY(18px)',opacity:.35},{transform:'translateY(0)',opacity:1}];
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
        '#nds-feature-video > .wrap'
      ];
      groups.forEach(selector => {
        root.querySelectorAll(selector).forEach((target, index) => {
          target.dataset.ndsMotionDelay = String((index % 3) * 60);
          observer.observe(target);
        });
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
  start();
}

export function addHomepageMotion(html, path) {
  if (path !== '/' || !html.includes('class="nds-premium-home"') || html.includes('id="nds-homepage-motion-style"')) return html;
  if (!html.includes('</head>') || !html.includes('</body>')) return html;
  const script = '<script id="nds-homepage-motion-script">(' + initHomepageMotion.toString() + ')();</script>';
  return html.replace('</head>', HOMEPAGE_MOTION_CSS + '</head>').replace('</body>', script + '</body>');
}
