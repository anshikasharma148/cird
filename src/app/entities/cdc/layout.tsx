import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "CDC | Control Development Centre",
  description:
    "Control Development Centre (CDC) at CIRD develops industrial automation, monitoring, and control systems for real-world applications.",
  path: "/entities/cdc",
  keywords: ["control development centre", "industrial automation", "SCADA"],
});

export default function CdcLayout({ children }: { children: React.ReactNode }) {
  return children;
}
