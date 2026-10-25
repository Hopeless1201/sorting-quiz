// components/SortingHatScene.jsx
import { motion } from "framer-motion";
import { useEffect } from "react";

const SortingHatScene = ({ onProceed }) => {
  useEffect(() => {
    const speech = new SpeechSynthesisUtterance(
      "A new student! I see great potential in you..."
    );
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 0.9;
    speechSynthesis.speak(speech);
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col justify-center items-center text-white text-center p-4">
      <motion.img
        src="/sorting-hat.gif"
        alt="Sorting Hat"
        className="w-48 h-48 mb-6"
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        "Ahh, a new student! I see great potential in you..."
      </motion.h1>

      <motion.button
        className="mt-auto px-6 py-3 bg-blue-500 text-white rounded-lg font-bold shadow-lg transition-all duration-300 hover:scale-105"
        onClick={onProceed}
      >
        Continue to Sorting Quiz
      </motion.button>
    </div>
  );
};

export default SortingHatScene;