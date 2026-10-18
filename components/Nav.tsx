import { contact, siteConfig } from "@/lib/content";

const linkClass =
  "link-slide inline-flex min-h-[40px] items-center font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition-colors duration-300 hover:text-ink focus-visible:text-ink";

export default function Nav() {
  const external = /^https?:\/\//;
  return (
    <header className="container">
      <nav aria-label="Primary" className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-7">
        <a
          href="#main"
          aria-label={siteConfig.name}
          className="inline-flex size-11 items-center justify-center rounded-full bg-ink font-display text-[15px] font-bold tracking-[-0.01em] text-paper transition-colors duration-300 hover:bg-accent focus-visible:bg-accent"
        >
          {siteConfig.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </a>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-7 gap-y-2 p-0">
          <li>
            <a href="#work" className={linkClass}>
              Work
            </a>
          </li>
          {siteConfig.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={linkClass}
                {...(external.test(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
          {siteConfig.resumeHref !== null && (
            <li>
              <a href={siteConfig.resumeHref} className={linkClass}>
                Résumé
              </a>
            </li>
          )}
          <li>
            <a href="#contact" className={`${linkClass} text-accent hover:text-accent focus-visible:text-accent`}>
              {contact.heading}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
