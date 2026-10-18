import { Section, SectionHead } from "@/components/Section";
import { TagList } from "@/components/Tag";
import { experience, experienceHeading } from "@/lib/content";

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHead id="experience" {...experienceHeading} />
      <div className="flex flex-col gap-12">
        {experience.map((role) => (
          <article
            key={`${role.title}-${role.company}`}
            className="grid grid-cols-1 gap-x-12 gap-y-5 border-t border-line pt-12 first:border-t-0 first:pt-0 min-[720px]:grid-cols-[220px_minmax(0,1fr)]"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[12px] tracking-[0.02em] text-muted">{role.period}</span>
              <span className="text-[16px] leading-[1.4] text-ink">{role.company}</span>
            </div>
            <div>
              <h3 className="display-md m-0 text-ink">{role.title}</h3>
              <ul className="m-0 mt-6 flex max-w-[64ch] list-none flex-col gap-4 p-0">
                {role.bullets.map((bullet) => (
                  <li key={bullet.lead} className="text-[16px] leading-[1.6] text-muted">
                    <b className="font-semibold text-ink">{bullet.lead}</b> — {bullet.text}
                  </li>
                ))}
              </ul>
              <TagList items={role.tags} className="mt-7" />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
