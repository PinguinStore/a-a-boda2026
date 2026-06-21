import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Ephesis } from "next/font/google";
import "./globals.css";
import "@fontsource/great-vibes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const ephesis = Ephesis({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ephesis",
});

export const metadata: Metadata = {
  title: "A & A",
  description: "Invitación de boda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${cormorant.variable}
        ${ephesis.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}