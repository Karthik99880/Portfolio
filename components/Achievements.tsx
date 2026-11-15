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
      <h3 className={`${meta} mt-10 mb-3`}>{achievements.certificationsTitle}</h3>
      <RevealGroup as="ol" delay={0.15} step={0.05} className="m-0 list-none border-t-2 border-[#c8102e] p-0">
        {achievements.certifications.map((c, i) => {
          const [issuer, year] = c.label.split(" · ");
          return (
            <RevealItem
              as="li"
              key={`${c.label}-${i}`}
              className="grid grid-cols-[56px_minmax(0,1fr)] items-baseline gap-x-5 border-b border-line py-4 min-[760px]:grid-cols-[72px_190px_minmax(0,1fr)]"
            >
              <span className="font-mono text-[13px] text-ink">{year}</span>
              <div className="flex flex-col gap-1 min-[760px]:contents">
                <span className={meta}>{issuer}</span>
                <span className="text-[16px] leading-[1.4] text-ink">{c.detail}</span>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <p className={`${meta} m-0 mt-6 flex items-center gap-2.5`}>
        <span aria-hidden="true" className="size-2 bg-[#c8102e]" />
        {achievements.signoff}
      </p>
    </Section>
  );
}
