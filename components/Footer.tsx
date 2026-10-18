import { siteConfig } from "@/lib/content";

const linkClass = "link-slide inline-flex min-h-[40px] items-center text-muted transition-colors duration-300 hover:text-ink focus-visible:text-ink";

export default function Footer() {
  const year = new Date().getFullYear();
  const external = /^https?:\/\//;
  return (
    <footer className="container py-16">
      <p className="m-0 overflow-hidden font-display text-[clamp(40px,8vw,96px)] leading-[0.95] font-bold tracking-[-0.03em] text-ink/12 select-none">
        {siteConfig.name}
      </p>
      <div className="mt-8 border-t border-line pt-6">
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-8 gap-y-1 p-0 font-mono text-[12px] tracking-[0.02em] text-muted">
          <li className="inline-flex min-h-[40px] items-center">© {year}</li>
          <li className="inline-flex min-h-[40px] items-center">{siteConfig.location}</li>
          <li>
            <a href={`mailto:${siteConfig.email}`} className={linkClass}>
              {siteConfig.email}
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
        </ul>
      </div>
    </footer>
  );
}
