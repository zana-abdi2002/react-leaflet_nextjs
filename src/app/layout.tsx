import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Germany Train Stations Map - Interactive Station Explorer",
  description:
    "Interactive station explorer built with Next.js and React-Leaflet. Explore German train stations with smart filtering, real-time search, and interactive mapping.",
  keywords: [
    "train stations",
    "germany",
    "map",
    "interactive",
    "next.js",
    "react-leaflet",
  ],
  authors: [{ name: "Zana Abdi" }],
  openGraph: {
    title: "Germany Train Stations Map",
    description:
      "Interactive station explorer built with Next.js and React-Leaflet",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
