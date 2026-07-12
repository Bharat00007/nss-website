"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, HelpCircle, Sparkles, X, Info } from "lucide-react";
import useNssData from "@/hooks/use-nss-data";
import { Activity } from "@/lib/data/db";

export default function ActivitiesPage() {
  const { activities } = useNssData();
  const [filter, setFilter] = useState<string>("All");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const categories = ["All", "Cleanliness", "Environment", "Health", "Awareness", "Education", "Social Welfare", "Events", "Camps"];

  const filteredActivities = activities.filter(act => {
    if (filter === "All") return true;
    return act.category === filter;
  });

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Voluntary Social Work
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            Social Service Activities
          </h1>
          <p className="text-sm text-muted-foreground">
            Official social welfare activities undertaken by the student volunteers of the JIT NSS Unit.
          </p>
        </div>

        {/* Categories Bar */}
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

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((act) => (
              <motion.div
                layout
                key={act.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div className="relative h-56 bg-slate-900 overflow-hidden">
                  <img 
                    src={act.imageUrl} 
                    alt={act.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-primary/95 text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow">
                    {act.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-foreground group-hover:text-primary leading-snug">
                      {act.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-muted">
                    <button
                      onClick={() => setSelectedActivity(act)}
                      className="w-full inline-flex items-center justify-center gap-1 rounded-lg bg-muted py-2.5 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                    >
                      <Info className="h-4 w-4" />
                      View Focus Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-16 bg-muted/30 border border-dashed border-border rounded-2xl space-y-3">
            <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-sm">No Activities Found</h3>
            <p className="text-xs text-muted-foreground">There are currently no activities registered in this specific category.</p>
          </div>
        )}

      </div>

      {/* Details Dialog Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-card border border-border w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 bg-slate-900">
                <img 
                  src={selectedActivity.imageUrl} 
                  alt={selectedActivity.title} 
                  className="w-full h-full object-cover opacity-85"
                />
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[9px] uppercase font-bold tracking-widest bg-accent px-2.5 py-0.5 rounded-full shadow">
                    {selectedActivity.category}
                  </span>
                  <h3 className="text-lg font-bold mt-1.5 drop-shadow-md">{selectedActivity.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">{selectedActivity.description}</p>
                <div className="bg-muted/50 p-4 rounded-xl flex items-start gap-2.5 text-[10px] text-muted-foreground font-semibold">
                  <Sparkles className="h-4.5 w-4.5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Conducted in compliance with Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU) guidelines for the regular NSS activities curriculum.</span>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="rounded-lg bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    Close Focus View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
