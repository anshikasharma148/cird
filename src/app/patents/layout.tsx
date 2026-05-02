import type { Metadata } from "next";
import { patents } from "@/data/patents";
import { StructuredData } from "@/components/seo/structured-data";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Patents & IPR at CIRD",
  description:
    "View CIRD patents, registered designs, and intellectual property achievements from collaborative research and innovation programs.",
  path: "/patents",
  keywords: ["CIRD patents", "IPR", "registered designs", "technology commercialization"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Patents", path: "/patents" },
]);

const patentItemListSchema = buildItemListSchema(
  "CIRD Registered Designs and Patents",
  patents.map((patent) => ({
    name: patent.title,
    path: `/patents?search=${encodeURIComponent(patent.title)}`,
    description: patent.description,
  })),
);

export default function PatentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="patents-breadcrumb-schema" data={breadcrumbSchema} />
      <StructuredData id="patents-itemlist-schema" data={patentItemListSchema} />
      {children}
    </>
  );
}
