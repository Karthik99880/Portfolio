import { about } from "@/lib/content";
import { Section, SectionHead } from "@/components/Section";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import ScrollHighlight from "@/components/ScrollHighlight";

export default function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 items-start gap-x-14 gap-y-10 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <SectionHead id="about" kicker={about.kicker} heading={about.heading} className="mb-0" />
          <ScrollHighlight text={about.paragraph} className="m-0 mt-6 max-w-[36ch] font-body text-[clamp(18px,1.7vw,19px)] leading-[1.55] text-ink" />
        </div>
        <RevealGroup as="ul" step={0.07} className="m-0 list-none rounded-[6px] border border-line bg-paper px-7 py-1">
          {about.facts.map((f) => (
            <RevealItem
              as="li"
              key={f.label}
              className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-x-4 border-b border-line py-4 last:border-b-0 min-[520px]:grid-cols-[120px_minmax(0,1fr)]"
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{f.label}</span>
              <span className="inline-flex items-center gap-2.5 text-[16px] leading-[1.4]">
                {f.live ? (
                  <span aria-hidden="true" className="relative size-2 flex-none">
                    <span className="absolute inset-0 rounded-full bg-leaf motion-safe:animate-[status-pulse_1.8s_ease-out_infinite]" />
                    <span className="absolute inset-0 rounded-full bg-leaf" />
                  </span>
                ) : null}
                {f.value}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
