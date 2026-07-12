"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Flag, Heart, Users, CheckCircle, Shield,
  Calendar, Landmark, BookOpen, Globe, Sun, Star, Award
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: "easeOut" as const }
});

export default function AboutNssPage() {
  const keyFacts = [
    {
      icon: Calendar,
      label: "Founded",
      value: "1969",
      sub: "Gandhi Centenary Year"
    },
    {
      icon: Landmark,
      label: "Launched by",
      value: "Dr. V.K.R.V. Rao",
      sub: "Union Education Minister"
    },
    {
      icon: Calendar,
      label: "NSS Day",
      value: "September 24",
      sub: "Celebrated annually"
    },
    {
      icon: Globe,
      label: "Reach Today",
      value: "3.8 Million+",
      sub: "Student Volunteers nationwide"
    },
    {
      icon: BookOpen,
      label: "Universities",
      value: "198+",
      sub: "& 41 (+2) Councils"
    },
    {
      icon: Star,
      label: "Institutions",
      value: "16,659+",
      sub: "Adopted institutions"
    }
  ];

  const mottoRepresentations = [
    { title: "Selfless Service", desc: "Upholding volunteer actions above personal priorities to address societal needs.", icon: Heart },
    { title: "Democratic Living", desc: "Fostering inclusive participation, collective decisions, and community leadership.", icon: Users },
    { title: "Empathy", desc: "Developing a deep, compassionate understanding of different social realities.", icon: Shield },
    { title: "Responsibility", desc: "Taking proactive charge of civic duties and public infrastructure maintenance.", icon: CheckCircle },
    { title: "Community Welfare", desc: "Nurturing commitment toward the progress of rural villages and underprivileged sections.", icon: Flag }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Banner */}
      <div className="relative bg-[#0B1F4D] overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#112a66] to-[#060f28] pointer-events-none" />
        <div className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-contain pointer-events-none" style={{ backgroundImage: "url('/images/logos/nss.png')" }} />
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block text-[10px] uppercase font-extrabold tracking-widest text-accent bg-accent/10 border border-accent/25 px-4 py-1.5 rounded-full">
            National Service Scheme
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Not Me But You
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The NSS <span className="text-accent">Movement</span> aims to instill the idea of social welfare in students, providing service to society without bias.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* At a Glance Banner */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent">At a Glance</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Established", value: "1969", sub: "Centenary of Mahatma Gandhi" },
              { label: "Volunteers", value: "3.8M+", sub: "Active nationwide across colleges" },
              { label: "Ministry", value: "MYAS", sub: "Govt. of India Initiative" },
              { label: "JIT Unit", value: "2013", sub: "Active since establishment" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/50 transition-colors group"
              >
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{stat.label}</p>
                  <p className="text-lg font-extrabold text-foreground leading-tight">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Origin & Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent">Origin & Purpose</span>
            <h2 className="text-2xl font-extrabold text-foreground">A Movement Born from Freedom</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Launched on September 24, 1969 &mdash; the birth centenary year of Mahatma Gandhi &mdash; NSS was initiated by the Union Ministry of Youth Affairs & Sports with the core mandate of developing student youth through community service.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              At JIT Nagpur, the NSS Unit transforms engineering students into empathetic leaders by placing them directly in rural communities, government schools, and public health campaigns.
            </p>
          </div>
          <div className="bg-card dark:bg-slate-900 rounded-2xl p-6 border border-border dark:border-slate-800 space-y-4 shadow-xl">
            <p className="text-[10px] uppercase font-bold tracking-widest text-accent">The Founding Philosophy</p>
            <blockquote className="text-sm italic text-foreground/80 dark:text-slate-300 leading-relaxed border-l-2 border-accent pl-4">
              &ldquo;The best way to find yourself is to lose yourself in the service of others.&rdquo;
            </blockquote>
            <p className="text-[10px] text-muted-foreground dark:text-slate-400 font-bold">&mdash; Mahatma Gandhi</p>
          </div>
        </div>

        {/* Motto Section */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Core Motto</span>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              &ldquo;Not Me, But You&rdquo;
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Reflecting that an NSS volunteer places <strong>community before self</strong> — 
              the welfare of society above personal gain.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Users, title: "Democratic Living", desc: "Practicing mutual respect and shared decision-making in diverse groups." },
              { icon: Heart, title: "Selfless Service", desc: "Prioritizing the needs of the community and vulnerable populations above all." },
              { icon: Award, title: "National Integration", desc: "Building bridges across cultural, linguistic, and socioeconomic divides." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-accent/40 transition-colors group"
              >
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground mb-1">{item.title}</h3>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The NSS Symbol & Badge */}
        <div className="bg-card dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-border dark:border-slate-800 space-y-6 text-foreground dark:text-white transition-colors duration-300">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-accent" />
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent">The NSS Symbol</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 text-xs text-muted-foreground dark:text-slate-300 leading-relaxed">
              <p>
                The symbol of the National Service Scheme is based on the giant Rath Wheel of the world-famous Konark Sun Temple (Orissa, India). The wheel signifies the continuous cycle of creation and preservation, indicating the steady striving of the youth for social transformation and upliftment.
              </p>
              <p>
                The 8 bars in the wheel represent the 24 hours of a day, reminding the wearer of their readiness to serve the nation round the clock. The red color indicates that the volunteer is full of blood i.e., lively, active, energetic and full of high spirit. The navy blue color indicates the cosmos, of which the NSS is a tiny part, ready to contribute its share for the welfare of mankind.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-44 w-44 rounded-full bg-accent/10 animate-pulse" />
                <img src="/images/logos/nss.png" alt="NSS Symbol" className="h-36 w-36 object-contain relative z-10 drop-shadow-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Key Dates & Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 space-y-3">
            <Calendar className="h-6 w-6 text-accent" />
            <div>
              <p className="text-3xl font-extrabold text-accent">September 24</p>
              <p className="text-xs font-bold text-foreground">NSS Day</p>
              <p className="text-xs text-muted-foreground mt-1">Observed annually across all colleges and universities in India with community service pledges and drives.</p>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-3">
            <Globe className="h-6 w-6 text-primary" />
            <div>
              <p className="text-3xl font-extrabold text-primary">3.8 Million+</p>
              <p className="text-xs font-bold text-foreground">Total Volunteers Nationwide</p>
              <p className="text-xs text-muted-foreground mt-1">Making NSS one of the largest structured youth volunteer networks on the planet.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
