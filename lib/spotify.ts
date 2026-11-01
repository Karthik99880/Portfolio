export interface Track {
  id: string;
  title: string;
  artist: string;
}

// Reads the public embed page's data blob; any change on Spotify's side falls back to the plain playlist player.
export async function getPlaylistTracks(playlistId: string): Promise<Track[]> {
  try {
    const res = await fetch(`https://open.spotify.com/embed/playlist/${playlistId}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const blob = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)?.[1];
    if (!blob) return [];
    const list: { uri?: string; title?: string; subtitle?: string; isPlayable?: boolean }[] =
      JSON.parse(blob)?.props?.pageProps?.state?.data?.entity?.trackList ?? [];
    return list
      .filter((t) => t.isPlayable !== false && t.uri?.startsWith("spotify:track:"))
      .map((t) => ({ id: t.uri!.split(":")[2], title: t.title ?? "", artist: t.subtitle ?? "" }))
      .filter((t) => /^[A-Za-z0-9]{22}$/.test(t.id));
  } catch {
    return [];
  }
}
