import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
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
  themeColor: "#D2F5E6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={inter.variable} style={{ colorScheme: "light" }}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
