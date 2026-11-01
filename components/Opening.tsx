import DeskHello from "@/components/DeskHello";
import { HeroName } from "@/components/IntroHandoff";
import ProofStrip from "@/components/ProofStrip";
import { HeroRibbon } from "@/components/Ribbon";
import { music, opening } from "@/lib/content";
import { getPlaylistTracks } from "@/lib/spotify";

export default async function Opening() {
  const tracks = await getPlaylistTracks(music.playlistId);
  return (
    <section
      id="opening"
      aria-labelledby="opening-heading"
      className="overflow-x-clip pt-[clamp(96px,11vw,128px)] pb-[clamp(56px,8vw,96px)]"
    >
      <div className="container">
        <div className="grid items-center gap-x-12 gap-y-14 min-[900px]:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 id="opening-heading" className="display-xl display-name name-wobble text-ink">
              <HeroName name={opening.name} />
            </h1>
            <p className="lede mt-7 max-w-[34ch]">{opening.line}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={opening.primaryCta.href}
                className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-mono text-[12px] tracking-[0.12em] text-paper uppercase transition-colors hover:bg-accent focus-visible:bg-accent"
              >
                {opening.primaryCta.label}
              </a>
              <a href={opening.secondaryCta.href} className="link-slide inline-flex min-h-12 items-center text-[15px] text-ink">
                {opening.secondaryCta.label}
              </a>
            </div>
            <p className="mt-10 flex items-center gap-3 font-mono text-[12px] text-muted">
              <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              {opening.meta}
            </p>
          </div>
          <div className="relative w-full max-w-[520px] min-[900px]:max-w-[560px] min-[900px]:justify-self-end">
            <HeroRibbon />
            <DeskHello tracks={tracks} />
          </div>
        </div>
        <ProofStrip stats={opening.proof} />
      </div>
    </section>
  );
}
