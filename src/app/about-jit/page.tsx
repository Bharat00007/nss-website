"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  MapPin, 
  TreePine, 
  Megaphone, 
  Wind, // Using Wind as a stand-in for broom/cleanliness
  Mail, 
  Briefcase 
} from "lucide-react";

// --- Custom Animated Counter Component ---
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-extrabold text-foreground">
      {count}{suffix}
    </span>
  );
};

// --- Reusable Reveal Wrapper Component ---
const RevealSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
    >
      {children}
    </motion.div>
  );
};

export default function AboutJitPage() {
  
  // Data definitions
  const villages = [
    { name: "Gumthala", sarpanch: "Shri. Shibiraj Thakre" },
    { name: "Gumthi", sarpanch: "Smt. Seema More" },
    { name: "Bailwada", sarpanch: "Smt. Nikita Shete" },
    { name: "Lonara", sarpanch: "Shri. Rajendra Dhepe" },
    { name: "Chakkikhapa", sarpanch: "Shri. Rajendra Dhepe" },
  ];

  const specialCamps = [
    { year: "2025", location: "Gumthi" },
    { year: "2024", location: "Gumthala" },
    { year: "2023", location: "Lonara" },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground py-16 overflow-x-hidden relative">
      
      {/* Background radial mesh gradient matches other pages */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background pointer-events-none z-0" />
 
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight uppercase font-heading"
          >
            Jhulelal Institute of Technology
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-accent font-bold tracking-widest uppercase text-sm sm:text-base"
          >
            NSS Unit Information
          </motion.p>
        </div>
 
        {/* 1. JIT NSS UNIT INFORMATION */}
        <RevealSection>
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-wider font-heading">JIT NSS Unit Information</h2>
              <div className="h-1 w-20 bg-accent mx-auto mt-3 rounded-full" />
            </div>
            
            <div className="max-w-sm mx-auto">
              
              {/* Card: Prof. Rani Rewatkar */}
              <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 text-center shadow-md relative overflow-hidden group hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-24 w-24 mx-auto rounded-full border-2 border-accent/25 overflow-hidden bg-muted flex items-center justify-center shadow-sm shrink-0">
                    <img 
                      src="https://ui-avatars.com/api/?name=Rani+Rewatkar&background=0d2b27&color=fff&size=256" 
                      alt="Prof. Rani Rewatkar" 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground">Prof. Rani Rewatkar</h3>
                    <p className="text-xs font-semibold text-accent uppercase tracking-wider flex items-center justify-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" /> NSS Program Officer
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 mt-6 border-t border-border/50">
                  <a 
                    href="mailto:r.rewatkar@jitnagpur.edu.in" 
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-muted/45 hover:bg-muted/70 px-4 py-2 rounded-full border border-border/60"
                  >
                    <Mail className="h-3.5 w-3.5" /> r.rewatkar@jitnagpur.edu.in
                  </a>
                </div>
              </div>
 
            </div>
          </div>
        </RevealSection>
 
        {/* 2. ADOPTED VILLAGES */}
        <RevealSection>
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-wider font-heading">Adopted Villages</h2>
              <p className="text-sm text-muted-foreground mt-2">Serving 5 distinct communities through dedicated rural development initiatives.</p>
              <div className="h-1 w-20 bg-accent mx-auto mt-4 rounded-full" />
            </div>
 
            <div className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto">
              {villages.map((village, idx) => (
                <div 
                  key={idx} 
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:border-accent/30 hover:shadow-md transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] min-w-[280px]"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-foreground">{village.name}</h3>
                      <div className="mt-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-0.5">Sarpanch</span>
                        <span className="text-sm text-accent font-bold">{village.sarpanch}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
 
        {/* 3. SPECIAL CAMPS TIMELINE */}
        <RevealSection>
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-wider font-heading">7-Day Special Camps</h2>
              <p className="text-sm text-muted-foreground mt-2">Annual residential camps focusing on holistic village transformation.</p>
              <div className="h-1 w-20 bg-accent mx-auto mt-4 rounded-full" />
            </div>
 
            <div className="max-w-2xl mx-auto relative pl-6 sm:pl-0">
              {/* Vertical line connecting nodes */}
              <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 bg-border sm:-translate-x-1/2" />
              
              <div className="space-y-8 relative">
                {specialCamps.map((camp, idx) => (
                  <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
                    
                    {/* Center Dot */}
                    <div className="absolute left-0 sm:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background sm:-translate-x-1/2 z-10 shadow-[0_0_10px_rgba(200,16,46,0.3)]" />
                    
                    {/* Content Box */}
                    <div className={`w-full sm:w-1/2 ${idx % 2 === 0 ? "pl-10 sm:pl-10 sm:pr-0" : "pl-10 sm:pr-10 sm:pl-0 sm:text-right"}`}>
                      <div className="bg-card border border-border rounded-2xl p-5 hover:border-accent/30 transition-colors inline-block min-w-[200px] shadow-sm">
                        <span className="text-2xl font-black text-foreground">{camp.year}</span>
                        <div className="flex items-center gap-1.5 mt-1 text-accent font-bold justify-start sm:justify-inherit">
                          <MapPin className="h-4 w-4" /> {camp.location}
                        </div>
                      </div>
                    </div>
 
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
 
        {/* 4. KEY ACHIEVEMENTS (Tenure 2025) */}
        <RevealSection>
          <div className="space-y-10 pb-12">
            <div className="text-center">
              <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-4 inline-block font-bold">
                Tenure 2025
              </span>
              <h2 className="text-2xl font-extrabold text-foreground uppercase tracking-wider font-heading">Key Achievements</h2>
              <div className="h-1 w-20 bg-accent mx-auto mt-4 rounded-full" />
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              <div className="bg-card border border-border rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-4 hover:border-accent/30 hover:shadow-md transition-all duration-300">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <TreePine className="h-7 w-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">
                  <AnimatedCounter end={100} suffix="+" />
                </h3>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Trees Planted</p>
              </div>
 
              <div className="bg-card border border-border rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-4 hover:border-accent/30 hover:shadow-md transition-all duration-300">
                <div className="h-14 w-14 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
                  <Wind className="h-7 w-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">
                  <AnimatedCounter end={3} suffix="+" />
                </h3>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Cleanliness Drives</p>
              </div>
 
              <div className="bg-card border border-border rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-4 hover:border-accent/30 hover:shadow-md transition-all duration-300">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <Megaphone className="h-7 w-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter">
                  Multiple
                </h3>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Awareness Campaigns</p>
              </div>
 
            </div>
          </div>
        </RevealSection>
 
      </div>
    </div>
  );
}
