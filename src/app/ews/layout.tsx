import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Early Warning System (EWS) | CIRD",
  description:
    "Explore CIRD's Early Warning System (EWS) projects for disaster preparedness, alerting, and risk mitigation.",
  path: "/ews",
  keywords: ["early warning system", "CIRD EWS", "disaster monitoring"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Hydrology EWS", path: "/ews" },
]);

export default function EwsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="ews-breadcrumb-schema" data={breadcrumbSchema} />
      {children}
    </>
  );
}
