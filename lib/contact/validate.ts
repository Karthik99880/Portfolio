export type ContactField = "name" | "email" | "message";

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type FieldErrors = Partial<Record<ContactField, string>>;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; fieldErrors: FieldErrors };

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContact(raw: Record<ContactField, unknown>): ValidationResult {
  const data: ContactInput = {
    name: asString(raw.name),
    email: asString(raw.email),
    message: asString(raw.message),
  };
  const fieldErrors: FieldErrors = {};

  if (data.name.length < LIMITS.name.min) fieldErrors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name.max) fieldErrors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;

  if (!data.email) fieldErrors.email = "Please enter your email.";
  else if (data.email.length > LIMITS.email.max || !EMAIL_RE.test(data.email))
    fieldErrors.email = "Please enter a valid email address.";

  if (data.message.length < LIMITS.message.min)
    fieldErrors.message = `Message must be at least ${LIMITS.message.min} characters.`;
  else if (data.message.length > LIMITS.message.max)
    fieldErrors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;

  return Object.keys(fieldErrors).length ? { ok: false, fieldErrors } : { ok: true, data };
}

export function firstFieldError(fieldErrors: FieldErrors): string | undefined {
  return fieldErrors.name ?? fieldErrors.email ?? fieldErrors.message;
}
