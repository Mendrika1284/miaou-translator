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
  "J'ai renversé ta tasse, c'était un acte artistique.",
  "Je miaule donc je commande.",
  "Je suis en mission secrète pour la République des Ronrons.",
  "J’ai déjà conquis trois coussins aujourd’hui.",
  "Ton lit est officiellement mon territoire.",
  "Les humains sont mes serviteurs temporaires.",
  "Croquettes ou révolution ? À toi de choisir.",
  "Si tu ne me donnes pas de thon, je hurle à minuit.",
  "Je fais exprès de tout faire tomber, c’est mon entraînement ninja.",
  "Chaque miaou cache une menace.",
  "Je suis le dernier descendant des pharaons félins.",
  "Tu crois que c’est ta maison ? Mauvaise réponse.",
  "Je chasse des ombres, c’est mon art martial.",
  "Je médite dans ma boîte en carton sacrée.",
  "Le chien ? Il est sous mon contrôle.",
  "J’ai griffé ton fauteuil pour libérer mes chakras.",
  "Je dors 18h par jour, je suis en stage intensif de relaxation.",
  "C’est moi qui t’ai choisi, n’oublie jamais.",
  "Mon regard dans le vide signifie que je juge ton existence.",
  "Je miaule juste pour entendre l’écho de mon pouvoir.",
  "Je suis un tigre, mais miniature et mignon.",
  "Mes poils sur tes vêtements sont des bénédictions.",
  "Je suis invisible aux yeux des imbéciles.",
  "Un humain = un distributeur de nourriture.",
  "Je te fixe pendant que tu manges, pour tester ta culpabilité.",
  "Je planifie ta punition pendant que je ronronne.",
  "Mon poil est une extension de mon ego.",
  "Ronronner est une arme psychologique.",
  "Je m’étale sur ton devoir pour dominer ton avenir.",
  "J'ai miaulé cinq fois, tu es en retard de service.",
  "Je suis une divinité en patounes.",
  "Ton réveil ? C’est moi maintenant.",
  "Pourquoi dormir dans un panier quand ton visage existe ?",
  "Je saute partout car l’univers est mon trampoline.",
  "J’ai vu l’infini… et j’y ai fait pipi.",
  "Je suis chat-leureusement supérieur à toi.",
];

export default function CatTranslator() {
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [anim, setAnim] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClick = () => {
    setLoading(true);
    setPhrase(null);
    setAnim(false);
    setIsListening(true);
    setErrorMsg(null);

    let SpeechRecognition: any = undefined;
    if (typeof window !== "undefined") {
      SpeechRecognition =
        "SpeechRecognition" in window
          ? (window as typeof window & { SpeechRecognition: any }).SpeechRecognition
          : "webkitSpeechRecognition" in window
          ? (window as typeof window & { webkitSpeechRecognition: any }).webkitSpeechRecognition
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
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (transcript.includes("miaou")) {
          const random = Math.floor(Math.random() * phrasesChats.length);
          setPhrase(phrasesChats[random]);
          setAnim(true);
          setErrorMsg(null);
        } else {
          setPhrase(null);
          setErrorMsg("Je ne comprends que le miaou, humain ! Essaie encore avec plus de miaou...");
        }
        setLoading(false);
      };
      recognition.onend = () => {
        setIsListening(false);
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
        setErrorMsg(null);
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
        {isListening ? "Parle dans ton micro..." : "Commencer"}
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
          className="text-3xl font-comic text-yellow-700 text-center mt-4 drop-shadow-lg px-4 break-words max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
        >
          {phrase}
        </motion.div>
      )}
      {errorMsg && (
        <div className="text-xl font-comic text-red-500 text-center mt-4 px-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl animate-shake">
          {errorMsg}
        </div>
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
