"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Download, FileText, Calendar, Building2, Hash, Award, Search, Filter } from "lucide-react";
import { patents } from "@/data/patents";
import { InternalLinksSection } from "@/components/seo/internal-links";

function PatentsPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") ?? "");
  const [filterClass, setFilterClass] = useState<string>("all");

  const uniqueClasses = Array.from(new Set(patents.map(p => p.class)));

  const filteredPatents = patents.filter((patent) => {
    const matchesSearch =
      patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.designNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patent.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = filterClass === "all" || patent.class === filterClass;
    
    return matchesSearch && matchesClass;
  });

  const handleDownload = (pdfPath: string, title: string) => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = `${title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - CIRD theme, Patents #2E7D32 (green) */}
      <section className="pt-36 sm:pt-40 pb-14 sm:pb-16 bg-[#2E7D32] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-60" />
        <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center gap-2 mb-6">
              <Award className="w-6 h-6 text-[#FF9800]" />
              <span className="bg-[#FF9800] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg">Patents & IP</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Patents & <span className="text-[#FF9800]">Designs</span>
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-6">
              Explore our registered designs and patents from the Intellectual Property Office, Government of India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF9800]" />
                <span>{patents.length} Registered Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#FF9800]" />
                <span>Jaiprakash Power Ventures Limited</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16">
        {/* Search and Filter - CIRD theme */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, design number, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-slate-200 text-[#1A237E] placeholder-slate-400 focus:outline-none focus:border-[#1A237E] focus:ring-2 focus:ring-[#1A237E]/20 transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-slate-200 text-[#1A237E] focus:outline-none focus:border-[#1A237E] focus:ring-2 focus:ring-[#1A237E]/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="all" className="bg-white">All Classes</option>
                  {uniqueClasses.map((cls) => (
                    <option key={cls} value={cls} className="bg-white">Class {cls}</option>
                  ))}
                </select>
              </div>
            </div>
            {filteredPatents.length !== patents.length && (
              <p className="mt-3 text-sm text-[#37474F]">
                Showing {filteredPatents.length} of {patents.length} designs
              </p>
            )}
          </div>
        </motion.section>

        {/* Patents Grid - Redesigned section */}
        {filteredPatents.length > 0 ? (
          <section className="border-t border-slate-200 pt-10">
            <div className="text-center mb-8">
              <span className="text-sm font-semibold text-[#FF9800] uppercase tracking-widest">Designs</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A237E] mt-2 mb-2">Registered Designs</h2>
              <div className="mx-auto w-16 h-1 rounded-full bg-[#FF9800]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatents.map((patent, index) => (
                <motion.div
                  key={patent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <article className="h-full flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#FF9800]/30 transition-all duration-300">
                    {/* Accent bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#1A237E] via-[#FF9800] to-[#1A237E]" />
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-[#1A237E] text-white shadow-sm group-hover:bg-[#283593] transition-colors">
                          <Award className="w-6 h-6" />
                        </div>
                        <span className="shrink-0 px-3 py-1.5 rounded-lg bg-[#FF9800] text-white text-xs font-bold uppercase tracking-wide">
                          Class {patent.class}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1A237E] mb-2 line-clamp-2 group-hover:text-[#FF9800] transition-colors leading-snug">
                        {patent.title}
                      </h3>
                      <p className="text-[#37474F] text-sm line-clamp-2 mb-4 flex-1">
                        {patent.description}
                      </p>
                      {/* Meta block */}
                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-2.5 mb-5">
                        <div className="flex items-center gap-2 text-sm text-[#37474F]">
                          <Hash className="w-4 h-4 text-[#FF9800] shrink-0" />
                          <span className="font-mono text-[#1A237E] font-medium">{patent.designNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#37474F]">
                          <Calendar className="w-4 h-4 text-[#FF9800] shrink-0" />
                          <span>Registered: {patent.registrationDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#37474F]">
                          <FileText className="w-4 h-4 text-[#FF9800] shrink-0" />
                          <span>Issued: {patent.issueDate}</span>
                        </div>
                        {patent.serialNumber && (
                          <div className="flex items-center gap-2 text-sm text-[#37474F]">
                            <Hash className="w-4 h-4 text-[#FF9800] shrink-0" />
                            <span>Serial: {patent.serialNumber}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => handleDownload(patent.pdfPath, patent.title)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow group/btn"
                        >
                          <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                          Download PDF
                        </button>
                        <a
                          href={patent.pdfPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-4 py-3 rounded-xl border-2 border-[#1A237E] text-[#1A237E] hover:bg-[#1A237E] hover:text-white transition-all duration-200"
                          aria-label="Open PDF in new tab"
                        >
                          <FileText className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>
          </section>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-slate-50 border border-slate-200 rounded-xl"
          >
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-lg text-[#37474F]">No patents found matching your search</p>
          </motion.div>
        )}

        <div className="mt-12">
          <InternalLinksSection
            eyebrow="Related Paths"
            title="Trace Innovation From Research to Deployment"
            description="Jump to the programs and entities connected to these patent outcomes."
            links={[
              {
                href: "/research",
                title: "Research Programs",
                description: "See how ongoing and completed projects feed into patentable outcomes.",
              },
              {
                href: "/projects/ba01-pp-c",
                title: "Bottom Ash in Pavers and Bricks",
                description: "Project track connected to material and construction design innovation.",
              },
              {
                href: "/projects/ba03-pp-b",
                title: "CHP Monitoring and Control",
                description: "Industrial monitoring project associated with automation-focused IP.",
              },
              {
                href: "/entities/cdc",
                title: "CDC Entity",
                description: "Control Development Centre contributions to applied engineering products.",
              },
              {
                href: "/entities/mtl",
                title: "MTL Entity",
                description: "Mechanical validation and material testing supporting patent refinement.",
              },
              {
                href: "/contact",
                title: "Licensing and Collaboration Contact",
                description: "Reach out for partnership, consultancy, or commercialization discussions.",
              },
            ]}
          />
        </div>

        {/* Footer Info - CIRD theme */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <p className="text-[#37474F] text-sm text-center">
              All designs are registered with the{" "}
              <span className="font-semibold text-[#1A237E]">Intellectual Property Office, Government of India</span>
              {" "}under the Designs Act, 2000 and Designs Rules, 2001.
            </p>
            <p className="text-slate-500 text-xs mt-2 text-center">
              Copyright in each design subsists for ten years from the date of registration, extendable for a further period of five years.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PatentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-slate-200 border-t-[#1A237E] mx-auto mb-4"></div>
          <p className="text-[#37474F]">Loading patents...</p>
        </div>
      </div>
    }>
      <PatentsPageContent />
    </Suspense>
  );
}
