// src/app/page.tsx

"use client";

// External libraries
import { useCallback, useEffect, useRef, useState } from "react";
import { defineChain } from "thirdweb";
import {
  avalanche,
  base,
  baseSepolia,
  ethereum,
  optimism,
  zora,
} from "thirdweb/chains";
import { ConnectButton, lightTheme } from "thirdweb/react";

// Blockchain configurations
import { client } from "@/config/client";
import { dompets } from "@/config/dompets";
import {
  displayedTekeks,
  tekeks,
  theAccountFactory,
  tokeks,
} from "@/config/contracts";

const monadTestnet = defineChain(10143);
const chains = [
  avalanche,
  base,
  baseSepolia,
  ethereum,
  monadTestnet,
  optimism,
  zora,
];

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const lastTapRef = useRef(0);

  // Untuk handle double tap di mobile
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main
        className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"
        onClick={handleTap}>
        <h1
          className={`text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-[family-name:var(--font-geist-mono)] transition-all duration-300 
        ${
          isActive
            ? "text-foreground animate-pulse"
            : "text-background hover:text-foreground hover:animate-pulse"
        }`}>
          GELAP, OiOi!!!!
        </h1>
      </main>
      <footer
        className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"
        onClick={handleTap}>
        <ConnectButton
          client={client}
          appMetadata={{
            name: "ENDHONESA - Gelap, OiOi!!!!",
            url: "https://endhonesa.com",
            description:
              "ENDHONESAENDHONESA its territory is always changing because not limited by space-time. Where each 1-bit data owned by the residents of ENDHONESA is stored and used (processed and displayed), there and at that time is the legal territory of ENDHONESA.",
            logoUrl: "https://endhonesa.com/logos/oioi.png",
          }}
          wallets={dompets}
          accountAbstraction={{
            factoryAddress: theAccountFactory,
            chain: base,
            sponsorGas: true,
          }}
          chains={chains}
          connectModal={{
            showThirdwebBranding: false,
            title: "Prof. NOTA Inc.",
            titleIcon: "/logos/oioi.png",
          }}
          supportedTokens={tokeks}
          supportedNFTs={tekeks}
          detailsButton={{
            displayBalanceToken: displayedTekeks,
            render: () => (
              <button className="flex items-center justify-center px-4 py-2 text-xl font-[family-name:var(--font-geist-mono)] hover:bg-foreground hover:text-background rounded-lg cursor-pointer">
                My Receipt
              </button>
            ),
          }}
          detailsModal={{
            assetTabs: ["token", "nft"],
          }}
          theme={lightTheme({
            colors: {
              primaryButtonBg: "#171717",
              primaryButtonText: "#171717",
            },
          })}
        />
      </footer>
    </div>
  );
}
