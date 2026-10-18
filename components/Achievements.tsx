import { achievements } from "@/lib/content";
import type { LogEntry } from "@/lib/content";
import { Section, SectionHead } from "@/components/Section";

const ID = "achievements";

function LogColumn({ title, entries }: { title: string; entries: LogEntry[] }) {
  return (
    <div>
      <h3 className="m-0 border-b border-line pb-3 font-mono text-[11px] font-normal tracking-[0.14em] text-muted uppercase">
        {title}
      </h3>
      <ul className="m-0 list-none p-0">
        {entries.map((entry, i) => (
          <li
            key={`${entry.label}-${i}`}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 border-b border-line py-3 font-mono text-[13.5px] leading-[1.5]"
          >
            <span aria-hidden="true" className="text-accent">
              ▸
            </span>
            <span className="flex flex-wrap gap-x-5 gap-y-0.5">
              <span className="text-muted">{entry.label}</span>
              <span className="text-ink">{entry.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Achievements() {
  return (
    <Section id={ID}>
      <SectionHead id={ID} kicker={achievements.kicker} heading={achievements.heading} />
      <div className="grid grid-cols-1 gap-12 min-[600px]:grid-cols-2">
        <LogColumn title={achievements.achievementsTitle} entries={achievements.achievements} />
        <LogColumn title={achievements.certificationsTitle} entries={achievements.certifications} />
      </div>
    </Section>
  );
}
