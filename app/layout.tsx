import type React from "react";
import type { Metadata } from "next";
import {
  Anek_Devanagari,
  Anek_Kannada,
  Anek_Telugu,
  Anek_Latin,
} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { LanguageProvider } from "@/contexts/language-context";
import { Suspense } from "react";

const anekDevanagari = Anek_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-anek-devanagari",
  display: "swap",
});

const anekKannada = Anek_Kannada({
  subsets: ["kannada", "latin"],
  variable: "--font-anek-kannada",
  display: "swap",
});

const anekTelugu = Anek_Telugu({
  subsets: ["telugu", "latin"],
  variable: "--font-anek-telugu",
  display: "swap",
});

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  variable: "--font-anek-latin",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WordWise - Social Media Platform",
  description: "Connect with the world through WordWise",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${anekLatin.variable} ${anekDevanagari.variable} ${anekKannada.variable} ${anekTelugu.variable}`}
      >
        <Suspense fallback={null}>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
