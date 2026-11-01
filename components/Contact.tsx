"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { validateContact, type ContactField } from "@/lib/contact/validate";
import { contact, siteConfig } from "@/lib/content";
import type { CompoundId } from "@/lib/content/types";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Phase = "idle" | "tx" | "done" | "err";

const initialState: ContactState = { ok: null };
const emptyValues = { name: "", email: "", message: "" };
const TX_MIN_MS = 1600;
const BARS = 40;
const ERR = "#ff6b5a";

const lab = "block font-mono text-[10.5px] tracking-[0.14em] text-[#8d877a] uppercase";
const fld =
  "mt-2 w-full rounded-[6px] border bg-[#141210] px-3 font-body text-[16px] text-paper min-[900px]:text-[15px] transition-[border-color] duration-200 placeholder:text-[#6b665c] focus:border-lime focus:outline-none";
const row = "flex items-baseline justify-between gap-4";
const rowLab = "font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase";

function istClock() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
}

export default function Contact() {
  const uid = useId();
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState("");
  const [compound, setCompound] = useState<CompoundId>("medium");
  const [values, setValues] = useState(emptyValues);
  const [sent, setSent] = useState({ ...emptyValues, compound: "medium" as CompoundId });
  const [localErr, setLocalErr] = useState<ContactField | null>(null);
  const [dismissed, setDismissed] = useState<ContactState>(initialState);
  const [tick, setTick] = useState({ phase: "idle" as Phase, n: 0 });

  const [state, formAction, pending] = useActionState(async (prev: ContactState, formData: FormData) => {
    const [next] = await Promise.all([
      sendMessage(prev, formData).catch((): ContactState => ({ ok: false, error: "send-failed" })),
      new Promise((r) => setTimeout(r, TX_MIN_MS)),
    ]);
    if (next.ok) setValues(emptyValues);
    return next;
  }, initialState);

  let phase: Phase = "idle";
  if (pending) phase = "tx";
  else if (localErr) phase = "err";
  else if (state !== dismissed && state.ok === true) phase = "done";
  else if (state !== dismissed && state.ok === false) phase = "err";

  useEffect(() => {
    const t = setTimeout(() => setClock(istClock()), 0);
    const iv = setInterval(() => setClock(istClock()), 30_000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, []);

  useEffect(() => {
    if (reduced || (phase !== "tx" && phase !== "done")) return;
    let n = 0;
    const iv = setInterval(() => setTick({ phase, n: ++n }), 80);
    const stop = setTimeout(() => clearInterval(iv), 9000);
    return () => {
      clearInterval(iv);
      clearTimeout(stop);
    };
  }, [phase, reduced]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const update = (field: ContactField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (localErr === field) setLocalErr(null);
    if (serverField === field) setDismissed(state);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (phase === "done") {
      e.preventDefault();
      setDismissed(state);
      return;
    }
    const check = validateContact(values);
    if (!check.ok) {
      e.preventDefault();
      setLocalErr((["name", "email", "message"] as const).find((f) => check.fieldErrors[f]) ?? null);
      return;
    }
    setLocalErr(null);
    setSent({ ...check.data, compound });
  };

  const ty = contact.compounds.find((c) => c.id === compound)!;
  const sentTy = contact.compounds.find((c) => c.id === sent.compound)!;
  const n = tick.phase === phase ? tick.n : 0;
  const reply = contact.reply.replace("{name}", sent.name).replace("{email}", sent.email);
  const typed = reduced ? reply : reply.slice(0, Math.max(0, n - 6) * 4);
  const serverField = state !== dismissed && state.ok === false && state.error === "invalid"
    ? (["name", "email", "message"] as const).find((f) => state.fieldErrors[f])
    : undefined;
  const errField = localErr ?? serverField ?? null;
  const errText = errField ? contact.errors[errField] : contact.failure;
  const bd = (f: ContactField) => ({ borderColor: errField === f && phase === "err" ? ERR : "#2f2b25" });
  const dot = phase === "err" ? ERR : phase === "tx" ? "#dcff70" : "#4fd67a";

  const bars = Array.from({ length: BARS }, (_, i) => {
    if (phase === "tx" && !reduced) {
      const v = Math.abs(Math.sin(i * 0.7 + n * 0.9) * Math.cos(i * 0.31 - n * 0.45));
      return { h: 6 + v * 32, o: 1 };
    }
    if (phase === "done" && typed.length < reply.length) return { h: 4 + Math.abs(Math.sin(i * 0.5 + n * 0.7)) * 14, o: 0.55 };
    return { h: 2, o: 0.35 };
  });

  const log: { who: string; color: string; text: string; tone: string; quote?: boolean; delay: number }[] = [];
  if (phase === "idle") log.push({ who: contact.pitWall, color: "#716c60", text: contact.idleLine, tone: "#8d877a", delay: 0 });
  if (phase === "tx" || phase === "done")
    log.push({ who: `${sent.name} →`, color: sentTy.color, text: `“${sent.message}”`, tone: "#fbfdf5", quote: true, delay: 0 });
  if (phase === "done") log.push({ who: `${contact.pitWall} →`, color: "#dcff70", text: typed || "…", tone: "#dcff70", delay: 0.3 });
  if (phase === "err") log.push({ who: contact.lost, color: ERR, text: errText, tone: "#ffb3a8", delay: 0 });

  return (
    <Section id="contact" className="pt-10">
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 min-[960px]:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <Reveal>
          <div className="flex flex-col">
            <span className="kicker">{contact.kicker}</span>
            <h2 id="contact-heading" className="mt-3.5 font-display text-[clamp(44px,6vw,64px)] leading-[0.95] font-bold tracking-[-0.03em] text-ink">
              {contact.heading}
            </h2>
            <p className="mt-5 max-w-[34ch] text-[17px] leading-[1.55] text-[#4a463c]">{contact.blurb}</p>
            <div className="mt-8 flex flex-col gap-3 border-t border-line pt-[18px]">
              <div className={`${row} flex-wrap`}>
                <span className={rowLab}>{contact.info.direct}</span>
                <span className="inline-flex flex-wrap items-center justify-end gap-2">
                  <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-11 min-[900px]:min-h-0 items-center font-mono text-[13px] break-all text-ink hover:text-accent focus-visible:text-accent">
                    {siteConfig.email}
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    aria-live="polite"
                    className="min-h-11 cursor-pointer rounded-full border border-line min-[900px]:min-h-8 bg-transparent px-3 font-mono text-[10.5px] tracking-[0.08em] text-ink uppercase hover:border-ink"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </span>
              </div>
              <div className={row}>
                <span className={rowLab}>{contact.info.base}</span>
                <span className="font-mono text-[13px] text-ink">
                  {contact.info.baseValue}
                  {clock ? ` · ${clock} IST` : ""}
                </span>
              </div>
              <div className={row}>
                <span className={rowLab}>{contact.info.reply}</span>
                <span className="font-mono text-[13px] text-ink">{contact.info.replyValue}</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form
            action={formAction}
            onSubmit={onSubmit}
            noValidate
            className="relative flex flex-col gap-[18px] overflow-hidden rounded-[14px] bg-void px-[clamp(18px,2.6vw,30px)] py-[clamp(20px,2.4vw,26px)] text-paper"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[11px] tracking-[0.16em] text-[#a39c90] uppercase">{contact.channel}</span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: dot }}>
                <span aria-hidden="true" className="size-[7px] rounded-full motion-safe:animate-[radio-blink_1.6s_ease-in-out_infinite]" style={{ background: dot }} />
                {contact.status[phase]}
              </span>
            </div>

            <fieldset className="m-0 border-0 p-0">
              <legend className={lab}>{contact.steps.compound}</legend>
              <div className="mt-2.5 grid grid-cols-1 gap-2.5 min-[600px]:grid-cols-3">
                {contact.compounds.map((c) => {
                  const on = c.id === compound;
                  return (
                    <label
                      key={c.id}
                      className="flex min-h-[52px] cursor-pointer items-center gap-3 rounded-[8px] border py-2.5 pr-3.5 pl-2.5 transition-[background-color,border-color] duration-250 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime"
                      style={{ background: on ? "#1d1a16" : "transparent", borderColor: on ? "#4a453c" : "#221f1a" }}
                    >
                      <input type="radio" name="compound" value={c.id} checked={on} onChange={() => setCompound(c.id)} className="sr-only" />
                      <span
                        aria-hidden="true"
                        className="flex size-[30px] flex-none items-center justify-center rounded-full border-[6px] bg-[#1d1a16] font-mono text-[9px] font-medium transition-transform duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)]"
                        style={{ borderColor: c.color, transform: `rotate(${on ? 0 : -90}deg)` }}
                      >
                        {c.key}
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold">{c.name}</span>
                        <span className="mt-0.5 block text-[12.5px] text-[#a39c90]">{c.ask}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 gap-3 min-[600px]:grid-cols-2">
              <label htmlFor={`${uid}-name`}>
                <span className={lab}>{contact.steps.name}</span>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  placeholder={contact.placeholders.name}
                  value={values.name}
                  onChange={update("name")}
                  aria-invalid={errField === "name" || undefined}
                  className={`${fld} h-11`}
                  style={bd("name")}
                />
              </label>
              <label htmlFor={`${uid}-email`}>
                <span className={lab}>{contact.steps.email}</span>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder={contact.placeholders.email}
                  value={values.email}
                  onChange={update("email")}
                  aria-invalid={errField === "email" || undefined}
                  className={`${fld} h-11`}
                  style={bd("email")}
                />
              </label>
            </div>
            <label htmlFor={`${uid}-message`}>
              <span className={lab}>{contact.steps.message}</span>
              <textarea
                id={`${uid}-message`}
                name="message"
                maxLength={2000}
                placeholder={ty.hint}
                value={values.message}
                onChange={update("message")}
                aria-invalid={errField === "message" || undefined}
                className={`${fld} h-[84px] resize-none py-2.5 leading-[1.5]`}
                style={bd("message")}
              />
            </label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -top-[9999px] -left-[9999px]" />

            <div className="flex items-center gap-5">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex min-h-[52px] flex-none cursor-pointer items-center gap-3 rounded-full border-0 px-[26px] font-mono text-[12px] tracking-[0.14em] uppercase transition-[background-color,color,transform] duration-200 active:scale-[0.97] disabled:cursor-default"
                style={{ background: phase === "tx" ? "#dcff70" : phase === "done" ? "#1d1a16" : "#fbfdf5", color: phase === "done" ? "#fbfdf5" : "#0c0a08" }}
              >
                <span aria-hidden="true" className="size-[9px] rounded-full" style={{ background: phase === "tx" ? "#0c0a08" : phase === "err" ? ERR : "#4fd67a" }} />
                {contact.transmit[phase]}
              </button>
              <div aria-hidden="true" className="flex h-10 min-w-0 flex-1 items-center gap-[3px] overflow-hidden">
                {bars.map((b, i) => (
                  <span key={i} className="min-w-[2px] flex-1 rounded-[2px] bg-lime transition-[height,opacity] duration-100 ease-linear" style={{ height: b.h, opacity: b.o }} />
                ))}
              </div>
            </div>

            <div role="status" aria-live="polite" className="flex min-h-24 flex-col gap-2.5 border-t border-[#2a2621] pt-3.5">
              {log.map((l) => (
                <div
                  key={`${phase}-${l.who}`}
                  className="grid grid-cols-1 gap-x-3.5 gap-y-1 motion-safe:animate-[radio-line_0.4s_cubic-bezier(.22,1,.36,1)_both] min-[600px]:grid-cols-[150px_minmax(0,1fr)]"
                  style={{ animationDelay: `${l.delay}s` }}
                >
                  <span className="pt-0.5 font-mono text-[11px] tracking-[0.08em] break-words uppercase" style={{ color: l.color }}>
                    {l.who}
                  </span>
                  <span className={`text-[14.5px] leading-[1.5] break-words ${l.quote ? "italic" : ""}`} style={{ color: l.tone }}>
                    {l.text}
                  </span>
                </div>
              ))}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
