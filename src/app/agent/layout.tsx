import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Agent Dashboard | CIRD",
  description: "Internal CIRD agent dashboard.",
  path: "/agent",
  noIndex: true,
});

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
