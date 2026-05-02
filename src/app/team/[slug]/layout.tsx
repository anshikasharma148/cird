import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Team Profile | CIRD",
  description: "Profile page for CIRD team members and contributors.",
  path: "/team",
  noIndex: true,
});

export default function TeamMemberLayout({ children }: { children: React.ReactNode }) {
  return children;
}
