import type { Metadata } from "next";
import faqs from "@/data/faqs";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About CIRD",
  description:
    "Learn about CIRD at JUET, Guna, its mission, vision, and industry-academia research collaboration programs.",
  path: "/about",
  keywords: ["about CIRD", "CIRD mission", "JUET research center"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

const aboutFaqSchema = buildFaqSchema(
  faqs
    .filter((faq) => faq.category === "About")
    .slice(0, 6)
    .map((faq) => ({ question: faq.question, answer: faq.answer })),
);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="about-breadcrumb-schema" data={breadcrumbSchema} />
      <StructuredData id="about-faq-schema" data={aboutFaqSchema} />
      {children}
    </>
  );
}
