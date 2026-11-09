// Forms use the reference site's Worker contract, with the Rio On Pools endpoint.
export const WORKER_URL = "https://mountainpinerigeleads.wisman-gt.workers.dev/";

export type BookingPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tour: string;
  date: string;
  guests: number;
  message?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

async function post(type: "booking" | "contact", formData: unknown) {
  let res: Response;
  try {
    res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, formData }),
    });
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }
  const json = await res.json().catch(() => null) as { success?: boolean; error?: string } | null;
  if (!res.ok || json?.success !== true) {
    throw new Error(typeof json?.error === "string" ? json.error : "Request failed. Please try again.");
  }
  return json;
}

export function sendBooking(payload: BookingPayload) {
  return post("booking", payload);
}

export function sendContact(payload: ContactPayload) {
  return post("contact", { ...payload, phone: payload.phone ?? "", subject: "General inquiry" });
}
