import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoryProvider } from "@/context/StoryContext";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <StoryProvider>{children}</StoryProvider>
      </body>
    </html>
  );
}
