"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

// Form Validation Schema
const contactSchema = zod.object({
  name: zod.string().min(2, "Full Name is required (minimum 2 characters)"),
  email: zod.string().email("Please specify a valid email address"),
  phone: zod.string().regex(/^[6-9]\d{9}$/, "Please specify a valid 10-digit mobile number starting with 6-9"),
  subject: zod.string().min(3, "Subject must be at least 3 characters"),
  message: zod.string().min(10, "Message must be at least 10 characters long")
});

type ContactFormData = zod.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    reset();
  };

  const handleEmailSupport = () => {
    window.location.href = "mailto:nss@jitnagpur.edu.in?subject=JIT%20NSS%20Enquiry";
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
            Help Desk
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
            Contact JIT NSS Unit
          </h1>
          <p className="text-sm text-muted-foreground">
            Connect with the Program Office regarding registrations, rural camps, or certificate checks.
          </p>
        </div>

        {/* Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Column 1: Info and Maps */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-foreground">Office Contact Details</h2>
              
              <ul className="space-y-4 text-xs text-muted-foreground">
                <div className="flex items-start gap-4">
                  <div className="bg-muted p-2.5 rounded-xl">
                    <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-foreground">NSS Office Location</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Room 104, Admin Block, Jhulelal Institute of Technology (JIT),<br />
                      Off Koradi Road, Lonara, Nagpur – 441111, Maharashtra, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-muted p-2.5 rounded-xl">
                    <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-foreground">Official Email Enquiries</h3>
                    <a href="mailto:nss@jitnagpur.edu.in" className="leading-relaxed hover:underline text-primary font-semibold text-xs">
                      nss@jitnagpur.edu.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-muted p-2.5 rounded-xl">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-foreground">Office Operating Hours</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Monday to Friday: 10:00 AM – 4:30 PM (IST)<br />
                      Saturday: 10:00 AM – 1:30 PM (Closed on Sundays & Public Holidays)
                    </p>
                  </div>
                </div>
              </ul>

              <div className="pt-4 border-t border-muted">
                <button
                  onClick={handleEmailSupport}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent py-3 text-xs font-bold text-white shadow hover:opacity-95 transition-colors cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  Email NSS Support
                </button>
              </div>
            </div>

            {/* Simulated Google Map */}
            <div className="space-y-3">
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm h-64 relative">
                <iframe
                  title="JIT Campus Location Map"
                  src="https://maps.google.com/maps?q=Jhulelal%20Institute%20of%20Technology,%20Nagpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale dark:invert"
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
              <button
                onClick={() => alert("Redirecting to simulated Campus Map view...")}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-card border border-border py-3 text-xs font-bold text-foreground hover:bg-muted transition-all shadow-sm cursor-pointer"
              >
                <MapPin className="h-4 w-4 text-accent" />
                Locate Campus on Google Maps <ExternalLink className="h-3 w-3 ml-1" />
              </button>
            </div>
          </div>

          {/* Column 2: Form */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-foreground">Send Message</h2>

            {submitted && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-start gap-3 text-destructive">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-sm leading-none">Section Temporarily Disabled</p>
                  <p className="text-[10px] opacity-80 mt-1">Online inquiries are temporarily disabled. Please use the &ldquo;Email NSS Support&rdquo; button to reach out to us.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] font-bold underline mt-2.5 block hover:opacity-80 cursor-pointer"
                  >
                    Back to form
                  </button>
                </div>
              </div>
            )}

            {!submitted && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.name && (
                    <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email ID</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.email && (
                    <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.phone.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subject / Query Topic</label>
                  <input
                    id="subject"
                    type="text"
                    {...register("subject")}
                    className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.subject && (
                    <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Message / details</label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.message && (
                    <p className="text-[10px] text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent py-3.5 text-xs font-bold text-white shadow-md shadow-accent/25 hover:bg-accent/90 disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending Message..." : "Submit Inquiry to NSS Desk"}
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
