// Public-header disclosure only. Leave desktop navigation and backend routes intact.
const LINKS = [
  ['/', 'Home'],
  ['/#services', 'Services'],
  ['/website-design', 'Website Design'],
  ['/logo-design', 'Logo Design'],
  ['/social-media-design', 'Social Media Design'],
  ['/video-editing', 'Video Editing'],
  ['/digital-marketing', 'Digital Marketing'],
  ['/showcase', 'Portfolio & Reviews'],
  ['/blog', 'Blog'],
  ['/team', 'Our Team'],
  ['/#contact', 'Contact']
];

const STYLE = `<style id="nds-mobile-menu-style">
.nds-mobile-menu-toggle,.nds-mobile-menu-panel{display:none}
@media(max-width:700px){
  .top[data-nds-mobile-menu="ready"] .navlinks,.top[data-nds-mobile-menu="ready"] .back{display:none!important}
  .top[data-nds-mobile-menu="ready"] .nav{height:auto;min-height:70px;display:flex;flex-wrap:wrap;align-items:center;gap:12px}
  .top[data-nds-mobile-menu="ready"] .nds-mobile-menu-toggle{display:inline-flex;align-items:center;justify-content:center;min-width:76px;min-height:44px;margin-left:auto;padding:10px 14px;border:1px solid #075dff;border-radius:10px;background:#075dff;color:#fff;font:inherit;font-size:14px;font-weight:800;cursor:pointer}
  .top[data-nds-mobile-menu="ready"] .nds-mobile-menu-panel:not([hidden]){display:grid;grid-template-columns:minmax(0,1fr);flex:0 0 100%;width:100%;max-height:70vh;max-height:70dvh;overflow-y:auto;overscroll-behavior:contain;padding:8px;background:#fff;border:1px solid #c9e8f7;border-radius:14px}
  .nds-mobile-menu-panel a,.nds-mobile-menu-close{display:flex;align-items:center;min-height:44px;padding:10px 12px;border-radius:8px;color:#0a2a5a;text-decoration:none;font:inherit;font-size:15px;font-weight:700}
  .nds-mobile-menu-panel a:hover{background:#edf8ff}
  .nds-mobile-menu-close{justify-content:center;border:1px solid #c9e8f7;background:#edf8ff;cursor:pointer}
  .nds-mobile-menu-toggle:focus-visible,.nds-mobile-menu-panel a:focus-visible,.nds-mobile-menu-close:focus-visible{outline:3px solid #0a2a5a;outline-offset:2px}
  .nds-mobile-menu-panel[hidden],.nds-mobile-menu-toggle[hidden]{display:none!important}
}
</style>`;

export function initMobileMenu() {
  const header = document.querySelector('.top');
  const toggle = header?.querySelector('#nds-mobile-menu-toggle');
  const panel = header?.querySelector('#nds-mobile-menu-panel');
  if (!header || !toggle || !panel || header.dataset.ndsMobileMenu === 'ready') return;
  const mobile = matchMedia('(max-width:700px)');
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  function close(returnFocus = false) {
    const wasOpen = isOpen();
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
    if (returnFocus && wasOpen && mobile.matches) toggle.focus();
  }
  function syncViewport() {
    if (!mobile.matches && panel.contains(document.activeElement)) header.querySelector('.brand')?.focus();
    close();
    toggle.hidden = !mobile.matches;
  }
  header.dataset.ndsMobileMenu = 'ready';
  toggle.addEventListener('click', () => {
    if (isOpen()) return close(true);
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.textContent = 'Close';
    panel.querySelector('a')?.focus();
  });
  panel.addEventListener('click', event => {
    if (event.target.closest('a')) close();
    if (event.target.closest('.nds-mobile-menu-close')) close(true);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) { event.preventDefault(); close(true); }
  });
  document.addEventListener('click', event => {
    if (isOpen() && !header.contains(event.target)) close();
  });
  document.addEventListener('focusin', event => {
    if (isOpen() && !header.contains(event.target)) close();
  });
  mobile.addEventListener('change', syncViewport);
  syncViewport();
}

export function addMobileNavigation(html) {
  if (!html.includes('class="top"') || html.includes('id="nds-mobile-menu-toggle"')) return html;
  const button = '<button id="nds-mobile-menu-toggle" class="nds-mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="nds-mobile-menu-panel" hidden>Menu</button>';
  const links = LINKS.map(([url, label]) => `<a href="${url}">${label}</a>`).join('');
  const panel = `<nav id="nds-mobile-menu-panel" class="nds-mobile-menu-panel" aria-label="Mobile navigation" hidden>${links}<button type="button" class="nds-mobile-menu-close">Close menu</button></nav>`;
  let injected = false;
  html = html.replace(/<nav class="navlinks">[\s\S]*?<\/nav>/i, nav => { injected = true; return button + nav + panel; });
  if (!injected) html = html.replace(/(<header class="top">[\s\S]*?)(<\/div><\/header>)/i, (_, start, end) => { injected = true; return start + button + panel + end; });
  if (!injected) return html;
  html = html.replace('</head>', STYLE + '</head>');
  return html.replace('</body>', `<script id="nds-mobile-menu-script">(${initMobileMenu.toString()})();</script></body>`);
}
