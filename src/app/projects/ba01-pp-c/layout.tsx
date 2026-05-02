import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "BA01/PP/C Project | Bottom Ash in Pavers",
  description:
    "Details of project BA01/PP/C focused on bottom ash replacement in pavers and bricks for sustainable construction.",
  path: "/projects/ba01-pp-c",
  keywords: ["BA01 PP C", "pavers and bricks", "sustainable construction"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
  { name: "BA01/PP/C", path: "/projects/ba01-pp-c" },
]);

export default function Ba01PpCLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="ba01-pp-c-breadcrumb-schema" data={breadcrumbSchema} />
      {children}
    </>
  );
}
