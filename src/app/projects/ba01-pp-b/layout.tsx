import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "BA01/PP/B Project | Bottom Ash Replacement",
  description:
    "Details of project BA01/PP/B on challenges and remedies for bottom ash replacement with sand in construction applications.",
  path: "/projects/ba01-pp-b",
  keywords: ["BA01 PP B", "bottom ash replacement", "construction materials research"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
  { name: "BA01/PP/B", path: "/projects/ba01-pp-b" },
]);

export default function Ba01PpBLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="ba01-pp-b-breadcrumb-schema" data={breadcrumbSchema} />
      {children}
    </>
  );
}
