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
  title: "Interactive Halloween Story",
  description: "Choose your own spooky adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
