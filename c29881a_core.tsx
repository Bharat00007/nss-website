"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  Search, Award, ShieldCheck, Download, Share2, Copy, 
  RotateCcw, Sparkles, CheckCircle2, Info, ChevronRight, X 
} from "lucide-react";
import useNssData from "@/hooks/use-nss-data";
import { CommitteeMember } from "@/lib/data/db";

const MemberAvatar = ({ name }: { name: string }) => {
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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter matching members
  const filteredSuggestions = searchQuery.trim() === "" 
    ? [] 
    : committeeMembers.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation for dropdown
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
        // try to match exact text
        const exactMatch = committeeMembers.find(
          m => m.name.toLowerCase() === searchQuery.toLowerCase()
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
    triggerVerificationSequence(member);
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

  const triggerVerificationSequence = (member: CommitteeMember) => {
    setStep("verifying");
    setProgress(0);
    
    // Simulate verification progress loader
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStep("reveal");
          triggerConfettiCelebration();
        }, 300);
      }
    }, 90);
  };

  const triggerConfettiCelebration = () => {
    // Canvas Confetti bursts
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#C8102E", "#FFD54F", "#0B1F4D", "#FFFFFF"]
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#C8102E", "#FFD54F", "#0B1F4D", "#FFFFFF"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // HTML5 Canvas card render & download
  const handleDownloadCard = () => {
    if (!selectedMember) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw deep navy gradient background
    const bgGrad = ctx.createRadialGradient(400, 250, 50, 400, 250, 450);
    bgGrad.addColorStop(0, "#112a66");
    bgGrad.addColorStop(1, "#071333");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Draw double gold borders
    ctx.strokeStyle = "#FFD54F";
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 760, 460);
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1;
    ctx.strokeRect(26, 26, 748, 448);

    // Draw clean watermarked text banner
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.textAlign = "center";
    for (let i = 0; i < 6; i++) {
      ctx.fillText("NATIONAL SERVICE SCHEME JIT NAGPUR", 400, 80 + i * 70);
    }

    // Load logo images & render on canvas
    const drawLogosAndRemainingText = () => {
      // Header banner text
      ctx.textAlign = "center";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "11px sans-serif";
      ctx.fillText("JHULELAL INSTITUTE OF TECHNOLOGY, NAGPUR", 400, 55);
      
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#C8102E"; // NSS Red
      ctx.fillText("NATIONAL SERVICE SCHEME (NSS) UNIT", 400, 73);

      // Certificate Title
      ctx.fillStyle = "#FFD54F"; // Gold
      ctx.font = "bold 20px Georgia, serif";
      ctx.fillText("OFFICIAL LEADER APPOINTMENT", 400, 140);
      
      // Horizontal separator line
      ctx.strokeStyle = "rgba(255,213,79,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(250, 160);
      ctx.lineTo(550, 160);
      ctx.stroke();

      // Selected member name
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(selectedMember.name, 400, 220);

      // Position
      ctx.fillStyle = "#FFD54F";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(selectedMember.position, 400, 260);

      // Description text wrapping
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = "italic 11px sans-serif";
      const desc = selectedMember.description;
      const words = desc.split(" ");
      let line = "";
      let y = 300;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 500 && n > 0) {
          ctx.fillText(line, 400, y);
          line = words[n] + " ";
          y += 20;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 400, y);

      // Academic Year footer
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("NSS Student Committee 2026ΓÇô27", 400, 395);

      // Program Officer Signature line
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath();
      ctx.moveTo(100, 435);
      ctx.lineTo(250, 435);
      ctx.moveTo(550, 435);
      ctx.lineTo(700, 435);
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "9px sans-serif";
      ctx.fillText("PROF. RANI REWATKAR", 175, 450);
      ctx.fillText("NSS PROGRAM OFFICER", 175, 463);
      
      ctx.fillText("DR. NARENDRA BAWANE", 625, 450);
      ctx.fillText("PRINCIPAL / JIT HEAD", 625, 463);

      // Central Motto
      ctx.fillStyle = "#FFD54F";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("MOTTO: \"NOT ME BUT YOU\"", 400, 463);

      // Trigger actual download link
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `JIT_NSS_Appointment_${selectedMember.name.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
    };

    // Load circular logos asynchronously onto the canvas
    let logosLoaded = 0;
    const nssLogo = new Image();
    const jitLogo = new Image();
    
    const onLogoLoad = () => {
      logosLoaded++;
      if (logosLoaded === 2) {
        ctx.drawImage(nssLogo, 60, 40, 60, 60);
        ctx.drawImage(jitLogo, 680, 40, 60, 52);
        drawLogosAndRemainingText();
      }
    };

    nssLogo.onload = onLogoLoad;
    jitLogo.onload = onLogoLoad;
    
    // Set fallback paths to prevent cross-origin issues
    nssLogo.src = "/images/logos/nss.png";
    jitLogo.src = "/images/logos/jit.png";
  };

  const handleCopyLink = () => {
    if (!selectedMember) return;
    const shareText = `≡ƒÄë I have been officially appointed as "${selectedMember.position}" in the NSS Jhulelal Institute of Technology (JIT) Student Committee for 2026ΓÇô27! ≡ƒÜ⌐ Join us in serving the community. "Not Me But You."`;
    navigator.clipboard.writeText(shareText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleShareAchievement = () => {
    if (!selectedMember) return;
    const shareText = `≡ƒÄë Appointed as ${selectedMember.position} - NSS JIT 2026-27`;
    if (navigator.share) {
      navigator.share({
        title: "Official NSS JIT Appointment",
        text: `I have been officially appointed as "${selectedMember.position}" in the JIT NSS Student Committee 2026ΓÇô27!`,
        url: window.location.origin
      }).catch(err => console.log(err));
    } else {
      handleCopyLink();
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedMember(null);
    setStep("search");
    setNotFound(false);
  };

  return (
    <div className="bg-[#0B1F4D] text-slate-100 min-h-screen relative overflow-x-hidden py-16 px-4">
      {/* Premium custom background styles */}
      <style>{`
        @keyframes float-logo {
          0% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.03; }
          50% { transform: translate(15px, -25px) rotate(90deg); opacity: 0.05; }
          100% { transform: translate(0px, 0px) rotate(180deg); opacity: 0.03; }
        }
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .reveal-bg {
          background: radial-gradient(circle at top, #112d6a 0%, #06112d 70%);
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }
      `}</style>

      {/* Background container */}
      <div className="absolute inset-0 z-0 pointer-events-none reveal-bg" />
      
      {/* Floating watermarked logo */}
      <div 
        className="absolute top-1/4 left-1/10 w-96 h-96 z-0 bg-[url('/images/logos/nss.png')] bg-no-repeat bg-contain opacity-5 pointer-events-none"
        style={{ animation: "float-logo 20s linear infinite" }}
      />
      
      <div 
        className="absolute bottom-1/4 right-1/10 w-96 h-96 z-0 bg-[url('/images/logos/jit.png')] bg-no-repeat bg-contain opacity-5 pointer-events-none"
        style={{ animation: "float-logo 25s linear infinite" }}
      />

      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        
        {/* Title and Intro */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1 bg-nss-red/20 border border-nss-red/40 text-nss-red text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full"
          >
            <Sparkles className="h-3 w-3" /> Selection Announcement
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white leading-none"
          >
            NSS JIT Student Committee <span className="text-nss-gold block sm:inline">2026ΓÇô27</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-300 italic max-w-xl mx-auto"
          >
            &ldquo;Every volunteer serves with dedication. Today, a few are entrusted to lead.&rdquo;
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex justify-center"
          >
            <a 
              href="/results/NSS_Committee_Results_2026_27.pdf" 
              download
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-nss-gold px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all inline-flex items-center gap-2 group"
            >
              <Download className="h-4 w-4 group-hover:text-nss-gold transition-colors" />
              Download Official Results PDF
            </a>
          </motion.div>
        </div>

        {/* Core interactive experience section */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* Step 1: SEARCH MEMBER */}
            {step === "search" && (
              <motion.div
                key="search"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-8 text-center max-w-lg mx-auto py-8"
              >
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Find Your Name</h2>
                  <p className="text-xs text-slate-400">
                    Search your name to discover your official appointment in the NSS Student Committee 2026ΓÇô27.
                  </p>
                </div>

                {/* Dropdown glass input */}
                <div className="relative" ref={dropdownRef}>
                  <div className="flex items-center bg-white/[0.06] border border-white/15 focus-within:border-nss-gold/80 rounded-2xl px-4 py-3 transition-colors">
                    <Search className="h-5 w-5 text-slate-400 mr-2.5" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search your name..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(true);
                        setSelectedIndex(-1);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-none text-white focus:outline-none w-full text-sm font-semibold"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedIndex(-1);
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Autocomplete Dropdown list */}
                  <AnimatePresence>
                    {showDropdown && filteredSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute left-0 right-0 mt-2 bg-[#0e214d] border border-white/10 rounded-2xl max-h-48 overflow-y-auto z-50 shadow-2xl text-left"
                      >
                        {filteredSuggestions.map((member, i) => (
                          <button
                            key={member.id}
                            onClick={() => handleSelectMember(member)}
                            className={`w-full px-4 py-3 text-sm text-left font-semibold text-white border-b border-white/5 last:border-none flex items-center justify-between transition-colors ${
                              i === selectedIndex ? "bg-nss-red" : "hover:bg-white/5"
                            }`}
                          >
                            <span>{member.name}</span>
                            <ChevronRight className="h-4 w-4 text-slate-400" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleSearchTrigger}
                  className="rounded-full bg-nss-red px-8 py-3 text-xs font-bold text-white shadow-lg hover:bg-red-700 hover:scale-105 transition-all w-full sm:w-auto"
                >
                  Verify Selection Status
                </button>

                {/* Error interaction block */}
                {notFound && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex gap-3 text-left max-w-md mx-auto"
                  >
                    <Info className="h-5 w-5 text-nss-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-extrabold text-white">Thank you for your interest.</p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                        The searched name is not part of the officially announced NSS Student Committee 2026ΓÇô27. Keep serving and volunteering!
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: APPOINTMENT VERIFICATION LOADER */}
            {step === "verifying" && (
              <motion.div
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center space-y-6 max-w-sm mx-auto"
              >
                <div className="relative flex items-center justify-center">
                  {/* Glowing progress ring */}
                  <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-nss-gold animate-spin" />
                  <Award className="h-6 w-6 text-nss-gold absolute animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Verifying Appointment...</h3>
                  <p className="text-[10px] tracking-wider uppercase text-slate-400 font-semibold">Program Cell Database Query</p>
                </div>

                {/* Horizontal loader line */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-nss-gold transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="text-slate-400 text-[10px] font-mono leading-none">
                  {progress < 40 && "FETCHING APPOINTMENT KEY..."}
                  {progress >= 40 && progress < 85 && "AUTHENTICATING PROGRAM SIGNATURES..."}
                  {progress >= 85 && "DECRYPTING SELECTION CREDENTIALS..."}
                </div>
              </motion.div>
            )}

            {/* Step 3: GRAND REVEAL AND APPOINTMENT CARD */}
            {step === "reveal" && selectedMember && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20 }}
                className="space-y-8"
              >
                {/* Congratulations text banner */}
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-nss-gold via-white to-nss-gold uppercase">
                    Congratulations!
                  </h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Your official appointment has been confirmed.
                  </p>
                </div>

                {/* Single Glassmorphic Card (No profile picture/avatar) */}
                <div className="border border-white/15 rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-slate-900/60 shadow-2xl max-w-xl mx-auto flex flex-col justify-between min-h-[300px] border-t-nss-gold">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-white/[0.04] pointer-events-none" />
                  
                  {/* Sparkle decorative lines */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                    <span className="text-[8px] uppercase tracking-wider font-extrabold text-emerald-400">Verified Officer Record</span>
                  </div>

                  <div className="space-y-6 mt-4">
                    <span className="text-[9px] font-bold text-nss-red bg-nss-red/10 border border-nss-red/20 px-3 py-1 rounded-full uppercase tracking-widest">
                      Student Board selected
                    </span>

                    {/* Member Name */}
                    <div className="space-y-1">
                      <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        {selectedMember.name}
                      </h3>
                      {/* Position */}
                      <p className="text-sm sm:text-lg font-bold text-nss-gold uppercase">
                        {selectedMember.position}
                      </p>
                    </div>

                    {/* Role Description */}
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      {selectedMember.description}
                    </p>
                  </div>

                  {/* Card Footer badges */}
                  <div className="border-t border-white/5 pt-6 mt-6 flex items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-[9px] uppercase font-bold text-slate-450 tracking-wider">Academic Year</p>
                      <p className="text-xs font-bold text-white">NSS Student Committee 2026ΓÇô27</p>
                    </div>

                    {/* Logos row */}
                    <div className="flex gap-2 items-center">
                      <img src="/images/logos/nss.png" alt="NSS Logo" className="h-8 object-contain" />
                      <img src="/images/logos/jit.png" alt="JIT Logo" className="h-8 object-contain" />
                    </div>
                  </div>
                </div>

                {/* Sub-text card greetings */}
                <div className="text-center space-y-4 max-w-md mx-auto pt-2">
                  <div className="space-y-0.5">
                    <p className="text-xs text-slate-450 font-bold uppercase tracking-widest">Congratulations!</p>
                    <p className="text-[11px] text-slate-400">
                      You have been officially appointed to the **National Service Scheme Student Committee 2026ΓÇô27**.
                    </p>
                  </div>
                  
                  {/* Oath statements */}
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[9px] font-extrabold uppercase tracking-widest text-slate-500">
                    <span>Lead with integrity</span>
                    <span className="hidden sm:inline">&bull;</span>
                    <span>Serve with compassion</span>
                    <span className="hidden sm:inline">&bull;</span>
                    <span>Inspire through action</span>
                  </div>

                  <p className="text-xs font-extrabold text-nss-gold tracking-widest">
                    &ldquo;NOT ME BUT YOU&rdquo;
                  </p>
                </div>

                {/* Interaction buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto pt-4">
                  <button
                    onClick={handleDownloadCard}
                    className="rounded-full bg-nss-red hover:bg-red-700 px-6 py-3 text-xs font-bold text-white shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5"
                  >
                    <Download className="h-4.5 w-4.5" /> Download Appointment Card
                  </button>

                  <button
                    onClick={handleShareAchievement}
                    className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 text-xs font-bold text-white shadow-md transition-all inline-flex items-center gap-1.5"
                  >
                    <Share2 className="h-4.5 w-4.5" /> Share Achievement
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 text-xs font-bold text-white shadow-md transition-all inline-flex items-center gap-1.5"
                  >
                    <Copy className="h-4.5 w-4.5" /> {isCopied ? "Copied!" : "Copy Share Link"}
                  </button>

                  <button
                    onClick={handleReset}
                    className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 text-xs font-bold text-white shadow-md transition-all inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-4.5 w-4.5" /> Reveal Another Member
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Directory Listing section (browse complete committee) */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight">
              Explore the Entire Committee
            </h2>
            <p className="text-xs text-slate-400">
              Browse the officially designated leaders serving JIT NSS for the academic year 2026ΓÇô27.
            </p>
          </div>

          {/* HIERARCHICAL LAYOUT */}
          <div className="space-y-10">
            
            {/* Faculty Coordinators Section */}
            {leadership && leadership.length > 0 && (
              <div className="pb-8 border-b border-white/10">
                <div className="text-center space-y-2 mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-nss-gold uppercase tracking-widest">
                    Programme Officers & Administration
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                  {leadership.map(leader => (
                    <motion.div
                      key={leader.id}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="border border-nss-gold/40 rounded-3xl p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-350 shadow-[0_0_15px_rgba(251,191,36,0.1)] text-center relative overflow-hidden w-full max-w-[280px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-nss-gold/5 to-transparent pointer-events-none" />
                      <div className="h-24 w-24 bg-slate-800 rounded-full border-2 border-nss-gold overflow-hidden mx-auto mb-4 shadow-lg shrink-0">
                        <img 
                          src={leader.photo} 
                          alt={leader.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="font-extrabold text-base text-white mb-1">
                        {leader.name}
                      </h4>
                      <p className="text-[11px] font-extrabold text-nss-gold uppercase mb-3">
                        {leader.position}
                      </p>
                      <a href={`mailto:${leader.email}`} className="text-[10px] text-slate-400 hover:text-white transition-colors">
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
                        className="border border-nss-gold/30 rounded-3xl p-8 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-350 shadow-2xl text-center relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-nss-gold/5 to-transparent pointer-events-none" />
                        <MemberAvatar name={member.name} />
                        <h4 className="font-extrabold text-lg text-white mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs font-extrabold text-nss-gold uppercase mb-3">
                          {member.position}
                        </p>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
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
                      className="border border-white/10 rounded-3xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-350 shadow-xl text-center"
                    >
                      <MemberAvatar name={member.name} />
                      <h4 className="font-extrabold text-base text-white mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[11px] font-extrabold text-nss-gold uppercase mb-3">
                        {member.position}
                      </p>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
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
                      className="border border-white/5 rounded-3xl p-6 bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-350 shadow-lg flex flex-col justify-between text-center"
                    >
                      <div className="space-y-1">
                        <MemberAvatar name={member.name} />
                        <h4 className="font-extrabold text-sm text-white mb-1">
                          {member.name}
                        </h4>
                        <p className="text-[10px] font-extrabold text-nss-gold uppercase mb-3">
                          {member.position}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
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
                        className="border border-white/5 hover:border-nss-gold/30 rounded-2xl p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-350 shadow-md flex flex-col items-center text-center justify-between"
                      >
                        <div className="space-y-1 w-full">
                          <MemberAvatar name={member.name} />
                          <h4 className="font-extrabold text-sm text-white transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-[10px] font-extrabold text-nss-gold uppercase mt-1 mb-2">
                            {member.position}
                          </p>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
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
                  <h3 className="text-xs uppercase font-extrabold tracking-widest text-nss-gold border-b border-white/5 pb-2">
                    {category} ({members.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {members.map((member) => (
                      <motion.div
                        key={member.id}
                        whileHover={{ y: -3, scale: 1.01 }}
                        className="border border-white/5 hover:border-nss-gold/30 rounded-2xl p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-350 shadow-md flex flex-col items-center text-center justify-between"
                      >
                        <div className="space-y-1 w-full">
                          <MemberAvatar name={member.name} />
                          <h4 className="font-extrabold text-sm text-white transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-[10px] font-extrabold text-nss-gold uppercase mt-1 mb-2">
                            {member.position}
                          </p>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
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
    </div>
  );
}
