"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";
import { 
  Search, Award, ShieldCheck, Download, Share2, Copy, 
  RotateCcw, Sparkles, Check, Info, ChevronRight, X, Image as ImageIcon, Upload, Move, ZoomIn,
  Mail, Shield, GraduationCap, Star, ArrowRight, Users, ChevronDown, ChevronUp
} from "lucide-react";
import useNssData from "@/hooks/use-nss-data";
import { CommitteeMember } from "@/lib/data/db";

const CATEGORY_ORDER = ["Advisory", "Core Committee", "Junior Committee", "Executive Members"];

const CATEGORY_META: Record<string, { color: string; bg: string; border: string; desc: string }> = {
  "Advisory": { color: "text-accent", bg: "bg-accent/10", border: "border-accent/25", desc: "Senior mentor guiding the unit with experience and strategic vision." },
  "Core Committee": { color: "text-primary", bg: "bg-primary/10", border: "border-primary/25", desc: "Core leadership driving all major campaigns and decisions of the NSS Unit." },
  "Junior Committee": { color: "text-primary", bg: "bg-primary/10", border: "border-primary/25", desc: "Rising leaders managing operations, outreach, design, and documentation." },
  "Executive Members": { color: "text-accent", bg: "bg-accent/10", border: "border-accent/25", desc: "Active volunteers powering every event and community service drive." }
};

const FACULTY_CONFIG: Record<string, { gradient: string; border: string; accent: string; icon: string }> = {
  "NSS Programme Officer": { gradient: "from-accent to-red-800", border: "border-accent/30", accent: "text-accent", icon: "shield" },
};

export type CardThemeId = "nss-maroon" | "institutional-blue" | "emerald-green" | "royal-purple" | "light-professional" | "dark-professional";
export type CardBgType = "solid" | "gradient" | "pattern" | "texture";

export interface CardThemeConfig {
  name: string;
  cardBgClass: Record<CardBgType, string>;
  cardBorderClass: string;
  borderColorClass: string;
  badgeClass: string;
  accentTextClass: string;
  titleTextClass: string;
  subTextClass: string;
  quoteBoxClass: string;
  textMainClass: string;
  textMutedClass: string;
  quoteTextClass: string;
  footerTextClass: string;
  canvasColors: {
    primaryAccent: string;
    secondaryAccent: string;
    textMain: string;
    textSub: string;
    badgeBg: string;
    badgeBorder: string;
    borderMain: string;
    fillBackground: (ctx: CanvasRenderingContext2D, width: number, height: number, bgType: CardBgType) => void;
  };
}

const CARD_THEMES: Record<CardThemeId, CardThemeConfig> = {
  "nss-maroon": {
    name: "NSS Maroon",
    cardBgClass: {
      solid: "bg-[#4A0E17] text-white",
      gradient: "bg-gradient-to-br from-[#6b1420] via-[#4A0E17] to-[#2b050a] text-white",
      pattern: "bg-[#4A0E17] bg-[radial-gradient(#ffd54f15_1.5px,transparent_1.5px)] [background-size:20px_20px] text-white",
      texture: "bg-[#4A0E17] bg-[linear-gradient(to_right,#ffd54f05_1px,transparent_1px),linear-gradient(to_bottom,#ffd54f05_1px,transparent_1px)] bg-[size:32px_32px] text-white"
    },
    cardBorderClass: "border-2 border-[#ffd54f]/35 shadow-2xl",
    borderColorClass: "border-[#ffd54f]/35",
    badgeClass: "bg-[#ffd54f]/10 border border-[#ffd54f]/30 text-[#ffd54f]",
    accentTextClass: "text-[#ffd54f]",
    titleTextClass: "text-white font-black",
    subTextClass: "text-rose-200/80",
    quoteBoxClass: "bg-rose-950/20 border border-[#ffd54f]/20 text-rose-100",
    textMainClass: "text-white",
    textMutedClass: "text-rose-200/70",
    quoteTextClass: "text-rose-100",
    footerTextClass: "text-white/70",
    canvasColors: {
      primaryAccent: "#ffd54f",
      secondaryAccent: "#f43f5e",
      textMain: "#ffffff",
      textSub: "#fecdd3",
      badgeBg: "rgba(255, 213, 79, 0.15)",
      badgeBorder: "rgba(255, 213, 79, 0.4)",
      borderMain: "#881337",
      fillBackground: (ctx, w, h, bgType) => {
        if (bgType === "solid") {
          ctx.fillStyle = "#4A0E17";
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "gradient") {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, "#6b1420");
          g.addColorStop(0.5, "#4A0E17");
          g.addColorStop(1, "#2b050a");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "pattern") {
          ctx.fillStyle = "#4A0E17";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "rgba(255, 213, 79, 0.15)";
          for (let x = 0; x < w; x += 28) {
            for (let y = 0; y < h; y += 28) {
              ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
            }
          }
        } else {
          ctx.fillStyle = "#4A0E17";
          ctx.fillRect(0, 0, w, h);
          ctx.strokeStyle = "rgba(255, 213, 79, 0.05)";
          ctx.lineWidth = 1;
          for (let i = 0; i < w; i += 32) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
          }
          for (let j = 0; j < h; j += 32) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
          }
        }
      }
    }
  },
  "institutional-blue": {
    name: "Institutional Blue",
    cardBgClass: {
      solid: "bg-[#0B132B] text-white",
      gradient: "bg-gradient-to-br from-[#1c2a4f] via-[#0B132B] to-[#050a17] text-white",
      pattern: "bg-[#0B132B] bg-[radial-gradient(#fbbf2415_1.5px,transparent_1.5px)] [background-size:20px_20px] text-white",
      texture: "bg-[#0B132B] bg-[linear-gradient(to_right,#fbbf2405_1px,transparent_1px),linear-gradient(to_bottom,#fbbf2405_1px,transparent_1px)] bg-[size:32px_32px] text-white"
    },
    cardBorderClass: "border-2 border-blue-500/35 shadow-2xl",
    borderColorClass: "border-blue-400/35",
    badgeClass: "bg-primary/10 border border-primary/30 text-primary",
    accentTextClass: "text-blue-450",
    titleTextClass: "text-white font-black",
    subTextClass: "text-blue-200/80",
    quoteBoxClass: "bg-blue-950/20 border border-blue-500/20 text-blue-100",
    textMainClass: "text-white",
    textMutedClass: "text-blue-200/70",
    quoteTextClass: "text-blue-100",
    footerTextClass: "text-white/70",
    canvasColors: {
      primaryAccent: "#fbbf24",
      secondaryAccent: "#60a5fa",
      textMain: "#ffffff",
      textSub: "#bfdbfe",
      badgeBg: "rgba(251, 191, 36, 0.15)",
      badgeBorder: "rgba(251, 191, 36, 0.4)",
      borderMain: "#1e3a8a",
      fillBackground: (ctx, w, h, bgType) => {
        if (bgType === "solid") {
          ctx.fillStyle = "#0B132B";
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "gradient") {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, "#1c2a4f");
          g.addColorStop(0.5, "#0B132B");
          g.addColorStop(1, "#050a17");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "pattern") {
          ctx.fillStyle = "#0B132B";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "rgba(251, 191, 36, 0.15)";
          for (let x = 0; x < w; x += 28) {
            for (let y = 0; y < h; y += 28) {
              ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
            }
          }
        } else {
          ctx.fillStyle = "#0B132B";
          ctx.fillRect(0, 0, w, h);
          ctx.strokeStyle = "rgba(251, 191, 36, 0.05)";
          ctx.lineWidth = 1;
          for (let i = 0; i < w; i += 32) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
          }
          for (let j = 0; j < h; j += 32) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
          }
        }
      }
    }
  },
  "emerald-green": {
    name: "Emerald Green",
    cardBgClass: {
      solid: "bg-[#04140E] text-white",
      gradient: "bg-gradient-to-br from-[#0c3123] via-[#04140E] to-[#010503] text-white",
      pattern: "bg-[#04140E] bg-[radial-gradient(#34d39915_1.5px,transparent_1.5px)] [background-size:20px_20px] text-white",
      texture: "bg-[#04140E] bg-[linear-gradient(to_right,#34d39905_1px,transparent_1px),linear-gradient(to_bottom,#34d39905_1px,transparent_1px)] bg-[size:32px_32px] text-white"
    },
    cardBorderClass: "border-2 border-emerald-500/35 shadow-2xl",
    borderColorClass: "border-emerald-400/35",
    badgeClass: "bg-accent/10 border border-accent/30 text-accent",
    accentTextClass: "text-emerald-450",
    titleTextClass: "text-white font-black",
    subTextClass: "text-emerald-200/80",
    quoteBoxClass: "bg-emerald-950/20 border border-emerald-500/20 text-emerald-100",
    textMainClass: "text-white",
    textMutedClass: "text-emerald-200/70",
    quoteTextClass: "text-emerald-100",
    footerTextClass: "text-white/70",
    canvasColors: {
      primaryAccent: "#34d399",
      secondaryAccent: "#10b981",
      textMain: "#ffffff",
      textSub: "#a7f3d0",
      badgeBg: "rgba(52, 211, 153, 0.15)",
      badgeBorder: "rgba(52, 211, 153, 0.4)",
      borderMain: "#065f46",
      fillBackground: (ctx, w, h, bgType) => {
        if (bgType === "solid") {
          ctx.fillStyle = "#04140e";
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "gradient") {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, "#0c3123");
          g.addColorStop(0.5, "#04140e");
          g.addColorStop(1, "#010503");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "pattern") {
          ctx.fillStyle = "#04140e";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "rgba(52, 211, 153, 0.15)";
          for (let x = 0; x < w; x += 28) {
            for (let y = 0; y < h; y += 28) {
              ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
            }
          }
        } else {
          ctx.fillStyle = "#04140e";
          ctx.fillRect(0, 0, w, h);
          ctx.strokeStyle = "rgba(52, 211, 153, 0.05)";
          ctx.lineWidth = 1;
          for (let i = 0; i < w; i += 32) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
          }
          for (let j = 0; j < h; j += 32) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
          }
        }
      }
    }
  },
  "royal-purple": {
    name: "Royal Purple",
    cardBgClass: {
      solid: "bg-[#130722] text-white",
      gradient: "bg-gradient-to-br from-[#270e47] via-[#130722] to-[#0a0214] text-white",
      pattern: "bg-[#130722] bg-[radial-gradient(#c084fc15_1.5px,transparent_1.5px)] [background-size:20px_20px] text-white",
      texture: "bg-[#130722] bg-[linear-gradient(to_right,#c084fc05_1px,transparent_1px),linear-gradient(to_bottom,#c084fc05_1px,transparent_1px)] bg-[size:32px_32px] text-white"
    },
    cardBorderClass: "border-2 border-purple-500/35 shadow-2xl",
    borderColorClass: "border-purple-400/35",
    badgeClass: "bg-purple-400/10 border border-purple-400/30 text-purple-300",
    accentTextClass: "text-purple-400",
    titleTextClass: "text-white font-black",
    subTextClass: "text-purple-200/80",
    quoteBoxClass: "bg-purple-950/20 border border-purple-500/20 text-purple-100",
    textMainClass: "text-white",
    textMutedClass: "text-purple-200/70",
    quoteTextClass: "text-purple-100",
    footerTextClass: "text-white/70",
    canvasColors: {
      primaryAccent: "#c084fc",
      secondaryAccent: "#a855f7",
      textMain: "#ffffff",
      textSub: "#e9d5ff",
      badgeBg: "rgba(192, 132, 252, 0.15)",
      badgeBorder: "rgba(192, 132, 252, 0.4)",
      borderMain: "#581c87",
      fillBackground: (ctx, w, h, bgType) => {
        if (bgType === "solid") {
          ctx.fillStyle = "#130722";
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "gradient") {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, "#270e47");
          g.addColorStop(0.5, "#130722");
          g.addColorStop(1, "#0a0214");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "pattern") {
          ctx.fillStyle = "#130722";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "rgba(192, 132, 252, 0.15)";
          for (let x = 0; x < w; x += 28) {
            for (let y = 0; y < h; y += 28) {
              ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
            }
          }
        } else {
          ctx.fillStyle = "#130722";
          ctx.fillRect(0, 0, w, h);
          ctx.strokeStyle = "rgba(192, 132, 252, 0.05)";
          ctx.lineWidth = 1;
          for (let i = 0; i < w; i += 32) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
          }
          for (let j = 0; j < h; j += 32) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
          }
        }
      }
    }
  },
  "light-professional": {
    name: "Light Professional",
    cardBgClass: {
      solid: "bg-[#F8FAFC] text-slate-800",
      gradient: "bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] text-slate-800",
      pattern: "bg-[#F8FAFC] bg-[radial-gradient(#64748b15_1.5px,transparent_1.5px)] [background-size:20px_20px] text-slate-800",
      texture: "bg-[#F8FAFC] bg-[linear-gradient(to_right,#64748b08_1px,transparent_1px),linear-gradient(to_bottom,#64748b08_1px,transparent_1px)] bg-[size:32px_32px] text-slate-800"
    },
    cardBorderClass: "border-2 border-slate-300 shadow-2xl",
    borderColorClass: "border-slate-400/35",
    badgeClass: "bg-slate-100 border border-slate-350 text-slate-800",
    accentTextClass: "text-blue-600",
    titleTextClass: "text-slate-900 font-black",
    subTextClass: "text-slate-500",
    quoteBoxClass: "bg-slate-100 border border-slate-200 text-slate-600",
    textMainClass: "text-slate-800",
    textMutedClass: "text-slate-500",
    quoteTextClass: "text-slate-600",
    footerTextClass: "text-slate-500",
    canvasColors: {
      primaryAccent: "#2563eb",
      secondaryAccent: "#1e293b",
      textMain: "#0f172a",
      textSub: "#475569",
      badgeBg: "rgba(15, 23, 42, 0.08)",
      badgeBorder: "rgba(15, 23, 42, 0.25)",
      borderMain: "#cbd5e1",
      fillBackground: (ctx, w, h, bgType) => {
        if (bgType === "solid") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "gradient") {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, "#ffffff");
          g.addColorStop(0.5, "#f8fafc");
          g.addColorStop(1, "#f1f5f9");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "pattern") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "rgba(100, 116, 139, 0.15)";
          for (let x = 0; x < w; x += 28) {
            for (let y = 0; y < h; y += 28) {
              ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
            }
          }
        } else {
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(0, 0, w, h);
          ctx.strokeStyle = "rgba(100, 116, 139, 0.08)";
          ctx.lineWidth = 1;
          for (let i = 0; i < w; i += 32) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
          }
          for (let j = 0; j < h; j += 32) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
          }
        }
      }
    }
  },
  "dark-professional": {
    name: "Dark Professional",
    cardBgClass: {
      solid: "bg-[#09090B] text-white",
      gradient: "bg-gradient-to-br from-[#1F1F23] via-[#09090B] to-[#020204] text-white",
      pattern: "bg-[#09090B] bg-[radial-gradient(#facc1515_1.5px,transparent_1.5px)] [background-size:20px_20px] text-white",
      texture: "bg-[#09090B] bg-[linear-gradient(to_right,#facc1505_1px,transparent_1px),linear-gradient(to_bottom,#facc1505_1px,transparent_1px)] bg-[size:32px_32px] text-white"
    },
    cardBorderClass: "border-2 border-zinc-700/50 shadow-2xl",
    borderColorClass: "border-zinc-700/35",
    badgeClass: "bg-zinc-800 border border-zinc-650 text-yellow-400",
    accentTextClass: "text-yellow-400",
    titleTextClass: "text-white font-black",
    subTextClass: "text-zinc-400",
    quoteBoxClass: "bg-zinc-900/40 border border-zinc-800 text-zinc-300",
    textMainClass: "text-white",
    textMutedClass: "text-zinc-400",
    quoteTextClass: "text-zinc-300",
    footerTextClass: "text-zinc-400",
    canvasColors: {
      primaryAccent: "#facc15",
      secondaryAccent: "#27272a",
      textMain: "#ffffff",
      textSub: "#94a3b8",
      badgeBg: "rgba(250, 204, 21, 0.12)",
      badgeBorder: "rgba(250, 204, 21, 0.3)",
      borderMain: "#27272a",
      fillBackground: (ctx, w, h, bgType) => {
        if (bgType === "solid") {
          ctx.fillStyle = "#09090b";
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "gradient") {
          const g = ctx.createLinearGradient(0, 0, w, h);
          g.addColorStop(0, "#1f1f23");
          g.addColorStop(0.5, "#09090b");
          g.addColorStop(1, "#020204");
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        } else if (bgType === "pattern") {
          ctx.fillStyle = "#09090b";
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "rgba(250, 204, 21, 0.15)";
          for (let x = 0; x < w; x += 28) {
            for (let y = 0; y < h; y += 28) {
              ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
            }
          }
        } else {
          ctx.fillStyle = "#09090b";
          ctx.fillRect(0, 0, w, h);
          ctx.strokeStyle = "rgba(250, 204, 21, 0.05)";
          ctx.lineWidth = 1;
          for (let i = 0; i < w; i += 32) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
          }
          for (let j = 0; j < h; j += 32) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
          }
        }
      }
    }
  }
};const MemberAvatar = ({ name }: { name: string }) => {
  const [imgSrc, setImgSrc] = useState(`/images/commitee/${name}.png`);
  
  return (
    <div className="h-24 w-24 bg-slate-800 rounded-full border-2 border-white/10 overflow-hidden mx-auto mb-4 shadow-lg shrink-0 flex items-center justify-center relative">
      <img 
        src={imgSrc} 
        alt={name} 
        className="h-full w-full object-cover z-10"
        onError={() => setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=fff&size=256`)}
      />
    </div>
  );
};
export default function CommitteeRevealPage() {
  const { committeeMembers = [], leadership = [] } = useNssData();
  const [showFullTeam, setShowFullTeam] = useState(false);
  const teamSectionRef = useRef<HTMLDivElement>(null);
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
  
  // Interaction states
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);
  
  // Reveal steps: "search" | "verifying" | "reveal"
  const [step, setStep] = useState<"search" | "verifying" | "reveal">("search");
  const [notFound, setNotFound] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewCardRef = useRef<HTMLDivElement>(null);

  // Card customizer states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState<number>(1.2);
  const [imageOffsetX, setImageOffsetX] = useState<number>(0);
  const [imageOffsetY, setImageOffsetY] = useState<number>(0);
  const [customDept, setCustomDept] = useState("");
  const [customYear, setCustomYear] = useState("3rd Year");
  const [aspectRatio, setAspectRatio] = useState<"id" | "post" | "story" | "linkedin">("id"); // id = 3:4, post = 1:1, story = 9:16, linkedin = 1.91:1
  const [cardTheme, setCardTheme] = useState<CardThemeId>("nss-maroon");
  const [cardBg, setCardBg] = useState<CardBgType>("gradient");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions (only show matches when user is typing)
  const filteredSuggestions = searchQuery.trim() === "" 
    ? [] 
    : committeeMembers.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Close suggestions dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation for search dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
        handleSelectMember(filteredSuggestions[selectedIndex]);
      } else {
        const exactMatch = committeeMembers.find(
          m => m.name.toLowerCase().trim() === searchQuery.toLowerCase().trim()
        );
        if (exactMatch) {
          handleSelectMember(exactMatch);
        } else {
          handleSearchTrigger();
        }
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleSelectMember = (member: CommitteeMember) => {
    setSearchQuery(member.name);
    setShowDropdown(false);
    setSelectedMember(member);
    setNotFound(false);
    
    // Attempt to extract year from position, e.g. "President (3rd Year)"
    const yearMatch = member.position.match(/\((\d+(?:st|nd|rd|th)\s+Year)\)/i);
    if (yearMatch) {
      setCustomYear(yearMatch[1]);
    } else {
      setCustomYear("3rd Year");
    }
    // Set default department empty so user can fill it
    setCustomDept("");
    
    triggerVerificationSequence();
  };

  const handleSearchTrigger = () => {
    setShowDropdown(false);
    const matched = committeeMembers.find(
      m => m.name.toLowerCase().trim() === searchQuery.toLowerCase().trim()
    );
    if (matched) {
      handleSelectMember(matched);
    } else if (searchQuery.trim() !== "") {
      setNotFound(true);
      setSelectedMember(null);
    }
  };

  const triggerVerificationSequence = () => {
    setStep("verifying");
    setProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 4;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStep("reveal");
          
          // Tactile vibration feedback on mobile
          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
          }
          
          triggerConfettiCelebration();
        }, 200);
      }
    }, 70);
  };

  const triggerConfettiCelebration = () => {
    // Massive confetti burst
    const end = Date.now() + 3 * 1000;
    const colors = ["#C8102E", "#FFD54F", "#0f766e", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Image Upload handler — converts to base64 so html-to-image can render it
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUploadedImage(ev.target.result as string);
          setImageZoom(1.2);
          setImageOffsetX(0);
          setImageOffsetY(0);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Export exact DOM element used for the Live Appointment Card Preview (Pixel-perfect & High-Res)
  const handleDownloadCard = async () => {
    if (!selectedMember || !previewCardRef.current || isDownloading) return;

    try {
      setIsDownloading(true);
      const element = previewCardRef.current;

      // On mobile, the parent .card-scale-wrapper has CSS transforms (scale 0.75–0.85)
      // that affect html-to-image capture. Temporarily remove them so we always get
      // a clean full-size 380×532 render regardless of viewport size.
      const wrapper = element.parentElement as HTMLElement | null;
      if (wrapper) {
        wrapper.style.transform = "none";
        wrapper.style.marginBottom = "0";
      }

      // Wait one frame for the DOM to settle after transform reset
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      // Wait for all images to load
      const images = element.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        return new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Still resolve on error to continue
          }
        });
      });

      await Promise.all(imagePromises);
      
      // Add a small delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 200));

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        width: 380,
        height: 532,
        style: {
          transform: "none",
          margin: "0",
          padding: "0"
        }
      });

      // Restore the wrapper so the CSS media-query scaling comes back
      if (wrapper) {
        wrapper.style.transform = "";
        wrapper.style.marginBottom = "";
      }

      const link = document.createElement("a");
      const cleanName = selectedMember.name.toLowerCase().replace(/\s+/g, "_");
      link.download = `jit_nss_appointment_card_${cleanName}_2026-27.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to generate card PNG:", error);
      // Restore wrapper transform even on error
      if (previewCardRef.current?.parentElement) {
        (previewCardRef.current.parentElement as HTMLElement).style.transform = "";
        (previewCardRef.current.parentElement as HTMLElement).style.marginBottom = "";
      }
      alert("An error occurred while generating the card image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    if (!selectedMember) return;
    const shareText = `🎉 I have been officially appointed as "${selectedMember.position}" in the NSS JIT Student Committee for 2026–27! 🚩 Join us in serving the community. "Not Me But You." Check out JIT NSS: ${window.location.origin}`;
    navigator.clipboard.writeText(shareText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleSocialShare = (platform: string) => {
    if (!selectedMember) return;
    const shareText = encodeURIComponent(`🎉 I have been appointed as "${selectedMember.position}" in the JIT NSS Student Committee 2026–27! 🚩 "Not Me But You."`);
    const websiteUrl = encodeURIComponent(window.location.origin);
    
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${shareText}%20${websiteUrl}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`;
        break;
      case "x":
        url = `https://x.com/intent/tweet?text=${shareText}&url=${websiteUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`;
        break;
    }
    
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedMember(null);
    setUploadedImage(null);
    setStep("search");
    setNotFound(false);
  };

  const activeThemeConfig = CARD_THEMES[cardTheme] || CARD_THEMES["nss-maroon"];

  return (
    <div className="bg-background text-foreground transition-colors duration-300 min-h-screen relative overflow-x-hidden py-16 px-4">
      {/* Dynamic Obsidian & Sage-Teal mesh gradients background */}
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-50px) scale(1.2); opacity: 0.35; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        .animate-float {
          animation: float-particle 10s infinite linear;
        }
        
        /* Fixed card proportional scaling wrapper */
        .card-scale-wrapper {
          transform-origin: center top;
          transition: transform 0.2s ease;
        }
        @media (max-width: 440px) {
          .card-scale-wrapper {
            transform: scale(0.85);
            margin-bottom: -80px;
          }
        }
        @media (max-width: 380px) {
          .card-scale-wrapper {
            transform: scale(0.75);
            margin-bottom: -130px;
          }
        }
        @media (max-width: 340px) {
          .card-scale-wrapper {
            transform: scale(0.65);
            margin-bottom: -180px;
          }
        }
            `}</style>

      {/* Floating ambient halo lighting */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none z-0" />

      {/* Simulated floating sparkles/particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-1.5 w-1.5 bg-accent/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 95}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 7}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: MYSTERIOUS ENTRY SEARCH EXPERIENCE */}
          {step === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-10 text-center py-10"
            >
              {/* Header */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Official Appointment Ceremony
                </span>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-none font-heading">
                  OFFICIAL NSS CORE COMMITTEE 2026–27
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  Search your name to discover your official role in the JIT NSS Student Committee.
                </p>
              </div>

              {/* Central Search Box Card */}
              <div className="max-w-lg mx-auto bg-card/40 backdrop-blur-xl border border-border/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground dark:text-white tracking-tight">Identity Search</h3>
                  <p className="text-xs text-muted-foreground">Type your name exactly as specified in JIT enrollment databases.</p>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <div className="flex items-center bg-muted/50 border border-border/80 focus-within:border-accent rounded-2xl px-4 py-3.5 transition-colors">
                    <Search className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. Sujal Dev"
                      className="bg-transparent border-0 outline-none text-foreground dark:text-white w-full text-sm font-semibold placeholder:text-muted-foreground focus:ring-0"
                      onKeyDown={handleKeyDown}
                      onFocus={() => setShowDropdown(true)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedIndex(-1);
                        }}
                        className="text-muted-foreground hover:text-foreground dark:hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Autocomplete dropdown suggestions */}
                  <AnimatePresence>
                    {showDropdown && filteredSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute left-0 right-0 mt-2 bg-card border border-border rounded-2xl max-h-48 overflow-y-auto z-50 shadow-2xl text-left"
                      >
                        {filteredSuggestions.map((member, i) => (
                          <button
                            key={member.id}
                            onClick={() => handleSelectMember(member)}
                            className={`w-full px-4 py-3.5 text-xs text-left font-bold text-foreground dark:text-white border-b border-border/20 last:border-none flex items-center justify-between transition-colors cursor-pointer ${
                              i === selectedIndex ? "bg-accent text-white" : "hover:bg-muted"
                            }`}
                          >
                            <span>{member.name}</span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleSearchTrigger}
                  className="w-full rounded-2xl bg-accent px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Reveal Selection Status
                </button>

                {/* Error status card */}
                {notFound && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-start gap-3 text-primary"
                  >
                    <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">Record Not Found</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed font-semibold">
                        This name is not listed on the JIT NSS Student Committee 2026–27 directory. Please check spelling or contact the NSS program PO.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: VERIFYING APPOINTMENT LOADER */}
          {step === "verifying" && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-6 max-w-sm mx-auto"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-muted border-t-accent animate-spin" />
                <Award className="h-6 w-6 text-accent absolute animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Verifying Appointment Keys...</h3>
                <p className="text-[9px] tracking-wider uppercase text-muted-foreground font-bold">NSS JIT Program Cell Query</p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-muted-foreground text-[10px] font-mono leading-none">
                {progress < 40 && "CONNECTING CELL GATEWAY..."}
                {progress >= 40 && progress < 85 && "AUTHENTICATING OFFICE SIGNATURES..."}
                {progress >= 85 && "DECRYPTING SELECTION RESULTS..."}
              </div>
            </motion.div>
          )}

          {/* STEP 3: GRAND REVEAL EXPERIENCE */}
          {step === "reveal" && selectedMember && !showFullTeam && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12"
            >
              {/* Congratulatory Title */}
              <div className="text-center space-y-3">
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent uppercase tracking-tight font-heading"
                >
                  🎉 CONGRATULATIONS!
                </motion.h2>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  Welcome to the Leadership Team of JIT NSS.
                </p>
              </div>

              {/* Two Column Layout: Preview Card (Left) & Controls (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* 1. Official Preview Appointment Card */}
                <div className="space-y-4 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block text-center">
                    Live Appointment Card Preview
                  </span>
                  
                  {/* Rebuilt Premium ID/Appointment Card Container - Fixed aspect-[3/4.2] and scale wrapper for responsiveness */}
                  <div className="card-scale-wrapper w-[380px] h-[532px] shrink-0">
                    <div ref={previewCardRef} className={`w-full h-full rounded-3xl overflow-hidden shadow-2xl p-7 flex flex-col justify-between border transition-all duration-300 ${activeThemeConfig.cardBorderClass} ${activeThemeConfig.cardBgClass[cardBg]}`}>
                      
                      {/* Header: Institution Branding with 5 Logos in same order as Hero */}
                      <div className="text-center space-y-3 pb-3 border-b border-white/10 relative z-10">
                        {/* 5 Logos centered, identical visual height, equal spacing */}
                        <div className="flex items-center justify-center gap-3">
                          <img src="/images/logos/jit.png" alt="JIT Logo" className="h-6 w-auto object-contain" />
                          <img src="/images/logos/nss.png" alt="NSS Logo" className="h-6 w-auto object-contain" />
                          <img src="/images/logos/mybharatlogo_opt_2x.png" alt="MY Bharat Logo" className="h-6 w-auto object-contain" />
                          <img src="/images/logos/naac.png" alt="NAAC Logo" className="h-6 w-auto object-contain" />
                          <img src="/images/logos/nba.png" alt="NBA Logo" className="h-6 w-auto object-contain" />
                        </div>
                        
                        <div className="space-y-0.5">
                          <h2 className={`text-[11px] font-extrabold tracking-wider uppercase ${activeThemeConfig.textMainClass}`}>
                            Jhulelal Institute of Technology
                          </h2>
                          <p className={`text-[9px] uppercase font-bold tracking-widest ${activeThemeConfig.accentTextClass}`}>
                            National Service Scheme (NSS) Unit
                          </p>
                          <p className={`text-[8px] font-semibold opacity-85 ${activeThemeConfig.textMutedClass}`}>
                            Not Me But You
                          </p>
                        </div>
                      </div>

                      {/* Member Profile Section */}
                      <div className="flex flex-col items-center text-center my-4 space-y-3 relative z-10 flex-1 justify-center">
                        {/* Profile picture with whitespace around it */}
                        <div className={`relative h-24 w-24 rounded-full border-2 overflow-hidden shadow-lg flex items-center justify-center shrink-0 ${activeThemeConfig.borderColorClass} my-1`}>
                          <img 
                            src={uploadedImage || `/images/commitee/${selectedMember.name}.png`} 
                            alt={selectedMember.name}
                            style={{
                              transform: `scale(${imageZoom}) translate(${imageOffsetX}px, ${imageOffsetY}px)`,
                              transition: "none"
                            }}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=0d2b27&color=fff&size=256`;
                            }}
                          />
                        </div>

                        {/* Visual hierarchy spacing */}
                        <div className="space-y-2">
                          <h3 className={`text-base sm:text-lg font-black tracking-tight leading-tight ${activeThemeConfig.titleTextClass}`}>
                            {selectedMember.name.toUpperCase()}
                          </h3>
                          <p className={`text-xs uppercase font-extrabold tracking-wider ${activeThemeConfig.accentTextClass}`}>
                            {selectedMember.position.replace(/\s*\(\d+(?:st|nd|rd|th)\s+Year\)/i, "")}
                          </p>
                          
                          {/* Visual separation of designation from Department & Year */}
                          <div className="pt-1.5 space-y-0.5">
                            {customDept && (
                              <p className={`text-[9px] font-semibold uppercase tracking-wider ${activeThemeConfig.textMutedClass}`}>
                                {customDept}
                              </p>
                            )}
                            <p className={`text-[9px] font-bold ${activeThemeConfig.accentTextClass}`}>
                              {customYear}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dedicated Appointment Message */}
                      <div className={`p-4 rounded-2xl border text-center space-y-1 relative z-10 ${activeThemeConfig.quoteBoxClass} mb-0`}>
                        <h4 className={`text-[10px] font-black uppercase tracking-wider ${activeThemeConfig.accentTextClass}`}>
                          Congratulations!
                        </h4>
                        <p className={`text-[9px] leading-relaxed ${activeThemeConfig.quoteTextClass}`}>
                          You have been appointed as <span className={`font-extrabold ${activeThemeConfig.accentTextClass}`}>{selectedMember.position.replace(/\s*\(\d+(?:st|nd|rd|th)\s+Year\)/i, "")}</span> of the Jhulelal Institute of Technology NSS Unit for the academic year 2026–27. Your dedication, leadership, and commitment to community service have earned you this responsibility. We wish you a successful and impactful tenure as you uphold the values of the National Service Scheme.
                        </p>
                      </div>

                      {/* Footer */}
                      <div className={`border-t border-white/10 pt-3 flex items-center justify-between text-[8px] sm:text-[9px] font-bold uppercase tracking-wider opacity-75 relative z-10 ${activeThemeConfig.footerTextClass}`}>
                        <span>Tenure 2026-27</span>
                        <span className={activeThemeConfig.accentTextClass}>JIT NSS UNIT</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 2. Customization Panel Controls */}
                <div className="space-y-6 bg-card/30 border border-border/80 rounded-3xl p-6 sm:p-8 shadow-lg">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-accent" /> Customize Share Card
                  </h3>

                  {/* Theme Selector */}
                  <div className="space-y-3">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Select Card Theme
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.keys(CARD_THEMES).map((themeId) => {
                        const theme = CARD_THEMES[themeId as CardThemeId];
                        return (
                          <button
                            key={themeId}
                            onClick={() => setCardTheme(themeId as CardThemeId)}
                            className={`rounded-xl border p-2.5 text-[10px] font-bold text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              cardTheme === themeId 
                                ? "bg-accent border-accent text-white" 
                                : "bg-muted border-border/80 text-muted-foreground hover:text-white"
                            }`}
                          >
                            <span 
                              className="h-2.5 w-2.5 rounded-full inline-block shrink-0" 
                              style={{ 
                                backgroundColor: theme.canvasColors.primaryAccent 
                              }} 
                            />
                            {theme.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Background Selector */}
                  <div className="space-y-3">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Select Background Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "solid", name: "Clean Solid" },
                        { id: "gradient", name: "Elegant Gradient" },
                        { id: "pattern", name: "Subtle Pattern" },
                        { id: "texture", name: "Minimal Texture" }
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setCardBg(style.id as CardBgType)}
                          className={`rounded-xl border px-3 py-2 text-[10px] font-bold text-center transition-all cursor-pointer ${
                            cardBg === style.id 
                              ? "bg-accent border-accent text-white" 
                              : "bg-muted border-border/80 text-muted-foreground hover:text-white"
                          }`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Uploader */}
                  <div className="space-y-3">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                      Add or Change Your Photo
                    </label>
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full rounded-2xl bg-muted border border-border/80 hover:bg-muted/70 px-4 py-3 text-xs font-bold text-white transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Upload className="h-4.5 w-4.5 text-accent" />
                      {uploadedImage ? "Upload Different Photo" : "Upload Portrait Picture"}
                    </button>
                  </div>

                  {/* Cropper Sliders */}
                  <div className="space-y-4 pt-1">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span className="flex items-center gap-1"><ZoomIn className="h-3.5 w-3.5" /> Photo Zoom ({imageZoom.toFixed(1)}x)</span>
                      </div>
                      <input 
                        type="range"
                        min="1"
                        max="3.5"
                        step="0.1"
                        value={imageZoom}
                        onChange={(e) => setImageZoom(parseFloat(e.target.value))}
                        className="w-full accent-accent bg-muted h-1 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Move className="h-3.5 w-3.5" /> Shift X</span>
                        <input 
                          type="range"
                          min="-120"
                          max="120"
                          value={imageOffsetX}
                          onChange={(e) => setImageOffsetX(parseInt(e.target.value))}
                          className="w-full accent-accent bg-muted h-1 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Move className="h-3.5 w-3.5" /> Shift Y</span>
                        <input 
                          type="range"
                          min="-120"
                          max="120"
                          value={imageOffsetY}
                          onChange={(e) => setImageOffsetY(parseInt(e.target.value))}
                          className="w-full accent-accent bg-muted h-1 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detail Customization */}
                  <div className="space-y-4 pt-2 border-t border-border/30">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">
                        Department
                      </label>
                      <input 
                        type="text"
                        value={customDept}
                        onChange={(e) => setCustomDept(e.target.value)}
                        placeholder="e.g. Computer Science & Engineering"
                        className="w-full bg-muted border border-border/80 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">
                        Academic Year
                      </label>
                      <select 
                        value={customYear}
                        onChange={(e) => setCustomYear(e.target.value)}
                        className="w-full bg-muted border border-border/80 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-transparent"
                      >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadCard}
                    disabled={isDownloading}
                    className={`w-full rounded-2xl bg-accent px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all inline-flex items-center justify-center gap-2 cursor-pointer mt-2 ${isDownloading ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    <Download className={`h-4.5 w-4.5 ${isDownloading ? "animate-bounce" : ""}`} /> 
                    {isDownloading ? "Generating High-Res Card..." : "Download Appointment Card"}
                  </button>
                </div>
              </div>
              {/* Share actions & Reset button container */}
              <div className="border-t border-border/30 pt-8 max-w-2xl mx-auto space-y-6 text-center">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center justify-center gap-2">
                    <Share2 className="h-4.5 w-4.5 text-accent" /> Share Your Achievement
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Let your peers know about your appointment to the JIT NSS Student Committee.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleSocialShare("linkedin")}
                    className="rounded-full bg-white/5 border border-border/80 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleSocialShare("whatsapp")}
                    className="rounded-full bg-white/5 border border-border/80 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleSocialShare("x")}
                    className="rounded-full bg-white/5 border border-border/80 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    X (Twitter)
                  </button>
                  <button
                    onClick={() => handleSocialShare("facebook")}
                    className="rounded-full bg-white/5 border border-border/80 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    Facebook
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="rounded-full bg-white/5 border border-border/80 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="h-4.5 w-4.5" />
                    {isCopied ? "Copied Link!" : "Copy Share Link"}
                  </button>
                </div>

                                <div className="pt-2 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="rounded-full bg-muted border border-border hover:bg-muted/75 px-6 py-3 text-xs font-bold text-white shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" /> Reveal Another Committee Officer
                  </button>

                  {!showFullTeam && (
                    <button
                      onClick={() => {
                        setShowFullTeam(true);
                        setTimeout(() => {
                          teamSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="rounded-full bg-accent px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      Meet the Complete NSS Team <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showFullTeam && (
          <div ref={teamSectionRef} className="pt-16 border-t border-border/30 mt-16 space-y-20 fade-in">

        {/* Directory Listing section (browse complete committee) */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground dark:text-white uppercase tracking-tight">
              Explore the Entire Committee
            </h2>
            <p className="text-xs text-muted-foreground dark:text-slate-400 mb-6">
              Browse the officially designated leaders serving JIT NSS for the academic year 2026–27.
            </p>
            <div className="pt-4 flex justify-center">
              <a
                href="/results/NSS_Committee_Results_2026_27.pdf"
                download="NSS_Committee_Directory_2026_27.pdf"
                className="rounded-lg bg-card border border-border hover:bg-muted px-6 py-2.5 text-xs font-bold text-foreground shadow-md transition-all inline-flex items-center gap-2 group cursor-pointer"
              >
                <Download className="h-4 w-4 group-hover:text-accent transition-colors" />
                <span>Download Executive Committee Directory (PDF)</span>
              </a>
            </div>
          </div>

          {/* HIERARCHICAL LAYOUT */}
          <div className="space-y-10">
            
            {/* Faculty Coordinators Section */}
            {leadership && leadership.length > 0 && (
              <div className="pb-8 border-b border-white/10">
                <div className="text-center pb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-accent uppercase tracking-widest">
                    Principal & Advisory Head
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                  {leadership.map(leader => (
                    <motion.div
                      key={leader.id}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="border border-accent/40 rounded-3xl p-6 bg-card dark:bg-white/[0.02] hover:bg-muted/40 dark:hover:bg-white/[0.05] transition-all duration-350 shadow-md text-center relative overflow-hidden w-full max-w-[280px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                      <div className="h-24 w-24 bg-muted dark:bg-slate-800 rounded-full border-2 border-accent overflow-hidden mx-auto mb-4 shadow-lg shrink-0">
                        <img 
                          src={leader.photo} 
                          alt={leader.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="font-extrabold text-base text-foreground dark:text-white mb-1">
                        {leader.name}
                      </h4>
                      <p className="text-[11px] font-extrabold text-accent uppercase mb-3">
                        {leader.position}
                      </p>
                      <a href={`mailto:${leader.email}`} className="text-[10px] text-muted-foreground dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
                        {leader.email}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* TIER 1: Advisory (Sujal Hadge) */}
            {(() => {
              const tier1 = committeeMembers.filter(m => m.name === "Sujal Hadge");
              if (tier1.length === 0) return null;
              return (
                <div className="flex justify-center">
                  {tier1.map(member => (
                    <div key={member.id} className="w-full max-w-sm">
                      <motion.div
                        whileHover={{ y: -3, scale: 1.02 }}
                        className="border border-accent/35 rounded-3xl p-8 bg-card dark:bg-white/[0.03] hover:bg-muted/40 dark:hover:bg-white/[0.05] transition-all duration-350 shadow-2xl text-center relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                        <MemberAvatar name={member.name} />
                        <h4 className="font-extrabold text-lg text-foreground dark:text-white mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs font-extrabold text-accent uppercase mb-3">
                          {member.position}
                        </p>
                        <p className="text-[11px] text-muted-foreground dark:text-slate-400 leading-relaxed font-medium">
                          {member.description}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* TIER 2: President and Vice-President */}
            {(() => {
              const tier2 = committeeMembers.filter(m => 
                m.position.includes("President") && !m.name.includes("Sujal")
              );
              if (tier2.length === 0) return null;
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {tier2.map(member => (
                    <motion.div
                      key={member.id}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="border border-border dark:border-white/10 rounded-3xl p-6 bg-card dark:bg-white/[0.02] hover:bg-muted/40 dark:hover:bg-white/[0.04] transition-all duration-350 shadow-xl text-center"
                    >
                      <MemberAvatar name={member.name} />
                      <h4 className="font-extrabold text-base text-foreground dark:text-white mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[11px] font-extrabold text-accent uppercase mb-3">
                        {member.position}
                      </p>
                      <p className="text-[10px] text-muted-foreground dark:text-slate-400 leading-relaxed font-medium">
                        {member.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              );
            })()}

            {/* TIER 3: General Secretary, Treasurer, Chief Coordinator, Joint Secretary */}
            {(() => {
              const tier3Positions = ["General Secretary", "Treasurer", "Chief Coordinator", "Joint Secretary"];
              const tier3 = committeeMembers.filter(m => 
                tier3Positions.some(p => m.position.includes(p))
              ).sort((a, b) => {
                const aPos = tier3Positions.findIndex(p => a.position.includes(p));
                const bPos = tier3Positions.findIndex(p => b.position.includes(p));
                return aPos - bPos;
              });
              if (tier3.length === 0) return null;
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tier3.map(member => (
                    <motion.div
                      key={member.id}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="border border-border dark:border-white/5 rounded-3xl p-6 bg-card dark:bg-white/[0.015] hover:bg-muted/40 dark:hover:bg-white/[0.03] transition-all duration-350 shadow-lg flex flex-col justify-between text-center"
                    >
                      <div className="space-y-1">
                        <MemberAvatar name={member.name} />
                        <h4 className="font-extrabold text-sm text-foreground dark:text-white mb-1">
                          {member.name}
                        </h4>
                        <p className="text-[10px] font-extrabold text-accent uppercase mb-3">
                          {member.position}
                        </p>
                      </div>
                      <p className="text-[10px] text-muted-foreground dark:text-slate-400 leading-relaxed font-medium">
                        {member.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              );
            })()}

            {/* TIER 4: Rest of Core Committee */}
            {(() => {
              const usedIds = new Set(
                committeeMembers.filter(m => 
                  m.name === "Sujal Hadge" || 
                  (m.position.includes("President") && !m.name.includes("Sujal")) ||
                  m.position.includes("General Secretary") || 
                  m.position.includes("Treasurer") ||
                  m.position.includes("Chief Coordinator") || 
                  m.position.includes("Joint Secretary")
                ).map(m => m.id)
              );
              
              const tier4 = committeeMembers.filter(m => 
                m.category === "Core Committee" && !usedIds.has(m.id)
              );
              
              if (tier4.length === 0) return null;
              return (
                <div className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tier4.map((member) => (
                      <motion.div
                        key={member.id}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="border border-border hover:border-accent/30 dark:border-white/5 rounded-2xl p-5 bg-card dark:bg-white/[0.02] hover:bg-muted/40 dark:hover:bg-white/[0.04] transition-all duration-350 shadow-md flex flex-col items-center text-center justify-between"
                      >
                        <div className="space-y-1 w-full">
                          <MemberAvatar name={member.name} />
                          <h4 className="font-extrabold text-sm text-foreground dark:text-white transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-[10px] font-extrabold text-accent uppercase mt-1 mb-2">
                            {member.position}
                          </p>
                        </div>
                        <p className="text-[10px] text-muted-foreground dark:text-slate-400 leading-relaxed font-semibold">
                          {member.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Categorized lists for Junior and Executive */}
          <div className="pt-10">
            {["Junior Committee", "Executive Members"].map((category) => {
              const members = committeeMembers.filter(m => m.category === category);
              if (members.length === 0) return null;

              return (
                <div key={category} className="space-y-4 mt-8">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest text-accent border-b border-border dark:border-white/5 pb-2">
                    {category} ({members.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {members.map((member) => (
                      <motion.div
                        key={member.id}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="border border-border hover:border-accent/30 dark:border-white/5 rounded-2xl p-5 bg-card dark:bg-white/[0.02] hover:bg-muted/40 dark:hover:bg-white/[0.04] transition-all duration-350 shadow-md flex flex-col items-center text-center justify-between"
                      >
                        <div className="space-y-1 w-full">
                          <MemberAvatar name={member.name} />
                          <h4 className="font-extrabold text-sm text-foreground dark:text-white transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-[10px] font-extrabold text-accent uppercase mt-1 mb-2">
                            {member.position}
                          </p>
                        </div>
                        <p className="text-[10px] text-muted-foreground dark:text-slate-400 leading-relaxed font-semibold">
                          {member.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
          </div>
        )}

      </div>
    </div>
  );
}