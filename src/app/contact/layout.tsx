import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact CIRD",
  description:
    "Contact the Centre for Industrial Research and Development (CIRD) for collaborations, research partnerships, and project inquiries.",
  path: "/contact",
  keywords: ["contact CIRD", "research collaboration inquiry", "JUET contact"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
