// components/EntranceScene.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useSound from "use-sound";


const EntranceScene = ({ onEnter }) => {
  const [entered, setEntered] = useState(false);
  const [showGalaxy, setShowGalaxy] = useState(false);
  const [showStars, setShowStars] = useState(false);

  const [play] = useSound("/Sound magical effect.mp3", { volume: 0.5 });

  const handleEnter = () => {
    setEntered(true);
    play();
    setTimeout(() => {
      setShowGalaxy(true);
      setShowStars(true);
      onEnter();
    }, 2000);
  };

  useEffect(() => {
    if (showStars) {
      document.body.classList.add("overflow-hidden");
    }
  }, [showStars]);

  // components/StarsBackground.jsx
  const StarsBackground = () => (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="w-full h-full animate-starfield bg-[url('/stars.png')] bg-cover opacity-60"></div>
    </div>
  );

  return (
    <div
      className="relative h-screen w-screen flex justify-center items-center transition-all duration-1000 overflow-hidden"
      style={{
        backgroundImage: showGalaxy ? "url('/galaxy.jpg')" : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "black",
      }}
    >
      {showStars && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            src="https://codepen.io/Hyperplexed/full/WNzPYKN"
            title="Stars"
            className="w-full h-full border-none"
          />
        </div>
      )}

      <motion.div
        className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-gray-900 to-black border-r border-gray-800 shadow-2xl z-20"
        animate={entered ? { x: "-100%" } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-gray-900 to-black border-l border-gray-800 shadow-2xl z-20"
        animate={entered ? { x: "100%" } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {!entered && (
        <motion.button
          className="z-30 bg-yellow-300 text-black px-8 py-4 text-xl rounded-xl font-bold shadow-xl hover:shadow-yellow-500 hover:bg-yellow-400 transition-all"
          onClick={handleEnter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          Enter the Great Hall
        </motion.button>
      )}

      {showGalaxy && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
};

export default EntranceScene;