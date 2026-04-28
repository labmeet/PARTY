import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_DESCRIPTION = "카이스트 대학원생 전용 기 안 빨리는 소셜 파티";
const SITE_URL = "https://labmeet.love";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "LabMeet",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "LabMeet",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "ko_KR",
    siteName: "LabMeet",
  },
  twitter: {
    card: "summary_large_image",
    title: "LabMeet",
    description: SITE_DESCRIPTION,
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
