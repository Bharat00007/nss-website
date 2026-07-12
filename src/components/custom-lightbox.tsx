"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

interface LightboxImage {
  id: string;
  title: string;
  imageUrl: string;
  date?: string;
  location?: string;
  category?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function CustomLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  
  // Listen for keyboard arrow keys and escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  const activeImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && activeImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-55 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Nav Controls */}
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between z-50 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="pointer-events-auto rounded-full bg-white/10 p-3 text-white hover:bg-white/20 hover:scale-110 active:scale-90 transition-all focus:outline-none disabled:opacity-20"
              aria-label="Previous Image"
              disabled={images.length <= 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="pointer-events-auto rounded-full bg-white/10 p-3 text-white hover:bg-white/20 hover:scale-110 active:scale-90 transition-all focus:outline-none disabled:opacity-20"
              aria-label="Next Image"
              disabled={images.length <= 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Main Visual Display */}
          <div 
            className="relative flex flex-1 items-center justify-center max-w-5xl w-full h-[65vh] md:h-[75vh]"
            onClick={onClose}
          >
            <motion.div
              key={activeImage.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-h-full max-w-full overflow-hidden rounded-lg shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Stop closing
            >
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="max-h-[65vh] md:max-h-[75vh] object-contain rounded-md"
              />
            </motion.div>
          </div>

          {/* Description Overlay details */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-full max-w-3xl text-center text-white mt-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md"
          >
            {activeImage.category && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-nss-gold bg-white/10 rounded-full px-3 py-1">
                {activeImage.category}
              </span>
            )}
            <h3 className="text-lg font-bold mt-2">{activeImage.title}</h3>
            
            <div className="flex justify-center items-center gap-6 mt-2 text-xs text-slate-400">
              {activeImage.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(activeImage.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </div>
              )}
              {activeImage.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {activeImage.location}
                </div>
              )}
            </div>
            
            <div className="mt-3 text-[10px] text-slate-500">
              Image {currentIndex + 1} of {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
