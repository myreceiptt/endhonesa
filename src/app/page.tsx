// src/app/page.tsx

"use client";

// Components libraries
import { ErrorBoundary } from "@/components/ErrorBoundary";
import LoginButton from "@/components/LoginButton";
import MainCointainer from "@/components/MainContainer";

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* Headerlessss */}
        <MainCointainer />
        {/* Footersss */}
        <footer className="w-full row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <LoginButton />
        </footer>
      </div>
    </ErrorBoundary>
  );
}
