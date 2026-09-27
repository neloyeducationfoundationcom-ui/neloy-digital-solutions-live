# Neloy Digital Solutions: architecture baseline

Recorded 2026-09-27 against `https://neloydigitalsolutions.com/` using read-only GET requests. The production Worker `neloy-digital-solutions-live` showed active Cloudflare version `5623e76d` at 100% traffic, deployed through Wrangler. The dashboard showed only a relative time (3–4 days ago); the precise timestamp was not available. GitHub `main` was `fc865c7b4b15e0f8488f3dab8c6db6a5e96dba94` with a matching deployment message. Matching messages do not prove identical deployed bytes.

## Public route contract

| Path | GET | Canonical or destination |
| --- | ---: | --- |
| `/` | 200 | `/` |
| `/showcase` | 200 | `/showcase` |
| `/portfolio` | 200 | `/showcase` |
| `/logo-design` | 200 | `/logo-design` |
| `/website-design` | 200 | `/website-design` |
| `/social-media-design` | 200 | `/social-media-design` |
| `/video-editing` | 200 | `/video-editing` |
| `/digital-marketing` | 200 | `/digital-marketing` |
| `/team` | 200 | `/` |
| `/terms` | 200 | `/` |
| `/website`, `/website/` | 200 | `/` |
| `/web-design-bangladesh`, `/web-design-bangladesh/` | 301 | existing Systeme.io consultation URL |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | 200 | generated responses |
| `/admin` | 200 | interface only; lead data was not accessed |

The seven sitemap URLs are `/`, `/showcase`, `/logo-design`, `/website-design`, `/social-media-design`, `/video-editing`, and `/digital-marketing`; video information is included. `robots.txt` allows crawling and points to the custom-domain sitemap. The repository has a `302` rule for `/website`, but production returns `200`. Several HTML pages output duplicate robots meta tags. JSON-LD on the public pages inspected was parseable. The Search Console verification tag was present. Search Console ingestion, production D1, admin token operation, and live form submissions were not tested.

Home navigation: Home, Services, About, Portfolio & Reviews, Contact. Home footer links: Team Members, Terms & Agreement. The homepage includes a lead form targeting `/api/leads`, a WhatsApp link, a Meta Pixel, and a Cloudflare analytics beacon. Public pages, H1s, page metadata, and internal links were inventoried in the read-only review; `scripts/verify-public.mjs` checks their stable route-level properties.

Observed security headers include CSP, HSTS, X-Frame-Options, Referrer-Policy, and X-Content-Type-Options. `/admin` sends no-store and `X-Robots-Tag: noindex, nofollow, noarchive`. Checked media paths `/showcase-media/neloy-project-process-thumbnail.jpg`, `/showcase-media/neloy-ranking-motion-graphics.mp4`, `/showcase-media/neloy-project-process.mp4`, and `/showcase-media/neloy-short-video.mp4` returned 200. Root `/styles.css`, `/script.js`, and `/assets/brand-logo.svg` returned 404; no assumption is made that production HTML references them.

## First change boundary

`src/worker.js` forwards every request to the previous entry without changing the import chain. Only the `main` line in `wrangler.toml` changes. Existing wrappers, routes, public content, assets, D1 bindings, security configuration, and analytics remain as they were. The verification script performs GET requests only; it never submits a lead or reads production lead records. No commit or deployment is included in this change.
