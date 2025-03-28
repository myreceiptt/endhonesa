// /src/config/contracts.ts

// External libraries
import { defineChain, getContract } from "thirdweb";
import { base, baseSepolia } from "thirdweb/chains";

// Blockchain configurations
import { client } from "@/config/client";

// Define Monad Testnet chain
const monadTestnet = defineChain(10143);

// Factory Address Contract
export const theAccountFactory = "0x186b1740d24bc028D220838796441441dc444f9A";

// Non-Fungible Tokens Contracts
export const builtNotBought = getContract({
  address: "0x109bD24A1ec4582C378581286A4257825247Dd03",
  chain: base,
  client,
});

export const beBackNever = getContract({
  address: "0x1cC4D96F26847f7449acf55969cDf8C6fa869920",
  chain: base,
  client,
});

export const bananowBase = getContract({
  address: "0xfd039aC57cc8E646802dBA4b7Cf6bc561E13A09A",
  chain: base,
  client,
});

export const tryAndError = getContract({
  address: "0xdf9F3A962875cAAAC9f62d6Cc505B9b61E06c34c",
  chain: baseSepolia,
  client,
});

// Fungible Tokens Contracts
export const oioiTokenBase = getContract({
  address: "0xba0032620d88D9b16752CbDE75593c080C3d38de",
  chain: base,
  client,
});

export const oioiT0kenBaseSepolia = getContract({
  address: "0xcB2208E9Fb77591D3A0688C4459d976b1f16Ab53",
  chain: baseSepolia,
  client,
});

export const oioiT0kenMonadTestnet = getContract({
  address: "0x8d7402Ae89CdF92D3477d9D63517F5e609caBcb2",
  chain: monadTestnet,
  client,
});

// All Supported NFTs
// Define the type explicitly
type SupportedNFTs = {
  // Keys are numbers, values are arrays of Ethereum addresses
  [key: number]: `0x${string}`[];
};

// Define `tekeks` with the proper type
export const tekeks: SupportedNFTs = {
  [base.id]: [
    builtNotBought.address, // Built Not Bought
    beBackNever.address, // Be Back Never
    bananowBase.address, // BANANOW Based
  ],
  [baseSepolia.id]: [
    tryAndError.address, // Try and Error
  ],
};

// All Supported Tokens (FTs)
// Define `tokeks` with the proper type
export const tokeks = {
  [base.id]: [
    {
      address: oioiTokenBase.address,
      name: "OiOi T0ken",
      symbol: "OiOi",
      icon: "/tokens/oioi.png",
    },
  ],
  [baseSepolia.id]: [
    {
      address: oioiT0kenBaseSepolia.address,
      name: "OiOi T0ken",
      symbol: "OiOi",
      icon: "/tokens/oioi.png",
    },
  ],
  [monadTestnet.id]: [
    {
      address: oioiT0kenMonadTestnet.address,
      name: "OiOi T0ken",
      symbol: "OiOi",
      icon: "/tokens/oioi.png",
    },
  ],
};

// All Displayed Balance Token
export const displayedTekeks = {
  [base.id]: oioiTokenBase.address,
  [baseSepolia.id]: oioiT0kenBaseSepolia.address,
  [monadTestnet.id]: oioiT0kenMonadTestnet.address,
};
