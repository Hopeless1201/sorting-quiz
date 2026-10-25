// App.jsx
import { useState } from "react";
import EntranceScene from "./components/EntranceScene";
import SortingHatScene from "./components/SortingHatScene";
import Quiz from "./components/Quiz";

function App() {
  const [stage, setStage] = useState(0);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
      {stage === 0 && <EntranceScene onEnter={() => setStage(1)} />}
      {stage === 1 && <SortingHatScene onProceed={() => setStage(2)} />}
      {stage === 2 && <Quiz />}
    </div>
  );
}

export default App;
