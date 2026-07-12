"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, ShieldAlert, Search, Download, Printer, 
  Award, QrCode, FileCheck, CheckCircle2, Clock, XCircle 
} from "lucide-react";
import useNssData from "@/hooks/use-nss-data";
import { Certificate } from "@/lib/data/db";

export default function CertificateVerificationPage() {
  const { certificates } = useNssData();
  const [certId, setCertId] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    const found = certificates.find(
      (c) => c.id.toLowerCase() === certId.trim().toLowerCase()
    );
    setResult(found || null);
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-background min-h-screen print:bg-white print:py-0">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 space-y-8 print:max-w-none print:px-0">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            Institutional Registry
          </span>
          <h1 className="text-4xl font-extrabold text-foreground">
            Certificate Verification
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the unique Certificate ID printed on your JIT NSS certificate to verify its authenticity, hours served, and endorsement status.
          </p>
        </div>

        {/* Search Box (Hidden on Print) */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4 print:hidden">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="certificateId" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Certificate ID
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="certificateId"
                  type="text"
                  placeholder="e.g. JITNSS-2026-001"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 pr-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-md hover:bg-primary/90 transition-all cursor-pointer"
            >
              <ShieldCheck className="h-4.5 w-4.5" />
              Verify Authenticity
            </button>
          </form>
        </div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="space-y-6"
            >
              {result ? (
                <div className="space-y-6">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3 text-primary print:hidden">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <p className="text-xs font-semibold">
                      Certificate Verified. Found valid record matching institutional archives.
                    </p>
                  </div>

                  <div className="bg-card border-8 border-double border-primary rounded-3xl p-6 sm:p-10 shadow-lg relative print:shadow-none print:border-primary print:bg-white print:rounded-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                      <img src="/images/logos/nss.png" alt="NSS Logo water" className="h-96 w-96 object-contain" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                      <div className="flex justify-between items-center w-full max-w-md">
                        <img src="/images/logos/jit.png" alt="JIT Logo" className="h-12 w-12 object-contain" />
                        <div>
                          <h4 className="font-bold text-xs uppercase text-foreground print:text-black">NSS Unit JIT</h4>
                          <p className="text-[9px] text-accent font-bold uppercase tracking-widest mt-1">Official Document</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-muted-foreground block font-bold print:text-slate-600">ID: {result.id}</span>
                        </div>
                      </div>

                      <div className="py-6 border-y border-border text-center space-y-3 print:border-slate-300">
                        <h3 className="font-serif text-2xl font-bold text-primary print:text-primary leading-none">
                          Certificate of Service
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto print:text-slate-700">
                          This is to certify that <span className="font-extrabold text-foreground border-b border-dashed border-slate-400 pb-0.5 print:text-black">{result.studentName}</span>, a student of the <span className="font-semibold text-foreground print:text-black">{result.department}</span> department, has successfully completed voluntary services with the JIT NSS Unit under RTM Nagpur University during the event <span className="font-semibold text-foreground print:text-black">{result.event}</span>, serving a total of <span className="font-bold text-accent">{result.hoursServed} Hours</span>.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-end w-full pt-6">
                        <div className="text-center space-y-1 text-[9px] text-muted-foreground">
                          <div className="h-10 flex items-end justify-center">
                            <span className="font-serif italic text-foreground opacity-75 print:text-black">Prof. Rani Rewatkar</span>
                          </div>
                          <p className="border-t border-slate-300 pt-1 font-bold">Programme Officer</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-1">
                          <div className="bg-white p-1.5 border border-slate-200 rounded-lg">
                            <QrCode className="h-12 w-12 text-slate-900" />
                          </div>
                        </div>
                        <div className="text-center space-y-1 text-[9px] text-muted-foreground">
                          <div className="h-10 flex items-end justify-center">
                            <span className="font-serif italic text-foreground opacity-75 print:text-black">Dr. Narendra Bawane</span>
                          </div>
                          <p className="border-t border-slate-300 pt-1 font-bold">Principal</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 print:hidden">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2.5 text-xs font-bold hover:bg-muted transition-all cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      Print / Save PDF
                    </button>
                    <button
                      onClick={() => alert(`Simulated Verification Transcript download for ID: ${result.id}`)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary/90 transition-all cursor-pointer"
                    >
                      <Award className="h-4 w-4" />
                      Official Transcript
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 text-center space-y-4">
                    <div className="h-10 w-10 bg-destructive/20 text-destructive rounded-full flex items-center justify-center mx-auto">
                      <XCircle className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-foreground">Verification Failed</h3>
                      <p className="text-xs text-muted-foreground">
                        No records found for Certificate ID &ldquo;{certId}&rdquo;. Please verify the ID and try again, or contact the JIT Program Office.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
