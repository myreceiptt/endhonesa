// /src/components/ReusableLoader.tsx

// External libraries
import React, { useCallback, useEffect, useRef, useState } from "react";

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  const [isActive, setIsActive] = useState(false);

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

  return (
    <span
      className={`text-center text-sm font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
    ${
      isActive
        ? "text-foreground animate-pulse"
        : "text-foreground hover:text-foreground hover:animate-pulse"
    }`}
      onClick={handleTap}>
      {message}
    </span>
  );
};

export default Loader;
