import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "CIRD Leadership & Authorities",
  description:
    "Meet the authorities and leadership team guiding research, innovation, and industrial collaboration at CIRD.",
  path: "/authorities",
  keywords: ["CIRD authorities", "CIRD leadership", "JUET administration"],
});

export default function AuthoritiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
