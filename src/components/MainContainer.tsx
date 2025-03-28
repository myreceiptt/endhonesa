// src/components/MainContainer.tsx

"use client";

// External libraries
import { useCallback, useEffect, useRef, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

// Components libraries
import TokenClaim from "@/components/TokenClaim";

export default function MainContainer() {
  const [isActive, setIsActive] = useState(false);

  const activeAccount = useActiveAccount();

  // Untuk handle double tap di mobile
  const lastTapRef = useRef(0);
  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      // double tap
      setIsActive(true);
    } else {
      // single tap (reset if already active)
      if (isActive) setIsActive(false);
    }
    lastTapRef.current = now;
  }, [isActive]);

  useEffect(() => {
    const handleTouch = () => handleTap();
    window.addEventListener("touchend", handleTouch);
    return () => {
      window.removeEventListener("touchend", handleTouch);
    };
  }, [handleTap]);

  if (activeAccount) {
    return (
      <main className="w-full flex flex-col gap-[8px] row-start-2 items-center">
        <h1
          className={`text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-[family-name:var(--font-geist-mono)] transition-all duration-700 
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          GELAP, OiOi!!!!
        </h1>
        <TokenClaim />
      </main>
    );
  }

  return (
    <main
      className="w-full flex flex-col gap-[8px] row-start-2 items-center"
      onClick={handleTap}>
      <h1
        className={`text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-[family-name:var(--font-geist-mono)] transition-all duration-700 
        ${
          isActive
            ? "text-foreground animate-pulse"
            : "text-background hover:text-foreground hover:animate-pulse"
        }`}>
        GELAP, OiOi!!!!
      </h1>
    </main>
  );
}
