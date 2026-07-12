"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tent, Eye, Target, Award, ArrowRight, Calendar, MapPin, X, Send, Check,
  Users, Trophy, TreePine, HeartHandshake, GraduationCap
} from "lucide-react";
import useNssData from "@/hooks/use-nss-data";
import { STUDENT_BENEFITS, MAJOR_CAMPAIGNS } from "@/lib/data/db";
import confetti from "canvas-confetti";

/* ─── Counter animation constants ─────────────────── */
const COUNTER_DURATION = 2000; // ms

/* ─── Konark Wheel SVG Background ─────────────────── */
function KonarkWheelBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Radial gradient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(26,35,126,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(92,107,192,0.06)_0%,transparent_70%)]" />
      
      {/* Concentric rings inspired by Konark Wheel */}
      <svg
        suppressHydrationWarning
        className="absolute top-1/2 right-[-10%] lg:right-[-5%] -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] text-primary"
        viewBox="0 0 800 800"
        fill="none"
        style={{ opacity: 0.06 }}
      >
        {/* Outer ring */}
        <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="2" />
        <circle cx="400" cy="400" r="340" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="250" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="140" stroke="currentColor" strokeWidth="2" />
        <circle cx="400" cy="400" r="80" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Radial spokes (24 spokes like the Ashoka Chakra) */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15) * (Math.PI / 180);
          const x1 = (400 + 80 * Math.cos(angle)).toFixed(2);
          const y1 = (400 + 80 * Math.sin(angle)).toFixed(2);
          const x2 = (400 + 380 * Math.cos(angle)).toFixed(2);
          const y2 = (400 + 380 * Math.sin(angle)).toFixed(2);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="currentColor"
              strokeWidth={i % 3 === 0 ? "1.5" : "0.75"}
            />
          );
        })}
        
        {/* Inner decorative dots */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const cx = (400 + 170 * Math.cos(angle)).toFixed(2);
          const cy = (400 + 170 * Math.sin(angle)).toFixed(2);
          return <circle key={`dot-${i}`} cx={cx} cy={cy} r="4" fill="currentColor" />;
        })}
      </svg>
      
      {/* Subtle top-left geometric accent */}
      <svg
        className="absolute top-[-5%] left-[-5%] w-[300px] h-[300px] text-primary hidden lg:block"
        viewBox="0 0 300 300"
        fill="none"
        style={{ opacity: 0.05 }}
      >
        <circle cx="150" cy="150" r="140" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="100" stroke="currentColor" strokeWidth="1" />
        <circle cx="150" cy="150" r="60" stroke="currentColor" strokeWidth="1" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={(150 + 60 * Math.cos(angle)).toFixed(2)} y1={(150 + 60 * Math.sin(angle)).toFixed(2)}
              x2={(150 + 140 * Math.cos(angle)).toFixed(2)} y2={(150 + 140 * Math.sin(angle)).toFixed(2)}
              stroke="currentColor" strokeWidth="0.75"
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Hero Stats Data ─────────────────────────────── */
const HERO_STATS = [
  { value: 100, suffix: "+", label: "Volunteers", icon: Users },
  { value: 50, suffix: "+", label: "Events Conducted", icon: Trophy },
  { value: 5, suffix: "", label: "Villages Adopted", icon: TreePine },
  { value: 10, suffix: "+", label: "Years of Service", icon: HeartHandshake },
  { value: 500, suffix: "+", label: "Lives Impacted", icon: GraduationCap },
];

const HERO_IMAGES = [
  "/images/gallery/awarness relly.jpeg",
  "/images/gallery/blood donation (2).jpeg",
  "/images/gallery/children day.jpeg",
  "/images/gallery/children learning nss.jpeg",
  "/images/gallery/cyber awarness program.jpeg",
  "/images/gallery/environment day.jpeg",
  "/images/gallery/harit maharashtra campaign.jpeg",
  "/images/gallery/indepedence day.jpeg",
  "/images/gallery/kargil day (2).jpeg",
  "/images/gallery/plant awarness with villagers.jpeg",
  "/images/gallery/republic day.jpeg",
];


export default function HomePage() {
  const { pastEvents, news, upcomingObservances } = useNssData();
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [participantForm, setParticipantForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "1st Year",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counterValues, setCounterValues] = useState<number[]>(HERO_STATS.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);

  // Hero image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer for stats counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Animated counter effect — drives all counters from a single RAF loop
  useEffect(() => {
    if (!statsVisible) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / COUNTER_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounterValues(HERO_STATS.map((s) => Math.floor(eased * s.value)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [statsVisible]);

  const latestPastEvents = pastEvents.slice(0, 3);
  const featuredNews = news.filter(item => item.isFeatured).slice(0, 2);

  /* ─── Stagger animation variants ────────────────── */
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <section className="relative min-h-[92vh] w-full overflow-hidden bg-background flex items-center justify-center">
        
        {/* Subtle background slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={heroImageIndex}
              src={HERO_IMAGES[heroImageIndex]}
              alt="JIT NSS Activities"
              className="w-full h-full object-cover filter brightness-[0.85] dark:brightness-[0.45]"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 0.48, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/70 to-background" />
        </div>

        {/* Konark Wheel Background Pattern */}
        <KonarkWheelBg />

        {/* Floating Info Cards for Visual Richness */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {/* Card 1: Left Top */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute left-[3%] top-[24%] hidden xl:flex items-center gap-3.5 p-4 rounded-2xl glass-card-premium animate-float shadow-lg pointer-events-auto max-w-[210px]"
          >
            <div className="h-10 w-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
              <Tent className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-extrabold text-foreground leading-tight">7-Day Special Camp</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">Annual Residential Camp</p>
            </div>
          </motion.div>

          {/* Card 2: Right Middle */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute right-[3%] top-[38%] hidden xl:flex items-center gap-3.5 p-4 rounded-2xl glass-card-premium animate-float-alt shadow-lg pointer-events-auto max-w-[210px]"
          >
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-extrabold text-foreground leading-tight">NAAC Accredited</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">Quality Education</p>
            </div>
          </motion.div>

          {/* Card 3: Left Bottom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute left-[5%] top-[56%] hidden xl:flex items-center gap-3.5 p-4 rounded-2xl glass-card-premium animate-float-slow shadow-lg pointer-events-auto max-w-[210px]"
          >
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-extrabold text-foreground leading-tight">Blood Donation Drive</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">Life-saving Initiative</p>
            </div>
          </motion.div>
        </div>

        {/* Subtle top gradient wash */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-secondary/40 to-transparent dark:from-secondary/20 pointer-events-none" />
        
        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-16 lg:pt-20 lg:pb-24 text-center space-y-8 flex flex-col items-center">
          
          {/* Official Logos Header */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pb-2"
          >
            <img 
              src="/images/logos/jit.png" 
              alt="JIT Logo" 
              className="h-12 sm:h-14 w-auto object-contain transition-all hover:scale-105"
            />
            <img 
              src="/images/logos/nss.png" 
              alt="NSS Logo" 
              className="h-12 sm:h-14 w-auto object-contain transition-all hover:scale-105"
            />
            <img 
              src="/images/logos/mybharatlogo_opt_2x.png" 
              alt="My Bharat Logo" 
              className="h-12 sm:h-14 w-auto object-contain transition-all hover:scale-105"
            />
            <img 
              src="/images/logos/naac.png" 
              alt="NAAC Logo" 
              className="h-12 sm:h-14 w-auto object-contain transition-all hover:scale-105"
            />
            <img 
              src="/images/logos/nba.png" 
              alt="NBA Logo" 
              className="h-12 sm:h-14 w-auto object-contain transition-all hover:scale-105"
            />
          </motion.div>

          {/* Branding Hierarchy */}
          <motion.div 
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <motion.h2 
              variants={fadeUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight"
            >
              Jhulelal Institute of Technology
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-1.5">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-primary uppercase tracking-wider">
                National Service Scheme (NSS) Unit
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground italic font-semibold tracking-wide">
                &ldquo;Not Me But You&rdquo;
              </p>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.15] tracking-tight max-w-3xl mx-auto font-heading">
              Serving Society. <span className="text-gradient-primary">Inspiring Leadership.</span> Building <span className="text-gradient-accent font-heading">Tomorrow.</span>
            </h1>
          </motion.div>

          {/* Mission Statement */}
          <motion.p 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium"
          >
            The JIT NSS Unit cultivates responsible citizens through community service, 
            rural development, and social outreach — empowering youth to lead with 
            compassion and build a stronger nation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              href="/core-committee"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Meet the Team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/activities"
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-primary/20 dark:border-primary/30 px-6 py-3.5 text-sm font-bold text-primary transition-all duration-200 hover:bg-primary/5 dark:hover:bg-primary/10 hover:-translate-y-0.5"
            >
              Explore Activities
              <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Statistics Strip */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-5 gap-6 pt-8 border-t border-border/60 w-full max-w-3xl"
          >
            {HERO_STATS.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div key={stat.label} className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <StatIcon className="h-4 w-4 text-accent" />
                    <p className="text-xl sm:text-2xl font-extrabold text-foreground tabular-nums">
                      {counterValues[i]}{stat.suffix}
                    </p>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground leading-tight">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Reveal Banner */}
      <section className="relative border-y border-border py-16 overflow-hidden bg-mesh-gradient-premium">
        <div className="absolute inset-0 bg-background/90 dark:bg-background/92 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl px-4 relative z-10 text-center space-y-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Meet the Core Committee — <span className="text-gradient-accent font-heading">Tenure 2026-27</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Discover the dedicated student leaders driving our vision forward this academic year through civic commitment and local action.
          </p>
          <div className="pt-2">
            <Link
              href="/core-committee"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all hover:scale-105 hover:-translate-y-0.5"
            >
              Meet the Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Cards */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Subtle decorative aurora blobs */}
        <div className="absolute top-1/3 left-10 h-64 w-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 h-72 w-72 rounded-full bg-accent/5 blur-[90px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest font-extrabold text-accent bg-accent/10 px-4 py-1.5 rounded-full">
              Core Ideology
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Vision & Mission</p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-semibold">
              We operate under a shared compass of community commitment, youth leadership, and active citizenship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="glass-card-premium rounded-3xl p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                <p className="text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-medium">
                  To nurture socially responsible, compassionate, and dynamic youth who actively contribute to nation-building through sustainable community service.
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-primary to-transparent rounded-full mt-6" />
            </div>

            {/* Mission */}
            <div className="glass-card-premium rounded-3xl p-8 sm:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                <ul className="space-y-3.5 text-sm text-slate-600 dark:text-muted-foreground list-disc pl-4 leading-relaxed font-medium">
                  <li>Develop students&apos; personalities through voluntary community service.</li>
                  <li>Promote volunteerism and responsible citizenship values.</li>
                  <li>Foster collaborative leadership, teamwork, and social commitment.</li>
                  <li>Encourage environmental sustainability and rural development.</li>
                </ul>
              </div>
              <div className="h-1 bg-gradient-to-r from-accent to-transparent rounded-full mt-6" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Announcements Banner */}
      {featuredNews.length > 0 && (
        <section className="py-16 bg-secondary/40 border-y border-border/85 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/5 blur-[70px] pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-start relative z-10">
            <div className="lg:w-1/3 space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full">
                Verified Notifications
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Official Announcements</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed font-medium">
                Get circulars and notifications released by the Jhulelal Institute of Technology NSS Unit office.
              </p>
              <div className="pt-2">
                <Link href="/news" className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline">
                  View All Announcements <ArrowRight className="h-3.5 w-3.5 text-accent" />
                </Link>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {featuredNews.map((item) => (
                <div key={item.id} className="bg-card border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-muted-foreground font-bold">
                      <span>{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className="bg-muted px-2.5 py-0.5 rounded text-primary">{item.category}</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground line-clamp-2 leading-snug">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-muted-foreground line-clamp-3 leading-relaxed">{item.content}</p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-muted">
                    <Link href="/news" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                      Read Circular <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Student Benefits */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4.5 py-1.5 rounded-full">
              Incentives
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Student Volunteer Benefits</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
              Earn academic credits, gain leadership credentials, and develop invaluable project management skills through local social service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STUDENT_BENEFITS.map((benefit) => (
              <div 
                key={benefit.id} 
                className="glass-card-premium rounded-3xl p-6 flex flex-col justify-between"
              >
                <div className="h-10 w-10 rounded-2xl bg-primary/15 dark:bg-primary/10 flex items-center justify-center text-primary dark:text-primary-foreground mb-4">
                  <Award className="h-5 w-5" />
                </div>
                <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-extrabold">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Major Campaigns Tags Panel */}
      <section className="relative py-20 overflow-hidden bg-mesh-gradient-premium border-y border-border">
        <div className="absolute inset-0 bg-background/90 dark:bg-background/92 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-bold text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 uppercase tracking-widest">
              Flagship Drives
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">Official Major Campaigns</h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-4xl mx-auto">
            {MAJOR_CAMPAIGNS.map((campaign, i) => (
              <span 
                key={i} 
                className="bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 rounded-full px-5 py-2.5 text-xs font-extrabold text-primary dark:text-slate-200 hover:bg-primary/20 dark:hover:bg-white/10 hover:scale-105 transition-all duration-200 cursor-default"
              >
                {campaign}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Past Events (Only verified with images) */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-4">
              <span className="text-xs font-extrabold text-accent bg-accent/10 px-4.5 py-1.5 rounded-full uppercase tracking-widest">
                Visual Records
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Recent Campaigns</h2>
            </div>
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-xs font-bold hover:bg-muted transition-all"
            >
              View Full Gallery
              <ArrowRight className="h-4 w-4 text-accent" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPastEvents.map((evt) => (
              <div key={evt.id} className="glass-card-premium rounded-3xl overflow-hidden shadow-sm flex flex-col group">
                <div className="relative h-60 bg-neutral-950 overflow-hidden">
                  <img 
                    src={evt.imageUrl} 
                    alt={evt.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow">
                    {evt.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base leading-snug group-hover:text-primary transition-colors">{evt.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-muted-foreground line-clamp-3 leading-relaxed">{evt.description}</p>
                  </div>
                  <div className="pt-3 border-t border-muted flex items-center justify-between text-[10px] text-slate-500 dark:text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      {new Date(evt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      {evt.location.split(",")[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Adopted Villages Interactive Section */}
      <section className="py-24 bg-secondary/35 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase font-extrabold text-accent bg-accent/10 px-4.5 py-1.5 rounded-full tracking-widest">
              Village Adoption
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Adopted Villages Focus</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground max-w-md mx-auto leading-relaxed font-medium">
              NSS volunteers are actively deployed in adopt village communities to run rural education, literacy, hygiene, and cleanliness actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-center">
            {[
              {
                name: "Gumthala",
                sarpanch: "Shibiraj Thakre",
                desc: "Coordinated rural surveys and community assemblies addressing digital transactions awareness and hygiene drives.",
                initiatives: ["Digital Literacy", "Rural Education", "Health & Hygiene", "Community Cleanliness"]
              },
              {
                name: "Gumthi",
                sarpanch: "Seema More",
                desc: "Site of the 2025 Special Residential Camp, focusing on healthcare access, youth mentoring, and public sanitation.",
                initiatives: ["Healthcare Access", "Youth Mentoring", "Public Sanitation", "Cleanliness Drive"]
              },
              {
                name: "Bailwada",
                sarpanch: "Nikita Shete",
                desc: "Targeted community development campaigns covering tree plantations, primary school tutoring, and social audits.",
                initiatives: ["Tree Plantation", "Primary School Tutoring", "Social Audits", "Environment Care"]
              },
              {
                name: "Lonara",
                sarpanch: "(TBD)",
                desc: "Focused rural outreach camp center where JIT NSS volunteers execute community cleaning, school paintings, and environment check-ups.",
                initiatives: ["Community Cleaning", "School Beautification", "Environment Check-ups", "Joy of Giving"]
              },
              {
                name: "Chakkikhapa",
                sarpanch: "Rajendra Dhepe",
                desc: "Ongoing rural empowerment program including health check-ups, waste management awareness, and street plays.",
                initiatives: ["Health Check-ups", "Waste Management", "Street Plays", "Rural Empowerment"]
              }
            ].map((village) => (
              <div key={village.name} className="glass-card-premium p-8 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/15 dark:bg-primary/10 rounded-2xl flex items-center justify-center text-primary dark:text-primary-foreground">
                      <Tent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{village.name} Village</h3>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-wider">Sarpanch: {village.sarpanch}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
                    {village.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-border space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-900 dark:text-slate-100 tracking-wide block">Key Initiatives:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {village.initiatives.map((init) => (
                      <span key={init} className="bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-foreground text-[9px] font-extrabold px-2.5 py-1 rounded-md">
                        {init}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Join Call Banner */}
      <section className="relative py-24 text-center overflow-hidden bg-mesh-gradient-premium border-y border-border">
        <div className="absolute inset-0 bg-background/90 dark:bg-background/92 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-primary/15 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-3xl px-4 space-y-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/15 border border-accent/20 px-4 py-1.5 rounded-full">
            Get Involved
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-none tracking-tight">Become an NSS Volunteer</h2>
          <p className="text-slate-700 dark:text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-semibold">
            Participate in nation building and rural service. Inductions are open annually. Get ready to earn incentive marks and build core leadership traits.
          </p>
          <div className="pt-2">
            <Link
              href="/join-nss"
              className="rounded-full bg-accent px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-accent/20 hover:shadow-accent/45 transition-all hover:scale-105 hover:-translate-y-0.5 inline-block"
            >
              Become Volunteer
            </Link>
          </div>
        </div>
      </section>


      {/* Event Participation Modal */}
      <AnimatePresence>
        {showParticipateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/65 backdrop-blur-sm"
            onClick={() => setShowParticipateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border/85 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowParticipateModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {!isRegistered ? (
                <div className="space-y-5">
                  <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent bg-accent/10 px-3.5 py-1 rounded-full">
                      Event Induction
                    </span>
                    <h3 className="text-2xl font-extrabold text-foreground tracking-tight">Event Registration</h3>
                    <p className="text-xs text-muted-foreground">
                      Fill out the form below to secure your volunteer seat in our upcoming social drives.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Trigger confetti celebration!
                      confetti({
                        particleCount: 120,
                        spread: 70,
                        origin: { y: 0.6 }
                      });
                      setIsRegistered(true);
                    }}
                    className="space-y-4 pt-2 text-left"
                  >
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={participantForm.name}
                        onChange={(e) => setParticipantForm({...participantForm, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground mb-1">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          required
                          value={participantForm.email}
                          onChange={(e) => setParticipantForm({...participantForm, email: e.target.value})}
                          placeholder="johndoe@email.com"
                          className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={participantForm.phone}
                          onChange={(e) => setParticipantForm({...participantForm, phone: e.target.value})}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground mb-1">
                          Department
                        </label>
                        <input 
                          type="text" 
                          required
                          value={participantForm.department}
                          onChange={(e) => setParticipantForm({...participantForm, department: e.target.value})}
                          placeholder="e.g. CSE, IT"
                          className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground mb-1">
                          Year of Study
                        </label>
                        <select 
                          value={participantForm.year}
                          onChange={(e) => setParticipantForm({...participantForm, year: e.target.value})}
                          className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option>1st Year</option>
                          <option>2nd Year</option>
                          <option>3rd Year</option>
                          <option>4th Year</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground mb-1">
                        Select Upcoming Event
                      </label>
                      <select 
                        required
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      >
                        <option value="" disabled>-- Choose an Event --</option>
                        {upcomingObservances && upcomingObservances.map((obs) => (
                          <option key={obs.id} value={obs.title}>
                            {obs.title} ({obs.date})
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 text-xs font-bold text-white shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all hover:scale-[1.01] mt-2 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      Submit Participation Request
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Check className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-foreground tracking-tight">Registration Complete!</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Thank you, <strong className="text-foreground">{participantForm.name}</strong>! Your seat request for <strong className="text-primary">{selectedEvent}</strong> has been logged.
                    </p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed font-medium">
                      Our NSS Program Coordinator will email the details and schedule coordinates to your registered email address shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowParticipateModal(false)}
                    className="w-full rounded-2xl bg-primary text-primary-foreground py-3 text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
