"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Filter, HelpCircle, FileDown, ArrowRight } from "lucide-react";
import useNssData from "@/hooks/use-nss-data";

export default function DownloadsPage() {
  const { downloads } = useNssData();
  const [filter, setFilter] = useState<string>("All");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const categories = ["All", "Forms", "Manuals", "Reports", "Guidelines", "Posters"];

  const filteredDownloads = downloads.filter((item) => {
    if (filter === "All") return true;
    return item.category === filter;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Download started: ${title}`);
    }, 1500);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Resource Repository
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            Downloads & Documents
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Access registration forms, NSS manuals, posters, circulars, and standard guidelines authorized by the Ministry of Youth Affairs and Sports.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-y border-border py-4">
          <Filter className="h-4 w-4 text-muted-foreground mr-2 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                filter === cat 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Downloads List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredDownloads.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-card border border-border rounded-xl p-5 flex items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex gap-3 text-[10px] text-muted-foreground font-semibold mt-1">
                      <span className="uppercase bg-muted px-2 py-0.5 rounded text-primary">{item.category}</span>
                      <span>&bull;</span>
                      <span>Format: {item.fileType}</span>
                      <span>&bull;</span>
                      <span>Size: {item.fileSize}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(item.id, item.title)}
                  disabled={downloadingId !== null}
                  className="rounded-lg bg-primary/10 p-2.5 text-primary hover:bg-primary hover:text-white transition-all flex-shrink-0 disabled:opacity-50 cursor-pointer"
                  title="Download File"
                >
                  {downloadingId === item.id ? (
                    <div className="h-4 w-4 rounded-full border-2 border-t-white border-primary/30 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredDownloads.length === 0 && (
            <div className="text-center py-16 bg-muted/30 border border-dashed border-border rounded-2xl space-y-3">
              <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="font-bold text-sm">No Documents Registered</h3>
              <p className="text-xs text-muted-foreground">There are currently no document links configured in this category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
