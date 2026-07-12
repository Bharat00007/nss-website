"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { 
  UserCheck, AlertCircle, CheckCircle, ArrowLeft, 
  Send, User, Mail, Phone, BookOpen, GraduationCap, ShieldAlert,
  Clock, X, ArrowRight
} from "lucide-react";
import useNssData from "@/hooks/use-nss-data";
import Link from "next/link";
import { JoinRequest } from "@/lib/data/db";
import { motion, AnimatePresence } from "framer-motion";

// Form Validation Schema
const joinSchema = zod.object({
  name: zod.string().min(2, "Full Name is required (minimum 2 characters)"),
  department: zod.string().min(1, "Please choose your department"),
  year: zod.string().min(1, "Please choose your academic year"),
  email: zod.string().email("Please specify a valid email address"),
  phone: zod.string().regex(/^[6-9]\d{9}$/, "Please specify a valid 10-digit mobile number starting with 6-9"),
  skills: zod.string().min(2, "Please specify your skills (e.g., teaching, photography, design)"),
  interests: zod.array(zod.string()).min(1, "Please choose at least one social service interest area"),
  availability: zod.string().min(1, "Please specify your availability"),
  whyJoin: zod.string().min(10, "Please provide a brief justification (minimum 10 characters)"),
  photoUrl: zod.string().optional() // simulated photo path
});

type JoinFormData = zod.infer<typeof joinSchema>;

export default function JoinNssPage() {
  const { submitJoinRequest } = useNssData();
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showClosedModal, setShowClosedModal] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowClosedModal(false);
      }
    };
    if (showClosedModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showClosedModal]);

  const departments = [
    "APPLIED SCIENCE & HUMANITIES",
    "ELECTRONICS & TELECOMMUNICATION ENGINEERING",
    "ELECTRONICS AND COMPUTER ENGINEERING",
    "ADVANCED COMMUNICATION TECHNOLOGY",
    "COMPUTER SCIENCE AND ENGINEERING",
    "ELECTRICAL ENGINEERING",
    "MASTER OF BUSINESS ADMINISTRATION (MBA)",
    "CSE (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)",
    "ELECTRONICS AND COMPUTER SCIENCE",
    "CSE (ARTIFICIAL INTELLIGENCE AND DATA SCIENCE)",
    "MECHANICAL ENGINEERING"
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const interestOptions = [
    "Blood Donation Camps",
    "Tree Plantation & Ecology",
    "Cleanliness Campaigns (Swachh Bharat)",
    "Village Adoption & Rural Upliftment",
    "Digital Literacy & Education",
    "Women Empowerment & Seminars",
    "Disaster Management & Relief",
    "Yoga & Health Awareness"
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      interests: [],
      photoUrl: ""
    }
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate photo upload by creating local object URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setValue("photoUrl", previewUrl);
    }
  };

  const onSubmit = (data: JoinFormData) => {
    // Intercept form submission and show the closed popup modal
    setShowClosedModal(true);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Voluntary Service
          </span>
          <h1 className="text-4xl font-extrabold text-foreground">
            Join the NSS Unit
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete this online enrollment form. Selected candidates will be notified via email to attend the orientation session.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Enrollment Submitted</h2>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Thank you for applying to join the Jhulelal Institute of Technology NSS Unit. Your application has been logged and forwarded to the Programme Officer for review.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-lg border border-border px-6 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-all cursor-pointer"
                >
                  Submit Another
                </button>
                <Link
                  href="/"
                  className="rounded-lg border border-border px-6 py-2.5 text-xs font-bold text-foreground hover:bg-muted"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <h2 className="text-sm font-bold text-foreground border-b border-muted pb-2 uppercase tracking-wider">
                Personal & College Details
              </h2>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Student Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-muted/20 py-2.5 pl-10 pr-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Department */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Department</label>
                  <select
                    {...register("department")}
                    className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.department.message}</p>
                  )}
                </div>

                {/* Year */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Year of Study</label>
                  <select
                    {...register("year")}
                    className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  {errors.year && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.year.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-border bg-muted/20 py-2.5 pl-10 pr-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="Enter your 10-digit mobile number"
                      className="w-full rounded-xl border border-border bg-muted/20 py-2.5 pl-10 pr-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.phone.message}</p>
                  )}
                </div>
              </div>

              <h2 className="text-sm font-bold text-foreground border-b border-muted pb-2 uppercase tracking-wider pt-4">
                Skills & Volunteer Interests
              </h2>

              {/* Skills */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Special Skills / Hobbies</label>
                <input
                  type="text"
                  {...register("skills")}
                  placeholder="Enter your special skills or hobbies"
                  className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.skills && (
                  <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.skills.message}</p>
                )}
              </div>

              {/* Availability */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Availability for Campaigns</label>
                <select
                  {...register("availability")}
                  className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Choose Availability</option>
                  <option value="Only Weekends">Only Weekends (Saturdays & Sundays)</option>
                  <option value="Weekdays & Weekends">Both Weekdays & Weekends</option>
                  <option value="Only during Special Residential Camps">Only during 7-Day Residential Camps</option>
                </select>
                {errors.availability && (
                  <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.availability.message}</p>
                )}
              </div>

              {/* Interest Areas (Checkboxes) */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Campaign Interest Areas (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {interestOptions.map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-muted/30 border border-transparent hover:border-border">
                      <input
                        type="checkbox"
                        value={option}
                        {...register("interests")}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.interests && (
                  <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.interests.message}</p>
                )}
              </div>

              {/* Why join essay statement */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Why do you want to join JIT NSS?</label>
                <textarea
                  rows={4}
                  {...register("whyJoin")}
                  placeholder="Describe your motivation for joining JIT NSS"
                  className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.whyJoin && (
                  <p className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.whyJoin.message}</p>
                )}
              </div>

              {/* Photo Upload with preview */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Passport size Photo</label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-muted file:text-foreground hover:file:bg-slate-200 cursor-pointer"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">Accepts PNG, JPG, or JPEG up to 2MB.</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 hover:bg-accent/90 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? "Submitting Application..." : "Submit NSS Volunteer Application"}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>

            </form>
          )}

        </div>

      </div>

      {/* Registrations Closed Modal */}
      <AnimatePresence>
        {showClosedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/65 backdrop-blur-sm"
            onClick={() => setShowClosedModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border/80 rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShowClosedModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
              </div>
              <div className="space-y-3 text-center">
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">Registrations Closed</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  NSS inductions for the <strong className="text-foreground">2026–27</strong> academic session are now closed.
                </p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed font-medium">
                  Please wait for the next academic year&apos;s enrollment cycle. New induction announcements will be published on this portal.
                </p>
              </div>
              <button
                onClick={() => setShowClosedModal(false)}
                className="w-full rounded-2xl bg-accent px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-accent/90 transition-all cursor-pointer"
              >
                Got it, I&apos;ll wait!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
