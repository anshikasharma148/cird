// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HomeNavigation } from "@/components/home-navigation";
import { Footer } from "@/components/footer";
import ChatBot from "@/components/ChatBot";
import { absoluteUrl, buildPageMetadata, siteConfig } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const homeMetadata = buildPageMetadata({
  title: "CIRD | Centre for Industrial Research and Development",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "engineering research center",
    "industrial consultancy",
    "academic research collaboration",
    "Jaypee University of Engineering and Technology",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  ...homeMetadata,
  title: {
    default: "CIRD | Centre for Industrial Research and Development",
    template: "%s | CIRD",
  },
  applicationName: "CIRD",
  creator: "CIRD",
  publisher: "CIRD",
  category: "education",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.domain,
    logo: absoluteUrl("/favicon.ico"),
    email: siteConfig.contactEmail,
    sameAs: [siteConfig.linkedin],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.fullName,
    url: siteConfig.domain,
    inLanguage: "en-IN",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#e1b382]/30`}>
        <HomeNavigation />
        <main>{children}</main>
        <Footer />
        <ChatBot /> {/* <- Chat appears globally */}
      </body>
    </html>
  );
}
