import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "LabMeet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const heartBuffer = await readFile(
    path.join(process.cwd(), "public/heart-transparent.png"),
  );
  const heartDataUrl = `data:image/png;base64,${heartBuffer.toString("base64")}`;

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
          background: "#000",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heartDataUrl} width={280} height={280} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#FFFFFF",
          }}
        >
          <span>Lab</span>
          <span style={{ color: "#B6E9CC" }}>Meet</span>
        </div>
      </div>
    ),
    size,
  );
}
