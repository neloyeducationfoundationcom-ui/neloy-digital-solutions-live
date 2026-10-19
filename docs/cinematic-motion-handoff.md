# Responsive cinematic motion handoff

Presentation changes apply only to home, showcase/portfolio, website, service and team pages. They replace repeating text movement and floating effects with one-time heading/copy reveals, staggered cards and viewport-driven project imagery. The original motion module remains in use for blog, terms and privacy, whose source response content is unchanged.

Mobile/coarse-pointer settings use 12 px entrances and 78% of desktop duration, with shorter word staggers. Desktop uses 24 px entrances. Long headings use a single bounded effect. Finished text returns to its static layout; focus settles related effects. Reduced motion and the independent page-motion button cancel new effects without touching the company-name marquee control.

There are no new libraries, external scripts, media URLs or downloads. Project geometry is read once per visible owner before animation writes. No animation frame is scheduled for scrolling while project artwork is offscreen. No continuous idle render loop is added.

## Available verification

- 55 source/response checks: 22 GET routes with equal status/complete Worker headers and unchanged content outside replaced motion blocks; protected response/source checks and unauthenticated endpoint checks. No live writes or production data access.
- 12 simulated motion checks. Run `node scripts/verify-cinematic-motion.mjs`. These use simulated browser APIs and do not test real layout or scrolling.
- 13 exact-host preview isolation checks (`node scripts/verify-motion-preview.mjs`): public page bodies match the live-origin source output, API/admin/non-read requests return 403 without accessing DB or private service bindings, and other default Worker hosts retain their 301 redirects.
- All 139 executable inline scripts in generated preview pages compile.
- 104 other downloaded existing source files remain byte-identical, including company names, contact locations, video-caption CSS, blog, SEO/AEO, schema, admin, forms, WhatsApp, security, tracking and Worker configuration.
- Homepage response payload: 229,234 → 217,224 bytes; gzip: 67,289 → 64,912 bytes. Showcase, website-design and video-editing payloads also decreased. This does not establish real-device performance.

## Outstanding verification and deployment

Local listening and Chromium remain blocked, so browser checks run in the branch-only GitHub workflow. The actual hosted preview passed 39 Chromium checks at 1440×900 and 390×844: running animations were observed on homepage and showcase, no horizontal overflow or JavaScript runtime errors were found, pause/resume and testimonial controls worked, input was usable without submission, video modal open/Escape-close worked, and reduced motion left text visible with no page animation. The hosted evidence is in workflow run https://github.com/neloyeducationfoundationcom-ui/neloy-digital-solutions-live/actions/runs/39330574643 and `docs/motion-browser-results.json`.

This uses mobile Chromium emulation, not physical phone hardware or Safari. Native video playback did not reach readyState 2 within the test timeout in either size; actual playback, seeking, sound, fullscreen and the external Descript player remain unverified. Third-party hosts and the production domain are deliberately blocked during browser QA. Network/CSP messages from those restrictions are expected; the JavaScript page-error collection was empty.

Cloudflare Workers Builds automatically uploads review versions for this GitHub branch. The exact review alias bypasses the default-domain redirect, sends noindex/no-store headers, disables API/admin/non-read requests and blocks external tracking scripts. No production rollout has been performed. The separate Neloy Private Agent and Neloy Client Automation SaaS are outside this change.

## Deployed-script startup regression

The first inline client injection omitted the local `__name` helper used by the existing site's serialized scripts. Name-preserving Worker bundling can add helper calls inside nested functions, so the browser can throw `ReferenceError: __name is not defined` before initialization. The corrected injection supplies the helper in a local closure. `node scripts/verify-motion-bundling.mjs` reproduces the previous failure and verifies that the fixed emitted script registers startup and runs in both document readiness states. This test models the deployment annotation; it does not replace the browser recording/checks.

The actual compiled Worker artifact contains 11 such helper calls in the emitted client. Executing its inline script without the helper reproduces `__name is not defined`; executing the corrected inline script registers startup successfully. Browser recordings from the hosted review show the resulting motion at both viewport sizes.
