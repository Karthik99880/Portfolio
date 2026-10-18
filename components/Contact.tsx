"use client";

import { useActionState, useId, useState } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { firstFieldError } from "@/lib/contact/validate";
import { contact, siteConfig } from "@/lib/content";
import { Section, SectionHead } from "@/components/Section";

const initialState: ContactState = { ok: null };
const emptyValues = { name: "", email: "", message: "" };

const labelClass = "mb-1 block font-mono text-[11px] tracking-[0.14em] text-muted uppercase";
const fieldClass =
  "w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 font-body text-[16px] leading-[1.5] text-ink transition-[border-color,box-shadow] duration-300 focus:border-accent focus:shadow-[0_1px_0_0_var(--color-accent)] focus:outline-none focus-visible:outline-none";

export default function Contact() {
  const [values, setValues] = useState(emptyValues);
  const [state, formAction, pending] = useActionState(async (prev: ContactState, formData: FormData) => {
    const next = await sendMessage(prev, formData);
    if (next.ok) setValues(emptyValues);
    return next;
  }, initialState);
  const uid = useId();

  const update = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  let status = "";
  if (pending) status = contact.sending;
  else if (state.ok === true) status = contact.success;
  else if (state.ok === false)
    status = (state.error === "invalid" && firstFieldError(state.fieldErrors)) || contact.failure;

  return (
    <Section id="contact">
      <SectionHead id="contact" kicker={contact.kicker} heading={contact.heading} />
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 min-[760px]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <p className="lede m-0 max-w-[36ch]">{contact.blurb}</p>
          <div className="mt-8 flex flex-col items-start gap-1 font-mono text-[13px] tracking-[0.02em]">
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-slide inline-flex min-h-[40px] items-center text-ink transition-colors duration-300 hover:text-accent focus-visible:text-accent"
            >
              {siteConfig.email}
            </a>
            <span className="text-muted">{siteConfig.location}</span>
          </div>
        </div>
        <form action={formAction} className="flex flex-col gap-7">
          <div>
            <label htmlFor={`${uid}-name`} className={labelClass}>
              {contact.labels.name}
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={80}
              value={values.name}
              onChange={update("name")}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className={labelClass}>
              {contact.labels.email}
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={254}
              value={values.email}
              onChange={update("email")}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-message`} className={labelClass}>
              {contact.labels.message}
            </label>
            <textarea
              id={`${uid}-message`}
              name="message"
              required
              maxLength={2000}
              value={values.message}
              onChange={update("message")}
              className={`${fieldClass} min-h-[120px] resize-y`}
            />
          </div>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -top-[9999px] -left-[9999px]"
          />
          <button
            type="submit"
            disabled={pending}
            className="mt-1 min-h-[48px] cursor-pointer self-start rounded-none border-0 bg-ink px-6 py-4 font-mono text-[12px] leading-none tracking-[0.12em] text-paper uppercase transition-colors duration-300 hover:bg-accent focus-visible:bg-accent disabled:cursor-default disabled:opacity-70 disabled:hover:bg-ink"
          >
            {pending ? contact.sending : contact.submitLabel}
          </button>
          <div role="status" aria-live="polite" className="-mt-3 min-h-5 font-mono text-[12px] text-accent">
            {status}
          </div>
        </form>
      </div>
    </Section>
  );
}
