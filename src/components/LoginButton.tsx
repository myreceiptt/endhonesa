// src/components/LoginButton.tsx

"use client";

// External libraries
import { useCallback, useEffect, useRef, useState } from "react";
import { defineChain } from "thirdweb";
import {
  //   avalanche,
  base,
  baseSepolia,
  //   ethereum,
  //   optimism,
  //   zora,
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
  //   avalanche,
  base,
  baseSepolia,
  //   ethereum,
  monadTestnet,
  //   optimism,
  //   zora,
];

export default function LoginButton() {
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
    <div
      className={`w-full flex flex-row items-center justify-center border-2 rounded-lg transition-all duration-700
        ${
          isActive
            ? "border-foreground text-foreground animate-pulse"
            : "border-background text-background hover:border-foreground hover:text-foreground hover:animate-pulse"
        }`}
      onClick={handleTap}>
      <span className="text-3xl font-bold font-[family-name:var(--font-geist-mono)]">
        &rarr;
      </span>
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
          chain: monadTestnet,
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
            <button className="flex items-center justify-center px-4 py-2 text-xl font-[family-name:var(--font-geist-mono)] text-background hover:text-foreground hover:animate-pulse rounded-lg cursor-pointer transition-colors duration-700 ease-in-out">
              NOTAmu...
            </button>
          ),
        }}
        detailsModal={{
          assetTabs: ["token", "nft"],
          connectedAccountAvatarUrl: "/tokens/oioi.png",
          connectedAccountName: "Prof. NOTA",
        }}
        theme={lightTheme({
          colors: {
            primaryButtonBg: "#171717",
            primaryButtonText: "#171717",
          },
        })}
      />
      <span className="text-3xl font-bold font-[family-name:var(--font-geist-mono)]">
        &larr;
      </span>
    </div>
  );
}
