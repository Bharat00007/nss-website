"use client";

import React from "react";
import { Award, UserCheck, ShieldCheck, Trophy, Sparkles, Star } from "lucide-react";
import { STUDENT_BENEFITS } from "@/lib/data/db";

export default function AchievementsPage() {
  // RTMNU specific incentive markings
  const incentiveMarks = STUDENT_BENEFITS.filter(b => b.text.includes("incentive marks"));
  const skillsBenefits = STUDENT_BENEFITS.filter(b => !b.text.includes("incentive marks"));

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Unit Honors
          </span>
          <h1 className="text-4xl font-extrabold text-foreground">
            Recognitions & Incentives
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Review official Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU) incentives and institutional merits of the JIT NSS Unit.
          </p>
        </div>

        {/* Counter Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-muted dark:bg-slate-900 text-foreground dark:text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e]/5 to-[#e8eaf6]/25 dark:from-primary/95 dark:via-[#0c1220] dark:to-[#060b19] opacity-95 z-0" />
          
          <div className="relative z-10 text-center space-y-2 border-b sm:border-b-0 sm:border-r border-border dark:border-white/10 pb-4 sm:pb-0">
            <Trophy className="h-8 w-8 text-accent mx-auto" />
            <h3 className="text-2xl font-extrabold text-foreground dark:text-white">Registered</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground dark:text-slate-300">Under RTMNU Nagpur</p>
          </div>
          <div className="relative z-10 text-center space-y-2 border-b sm:border-b-0 sm:border-r border-border dark:border-white/10 pb-4 sm:pb-0">
            <UserCheck className="h-8 w-8 text-accent mx-auto" />
            <h3 className="text-2xl font-extrabold text-foreground dark:text-white">100 Students</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground dark:text-slate-300">Official Volunteer Strength</p>
          </div>
          <div className="relative z-10 text-center space-y-2">
            <ShieldCheck className="h-8 w-8 text-accent mx-auto" />
            <h3 className="text-2xl font-extrabold text-foreground dark:text-white">Autonomous</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground dark:text-slate-300">Jhulelal Institute of Technology</p>
          </div>
        </div>

        {/* Incentive Marks Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Incentives</span>
            <h2 className="text-2xl font-extrabold text-foreground">University Incentive Marks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {incentiveMarks.map((m, i) => (
              <div 
                key={m.id}
                className="bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-foreground leading-snug">
                    {i === 0 ? "Regular Participation Marks" : "National Level Marks"}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {m.text}
                  </p>
                </div>
                
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mt-6">
                  Endorsed by RTMNU Nagpur
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Other Benefits */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Self-Growth</span>
            <h2 className="text-2xl font-extrabold text-foreground">Volunteer Skill Merit</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsBenefits.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-xl p-4 flex gap-3 items-start">
                <Star className="h-4.5 w-4.5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
