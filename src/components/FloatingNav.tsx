"use client";
import { Icon } from "@/components/RetroIcons";

export default function FloatingNav() {
  return (
    <div className="fixed top-6 right-10 flex gap-4 z-50">
      <a
        href="https://github.com/educlopez/vhs-story"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors"
      >
        <Icon name="github" size={24} />
      </a>
      <a
        href="https://x.com/educalvolpz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors"
      >
        <Icon name="mail" size={24} />
      </a>
    </div>
  );
}
