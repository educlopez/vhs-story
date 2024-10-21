"use client";

import { useStory } from "@/context/StoryContext";
import { CldImage } from "next-cloudinary";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const End = () => {
  const { name, image } = useStory();

  const handleDownload = () => {
    // Implement download functionality
  };

  const handleShare = () => {
    // Implement share functionality
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 text-center"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-6"
      >
        Thank you for playing, {name}!
      </motion.h1>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <CldImage
          width="300"
          height="300"
          src={image}
          alt={`${name}'s final avatar`}
          className="mx-auto"
        />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-x-4"
      >
        <Button onClick={handleDownload}>Download Avatar</Button>
        <Button onClick={handleShare}>Share on Social Media</Button>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Link href="/">
          <Button variant="outline">Play Again</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default End;
