import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LabMeet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, #0F1A14 0%, #050807 70%, #000 100%)",
          color: "#F5F5F5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 180,
              height: 180,
              borderRadius: "9999px",
              background: "rgba(182, 233, 204, 0.14)",
              border: "2px solid rgba(182, 233, 204, 0.28)",
              fontSize: 96,
              lineHeight: 1,
            }}
          >
            {"<3"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 124,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            <span>Lab</span>
            <span style={{ color: "#B6E9CC" }}>Meet</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(182, 233, 204, 0.7)",
              fontWeight: 700,
            }}
          >
            KAIST DAEJEON
          </div>
        </div>
      </div>
    ),
    size,
  );
}
