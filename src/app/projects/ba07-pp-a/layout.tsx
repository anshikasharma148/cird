import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "BA07/PP/A Project | Early Warning System",
  description:
    "Details of project BA07/PP/A, CIRD's Early Warning System (EWS) initiative for monitoring and risk mitigation.",
  path: "/projects/ba07-pp-a",
  keywords: ["BA07 PP A", "early warning system", "risk mitigation"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
  { name: "BA07/PP/A", path: "/projects/ba07-pp-a" },
]);

export default function Ba07PpALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="ba07-pp-a-breadcrumb-schema" data={breadcrumbSchema} />
      {children}
    </>
  );
}
