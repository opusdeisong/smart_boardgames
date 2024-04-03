import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl">React-TailwindCSS-Typescript-Vite-shadcn/ui</h1>
      <h1 className="text-5xl font-bold">{count}</h1>
      <div className="flex flex-row gap-5">
        <Button size={"icon"} onClick={() => setCount((count) => count + 1)}>
          +
        </Button>
        <Button size={"icon"} onClick={() => setCount((count) => count - 1)}>
          -
        </Button>
      </div>
    </div>
  );
}

export default App;
