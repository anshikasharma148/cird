import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "CIRD Research Entities",
  description:
    "Explore CIRD entities and laboratories including CDC and MTL, focused on industrial automation, testing, and applied R&D.",
  path: "/entities",
  keywords: ["CIRD entities", "CDC", "MTL lab", "research labs"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Entities", path: "/entities" },
]);

const entitiesItemListSchema = buildItemListSchema("CIRD Research Entities", [
  {
    name: "CDC - Control Development Centre",
    path: "/entities/cdc",
    description: "Industrial automation, monitoring, and control systems",
  },
  {
    name: "MTL - Mechanical Testing Lab",
    path: "/entities/mtl",
    description: "Mechanical testing, materials validation, and applied engineering",
  },
]);

export default function EntitiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="entities-breadcrumb-schema" data={breadcrumbSchema} />
      <StructuredData id="entities-itemlist-schema" data={entitiesItemListSchema} />
      {children}
    </>
  );
}
