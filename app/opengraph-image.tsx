import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const alt = "LabMeet · KAIST 석박사 전용 오프라인 파티";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const heartBuf = await readFile(
    path.join(process.cwd(), "public/heart-transparent.png"),
  );
  const heartSrc = `data:image/png;base64,${heartBuf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, #0F1A14 0%, #050807 70%, #000 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heartSrc} width={340} height={340} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#F5F5F5",
              lineHeight: 1,
            }}
          >
            <span>Lab</span>
            <span style={{ color: "#B6E9CC" }}>Meet</span>
          </div>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.28em",
              color: "rgba(182,233,204,0.7)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            KAIST · DAEJEON
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
