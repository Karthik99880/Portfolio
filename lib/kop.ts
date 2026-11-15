interface FdMatch {
  utcDate: string;
  status: string;
  homeTeam: { id: number; shortName?: string; name: string };
  awayTeam: { id: number; shortName?: string; name: string };
}

const LFC = 64;
const day = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

// Reads my own Kop End dashboard; any failure returns null and the About row is simply left out.
export async function getNextLiverpoolMatch(): Promise<string | null> {
  try {
    const res = await fetch("https://kop-wall.vercel.app/api/fd/teams/64/matches", {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const matches: FdMatch[] = (await res.json())?.matches ?? [];
    const next = matches
      .filter((m) => (m.status === "SCHEDULED" || m.status === "TIMED") && Date.parse(m.utcDate) > Date.now())
      .sort((a, b) => a.utcDate.localeCompare(b.utcDate))[0];
    if (!next) return null;
    const home = next.homeTeam.id === LFC;
    const them = home ? next.awayTeam : next.homeTeam;
    return `Liverpool ${home ? "v" : "at"} ${them.shortName || them.name} · ${day.format(new Date(next.utcDate))}`;
  } catch {
    return null;
  }
}
