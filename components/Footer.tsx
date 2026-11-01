import { reaction, siteConfig } from "@/lib/content";
import ReactionLink from "@/components/ReactionLink";

const head = "m-0 font-mono text-[11px] font-normal tracking-[0.14em] text-leaf uppercase";
const list = "m-0 mt-3 flex list-none flex-col p-0 text-paper/85";
const link = "inline-flex min-h-11 items-center min-[900px]:min-h-[36px] transition-colors duration-300 hover:text-leaf focus-visible:text-leaf";
const nav = ["About", "Experience", "Skills", "Work"];

export default function Footer() {
  const external = /^https?:\/\//;
  return (
    <footer className="bg-ink pt-14 pb-8 text-paper">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 min-[560px]:grid-cols-2 min-[900px]:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-leaf font-display text-[15px] font-bold text-ink">KB</span>
            <p className="m-0 mt-4 max-w-[30ch] text-[15px] leading-[1.55] text-dim">
              Software engineer in Hyderabad. Full-stack, applied AI, and the tests that keep both honest.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2 className={head}>Navigate</h2>
            <ul className={`${list} text-[15px]`}>
              {nav.map((n) => (
                <li key={n}>
                  <a href={`#${n.toLowerCase()}`} className={link}>
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className={head}>Elsewhere</h2>
            <ul className={`${list} font-mono text-[13px]`}>
              {siteConfig.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={link} {...(external.test(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={head}>Contact</h2>
            <ul className={`${list} text-[15px]`}>
              <li>
                <a href={`mailto:${siteConfig.email}`} className={link}>
                  Email me
                </a>
              </li>
              <li className="inline-flex min-h-[36px] items-center">{siteConfig.location}</li>
              <li>
                <ReactionLink className={`${link} font-mono text-[12px] tracking-[0.08em] text-leaf uppercase`}>{reaction.footerLink}</ReactionLink>
              </li>
              <li>
                <a href="#" className={`${link} font-mono text-[12px] tracking-[0.08em] text-leaf uppercase`}>
                  Back to top ↑
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="m-0 mt-12 border-t border-line-dark pt-5 font-mono text-[11px] leading-[1.6] text-muted-dark">
          © 2026 {siteConfig.name} · The contact form sends one email to me through Resend. Nothing else is stored or tracked.
        </p>
      </div>
    </footer>
  );
}
