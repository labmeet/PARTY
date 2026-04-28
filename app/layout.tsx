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
  metadataBase: new URL("https://labmeet.vercel.app"),
  title: "LabMeet",
  description: "카이스트 대학원생 전용 기 안 빨리는 소셜 파티, 랩미",
  openGraph: {
    title: "LabMeet",
    description: "카이스트 대학원생 전용 기 안 빨리는 소셜 파티, 랩미",
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
