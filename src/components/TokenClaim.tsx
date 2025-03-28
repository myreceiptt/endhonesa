// /src/components/TokenClaim.tsx

"use client";

// External libraries
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  balanceOf,
  canClaim,
  decimals,
  getActiveClaimCondition,
  totalSupply,
} from "thirdweb/extensions/erc20";
import { ClaimButton, useActiveAccount, useReadContract } from "thirdweb/react";

// Blockchain configurations
import { client } from "@/config/client";
import { oioiT0kenMonadTestnet } from "@/config/contracts";

// Components libraries
import Loader from "@/components/ReusableLoader";

const TokenClaim: React.FC = () => {
  // All useState condition
  const [isActive, setIsActive] = useState(false);
  const [erc20Claimed, setErc20Claimed] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState<string>("0");
  const [pesanTunggu, setPesanTunggu] = useState<string | null>(null);
  const [pesanKirim, setPesanKirim] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);
  const [pesanGagal, setPesanGagal] = useState<string | null>(null);

  // Use active account wallet
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

  // Retrieves the token decimals
  const { data: tokenDecimals } = useReadContract(decimals, {
    contract: oioiT0kenMonadTestnet,
  });

  // Fetch coin total supply
  const { data: coinSupply } = useReadContract(totalSupply, {
    contract: oioiT0kenMonadTestnet,
  });

  // Fetch active claim condition
  const { data: activeClaimCondition } = useReadContract(
    getActiveClaimCondition,
    {
      contract: oioiT0kenMonadTestnet,
    }
  );

  // Log the result on console
  console.log("Active Claim:", activeClaimCondition);

  // Set claim amount
  useEffect(() => {
    if (
      activeClaimCondition?.quantityLimitPerWallet &&
      tokenDecimals !== undefined
    ) {
      setAmount(
        (
          activeClaimCondition?.quantityLimitPerWallet /
          BigInt(10) ** BigInt(tokenDecimals)
        ).toString()
      );
    }
  }, [activeClaimCondition?.quantityLimitPerWallet, tokenDecimals]);

  // Fetch can claim "result"
  const { data: canClaimErc20 } = useReadContract(canClaim, {
    contract: oioiT0kenMonadTestnet,
    claimer: activeAccount?.address ?? "",
    quantity: amount,
  });

  // Set ERC20 claimed
  useEffect(() => {
    if (canClaimErc20 !== undefined) {
      setErc20Claimed(!canClaimErc20.result);
    }
  }, [canClaimErc20]);

  // Calculate current supply
  const currentSupply =
    coinSupply && tokenDecimals !== undefined ? (
      `${(coinSupply / BigInt(10) ** BigInt(tokenDecimals)).toString()}`
    ) : (
      <Loader message="Ceki... Ceki..." />
    );

  // Fetch user's owned Coins
  const { data: ownedCoins } = useReadContract(balanceOf, {
    contract: oioiT0kenMonadTestnet,
    address: activeAccount?.address ?? "",
  });

  return (
    <div className="w-3/4 grid grid-cols-1 gap-4">
      {/* Column: Image */}
      <div className="flex justify-center cursor-pointer">
        <Image
          src="/tokens/oioi.png"
          alt="OiOi Token"
          width={74}
          height={74}
          className={`transition-all duration-700
          ${
            isActive
              ? "opacity-100 animate-pulse"
              : "opacity-0 hover:opacity-100 hover:animate-pulse"
          }`}
          onClick={handleTap}
        />
      </div>

      {/* Column: Form */}
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2
          className={`text-center text-sm font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          OiOi Token bukan uang, bukan jimat, tapi bukan sekadar token. OiOi
          Token adalah pengingat: bahwa kita masih waras, masih bisa mencatat
          kenyataan — walau dunia disetel untuk lupa.
        </h2>
        <h2
          className={`text-center text-sm font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          Klaim OiOi Token ini, biar lengkap visa dan paspormu, bukti kamu sudah
          resmi tinggal di negeri paling GELAP: ENDHONESA.
        </h2>
        <h2
          className={`text-center text-sm font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          OiOi Token dicetak di {oioiT0kenMonadTestnet.chain.name} blockchain,
          bukan di lembar kertas negara. Semuanya bisa dicek — no tipu-tipu, no
          sensor-sensoran. Sebab kita tak lagi butuh stempel birokrasi, cukup
          jejak digital sebagai saksi: kamu hidup di ENDHONESA yang GELAP, tapi
          kamu tak bungkam.
        </h2>
        <div className="flex flex-row gap-2">
          <h1 className="text-left text-sm font-medium">oleh</h1>
          <span className="text-3xl leading-6">&#9673;</span>
          <h1 className="text-left text-sm font-medium">
            <Link href="https://www.endhonesa.com/" target="_blank">
              ENDHONESA GELAP
            </Link>
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <h4 className="text-left text-xs font-medium"></h4>
          <h4 className="text-left text-xs font-medium"></h4>
          <h4 className="text-left text-xs font-medium"></h4>
          <h4 className="text-left text-xs font-medium"></h4>
        </div>

        {/* Success or Error Messages */}
        {pesanTunggu && <Loader message={pesanTunggu} />}
        {pesanKirim && <Loader message={pesanKirim} />}
        {pesanSukses && <Loader message={pesanSukses} />}
        {pesanGagal && <Loader message={pesanGagal} />}

        {/* Claim Button */}
        <ClaimButton
          unstyled
          className={`w-full rounded-lg p-2 text-base font-semibold transition-colors duration-300 ease-in-out
            ${
              isProcessing || erc20Claimed
                ? "border-2 border-solid border-border-tombol bg-back-ground text-hitam-judul-body"
                : "border-2 border-solid border-back-ground text-back-ground bg-hitam-judul-body cursor-pointer"
            }
          `}
          contractAddress={oioiT0kenMonadTestnet.address}
          chain={oioiT0kenMonadTestnet.chain}
          client={client}
          claimParams={{
            type: "ERC20",
            quantity: amount,
          }}
          disabled={Boolean(isProcessing || !amount || erc20Claimed)}
          onClick={() => {
            setIsProcessing(true);
            setPesanTunggu("Harap sabar dan tunggu.");
            setPesanSukses(null);
            setPesanGagal(null);
          }}
          onTransactionSent={() => {
            setPesanTunggu(null);
            setPesanKirim("Mengklaim OiOi Token.");
          }}
          onError={(error) => {
            setIsProcessing(false);
            setPesanTunggu(null);
            setPesanKirim(null);
            setPesanGagal(`${error.message}`);
          }}
          onTransactionConfirmed={async () => {
            setIsProcessing(false);
            setPesanKirim(null);
            setPesanSukses("Berhasil klaim OiOi Token.");
            try {
              // Refetch claim condition
              const activeCondition20 = await canClaim({
                contract: oioiT0kenMonadTestnet,
                claimer: activeAccount?.address ?? "",
                quantity: "1",
              });

              if (!activeCondition20.result) {
                setErc20Claimed(true);
              } else {
                setErc20Claimed(false);
              }
            } catch (error) {
              console.error("Error refetching claim condition:", error);
            }
          }}>
          {erc20Claimed ? "Klaim Lagi Besok" : "Klaim Sekarang"}
        </ClaimButton>
        <h4
          className={`text-center text-xs font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          &#42;Kamu punya{" "}
          {ownedCoins !== undefined && tokenDecimals !== undefined ? (
            (ownedCoins / BigInt(10) ** BigInt(tokenDecimals)).toString()
          ) : (
            <Loader message="Ceki... Ceki..." />
          )}{" "}
          OiOi. Total ada {currentSupply} OiOi yang sudah diklaim. Sekali klaim
          maksimal {amount} OiOi. Kamu bisa klaim sehari sekali. Batas klaim
          hingga 17 Agustus 2025.
        </h4>
      </div>
    </div>
  );
};

export default TokenClaim;
