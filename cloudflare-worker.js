/**
 * Reference Cloudflare Worker for Rio On Pools booking + contact forms.
 * Deploy this separately (e.g. via `wrangler deploy`) and put the resulting
 * Worker URL into packages/web/src/web/lib/worker.ts as WORKER_URL.
 *
 * Required Worker secret (set with `wrangler secret put RESEND_API_KEY`):
 *   RESEND_API_KEY   Resend.com API key used to send notification emails.
 *
 * The web app never needs this key directly, it only POSTs to this Worker.
 */

const TO_EMAIL = "info@rioonpools.com";
const FROM_EMAIL = "Rio On Pools <no-reply@rioonpools.com>";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function sendEmail(env, subject, html) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend error: ${res.status} ${await res.text()}`);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    try {
      const body = await request.json();

      if (url.pathname === "/booking") {
        const { name, email, phone, tour, date, guests, message } = body;
        if (!name || !email || !phone || !tour || !date) {
          return jsonResponse({ error: "Missing required fields" }, 400);
        }
        await sendEmail(
          env,
          `New Booking Request: ${tour}`,
          `<h2>New Booking Request</h2>
           <p><b>Tour:</b> ${tour}</p>
           <p><b>Name:</b> ${name}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Phone:</b> ${phone}</p>
           <p><b>Date:</b> ${date}</p>
           <p><b>Guests:</b> ${guests}</p>
           <p><b>Message:</b> ${message || "-"}</p>`
        );
        return jsonResponse({ ok: true });
      }

      if (url.pathname === "/contact") {
        const { name, email, phone, message } = body;
        if (!name || !email || !message) {
          return jsonResponse({ error: "Missing required fields" }, 400);
        }
        await sendEmail(
          env,
          `New Contact Message from ${name}`,
          `<h2>New Contact Message</h2>
           <p><b>Name:</b> ${name}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Phone:</b> ${phone || "-"}</p>
           <p><b>Message:</b> ${message}</p>`
        );
        return jsonResponse({ ok: true });
      }

      return jsonResponse({ error: "Not found" }, 404);
    } catch (err) {
      return jsonResponse({ error: "Server error", detail: String(err) }, 500);
    }
  },
};
