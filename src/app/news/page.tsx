"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, FileText, Bell, Inbox, Filter, Clock, ExternalLink } from "lucide-react";
import useNssData from "@/hooks/use-nss-data";

export default function NewsPage() {
  const { news } = useNssData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Circular", "Announcement", "Camp", "Recruitment"];

  // Filter news
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [news, searchTerm, activeCategory]);

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Dispatches
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            News & Notifications
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Stay updated with meeting circulars, registration schedules, residential camp postings, and achievements released by the JIT NSS Unit.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search circulars or news contents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 pr-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 py-2 border-t border-border pt-4">
            <Filter className="h-4 w-4 text-muted-foreground mr-2 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bulletins list */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {item.isFeatured && (
                  <div className="absolute top-0 right-0 bg-accent text-white text-[8px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-bl-lg shadow">
                    Urgent Bulletin
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                    <span className="bg-primary/15 text-primary px-2.5 py-0.5 rounded-full uppercase">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[11px]">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-foreground leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {item.fileUrl && (
                    <div className="pt-4 border-t border-muted flex items-center justify-between">
                      <button
                        onClick={() => alert(`Full article view for "${item.title}" will open when complete article text is published.`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        Read Full Dispatch <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredNews.length === 0 && (
            <div className="text-center py-16 bg-muted/30 border border-dashed border-border rounded-2xl space-y-3">
              <Inbox className="h-10 w-10 text-muted-foreground mx-auto" />
              <h3 className="font-bold text-sm">No Bulletins Found</h3>
              <p className="text-xs text-muted-foreground">Try refining your search queries or selecting a different notification category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
