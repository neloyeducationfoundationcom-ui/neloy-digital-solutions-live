// Homepage-only client-name wall. Existing portfolio names; no logos or review claims.
const ROWS = [
  [
    "Kona Construction Services",
    "Milford’s Mochas",
    "The Testing Co.",
    "Amateurs Paradise",
    "Care Space",
    "Supreme Gallery"
  ],
  [
    "Electric Web Services",
    "Top-Notch Assignments",
    "HQE Systems",
    "DIESEL",
    "Terrarum Landscape & Concrete Services",
    "Excel Cloud"
  ],
  [
    "Volusia Info",
    "Nathan Webster & Associates, LLC",
    "Ethereal Day Spa",
    "35 Associates",
    "Antro Latin Lounge",
    "Azan VoIP"
  ],
  [
    "Monarch Sustainable Landscaping",
    "Meta Shades",
    "Ying’s Thai Kitchen",
    "Journey Chiropractic",
    "M.I.D Postal Pack & Ship",
    "Hyper Deals Online"
  ],
  [
    "Nervicia Construction",
    "Generations Plumbing & Mechanical",
    "Infinity Web Logistics",
    "Dobrin Health",
    "Martorcor Landscaping Co.",
    "Los Rubas Mexican Grill"
  ],
  [
    "Avanu on Flagler",
    "Simplicity in Advertising",
    "Anarchism Today",
    "951 Thai Food",
    "Life of the Barty"
  ]
];
const escapeHTML = value => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const CSS = `<style id="nds-client-name-motion">
#nds-client-name-marquee{padding:40px 0 56px;background:#f4f8ff;border-block:1px solid #dce9f8;max-width:100%;overflow:hidden;color:#071a2f}
#nds-client-name-marquee h2{margin:0 20px 26px;text-align:center;font-size:clamp(26px,4vw,38px);line-height:1.2;color:#071a2f}
#nds-client-name-marquee .nds-name-wall{display:flex;flex-direction:column;gap:12px;overflow:hidden;max-width:100%;mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)}
#nds-client-name-marquee .nds-name-row{overflow:hidden;position:relative}
#nds-client-name-marquee .nds-name-track{display:flex;width:max-content;animation:nds-names-forward var(--duration) linear infinite}
#nds-client-name-marquee .nds-name-row:nth-child(even) .nds-name-track{animation-name:nds-names-reverse}
#nds-client-name-marquee .nds-name-group{display:flex;align-items:center;gap:12px;padding-right:12px;flex-shrink:0}
#nds-client-name-marquee .nds-name-pill{display:inline-flex;align-items:center;padding:10px 20px;border:1.5px solid #d2e1f3;border-radius:999px;background:#fff;white-space:nowrap;flex-shrink:0;font-size:.82rem;font-weight:500;line-height:1.5;letter-spacing:.01em;color:#17365c}
#nds-client-name-marquee:has(.nds-motion-toggle:checked) .nds-name-track{animation-play-state:paused}
#nds-client-name-marquee .nds-motion-control{display:block;width:max-content;margin:20px auto 0;font-size:12px;color:#526983;cursor:pointer}
#nds-client-name-marquee .nds-motion-toggle{margin-right:6px;accent-color:#086af6}
@keyframes nds-names-forward{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes nds-names-reverse{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@media(prefers-reduced-motion:reduce){#nds-client-name-marquee .nds-name-track{animation:none;width:auto}#nds-client-name-marquee .nds-name-group{flex-wrap:wrap;justify-content:center;padding:0 16px}#nds-client-name-marquee .nds-name-group[aria-hidden="true"]{display:none}#nds-client-name-marquee .nds-name-wall{mask-image:none}#nds-client-name-marquee .nds-motion-control{display:none}#nds-client-name-marquee .nds-name-pill{white-space:normal;max-width:100%;box-sizing:border-box}}
</style>`;

export function addClientNameMarquee(html) {
  if (html.includes('id="nds-client-name-marquee"')) return html;
  const anchor = /<section\b[^>]*class=["'][^"']*\bnds-client-feedback\b[^"']*["'][^>]*>/i;
  if (!anchor.test(html)) return html;
  const durations = [38,42,40,36,44,38];
  const rows = ROWS.map((names, i) => {
    const pills = names.map(name => '<span class="nds-name-pill">' + escapeHTML(name) + '</span>').join('');
    // Repeat within each half so even a wide desktop is filled. Only the originals are exposed to assistive technology.
    const group = '<div class="nds-name-group">' + pills + '<span class="nds-name-group" aria-hidden="true">' + pills + '</span></div>';
    return '<div class="nds-name-row" style="--duration:' + durations[i] + 's"><div class="nds-name-track">' + group + '<div class="nds-name-group" aria-hidden="true">' + pills + '<span class="nds-name-group">' + pills + '</span></div></div></div>';
  }).join('');
  const section = '<section id="nds-client-name-marquee" aria-labelledby="nds-client-name-heading"><h2 id="nds-client-name-heading">Who We Work With</h2><div class="nds-name-wall">' + rows + '</div><label class="nds-motion-control"><input class="nds-motion-toggle" type="checkbox">Pause motion</label></section>';
  return html.replace(anchor, section + '$&').replace('</head>', CSS + '</head>');
}
