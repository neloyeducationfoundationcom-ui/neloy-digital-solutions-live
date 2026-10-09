# Website chat Gmail alerts — prepared, not activated

Destination: the owner’s verified business Gmail, configured only in the private-agent repository. Sender: info@neloydigitalsolutions.com.

This branch is ready for deployment after Cloudflare account access is restored. It is not on production main. No delivery has been verified yet.

The website transaction inserts an outbox row with each new chat or visitor message. Owner replies and the automatic welcome do not trigger mail. Duplicate visitor sends reuse the existing event ID. Immediate sending runs through waitUntil; failures leave the chat usable and remain queued. A five-minute website Cron retries pending rows, with backoff up to one hour. The named private-agent RPC entrypoint sends only to the owner's fixed Gmail through a restricted Cloudflare send_email binding. No customer email or public sending endpoint is added, and the existing agent Gmail OAuth, social modules and scheduled handler are unchanged.

Email includes the visitor's name, enquiry, new message (when applicable), reference and protected inbox link. It contains plain text with UTF-8 MIME encoding. The agent uses an event-ID delivery ledger and a short concurrency lease. If a provider accepts mail but the acknowledgement is lost before the ledger commits, a retry can exceptionally produce a duplicate; email delivery is not exactly once.

Activation steps:
1. In Cloudflare, verify the existing business Gmail destination and the neloydigitalsolutions.com sender domain are eligible for Worker email sending. Do not add a paid plan or accept new paid services. Confirm the website Worker has no existing Cron schedule that would be replaced.
2. Deploy the private-agent branch first with its restricted CHAT_ALERT_EMAIL binding and named WebsiteChatAlerts export.
3. Deploy the website branch with CHAT_ALERTS bound to that named entrypoint and the five-minute retry Cron.
4. Create one clearly labelled QA website enquiry and follow-up, confirm both emails arrive in the business Gmail and lead back to /admin/chat, then confirm owner replies do not email the owner. Check failure recovery and delivery status before reporting active.

Website checks: node scripts/verify-chat.mjs; node scripts/verify-chat-alerts.mjs; wrangler deploy --dry-run.
Agent checks: node test-chat-alerts.mjs; wrangler deploy --dry-run.

This handles website messages only. Normal WhatsApp messages still rely on WhatsApp's own notifications. No WhatsApp account connection is added.

Official documentation: https://developers.cloudflare.com/email-service/configuration/send-bindings/ and https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/.
