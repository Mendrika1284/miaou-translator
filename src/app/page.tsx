"use client";

import CatTranslator from "./CatTranslator";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-200 to-pink-400 relative px-4">
      <motion.div
        initial={{ scale: 0.8, y: -30 }}
        animate={{ scale: [1.1, 1, 1.05], y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-0"
      >
        <Image
          src="/cartoon-cat.png"
          alt="Chat cartoon"
          width={320}
          height={320}
          className="select-none pointer-events-none drop-shadow-lg w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
          priority
        />
      </motion.div>
      <div className="z-10 w-full max-w-xl flex flex-col items-center mt-40 sm:mt-56">
        <h1 className="text-2xl sm:text-4xl font-comic text-pink-700 mb-8 text-center drop-shadow-lg">
          Parle comme un chat <span className="inline-block">🐾</span>
        </h1>
        <CatTranslator />
      </div>
    </div>
  );
}
