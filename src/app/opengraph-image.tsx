import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Krat.OS — Software solutions. The operating system for your business.";
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
          backgroundColor: "#212121",
          position: "relative",
          padding: "36px",
          fontFamily: "monospace",
        }}
      >
        {/* Hairline Technical Outer Frame */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#262626",
            border: "1px solid #3A3A3A",
            borderRadius: "2px",
            padding: "40px 48px",
            position: "relative",
          }}
        >
          {/* Top Registration Marks */}
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: "-8px",
              color: "#FD142B",
              fontSize: "16px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            +
          </div>
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              color: "#FD142B",
              fontSize: "16px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            +
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "-8px",
              color: "#FD142B",
              fontSize: "16px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            +
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              right: "-8px",
              color: "#FD142B",
              fontSize: "16px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            +
          </div>

          {/* Top HUD Header Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #3A3A3A",
              paddingBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#3DDC84",
                }}
              />
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  color: "#A8A294",
                  textTransform: "uppercase",
                }}
              >
                /00 — ROOT_MANIFEST // KRAT.OS_KERNEL
              </div>
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#3DDC84",
                textTransform: "uppercase",
              }}
            >
              [STATUS: PRODUCTION_READY]
            </div>
          </div>

          {/* Main Content Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "auto 0",
            }}
          >
            {/* Wordmark Lockup */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              {/* Tall Flat Red Vertical Bar (Caret) */}
              <div
                style={{
                  width: "14px",
                  height: "76px",
                  backgroundColor: "#FD142B",
                  marginRight: "22px",
                  borderRadius: "1px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    fontSize: "76px",
                    fontWeight: 900,
                    letterSpacing: "-3px",
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: "#EFE3CF" }}>Krat</span>
                  <span style={{ color: "#FD142B" }}>.</span>
                  <span style={{ color: "#EFE3CF" }}>OS</span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "4px",
                    color: "#A8A294",
                    textTransform: "uppercase",
                    marginTop: "6px",
                  }}
                >
                  Software solutions
                </div>
              </div>
            </div>

            {/* Headline */}
            <div
              style={{
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "#EFE3CF",
                marginBottom: "12px",
                lineHeight: 1.2,
              }}
            >
              The operating system for your business.
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: "20px",
                lineHeight: 1.4,
                color: "#A8A294",
                maxWidth: "880px",
              }}
            >
              Web apps, mobile platforms, and workflow automations engineered end-to-end. Dependable results without the jargon.
            </div>
          </div>

          {/* Bottom Capabilities Row & Domain Tag */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #3A3A3A",
              paddingTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#2B2B2B",
                  border: "1px solid #3A3A3A",
                  borderRadius: "2px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#EFE3CF",
                  letterSpacing: "1px",
                }}
              >
                [01 WEB APPS]
              </div>
              <div
                style={{
                  backgroundColor: "#2B2B2B",
                  border: "1px solid #3A3A3A",
                  borderRadius: "2px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#EFE3CF",
                  letterSpacing: "1px",
                }}
              >
                [02 MOBILE]
              </div>
              <div
                style={{
                  backgroundColor: "#2B2B2B",
                  border: "1px solid #3A3A3A",
                  borderRadius: "2px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#EFE3CF",
                  letterSpacing: "1px",
                }}
              >
                [03 AUTOMATION]
              </div>
              <div
                style={{
                  backgroundColor: "#2B2B2B",
                  border: "1px solid #3A3A3A",
                  borderRadius: "2px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#EFE3CF",
                  letterSpacing: "1px",
                }}
              >
                [04 MODERNIZATION]
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#EFE3CF",
                letterSpacing: "1px",
              }}
            >
              <span>krat-os.dev</span>
              <span style={{ color: "#FD142B" }}>{"//"}</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
