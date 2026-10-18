"use server";

import { siteConfig } from "@/lib/content";
import { validateContact, type FieldErrors } from "@/lib/contact/validate";

export type ContactState =
  | { ok: null }
  | { ok: true }
  | { ok: false; error: "invalid"; fieldErrors: FieldErrors }
  | { ok: false; error: "not-configured" | "send-failed" };

let warnedMissingKey = false;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (String(formData.get("website") ?? "").trim()) return { ok: true };

  const result = validateContact({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!result.ok) return { ok: false, error: "invalid", fieldErrors: result.fieldErrors };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (!warnedMissingKey) {
      warnedMissingKey = true;
      console.warn("[contact] RESEND_API_KEY is not set; contact form messages will not be sent.");
    }
    return { ok: false, error: "not-configured" };
  }

  const { name, email, message } = result.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n— ${name} <${email}>`,
      }),
    });
    if (!res.ok) {
      console.error(`[contact] Resend responded ${res.status}`);
      return { ok: false, error: "send-failed" };
    }
    return { ok: true };
  } catch {
    console.error("[contact] Resend request failed");
    return { ok: false, error: "send-failed" };
  }
}
