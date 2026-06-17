import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://moneychains.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MoneyChains — Turn your skills into online income",
    template: "%s · MoneyChains",
  },
  description:
    "Pick a proven money chain — a template that connects platforms into one working income engine. Connect your accounts, get guided step-by-step, and track real revenue in one place. The Zapier for making money online.",
  keywords: [
    "make money online",
    "affiliate marketing",
    "side income",
    "creator economy",
    "money chain",
  ],
  openGraph: {
    type: "website",
    url: SITE,
    title: "MoneyChains — Turn your skills into online income",
    description:
      "Pick a proven money chain. We guide you to real income — connect, publish, and track revenue in one place.",
    siteName: "MoneyChains",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyChains",
    description: "The Zapier for making money online.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy">
        {children}
      </body>
    </html>
  );
}
