import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "CIRD Team",
  description:
    "Meet the multidisciplinary CIRD team working on industrial research, innovation, patents, and technology transfer at JUET.",
  path: "/team",
  keywords: ["CIRD team", "research faculty", "industrial experts"],
});

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
