import { achievements } from "@/lib/content";
import { Section, SectionHead } from "@/components/Section";
import { RevealGroup, RevealItem } from "@/components/Reveal";

const ID = "achievements";
const meta = "font-mono text-[11px] tracking-[0.12em] text-muted uppercase";

export default function Achievements() {
  return (
    <Section id={ID}>
      <SectionHead id={ID} kicker={achievements.kicker} heading={achievements.heading} />
      <h3 className="sr-only">{achievements.achievementsTitle}</h3>
      <RevealGroup as="ul" className="m-0 grid list-none grid-cols-1 gap-4 p-0 min-[700px]:grid-cols-2">
        {achievements.achievements.map((a, i) => (
          <RevealItem as="li" key={a.label} className="flex gap-[18px] rounded-[6px] border border-line bg-paper px-6 py-6">
            <span
              aria-hidden="true"
              className={`flex size-11 flex-none items-center justify-center rounded-[6px] font-mono text-[12px] ${i === 0 ? "bg-lime" : "border border-line"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className={meta}>{a.label}</div>
              <div className="mt-1.5 font-display text-[clamp(19px,2vw,22px)] leading-[1.25] font-bold text-ink">{a.detail}</div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
      <h3 className="sr-only">{achievements.certificationsTitle}</h3>
      <RevealGroup as="ul" delay={0.15} className="m-0 mt-3.5 grid list-none grid-cols-1 gap-3 p-0 min-[560px]:grid-cols-2 min-[960px]:grid-cols-4">
        {achievements.certifications.map((c, i) => (
          <RevealItem as="li" key={`${c.label}-${i}`} className="rounded-[6px] border border-line px-[18px] py-4">
            <div className={meta}>{c.label}</div>
            <div className="mt-1.5 text-[15px] leading-[1.4] text-ink">{c.detail}</div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
