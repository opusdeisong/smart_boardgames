import ActiveBell from "@/assets/bell-active";
import NormalBell from "@/assets/bell-normal";
import { useEffect, useState } from "react";
export default function Main() {
  const [isPushed, setIsPushed] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    if (event.key === " ") {
      setIsPushed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (isPushed) {
      setTimeout(() => setIsPushed(false), 50);
    }
    console.log(isPushed);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPushed]);

  return (
    <div className="h-[calc(100vh_-_60px)] flex flex-col items-center justify-center">
      {isPushed ? <ActiveBell width={200} /> : <NormalBell width={200} />}
      <h1 className="text-5xl font-bold">SPACE BAR를 눌러보세요!</h1>
    </div>
  );
}
