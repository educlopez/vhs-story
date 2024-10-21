"use client";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Your Own Story</h1>
      <p className="text-xl mb-8">
        Create your avatar, choose your adventure, and watch your story unfold
        based on your decisions.
      </p>
      <Link href="/start">
        <Button size="lg">Start Your Adventure</Button>
      </Link>
    </div>
  );
}
