const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#075DFF"/><stop offset="1" stop-color="#12DFF3"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#g)"/><text x="32" y="43" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="white">N</text></svg>`;
const FAVICON_TAG = `<link id="nds-favicon" rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}">`;

export function addFavicon(html){
  const lower = html.toLowerCase();
  if (
    html.includes('id="nds-favicon"') ||
    lower.includes('rel="icon"') ||
    lower.includes("rel='icon'") ||
    lower.includes('rel="shortcut icon"') ||
    lower.includes("rel='shortcut icon'")
  ) return html;

  const headClose = lower.indexOf("</head>");
  return headClose >= 0
    ? html.slice(0, headClose) + FAVICON_TAG + "\n" + html.slice(headClose)
    : FAVICON_TAG + html;
}
