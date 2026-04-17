import type { Metadata, Viewport } from "next";
import { Gowun_Batang, Playfair_Display } from "next/font/google";
import "./globals.css";

const notoSerif = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LabMeet · 랩미",
  description: "KAIST 석박사를 위한 진중한 만남. 랩미는 연구자들을 위한 오프라인 파티/매칭 서비스입니다.",
  openGraph: {
    title: "LabMeet · 랩미",
    description: "KAIST 석박사를 위한 진중한 만남",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1410",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${notoSerif.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
