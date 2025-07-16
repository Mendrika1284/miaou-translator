/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const phrasesChats = [
  "Je suis la reine du poulailler !",
  "Miaou miaou, j'exige des croquettes !",
  "Je vais dormir sur ton clavier.",
  "Le laser est mon ennemi juré.",
  "Je suis le maître du canapé !",
  "Un jour, j'aurai mon propre château.",
  "Pourquoi tu travailles au lieu de me caresser ?",
  "Je prépare un coup d'État félin...",
  "Je suis un chat, donc je suis.",
];

export default function CatTranslator() {
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [anim, setAnim] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setPhrase(null);
    setAnim(false);
    setIsListening(true);

    // Utilisation de l'API Web Speech pour simuler l'écoute micro
    let SpeechRecognition: any = undefined;
    if (typeof window !== "undefined") {
      SpeechRecognition =
        "SpeechRecognition" in window
          ? (window as typeof window & { SpeechRecognition: any })
              .SpeechRecognition
          : "webkitSpeechRecognition" in window
          ? (window as typeof window & { webkitSpeechRecognition: any })
              .webkitSpeechRecognition
          : undefined;
    }
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onstart = () => {
        setIsListening(true);
      };
      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => {
          const random = Math.floor(Math.random() * phrasesChats.length);
          setPhrase(phrasesChats[random]);
          setLoading(false);
          setAnim(true);
        }, 500);
      };
      recognition.onerror = () => {
        setIsListening(false);
        setLoading(false);
      };
      recognition.start();
    } else {
      // Fallback si l'API n'est pas dispo
      setTimeout(() => {
        setIsListening(false);
        const random = Math.floor(Math.random() * phrasesChats.length);
        setPhrase(phrasesChats[random]);
        setLoading(false);
        setAnim(true);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        onClick={handleClick}
        disabled={loading || isListening}
        className={`bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 px-8 rounded-full text-2xl shadow-lg transition-all duration-200 animate-bounce ${
          loading || isListening ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {isListening ? "Parle dans ton micro..." : "Parle comme un chat"}
      </button>
      {loading && (
        <div className="text-lg text-gray-700 animate-pulse">
          Traduction en cours...
        </div>
      )}
      {phrase && (
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={anim ? { scale: 1.2, rotate: 5 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-3xl font-comic text-yellow-700 text-center mt-4 drop-shadow-lg"
        >
          {phrase}
        </motion.div>
      )}
      {isListening && (
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-pink-300 animate-pulse border-4 border-pink-500 shadow-lg" />
          <div className="text-pink-700 font-comic text-lg animate-pulse">
            On t&apos;écoute !
          </div>
        </div>
      )}
    </div>
  );
}
