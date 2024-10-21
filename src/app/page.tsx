"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import horrorHouse from "@/app/assets/images/blurhouse.png";
import forest from "@/app/assets/images/forest-black.svg";

export default function Home() {
  return (
    <>
      {/* Background image with circular mask */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bottom-0">
        <Image
          src={horrorHouse}
          alt="Horror House"
          objectFit="cover"
          layout="fill"
          className="[mask-image:radial-gradient(circle,#000_10%,transparent_80%)] blur-sm"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center h-full flex flex-col justify-center items-center w-1/2">
        <div className="relative">
          <h1 className="text-5xl font-bold mb-6 horror-title uppercase text-[#FF5802] relative">
            Welcome to <br />
            Your Own Story
          </h1>
          <h1 className="text-5xl font-bold mb-6 horror-title uppercase text-[#FF5802] vhs-effect absolute left-0 top-0">
            Welcome to <br />
            Your Own Story
          </h1>
        </div>

        <Link href="/start">
          <Button size="lg">Start Your Story</Button>
        </Link>
      </div>
      <div className="absolute inset-0 z-0 -bottom-2 h-screen">
        <Image
          src={forest}
          alt="Horror House"
          objectFit="cover"
          layout="fill"
        />
      </div>
    </>
  );
}
