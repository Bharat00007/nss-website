"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const officialLinks = [
    { name: "National NSS Portal", url: "https://nss.gov.in" },
    { name: "My Bharat Youth Portal", url: "https://mybharat.gov.in" },
    { name: "RTM Nagpur University", url: "https://www.nagpuruniversity.ac.in" },
    { name: "Jhulelal Institute of Technology", url: "https://www.jitnagpur.edu.in" }
  ];

  const quickLinks = [
    { name: "Home Dashboard", href: "/" },
    { name: "About JIT NSS", href: "/about-jit" },
    { name: "NSS Core Team", href: "/team" },
    { name: "NSS Activities", href: "/activities" },
    { name: "Event Calendar", href: "/events" },
    { name: "Join NSS Unit", href: "/join-nss" }
  ];

  const portals = [
    { name: "Certificate Verification", href: "/certificates-verification" },
    { name: "Camp Reports", href: "/camp-reports", comingSoon: true },
    { name: "Downloads Center", href: "/downloads", comingSoon: true },
    { name: "News & Bulletins", href: "/news", comingSoon: true },
    { name: "Contact & Support", href: "/contact" }
  ];

  const socialLinks = [
    { label: "NSS Instagram", url: "https://www.instagram.com/nss_jitnagpur/", icon: Instagram },
    { label: "JIT Instagram", url: "https://www.instagram.com/jitnagpur/", icon: Instagram },
    { label: "JIT Facebook", url: "https://www.facebook.com/JITNAGPUR/", icon: Facebook },
    { label: "JIT LinkedIn", url: "https://in.linkedin.com/school/jhulelal-institute-of-technology-lonara/", icon: Linkedin },
    { label: "JIT X (Twitter)", url: "https://x.com/JIT_Nagpur", icon: Twitter }
  ];

  return (
    <footer className="w-full bg-white dark:bg-[#0c1220] text-slate-900 dark:text-slate-100 border-t border-border transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: JIT NSS Unit Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logos/jit.png" alt="JIT Logo" className="h-10 w-10 object-contain" />
              <img src="/images/logos/nss.png" alt="NSS Logo" className="h-10 w-10 object-contain" />
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 tracking-wider text-sm">JIT NSS UNIT</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Not Me But You</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Serving the community, building leaders. The JIT NSS Unit instills social consciousness and civic responsibilities in students through voluntary services.
            </p>
            
            {/* Official Social Links with brand icons and labels underneath */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-2 text-center w-full">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-full text-center"
                  >
                    <div className="h-9 w-9 rounded-xl bg-muted border border-border flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary transition-all duration-300 shadow-sm hover:-translate-y-0.5">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[8.5px] sm:text-[9px] font-bold text-slate-600 dark:text-slate-400 tracking-wider group-hover:text-primary transition-colors text-center leading-tight max-w-full">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1.5 font-medium">
                    <span className="h-1 w-1 rounded-full bg-accent"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Portals & Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Portals & Info</h3>
            <ul className="space-y-2 text-xs">
              {portals.map((link) => {
                const handleClick = (e: React.MouseEvent) => {
                  if (link.comingSoon) {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("show-coming-soon"));
                  }
                };
                return (
                  <li key={link.name}>
                    <Link
                      href={link.comingSoon ? "#" : link.href}
                      onClick={handleClick}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary"></span>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Address / Official External Link */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  Jhulelal Institute of Technology, Lonara, off Koradi Road, Nagpur, Maharashtra 441111.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">+91 92847 47863, 0712-2668233</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">nss@jitnagpur.edu.in</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-border">
              <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Government Links</h4>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                {officialLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-primary dark:hover:text-primary text-slate-500 dark:text-slate-400 flex items-center gap-0.5 transition-colors font-medium"
                  >
                    {link.name}
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Credits */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div>
            &copy; {currentYear} JIT NSS Unit. All Rights Reserved. Designed & Developed for Jhulelal Institute of Technology.
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Use</Link>
            <span className="flex items-center gap-0.5 text-slate-400 dark:text-slate-500">
              Made with <Heart className="h-3 w-3 text-accent fill-accent" /> by NSS Tech Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
