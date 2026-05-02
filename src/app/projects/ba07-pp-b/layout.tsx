import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "BA07/PP/B Project | Automatic Weather Station",
  description:
    "Details of project BA07/PP/B focused on Automatic Weather Station (AWS) development and deployment.",
  path: "/projects/ba07-pp-b",
  keywords: ["BA07 PP B", "automatic weather station", "weather monitoring"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
  { name: "BA07/PP/B", path: "/projects/ba07-pp-b" },
]);

export default function Ba07PpBLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="ba07-pp-b-breadcrumb-schema" data={breadcrumbSchema} />
      {children}
    </>
  );
}
