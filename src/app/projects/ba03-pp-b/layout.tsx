import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "BA03/PP/B Project | CHP Monitoring & Control",
  description:
    "Details of project BA03/PP/B on monitoring and control systems for Coal Handling Plant (CHP) operations.",
  path: "/projects/ba03-pp-b",
  keywords: ["BA03 PP B", "coal handling plant", "monitoring and control"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
  { name: "BA03/PP/B", path: "/projects/ba03-pp-b" },
]);

export default function Ba03PpBLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="ba03-pp-b-breadcrumb-schema" data={breadcrumbSchema} />
      {children}
    </>
  );
}
