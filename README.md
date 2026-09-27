# Neloy Digital Solutions website

This repository contains the existing Cloudflare Worker website named `neloy-digital-solutions-live`. Its entry point is `src/worker.js` (`wrangler.toml`); the entry delegates to the established wrapper pipeline. The public origin used by the architecture checks is `https://neloydigitalsolutions.com`.

Read [the architecture map](docs/architecture-map.md) before changing routing, content, admin, leads, SEO, security, analytics, or assets. It records the active code path, extracted modules, legacy files, protected URLs, and verification scope. [The original production baseline](docs/architecture-baseline.md) records earlier observed behavior; the current 19-route verification also includes `/terms/`.

`scripts/verify-public.mjs` provides read-only route checks. Local old-versus-new comparisons additionally compare complete Worker response headers and SHA-256 body hashes. A passing local comparison does not replace a separate post-deployment check against the live website.

The Worker has a D1 binding named `DB` and an assets binding named `ASSETS`. Keep production lead records, the separate Neloy Private Agent, and the follower-sync system outside website architecture changes. Preserve indexed URLs, titles, descriptions, canonicals, structured data, internal links, indexing files, redirects, analytics, and Search Console verification when changing presentation.
