# Website chat

Approved production integration of the private chat prototype. The thin Worker entry composes the existing pipeline with this additive module. Public HTML receives one same-origin deferred script. The existing /admin receives one inbox link. Existing page content, form handlers, WhatsApp links, analytics, schema and security headers are preserved.

Visitors enter a name (2–80 characters) and enquiry (5–600), receive an explicitly automatic welcome, and leave messages (up to 1,000 characters). D1 persists conversations. Session storage contains only the visitor conversation ID and random bearer token; messages are fetched from D1. Replies poll only while the chat and browser tab are visible. Sending is idempotent and error drafts remain available.

/admin/chat uses the existing ADMIN_TOKEN and existing same-tab admin storage key. It does not grant new account access. The inbox lists the latest 100 conversations. Messages are limited to 500 per chat. Visitor tokens are SHA-256 hashed in D1. All queries are bound statements. JSON bodies are bounded to 12 KB, cross-origin writes are rejected, new chats are limited to 10 per IP per hour, and messages to 30 per conversation per minute. No transcript is rendered as HTML.

The module creates only nds_chat_conversations, nds_chat_messages, nds_chat_rate and a message ordering index through additive CREATE IF NOT EXISTS statements, following the existing lead module setup approach. Existing lead records and tables are not changed. No new Cloudflare bindings, secrets, CSP allowlists or external chat accounts are required. Polling uses the existing Worker/D1 resources and their limits.

Continue on WhatsApp opens the existing number +60183946761 with the visitor name, enquiry, reference and additional visitor messages. The visitor must tap Send in WhatsApp. Normal WhatsApp replies remain in WhatsApp; they are not automatically mirrored into website chat. Copy summary includes the complete visitor summary; WhatsApp prefill is bounded for URL compatibility.

Tawk.to offers free managed chat with a required pre-chat form and automatic triggers but uses its own operator inbox; an ordinary personal WhatsApp conversation is not a transparent free live-chat sync. Crisp free chat similarly does not provide the needed ordinary WhatsApp sync. This custom option fits the existing architecture and approved prototype without a new external account. Paid WhatsApp Business Platform integration is outside this change.

Validation: `node scripts/verify-chat.mjs` (Node 24) compares 19 routes with the existing pipeline after removing only the chat script/admin link, then exercises real SQLite with a D1-compatible statement adapter for create/welcome, auth, owner reply, Unicode, idempotency, validation, rate limits and preservation of leads. `wrangler deploy --dry-run` checks the Cloudflare Worker bundle. Live browser QA follows deployment. This test adapter validates SQL and API behavior; it does not substitute for live D1 validation.

Rollback: revert the integration commit. Existing enquiry forms and tables stay intact; the additive chat tables can remain for recovery.
