import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const alt = "LabMeet · 대학원생 전용 기 안 빨리는 오프라인 파티";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const heartBuf = await readFile(
    path.join(process.cwd(), "public/heart-transparent.png"),
  );
  const heartSrc = `data:image/png;base64,${heartBuf.toString("base64")}`;

  // Read actual PNG dimensions from the IHDR chunk (bytes 16–23 of the file).
  const pngW = heartBuf.readUInt32BE(16);
  const pngH = heartBuf.readUInt32BE(20);
  const heartH = 380;
  const heartW = Math.round((heartH * pngW) / pngH);

  // Inter ExtraBold woff (satori can't parse woff2) — matches Hero's font
  const interBold = await readFile(
    path.join(process.cwd(), "public/fonts/Inter-ExtraBold.woff"),
  );

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
          gap: 36,
          fontFamily: "Inter",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heartSrc} width={heartW} height={heartH} alt="" />
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
              fontSize: 124,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#F5F5F5",
              lineHeight: 1,
              fontFamily: "Inter",
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
              color: "rgba(182,233,204,0.7)",
              textTransform: "uppercase",
              fontWeight: 800,
              fontFamily: "Inter",
            }}
          >
            KAIST · DAEJEON
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interBold,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}
