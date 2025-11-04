// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import ChatBot from "@/components/ChatBot"; // <- NEW

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CIRD - Centre for Industrial Research and Development",
  description: "Centre for Industrial Research and Development at Jaypee University of Engineering and Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ChatBot /> {/* <- Chat appears globally */}
      </body>
    </html>
  );
}
