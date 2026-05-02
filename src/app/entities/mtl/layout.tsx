import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "MTL | Mechanical Testing Lab",
  description:
    "Mechanical Testing Lab (MTL) at CIRD supports material characterization, testing, and engineering validation for industry projects.",
  path: "/entities/mtl",
  keywords: ["mechanical testing lab", "material testing", "CIRD MTL"],
});

export default function MtlLayout({ children }: { children: React.ReactNode }) {
  return children;
}
