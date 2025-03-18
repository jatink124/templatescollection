import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-10 bg-primary text-pink text-right text-xxl font-bold">
    Tailwind is working!
  </div>
  
  );
}

export default App;
