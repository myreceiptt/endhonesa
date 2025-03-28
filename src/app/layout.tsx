// /src/app/layout.tsx

// External libraries
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";
import { Analytics } from "@vercel/analytics/react";

// CSS Styling
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENDHONESA - Gelap, OiOi!!!!",
  description:
    "ENDHONESAENDHONESA its territory is always changing because not limited by space-time. Where each 1-bit data owned by the residents of ENDHONESA is stored and used (processed and displayed), there and at that time is the legal territory of ENDHONESA.",
  metadataBase: new URL("https://endhonesa.com"),
  authors: [
    { name: "MyReceipt", url: "https://myreceipt.endhonesa.com" },
    { name: "Prof. NOTA", url: "https://nota.endhonesa.com" },
  ],
  creator: "MyReceipt and Prof. NOTA",
  publisher: "Prof. NOTA Inc.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ENDHONESA - Gelap, OiOi!!!!",
    description:
      "ENDHONESAENDHONESA its territory is always changing because not limited by space-time. Where each 1-bit data owned by the residents of ENDHONESA is stored and used (processed and displayed), there and at that time is the legal territory of ENDHONESA.",
    url: "https://endhonesa.com",
    siteName: "ENDHONESA.COM",
    locale: "en-US",
    images: [
      {
        url: "https://endhonesa.com/preview-image-of-endhonesa.png",
        width: 1920,
        height: 1080,
        alt: "ENDHONESA Preview Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    siteId: "@MyReceiptTT",
    creator: "@MyReceiptTT",
    creatorId: "@MyReceiptTT",
    title: "ENDHONESA - Gelap, OiOi!!!!",
    description:
      "ENDHONESAENDHONESA its territory is always changing because not limited by space-time. Where each 1-bit data owned by the residents of ENDHONESA is stored and used (processed and displayed), there and at that time is the legal territory of ENDHONESA.",
    images: ["https://endhonesa.com/preview-image-of-endhonesa.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThirdwebProvider>{children}</ThirdwebProvider>
        <Analytics />
      </body>
    </html>
  );
}
