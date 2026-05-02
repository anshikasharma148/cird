import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Automatic Weather Station (AWS) | CIRD",
  description:
    "Learn about CIRD's Automatic Weather Station (AWS) initiatives for real-time environmental monitoring and decision support.",
  path: "/aws",
  keywords: ["AWS weather station", "CIRD hydrology", "environment monitoring"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Hydrology AWS", path: "/aws" },
]);

export default function AwsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="aws-breadcrumb-schema" data={breadcrumbSchema} />
      {children}
    </>
  );
}
