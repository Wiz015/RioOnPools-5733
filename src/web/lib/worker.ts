// Cloudflare Worker endpoint deployed separately by the client.
// The worker handles Resend email sending on its own side; this app only
// needs the deployed Worker URL, never an email/Resend API key.
export const WORKER_URL = "https://rio-on-pools-worker.example.workers.dev";

export type BookingPayload = {
  name: string;
  email: string;
  phone: string;
  tour: string;
  date: string;
  guests: string;
  message?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

async function post(path: string, body: unknown) {
  const res = await fetch(`${WORKER_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Request failed");
  return res.json().catch(() => ({}));
}

export function sendBooking(payload: BookingPayload) {
  return post("/booking", payload);
}

export function sendContact(payload: ContactPayload) {
  return post("/contact", payload);
}
