import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Training Programs at CIRD",
  description:
    "Discover CIRD training programs, technical workshops, and industry-oriented capacity-building initiatives at JUET, Guna.",
  path: "/training",
  keywords: ["CIRD training", "technical workshops", "industry training"],
});

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
