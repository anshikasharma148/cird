"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Calendar, Building2, Hash, Award, Search, Filter } from "lucide-react";
import { patents, Patent } from "@/data/patents";
import Link from "next/link";

export default function PatentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="min-h-screen bg-gradient-to-b from-[#e1b382]/50 to-[#e1b382]/40 py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#2d545e]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#e1b382]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-[#2d545e] mr-3" />
            <h1 className="text-5xl md:text-6xl font-bold text-[#2d545e]">
              Patents & Designs
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore our registered designs and patents from the Intellectual Property Office, Government of India
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{patents.length} Registered Designs</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Jaiprakash Power Ventures Limited</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-white border-2 border-[#c89666] shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by title, design number, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border-2 border-[#c89666] text-[#2d545e] placeholder-gray-400 focus:outline-none focus:border-[#2d545e] focus:ring-2 focus:ring-[#2d545e]/50 transition-all"
                  />
                </div>
                {/* Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border-2 border-[#c89666] text-[#2d545e] focus:outline-none focus:border-[#2d545e] focus:ring-2 focus:ring-[#2d545e]/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="all" className="bg-white">All Classes</option>
                    {uniqueClasses.map((cls) => (
                      <option key={cls} value={cls} className="bg-white">
                        Class {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {filteredPatents.length !== patents.length && (
                <p className="mt-4 text-sm text-gray-600">
                  Showing {filteredPatents.length} of {patents.length} designs
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Patents Grid */}
        {filteredPatents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatents.map((patent, index) => (
              <motion.div
                key={patent.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-white border-2 border-[#c89666] hover:border-[#2d545e] transition-all duration-300 shadow-xl hover:shadow-2xl h-full flex flex-col group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#2d545e] to-[#12343b] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#e1b382]/20 text-[#2d545e] text-xs font-semibold border border-[#c89666]">
                        Class {patent.class}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-[#2d545e] mb-2 line-clamp-2 group-hover:text-[#12343b] transition-colors">
                      {patent.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {patent.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-3 mb-4 flex-1">
                      <div className="flex items-center text-sm text-gray-700">
                        <Hash className="w-4 h-4 mr-2 text-[#2d545e]" />
                        <span className="font-mono">{patent.designNumber}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="w-4 h-4 mr-2 text-[#2d545e]" />
                        <span>Registered: {patent.registrationDate}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <FileText className="w-4 h-4 mr-2 text-[#2d545e]" />
                        <span>Issued: {patent.issueDate}</span>
                      </div>
                      {patent.serialNumber && (
                        <div className="flex items-center text-sm text-gray-700">
                          <Hash className="w-4 h-4 mr-2 text-[#2d545e]" />
                          <span>Serial: {patent.serialNumber}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-[#c89666]">
                      <button
                        onClick={() => handleDownload(patent.pdfPath, patent.title)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2d545e] to-[#12343b] hover:from-[#12343b] hover:to-[#2d545e] text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl group/btn"
                      >
                        <Download className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" />
                        Download PDF
                      </button>
                      <a
                        href={patent.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2 bg-[#e1b382]/20 hover:bg-[#e1b382]/30 text-[#2d545e] rounded-lg transition-all duration-200 border-2 border-[#c89666] hover:border-[#2d545e]"
                      >
                        <FileText className="w-4 h-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No patents found matching your search</p>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-[#2d545e]/10 to-[#e1b382]/20 border-2 border-[#c89666]">
            <CardContent className="p-6">
              <p className="text-gray-700 text-sm">
                All designs are registered with the{" "}
                <span className="font-semibold text-[#2d545e]">Intellectual Property Office, Government of India</span>
                {" "}under the Designs Act, 2000 and Designs Rules, 2001.
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Copyright in each design subsists for ten years from the date of registration, extendable for a further period of five years.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

