import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoryProvider } from "@/context/StoryContext";
import localFont from "next/font/local";
import NoiseBackground from "../components/NoiseBackground";
import FloatingNav from "@/components/FloatingNav";
const horrorFont = localFont({
  src: "assets/fonts/OPTIBrianJamesBoldCond.woff",
  display: "swap",
  variable: "--font-horror",
});

const pixelFont = localFont({
  src: "assets/fonts/DepartureMono-Regular.woff",
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vhs-story.vercel.app/"),
  title: {
    default: "Interactive Halloween Story",
    template: "%s | VHS Story",
  },
  description: "Choose your own spooky adventure",
  keywords: [
    "components, Smooth animations, Awesome test components, framermotion, framer-motion, Interactive components",
  ],
  openGraph: {
    title: "SmoothUI",
    description: "Choose your own spooky adventure",
    url: "https://vhs-story.vercel.app",
    siteName: "SmoothUI",
    images: [
      {
        url: "https://vhs-story.vercel.app/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-EN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "VHS Story",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" sizes="any" />
      <body
        className={`${horrorFont.variable} ${pixelFont.className} bg-[#050505] bg-gradient-to-b from-[#010101] via-[#061930] to-[#054E96]`}
      >
        <FloatingNav />
        <div className="pointer-events-none fixed left-0 top-0 z-50 h-screen w-full">
          <div className="crt pointer-events-none fixed left-0 top-0 z-50 h-screen w-full" />
          <NoiseBackground />
        </div>
        <div className="relative h-screen w-full overflow-hidden ">
          <StoryProvider>{children}</StoryProvider>
        </div>
      </body>
    </html>
  );
}
