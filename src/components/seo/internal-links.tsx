import Link from "next/link";
import { ArrowRight } from "lucide-react";

type InternalLinkItem = {
  href: string;
  title: string;
  description: string;
};

type InternalLinksSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  links: InternalLinkItem[];
};

export function InternalLinksSection({
  eyebrow = "Explore",
  title,
  description,
  links,
}: InternalLinksSectionProps) {
  return (
    <section className="py-14 sm:py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">{eyebrow}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A237E] mt-2 mb-3">{title}</h2>
          {description && <p className="text-[#37474F] max-w-3xl mx-auto">{description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-slate-200 bg-slate-50 p-5 hover:border-[#1A237E]/30 hover:bg-white hover:shadow-md transition-all"
            >
              <h3 className="text-base font-semibold text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#37474F] mt-2 leading-relaxed">{item.description}</p>
              <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#1A237E] group-hover:text-[#FF9800] transition-colors">
                View page <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
