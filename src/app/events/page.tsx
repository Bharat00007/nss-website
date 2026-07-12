"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, CheckCircle, Hourglass, CalendarDays, Inbox } from "lucide-react";
import useNssData from "@/hooks/use-nss-data";

export default function EventsPage() {
  const { pastEvents, upcomingObservances } = useNssData();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Official Schedule
          </span>
          <h1 className="text-4xl font-extrabold text-foreground">
            Events & Observances
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Explore our annual calendar of national observances and review records of completed campaigns.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center border-b border-border">
          <div className="flex gap-6">
            <button
              onClick={() => setTab("upcoming")}
              className={`pb-4 text-sm font-bold tracking-wider relative transition-colors ${
                tab === "upcoming" ? "text-primary border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Hourglass className="h-4 w-4" />
                Annual Observances ({upcomingObservances.length})
              </span>
            </button>
            <button
              onClick={() => setTab("past")}
              className={`pb-4 text-sm font-bold tracking-wider relative transition-colors ${
                tab === "past" ? "text-primary border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" />
                Completed Campaigns ({pastEvents.length})
              </span>
            </button>
          </div>
        </div>

        {/* Events layout */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            
            {/* UPCOMING OBSERVANCES TAB (Annual Calendar) */}
            {tab === "upcoming" && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {upcomingObservances.map((obs) => (
                  <div 
                    key={obs.id}
                    className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-primary/15 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Recurring Observance
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-accent">
                        <CalendarDays className="h-4 w-4" />
                        <span>Every {obs.date}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-foreground">{obs.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{obs.description}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* PAST COMPLETED CAMPAIGNS TAB */}
            {tab === "past" && (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-6"
              >
                {pastEvents.map((evt) => (
                  <div 
                    key={evt.id} 
                    className="bg-card border border-border rounded-2xl p-5 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    {/* Event image */}
                    <div className="w-full md:w-44 h-40 bg-slate-900 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={evt.imageUrl} 
                        alt={evt.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Event details */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                          <span className="bg-primary/15 text-primary px-2.5 py-0.5 rounded-full font-bold">
                            {evt.category}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-primary leading-tight">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-muted flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-4 text-[10px] text-muted-foreground font-semibold">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-accent" />
                            {new Date(evt.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-accent" />
                            {evt.location}
                          </span>
                        </div>

                        <span className="text-[10px] font-bold text-primary flex items-center gap-1 uppercase">
                          <CheckCircle className="h-3.5 w-3.5 text-accent" />
                          Officially Documented
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {pastEvents.length === 0 && (
                  <div className="text-center py-16 bg-muted/30 border border-dashed border-border rounded-2xl space-y-3">
                    <Inbox className="h-10 w-10 text-muted-foreground mx-auto" />
                    <h3 className="font-bold text-sm">No Events Listed</h3>
                    <p className="text-xs text-muted-foreground">There are currently no past events registered.</p>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
