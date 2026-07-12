"use client";

import React, { useState } from "react";
import { Tent, CheckCircle, MapPin, Sparkles, FileDown, Clock, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import useNssData from "@/hooks/use-nss-data";

export default function CampReportsPage() {
  const { campTimeline, adoptedVillages } = useNssData();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const triggerDownloadSimulate = (id: string, villageName: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Download started: Special_NSS_Camp_Report_${villageName}.pdf\n(Simulated PDF Archive)`);
    }, 1500);
  };
  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Special Camps
          </span>
          <h1 className="text-4xl font-extrabold text-foreground">
            Special NSS Camp
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Review the community projects and village development campaigns coordinated during our residential camps.
          </p>
        </div>

        {/* Upcoming Camp Feature Card */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Rural Deployment</span>
            <span className="text-xs font-bold text-accent">Registration Open</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {adoptedVillages.map((village) => (
              <div 
                key={village.id}
                className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-muted p-2.5 rounded-xl">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary mt-2">
                    {village.name} Village
                  </h3>
                </div>
                  
                <div className="space-y-3 mt-6">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Village Focus Initiatives:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {village.initiatives.map((init, index) => (
                      <span key={index} className="bg-muted text-foreground text-[9px] font-bold px-2.5 py-1 rounded">
                        {init}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-muted mt-6">
                  <button 
                    onClick={() => alert("Camp registration forms will be distributed by your Department NSS Coordinator.")}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary/90 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    Request Volunteer Slot <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Camp Archives & Documentation */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Process Flow</span>
            <h2 className="text-2xl font-extrabold text-foreground">Camp Selection & Deployment Protocol</h2>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Our rural camps are planned around a structured community engagement checklist.
            </p>
          </div>

          <div className="relative border-l border-border max-w-2xl mx-auto pl-6 sm:pl-8 space-y-8 py-4">
            {campTimeline.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Connector point */}
                <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 h-6 w-6 rounded-full border-4 border-background bg-accent flex items-center justify-center z-10" />
                
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-1 hover:border-primary transition-colors">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-widest block">
                    Step 0{index + 1}
                  </span>
                  <h3 className="font-extrabold text-sm text-foreground leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
