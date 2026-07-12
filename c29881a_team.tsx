"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Sparkles, Shield, GraduationCap, Star, ArrowRight, Users, ChevronDown, ChevronUp } from "lucide-react";
import useNssData from "@/hooks/use-nss-data";

const CATEGORY_ORDER = ["Advisory", "Core Committee", "Junior Committee", "Executive Members"];

const CATEGORY_META: Record<string, { color: string; bg: string; border: string; desc: string }> = {
  "Advisory": {
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    desc: "Senior mentor guiding the unit with experience and strategic vision."
  },
  "Core Committee": {
    color: "text-nss-blue dark:text-blue-400",
    bg: "bg-nss-blue/10",
    border: "border-nss-blue/25",
    desc: "Core leadership driving all major campaigns and decisions of the NSS Unit."
  },
  "Junior Committee": {
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    desc: "Rising leaders managing operations, outreach, design, and documentation."
  },
  "Executive Members": {
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/25",
    desc: "Active volunteers powering every event and community service drive."
  }
};

const FACULTY_CONFIG: Record<string, { gradient: string; border: string; accent: string; icon: string }> = {
  "Dean Student Development": {
    gradient: "from-blue-600 to-indigo-700",
    border: "border-blue-500/30",
    accent: "text-blue-400",
    icon: "grad",
  },
  "NSS Programme Officer": {
    gradient: "from-rose-600 to-red-700",
    border: "border-rose-500/30",
    accent: "text-rose-400",
    icon: "shield",
  },
};

export default function TeamPage() {
  const { leadership, committeeMembers } = useNssData();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Advisory": true,
    "Core Committee": true,
    "Junior Committee": false,
    "Executive Members": false,
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof committeeMembers>>((acc, cat) => {
    acc[cat] = committeeMembers.filter(m => m.category === cat);
    return acc;
  }, {});

  return (
    <div className="py-14 bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ΓöÇΓöÇ Page Header ΓöÇΓöÇ */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[10px] uppercase font-extrabold tracking-widest text-nss-blue bg-nss-blue/10 border border-nss-blue/20 px-4 py-1.5 rounded-full dark:text-blue-400"
          >
            NSS JIT 2026ΓÇô27
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight"
          >
            Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            Meet the faculty officers and the official student committee driving every campaign, camp, and community initiative of JIT NSS Unit.
          </motion.p>
        </div>

        {/* ΓöÇΓöÇ Faculty Members ΓöÇΓöÇ */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-muted-foreground px-3">Faculty Members</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {leadership.map((member, idx) => {
              const cfg = FACULTY_CONFIG[member.position] ?? {
                gradient: "from-slate-600 to-slate-700",
                border: "border-border",
                accent: "text-muted-foreground",
                icon: "users",
              };
              const initials = member.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("");

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * idx }}
                  className={`relative rounded-3xl border ${cfg.border} bg-card shadow-lg overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.gradient}`} />
                  <div className={`absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br ${cfg.gradient} opacity-[0.08] blur-3xl pointer-events-none group-hover:opacity-[0.15] transition-opacity`} />

                  <div className="p-7 space-y-5">
                    <div className="flex items-center gap-5">
                      <div className={`relative flex-shrink-0 h-[76px] w-[76px] rounded-2xl bg-gradient-to-br ${cfg.gradient} p-0.5 shadow-md`}>
                        <div className="h-full w-full rounded-[14px] bg-card flex items-center justify-center overflow-hidden">
                          {member.photo ? (
                            <img src={member.photo} alt={member.name} className="h-full w-full object-cover rounded-[14px]" />
                          ) : (
                            <span className="text-2xl font-black text-foreground select-none">{initials}</span>
                          )}
                        </div>
                        <div className={`absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-full bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow`}>
                          <Star className="h-2.5 w-2.5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-[15px] text-foreground leading-snug">{member.name}</h3>
                        <div className={`inline-flex items-center gap-1.5 mt-1.5 text-[10px] font-bold uppercase tracking-wider ${cfg.accent}`}>
                          {cfg.icon === "grad" && <GraduationCap className="h-3.5 w-3.5" />}
                          {cfg.icon === "shield" && <Shield className="h-3.5 w-3.5" />}
                          {cfg.icon === "users" && <Users className="h-3.5 w-3.5" />}
                          <span>{member.position}</span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                    {member.bio && (
                      <p className="text-xs text-muted-foreground leading-relaxed italic">&ldquo;{member.bio}&rdquo;</p>
                    )}

                    {member.email && (
                      <a href={`mailto:${member.email}`} className="flex items-center gap-2.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors group/mail">
                        <span className={`h-7 w-7 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <Mail className="h-3.5 w-3.5 text-white" />
                        </span>
                        <span className="truncate group-hover/mail:underline underline-offset-2">{member.email}</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ΓöÇΓöÇ Student Committee ΓöÇΓöÇ */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-muted-foreground px-3">Student Committee 2026ΓÇô27</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-6">
            {CATEGORY_ORDER.map((cat) => {
              const members = grouped[cat] ?? [];
              if (members.length === 0) return null;
              const meta = CATEGORY_META[cat];
              const isOpen = expandedCategories[cat];

              return (
                <div key={cat} className={`rounded-2xl border ${meta.border} overflow-hidden`}>
                  {/* Category header */}
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center h-7 w-7 rounded-lg ${meta.bg} ${meta.color}`}>
                        <Users className="h-3.5 w-3.5" />
                      </span>
                      <div className="text-left">
                        <p className={`text-sm font-extrabold ${meta.color}`}>{cat}</p>
                        <p className="text-[10px] text-muted-foreground font-semibold">{members.length} member{members.length > 1 ? "s" : ""} ┬╖ {meta.desc}</p>
                      </div>
                    </div>
                    <div className={`h-6 w-6 rounded-full ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                      {isOpen ? <ChevronUp className={`h-3.5 w-3.5 ${meta.color}`} /> : <ChevronDown className={`h-3.5 w-3.5 ${meta.color}`} />}
                    </div>
                  </button>

                  {/* Members grid */}
                  {isOpen && (
                    <div className="p-4 bg-background border-t border-border">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {members.map((member, i) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className={`bg-card rounded-xl border ${meta.border} p-4 space-y-2 hover:shadow-sm transition-shadow group`}
                          >
                            {/* Initials + name */}
                            <div className="flex items-center gap-3">
                              <div className={`h-9 w-9 rounded-xl ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                                <span className={`text-xs font-black ${meta.color}`}>
                                  {member.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-sm text-foreground leading-tight truncate">{member.name}</p>
                                <p className={`text-[10px] font-semibold uppercase tracking-wide ${meta.color} leading-tight`}>{member.position}</p>
                              </div>
                            </div>
                            {/* Description */}
                            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 pl-12">{member.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ΓöÇΓöÇ Committee Reveal CTA ΓöÇΓöÇ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,_#1e3a6e_0%,_#0b132b_65%,_#080d1a_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_#7f1d1d30_0%,_transparent_55%)]" />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none hidden lg:block">
            <img src="/images/logos/nss.png" alt="" className="h-52 w-52 object-contain" />
          </div>

          <div className="relative z-10 px-8 py-12 sm:px-12 flex flex-col sm:flex-row items-center gap-8 text-white">
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 bg-nss-gold/20 text-nss-gold border border-nss-gold/30 text-[9px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Official Appointment Letters
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Get Your Appointment<br /><span className="text-nss-gold">Letter & Certificate</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Search your name to receive a personalised animated appointment reveal and download your official NSS appointment card.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                  <p className="text-xl font-extrabold text-nss-gold">63</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Members</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                  <p className="text-xl font-extrabold text-nss-gold">4</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Tiers</p>
                </div>
              </div>
              <Link
                href="/core-committee"
                className="w-full rounded-full bg-nss-red px-6 py-3 text-xs font-extrabold text-white shadow-lg hover:bg-red-700 hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
              >
                Enter Committee Reveal
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
