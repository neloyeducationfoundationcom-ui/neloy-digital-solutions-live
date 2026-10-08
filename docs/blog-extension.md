# Blog extension

Base: `main` at `3a92d1decdce727f3aac2ce8b398ca18da9dcc06` (8 October 2026).

## Scope and integration

Only `premium-site-wrapper.js` changes existing executable source. Its existing import chain stays in order. Two new modules provide content and rendering. `/blog` and `/blog/<slug>` are handled before the existing privacy handler. Every non-blog route follows its existing code path; the sitemap receives additive entries. No existing page navigation, copy, SEO, assets, forms, admin, WhatsApp logic, analytics or security settings are edited.

Blog responses reuse the security headers of the established inner `/website-design` GET handler, discard its body, then use the existing GA4 helper and favicon helper. This adds one internal Worker template call on blog requests only; it does not make an external HTTP request. D1 and ASSETS bindings stay unchanged. There are no new dependencies or configuration changes.

The blog uses the existing premium white, navy and blue brand palette in a dedicated reading layout. Existing site pages are byte-identical in the local regression comparison. Because existing navigation is protected, the extension does not add a Blog link to the homepage or service pages. The index is reachable through its URL and sitemap; new blog pages link back to the existing site.

## Article publishing

Edit `src/blog/articles.js`. Each record has:

- `title`, unique lowercase hyphenated `slug`, `metaTitle`, `metaDescription`, `summary`, `category`.
- `published`, `datePublished` and `dateModified` as ISO timestamps with timezone. Keep genuine publication dates and update `dateModified` when substantive content changes.
- `sections`: unique anchor `id`, heading `title`, trusted editorial HTML `body`. Do not insert user-supplied HTML or request parameters.
- `serviceLinks`: existing main-domain path plus descriptive label.
- `relatedSlugs`: other published article slugs.
- Optional `image`: main-domain absolute path such as `/assets/example.jpg`, meaningful `alt`, numeric `width`/`height`, and optional `caption`. Store the licensed/owned image in `public/` first. No decorative stock imagery is required for a checklist article.

The canonical URL and publisher are derived centrally from the main domain and Neloy Digital Solutions. Drafts (`published:false`) and future-dated records are omitted from index, articles, related links and sitemap. Publication requires the normal repository deployment; this is not a scheduling service. Unknown articles return HTTP 404 with noindex. GET/HEAD are supported; other blog methods return 405. Trailing slash variants use the same no-slash canonical.

Add a record and deploy; no additional route code is needed. Verify uniqueness, dates, useful original content, spelling, links, image rights and headings before publication.

## SEO and sitemap

Article pages emit `BlogPosting` with headline, description, canonical URL, visible organizational author/publisher, publication/modification dates, language, category and optional image. `BreadcrumbList` matches the visible Home → Blog → Article trail. The index emits `Blog` and breadcrumbs. No invented AEO types or fabricated review/ranking claims.

Blog URLs always use `https://neloydigitalsolutions.com`. Existing public Workers.dev redirection is untouched. `robots.txt` and `llms.txt` are unchanged. `/sitemap.xml` retains its existing eight URLs and video markup; adds the blog index and three published articles, with editorial `lastmod` timestamps. Duplicate additions are avoided. Future content uses the same generator automatically.

## AdSense preparation

The page template separates article header, article body (`data-blog-article-body`), sections and related content. Approved placements can be integrated later at deliberate editorial boundaries without rebuilding the article system. There are no empty ad boxes, fake ads, publisher IDs, ad scripts or ads.txt claims. Google approval is separate from this implementation and is not guaranteed. Revisit advertising code, consent requirements and applicable privacy wording when adding actual AdSense.

Official references checked:
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://support.google.com/adsense/answer/7299563

## Verification completed locally

`node scripts/verify-blog.mjs`:
- 22 existing route outputs compared to the baseline: exact status, complete headers and SHA-256 bodies identical (including homepage, service pages, showcase, aliases, privacy, terms, admin, robots, llms and redirects).
- Existing API authentication, preflight, cross-origin rejection, content-type handling and chat comparisons passed.
- Valid form submission passed against an isolated DB double; no production lead records created or read.
- All eight existing sitemap entries retained; 12 URLs total, including video metadata; repeated additions idempotent.
- Blog canonical/schema, draft/future filtering, 404/noindex, HEAD and public Worker-host redirect checks passed.

Browser checks used Chromium with Worker requests fulfilled locally, external assets blocked, and successful lead response mocked. At 1440px, 390px and 320px: blog index and all three articles had one H1, no horizontal overflow and no JavaScript errors. Existing form confirmation, WhatsApp prefill and admin's empty-token prompt passed at each width. Desktop index and full mobile article screenshots were visually inspected. This does not test production D1, delivery notifications, authenticated admin records, external analytics ingestion or Google indexing.

`wrangler deploy --dry-run`: bundle built successfully; 540.75 KiB (167.87 KiB gzip); existing DB and ASSETS bindings retained. No deployment occurs in this command.

A 20-route live pre-change snapshot was captured for post-deployment comparison. Cloudflare's optional injected analytics beacon and rotating date-only sitemap timestamps are normalized for that comparison; application content and selected security/cache headers must remain identical. Post-deployment verification is separate from local checks.

Rollback: revert the extension commit through the normal repository workflow. Baseline source remains `3a92d1d`; do not change D1 records or the separate private agent.
