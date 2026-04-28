import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "LabMeet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadInterBlack(): Promise<ArrayBuffer> {
  // Google Fonts CSS API serves TTF when the request lacks a modern browser UA.
  // satori (used by next/og) requires TTF/OTF — woff2 is not supported.
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap",
  ).then((r) => r.text());

  const fontUrl = css.match(/src:\s*url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
  if (!fontUrl) throw new Error("Inter TTF URL not found in Google Fonts CSS");

  return fetch(fontUrl).then((r) => r.arrayBuffer());
}

export default async function OGImage() {
  const [heartBuffer, interBlack] = await Promise.all([
    readFile(path.join(process.cwd(), "public/heart-transparent.png")),
    loadInterBlack(),
  ]);
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
          fontFamily: "Inter",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heartDataUrl} width={280} height={280} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 132,
            fontWeight: 900,
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
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interBlack,
          style: "normal",
          weight: 900,
        },
      ],
    },
  );
}
