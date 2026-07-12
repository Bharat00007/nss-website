"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  Menu, X, Sun, Moon, ChevronDown, UserCheck, 
  HelpCircle, Image as ImageIcon, Award, FileText, 
  ShieldCheck, HelpCircle as HelpIcon, ShieldAlert,
  Tent, Users, CalendarRange, Clock, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleComingSoon = () => setShowComingSoon(true);
    window.addEventListener("show-coming-soon", handleComingSoon);
    return () => window.removeEventListener("show-coming-soon", handleComingSoon);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowComingSoon(false);
      }
    };
    if (showComingSoon) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showComingSoon]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navGroups = [
    {
      title: "About",
      links: [
        { name: "About NSS Movement", href: "/about-nss", icon: Users },
        { name: "JIT NSS Unit Info", href: "/about-jit", icon: HelpCircle },
        { name: "Team JIT NSS", href: "/core-committee", icon: Users },
      ]
    },
    {
      title: "Activities & Events",
      links: [
        { name: "Social Activities", href: "/activities", icon: Tent },
        { name: "Event Calendar", href: "/events", icon: CalendarRange },
        { name: "Media Gallery", href: "/gallery", icon: ImageIcon },
        { name: "Unit Achievements", href: "/achievements", icon: Award },
      ]
    },
    {
      title: "Resources & Portal",
      links: [
        { name: "Camp Reports", href: "/camp-reports", icon: FileText, comingSoon: true },
        { name: "Verification Portal", href: "/certificates-verification", icon: ShieldCheck },
        { name: "Downloads Center", href: "/downloads", icon: FileText, comingSoon: true },
        { name: "News & Bulletins", href: "/news", icon: Clock, comingSoon: true },
      ]
    }
  ];

  return (
    <>
    <header className="sticky top-0 z-50 w-full glass-effect shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logos & Institution Branding */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0">
            <img 
              src="/images/logos/jit.png" 
              alt="JIT Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="relative h-10 w-10 flex-shrink-0">
            <img 
              src="/images/logos/nss.png" 
              alt="NSS Logo" 
              className="h-full w-full object-contain"
            />
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gradient-primary">
              JIT NSS UNIT
            </span>
            <span className="text-[10px] text-muted-foreground leading-none font-medium">
              Jhulelal Institute of Technology, Nagpur
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-all relative py-1 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
              pathname === "/" ? "text-primary font-bold after:w-full" : "text-foreground/80"
            }`}
          >
            Home
          </Link>

          {navGroups.map((group) => (
            <div 
              key={group.title} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(group.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary py-2 cursor-pointer">
                {group.title}
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </button>

              <AnimatePresence>
                {activeDropdown === group.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-1 w-64 rounded-xl border border-border bg-card p-2 shadow-lg ring-1 ring-black/5"
                  >
                    {group.links.map((link: { name: string; href: string; icon: React.ComponentType<{ className?: string }>; comingSoon?: boolean }) => {
                      const Icon = link.icon;
                      const handleClick = (e: React.MouseEvent) => {
                        if (link.comingSoon) {
                          e.preventDefault();
                          setShowComingSoon(true);
                        }
                      };
                      return (
                        <Link
                          key={link.href}
                          href={link.comingSoon ? "#" : link.href}
                          onClick={handleClick}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                            pathname === link.href ? "bg-muted text-primary font-semibold" : "text-foreground/80"
                          }`}
                        >
                          <Icon className="h-4 w-4 text-accent" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link 
            href="/contact" 
            className={`text-sm font-medium transition-all relative py-1 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
              pathname === "/contact" ? "text-primary font-bold after:w-full" : "text-foreground/80"
            }`}
          >
            Contact
          </Link>

          {/* Admin Lock Portal */}
          <Link 
            href="/admin" 
            title="Admin Dashboard"
            className="flex items-center justify-center rounded-lg p-2 text-foreground/75 hover:bg-muted hover:text-primary transition-colors"
          >
            <Lock className="h-4 w-4" />
          </Link>
        </nav>

        {/* Right Section: Theme Toggle, Join Button, Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Light/Dark Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-foreground/70 hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}

          {/* Join NSS Button */}
          <Link
            href="/join-nss"
            className="hidden items-center gap-1.5 rounded-lg bg-accent px-5 py-2 text-sm font-bold text-white shadow-md shadow-accent/20 transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 sm:flex"
          >
            <UserCheck className="h-4 w-4" />
            Join NSS
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-foreground/70 hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-card shadow-inner lg:hidden overflow-hidden"
          >
            <div className="space-y-4 px-4 py-5 sm:px-6">
              <Link 
                href="/" 
                className={`block text-base font-semibold ${
                  pathname === "/" ? "text-primary" : "text-foreground"
                }`}
              >
                Home
              </Link>

              {navGroups.map((group) => (
                <div key={group.title} className="space-y-2 border-l border-border pl-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {group.title}
                  </h3>
                  {group.links.map((link: { name: string; href: string; icon: React.ComponentType<{ className?: string }>; comingSoon?: boolean }) => {
                    const Icon = link.icon;
                    const handleClick = (e: React.MouseEvent) => {
                      if (link.comingSoon) {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        setShowComingSoon(true);
                      }
                    };
                    return (
                      <Link
                        key={link.href}
                        href={link.comingSoon ? "#" : link.href}
                        onClick={handleClick}
                        className={`flex items-center gap-3 py-1.5 text-sm font-medium ${
                          pathname === link.href ? "text-primary" : "text-foreground/80 hover:text-primary"
                        }`}
                      >
                        <Icon className="h-4 w-4 text-accent" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              ))}

              <Link 
                href="/contact" 
                className={`block text-base font-semibold ${
                  pathname === "/contact" ? "text-primary" : "text-foreground"
                }`}
              >
                Contact
              </Link>

              <Link 
                href="/admin" 
                className={`flex items-center gap-2 text-base font-semibold ${
                  pathname === "/admin" ? "text-primary" : "text-foreground"
                }`}
              >
                <Lock className="h-4 w-4" />
                Admin Dashboard
              </Link>

              <div className="pt-2">
                <Link
                  href="/join-nss"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent py-3 text-center text-sm font-bold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent/90"
                >
                  <UserCheck className="h-4 w-4" />
                  Join NSS Unit JIT
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* Coming Soon Modal */}
    <AnimatePresence>
      {showComingSoon && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComingSoon(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl z-10 text-center space-y-6"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold text-foreground flex items-center justify-center gap-2">
                <span>🚧</span> Coming Soon
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This feature is currently under development and will be available in a future update.
                <br /><br />
                We&apos;re working to bring you camp reports, downloadable resources, and the latest NSS news & bulletins soon. Thank you for your patience!
              </p>
            </div>

            <button
              onClick={() => setShowComingSoon(false)}
              className="w-full rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/20 hover:bg-accent/90 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
  );
}
