import type { Metadata } from "next";
import faqs from "@/data/faqs";
import { StructuredData } from "@/components/seo/structured-data";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildItemListSchema,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Research Projects at CIRD",
  description:
    "Explore ongoing and completed research projects at CIRD in automation, AI, embedded systems, power plant optimization, and sustainability.",
  path: "/research",
  keywords: ["CIRD research", "industrial R&D projects", "JUET innovation"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Research", path: "/research" },
]);

const researchFaqSchema = buildFaqSchema(
  faqs
    .filter((faq) => faq.category === "Projects")
    .slice(0, 6)
    .map((faq) => ({ question: faq.question, answer: faq.answer })),
);

const researchItemListSchema = buildItemListSchema("CIRD Research Projects", [
  {
    name: "BA01/PP/B - Problems and Remedies of Bottom Ash Replacement with Sand",
    path: "/projects/ba01-pp-b",
  },
  {
    name: "BA01/PP/C - Bottom Ash Replacement in Pavers and Bricks",
    path: "/projects/ba01-pp-c",
  },
  {
    name: "BA03/PP/B - Monitoring and Control System for CHP",
    path: "/projects/ba03-pp-b",
  },
  {
    name: "BA07/PP/A - Early Warning Systems (EWS)",
    path: "/projects/ba07-pp-a",
  },
  {
    name: "BA07/PP/B - Automatic Weather Station (AWS)",
    path: "/projects/ba07-pp-b",
  },
]);

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="research-breadcrumb-schema" data={breadcrumbSchema} />
      <StructuredData id="research-faq-schema" data={researchFaqSchema} />
      <StructuredData id="research-itemlist-schema" data={researchItemListSchema} />
      {children}
    </>
  );
}
