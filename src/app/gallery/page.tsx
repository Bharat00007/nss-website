"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Eye, Calendar, MapPin, ImageIcon } from "lucide-react";
import useNssData from "@/hooks/use-nss-data";
import CustomLightbox from "@/components/custom-lightbox";

export default function GalleryPage() {
  const { pastEvents: gallery } = useNssData();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Filter gallery items
  const filteredGallery = useMemo(() => {
    if (activeCategory === "All") return gallery;
    if (activeCategory === "Camp") {
      return gallery.filter((item) => {
        const title = item.title.toLowerCase();
        const desc = item.description.toLowerCase();
        const cat = item.category.toLowerCase();
        const id = item.id.toLowerCase();
        return title.includes("camp") || desc.includes("camp") || cat.includes("camp") || id.includes("camp");
      });
    }
    return gallery;
  }, [gallery, activeCategory]);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Visual Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            Official Unit Gallery
          </h1>
          <p className="text-sm text-muted-foreground">
            Visual documentation of cleanliness drives, national events, blood donations, and special camps organized by JIT NSS volunteers.
          </p>
        </div>

        {/* Filters & Academic Year Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-y border-border py-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </span>
            {["All", "Camp"].map((cat) => (
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

          {/* Academic Year Label */}
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <span className="rounded-full bg-accent text-white shadow-md px-4 py-1.5 text-xs font-bold">
              Years: 2025-2026
            </span>
          </div>
        </div>

        {/* Masonry Image Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="break-inside-avoid bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[350px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="space-y-1.5">
                    <span className="text-[8px] uppercase font-extrabold tracking-widest bg-accent px-2 py-0.5 rounded-full shadow">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-sm leading-snug drop-shadow">{item.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{item.description}</p>
                    
                    <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] font-semibold text-slate-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-accent" />
                        {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-accent" />
                        {item.location.split(",")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-16 bg-muted/30 border border-dashed border-border rounded-2xl space-y-3">
            <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-sm">No Photographs Found</h3>
            <p className="text-xs text-muted-foreground">There are currently no gallery uploads in this configuration.</p>
          </div>
        )}

      </div>

      <CustomLightbox
        images={filteredGallery.map(img => ({
          ...img,
          category: img.category
        }))}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />

    </div>
  );
}
