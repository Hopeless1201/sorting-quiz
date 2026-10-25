import React, { useState } from "react";

const questions = [
  {
    question: "I am willing to take risks even when the outcome is uncertain (1- strongly disagree, 5- strongly agree)",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "If I had a free day to do anything, I would most likely:  ",
    options: [
      { text: "Read or learn something new", value: "Read or learn something new" },
      { text: "Try an adventurous activity", value: "Try an adventurous activity" },
      { text: "Spend time with friends and help others", value: "Spend time with friends and help others" },
      { text: "Work on a personal goal or project", value: "Work on a personal goal or project" },
    ],
  },
  {
    question: " I always put the needs of my friends and family before my own (1- strongly disagree, 5- strongly agree)  ",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "I would rather be feared than ignored  (1- strongly disagree, 5- strongly agree)  ",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3"},
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "I enjoy being the leader in a group (1- strongly disagree, 5- strongly agree)  ",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "You’re working on a group project and someone isn't doing their part. What do you do?  ",
    options: [
      { text: "Take on the extra work myself", value: "Take on the extra work myself to ensure we succeed." },
      { text: "Talk to them and encourage them", value: "Talk to them and encourage them to contribute" },
      { text: "Find a workaround to keep going", value: "Find a way to work around them and still get things done." },
      { text: "Make it more fun so they join in", value: "Use creativity to make the task more engaging" },
    ],
  },
  {
    question: "You're in a duel with a strong opponent. What do you do?  ",
    options: [
      { text: "Charge in with confidence", value: "Charge in, trusting my skills" },
      { text: "Wait for the right moment", value: "Outsmart them and wait for the right moment." },
      { text: "Try to end it peacefully", value: "Try to resolve things peacefully." },
      { text: "Use a clever trick", value: "Use a clever trick to gain the upper hand." },
    ],
  },
  {
    question: "During an argument, I rely on facts and logic rather than emotions (1- strongly disagree, 5- strongly agree)  ",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "You’re offered a shortcut to achieve your dream job, but it involves breaking some rules. What do you do?  ",
    options: [
      { text: "Take it—success matters", value: "Take it—success is what matters." },
      { text: "Stick to the rules", value: "Stick to the rules and work hard." },
      { text: "Make it seem fair and take it", value: "Find a way to make it seem fair while still taking the shortcut." },
      { text: "Turn it down—honesty first", value: "Turn it down—I value honesty more than success." },
    ],
  },
  {
    question: "I believe that patience and perseverance always lead to success (1- strongly disagree, 5- strongly agree)  ",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "If my friend is being bullied, I would immediately stand up for them, no matter what (1- strongly disagree, 5- strongly agree)  ",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "I adapt quickly to new situations and use them to my advantage (1- strongly disagree, 5- strongly agree)",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "I enjoy solving puzzles and figuring out how things work (1- strongly disagree, 5- strongly agree)",
    options: [
      { text: "1", value: "1" },
      { text: "2", value: "2" },
      { text: "3", value: "3" },
      { text: "4", value: "4" },
      { text: "5", value: "5" },
    ],
  },
  {
    question: "You find a wallet full of cash on the street. What do you do?",
    options: [
      { text: "Turn it in", value: "Turn it in to the authorities." },
      { text: "Try to find the owner", value: "Try to find the owner myself" },
      { text: "Keep it if no one comes for it", value: "Keep it, but only if no one comes looking for it" },
      { text: "Investigate further", value: "Investigate to see if there’s a deeper mystery" },
    ],
  },
  {
    question: "What motivates you the most?",
    options: [
      { text: "Acheiving my dreams and being the best", value: "Acheiving my dreams and being the best" },
      { text: "The thrill of adventure and challenge.", value: "The thrill of adventure and challenge." },
      { text: "Helping others and making a difference.", value: "Helping others and making a difference." },
      { text: "Gaining knowledge and understanding the world.", value: "Gaining knowledge and understanding the world." },
    ],
  },
];

const SortingQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = async (value) => {
    const updated = [...responses, value];

    if (currentIndex + 1 < questions.length) {
      setResponses(updated);
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished
      setLoading(true);
      try {
        console.log("Sending POST request to /predict with data:", updated);

        if (updated.length !== 15) {
          alert("Need 15 answers before submitting!");
          return;
        }

        const res = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: updated }),
        });

        const data = await res.json();
        setResult(data.house || "Unknown");
      } catch (err) {
        console.error("ML Error", err);
        setResult("Error");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-yellow-300 text-3xl font-wizard animate-pulse">
        <span className="mb-4">🧹 Summoning the Sorting Hat...</span>
        <span className="italic text-lg">Potions... Spells... Magic... Almost ready...</span>
      </div>
    );
  }
  
  if (result) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 animate-fade-in">🏰 You belong to the house of...</h1>
        <h2 className="text-7xl font-wizard text-yellow-400 drop-shadow-glow animate-bounce">{result}</h2>
        <p className="mt-6 text-gray-300 italic">May your destiny unfold with honor.</p>
      </div>
    );
  }
  
  const question = questions[currentIndex];
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-indigo-950 to-black text-white px-4 py-10 font-sans">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 sm:p-12 max-w-xl w-full text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-slide-x" />
        <h1 className="text-4xl font-bold mb-8 font-wizard text-yellow-300 animate-fade-in">🧙 Sorting Quiz</h1>
        <p className="text-lg mb-8 leading-relaxed">{question.question}</p>
  
        <div className="flex flex-col gap-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.value)}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              {option.text}
            </button>
          ))}
        </div>
  
        <p className="mt-6 text-sm text-gray-400 italic">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
   
};

export default SortingQuiz;
