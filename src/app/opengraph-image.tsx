import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Kratos Software Solutions — Strong underneath. Friendly on top.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FDEBD9", // cream
          position: "relative",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Soft Background Blobs */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            backgroundColor: "#FFD9B8", // peach
            filter: "blur(50px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            backgroundColor: "#FFC857", // butter
            opacity: 0.6,
            filter: "blur(40px)",
          }}
        />

        {/* Central Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 217, 184, 0.6)",
            border: "4px solid #FB9A5E",
            borderRadius: "48px",
            padding: "50px 70px",
            textAlign: "center",
            maxWidth: "960px",
            boxShadow: "0 20px 40px rgba(42, 24, 16, 0.08)",
          }}
        >
          {/* Tagline Eyebrow */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "4px",
              color: "#F47B3A",
              marginBottom: "16px",
            }}
          >
            software solutions
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: "92px",
              fontWeight: 900,
              color: "#FB9A5E",
              letterSpacing: "-2px",
              lineHeight: 1,
              marginBottom: "20px",
              textShadow: "0 4px 12px rgba(244, 123, 58, 0.25)",
            }}
          >
            kratos
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#2A1810",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            Strong underneath. Friendly on top.
          </div>

          {/* Feature Badge Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#FDEBD9",
              padding: "10px 24px",
              borderRadius: "9999px",
              border: "2px solid rgba(251, 154, 94, 0.4)",
              fontSize: "16px",
              fontWeight: 700,
              color: "#6B4A3A",
            }}
          >
            Web Apps & SaaS • Mobile Apps • Pragmatic AI Automations
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
