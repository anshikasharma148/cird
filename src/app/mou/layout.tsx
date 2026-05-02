import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "MoU & Collaborations",
  description:
    "Read about CIRD MoUs and strategic collaborations that drive consultancy projects, innovation, and industrial research outcomes.",
  path: "/mou",
  keywords: ["CIRD MoU", "industry collaboration", "consultancy projects"],
});

export default function MouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
