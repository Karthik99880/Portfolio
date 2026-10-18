import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content/siteConfig";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f9e8",
          color: "#181511",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#716c60" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#1f7a3d" }} />
          <span>{siteConfig.company} · {siteConfig.tagline}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 40, color: "#716c60" }}>{siteConfig.role}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#716c60" }}>
          <span>{siteConfig.location}</span>
          <span>{siteConfig.email}</span>
        </div>
      </div>
    ),
    size,
  );
}
