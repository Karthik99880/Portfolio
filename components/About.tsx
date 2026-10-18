import { about } from "@/lib/content";
import { Section, SectionHead } from "@/components/Section";

export default function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 items-start gap-x-16 gap-y-2 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <SectionHead id="about" kicker={about.kicker} heading={about.heading} className="min-[900px]:mb-0" />
        <p className="m-0 max-w-[38ch] font-body text-[clamp(19px,2.2vw,24px)] leading-[1.5] text-ink">
          {about.paragraph}
        </p>
      </div>
    </Section>
  );
}
