"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, LayoutDashboard, ShieldCheck, Users, Calendar, 
  Clock, Plus, Trash2, Check, X, LogOut, Award, 
  MapPin, Bell, Image as ImageIcon, Sparkles, FileText, CheckCircle2 
} from "lucide-react";
import useNssData from "@/hooks/use-nss-data";
import { PastEvent, NewsItem, FacultyLeader, Certificate, CommitteeMember } from "@/lib/data/db";

export default function AdminDashboardPage() {
  const {
    loading,
    pastEvents: events,
    news,
    leadership: team,
    certificates,
    joinRequests,
    committeeMembers,
    updatePastEvents: updateEvents,
    updateNews,
    updateCertificates,
    updateCommitteeMembers,
    approveOrRejectRequest
  } = useNssData();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab navigation states
  const [activeTab, setActiveTab] = useState<"requests" | "events" | "news" | "team" | "certificates" | "committee">("requests");

  // Form input states
  const [newEvent, setNewEvent] = useState<{
    title: string;
    description: string;
    category: PastEvent["category"];
    date: string;
    time: string;
    location: string;
    participants: number;
    hoursServed: number;
  }>({
    title: "",
    description: "",
    category: "Blood Donation",
    date: "",
    time: "09:00 AM - 04:30 PM",
    location: "JIT Campus",
    participants: 100,
    hoursServed: 400
  });

  const [newNews, setNewNews] = useState<{
    title: string;
    content: string;
    category: NewsItem["category"];
    isFeatured: boolean;
  }>({
    title: "",
    content: "",
    category: "Circular",
    isFeatured: false
  });

  const [newCertificate, setNewCertificate] = useState({
    id: "",
    studentName: "",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    event: "Blood Donation Camp",
    hoursServed: 12
  });

  const [newCommitteeMember, setNewCommitteeMember] = useState<{
    name: string;
    position: string;
    category: CommitteeMember["category"];
    description: string;
  }>({
    name: "",
    position: "",
    category: "Core Committee",
    description: ""
  });

  const handleAddCommitteeMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommitteeMember.name || !newCommitteeMember.position) return;

    const added: CommitteeMember = {
      id: `cm-${Date.now()}`,
      name: newCommitteeMember.name,
      position: newCommitteeMember.position,
      category: newCommitteeMember.category,
      description: newCommitteeMember.description || "NSS Selected Representative."
    };

    updateCommitteeMembers([added, ...committeeMembers]);
    setNewCommitteeMember({
      name: "",
      position: "",
      category: "Core Committee",
      description: ""
    });
  };

  const handleDeleteCommitteeMember = (id: string) => {
    const filtered = committeeMembers.filter(item => item.id !== id);
    updateCommitteeMembers(filtered);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("You are not authorized. This portal is currently locked for future development.");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // CRUD handlers
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    const added: PastEvent = {
      id: `evt-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      participants: Number(newEvent.participants),
      hoursServed: Number(newEvent.hoursServed),
      imageUrl: "/images/gallery/7days nss camp.jpeg", // fallback default
      isUpcoming: new Date(newEvent.date) >= new Date(),
      status: new Date(newEvent.date) >= new Date() ? "Scheduled" : "Completed"
    };

    updateEvents([added, ...events]);
    setNewEvent({
      title: "",
      description: "",
      category: "Blood Donation",
      date: "",
      time: "09:00 AM - 04:30 PM",
      location: "JIT Campus",
      participants: 100,
      hoursServed: 400
    });
    alert("New Event Campaign Added successfully!");
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      updateEvents(events.filter(e => e.id !== id));
    }
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title || !newNews.content) return;

    const added: NewsItem = {
      id: `news-${Date.now()}`,
      title: newNews.title,
      content: newNews.content,
      category: newNews.category,
      date: new Date().toISOString().split("T")[0],
      isFeatured: newNews.isFeatured
    };

    updateNews([added, ...news]);
    setNewNews({
      title: "",
      content: "",
      category: "Circular",
      isFeatured: false
    });
    alert("News & announcement released successfully!");
  };

  const handleDeleteNews = (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      updateNews(news.filter(n => n.id !== id));
    }
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertificate.id || !newCertificate.studentName) return;

    const added: Certificate = {
      id: newCertificate.id.trim().toUpperCase(),
      studentName: newCertificate.studentName,
      department: newCertificate.department,
      year: newCertificate.year,
      event: newCertificate.event,
      hoursServed: Number(newCertificate.hoursServed),
      issueDate: new Date().toISOString().split("T")[0],
      qrCodeValue: `https://jitnss.edu/verify/${newCertificate.id.trim().toUpperCase()}`,
      status: "Valid"
    };

    updateCertificates([added, ...certificates]);
    setNewCertificate({
      id: "",
      studentName: "",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      event: "Blood Donation Camp",
      hoursServed: 12
    });
    alert("Certificate entry added and verified!");
  };

  const handleDeleteCertificate = (id: string) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      updateCertificates(certificates.filter(c => c.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
              <Lock className="h-5 w-5 animate-pulse" />
            </div>
            <h1 className="text-xl font-bold">Admin Portal</h1>
            <p className="text-xs text-muted-foreground">Specify credentials to edit dynamic items and manage applications.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/30 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-muted/30 py-2.5 px-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {authError && <p className="text-[10px] text-destructive font-bold">{authError}</p>}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl text-xs font-bold shadow hover:bg-primary/90"
            >
              Access Secure Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Program Office Dashboard</h1>
              <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Secure Admin Session Active
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-xs font-bold hover:bg-muted text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Analytics stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Pending Requests</p>
            <p className="text-2xl font-extrabold text-accent mt-1">
              {joinRequests.filter(r => r.status === "Pending").length}
            </p>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Registered Team</p>
            <p className="text-2xl font-extrabold text-foreground mt-1">{team.length}</p>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Total Campaigns</p>
            <p className="text-2xl font-extrabold text-foreground mt-1">{events.length}</p>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Certificates Issued</p>
            <p className="text-2xl font-extrabold text-foreground mt-1">{certificates.length}</p>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {[
            { id: "requests", label: "Join Requests", count: joinRequests.filter(r => r.status === "Pending").length },
            { id: "events", label: "Events Manager" },
            { id: "news", label: "News Bulletins" },
            { id: "certificates", label: "Certificates" },
            { id: "committee", label: "Committee Reveal" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as "requests" | "events" | "news" | "team" | "certificates" | "committee")}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === t.id 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-card border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span className="bg-accent text-white text-[9px] rounded-full px-1.5 py-0.5 leading-none">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Contents */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[350px]">
          <AnimatePresence mode="wait">
            
            {/* 1. JOIN REQUESTS TAB */}
            {activeTab === "requests" && (
              <motion.div
                key="requests"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-bold border-b border-muted pb-2">Student Registration Applications</h2>
                
                <div className="space-y-4">
                  {joinRequests.map((req) => (
                    <div 
                      key={req.id}
                      className="border border-border rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start justify-between bg-muted/10 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <img 
                          src={req.photoUrl} 
                          alt={req.name} 
                          className="h-12 w-12 rounded-full border bg-muted object-cover flex-shrink-0"
                        />
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-extrabold text-sm">{req.name}</h3>
                            <p className="text-[10px] text-muted-foreground">
                              {req.department} ({req.year}) | Phone: {req.phone} | Email: {req.email}
                            </p>
                          </div>
                          
                          <p className="text-xs text-muted-foreground bg-card border p-3 rounded-lg leading-relaxed">
                            <span className="font-bold block text-[10px] uppercase text-slate-500 mb-1">Reason to Join:</span>
                            &ldquo;{req.whyJoin}&rdquo;
                          </p>

                          <div className="flex flex-wrap gap-2 text-[9px] font-bold text-primary uppercase tracking-wider">
                            <span className="bg-primary/15 px-2.5 py-0.5 rounded-full">Skills: {req.skills}</span>
                            <span className="bg-accent/15 text-accent px-2.5 py-0.5 rounded-full">Prefers: {req.availability}</span>
                          </div>
                        </div>
                      </div>

                      {req.status === "Pending" ? (
                        <div className="flex gap-2 w-full md:w-auto">
                          <button
                            onClick={() => approveOrRejectRequest(req.id, "Approved")}
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-700"
                          >
                            <Check className="h-4 w-4" /> Approve
                          </button>
                          <button
                            onClick={() => approveOrRejectRequest(req.id, "Rejected")}
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold hover:bg-muted text-destructive"
                          >
                            <X className="h-4 w-4" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${
                          req.status === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}>
                          {req.status}
                        </span>
                      )}
                    </div>
                  ))}

                  {joinRequests.length === 0 && (
                    <div className="text-center py-12 text-xs text-muted-foreground">
                      No student registration requests logged yet. Submit from the /join-nss form!
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 2. EVENTS TAB */}
            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Form to Add Event */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-sm font-bold border-b border-muted pb-2 uppercase tracking-wider">Register New Event</h2>
                  
                  <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Title</label>
                      <input
                        type="text"
                        required
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold focus:outline-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground uppercase">Category</label>
                        <select
                          value={newEvent.category}
                          onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as PastEvent["category"] })}
                          className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold"
                        >
                          <option>Blood Donation</option>
                          <option>Tree Plantation</option>
                          <option>Cleanliness Drive</option>
                          <option>Health Awareness</option>
                          <option>Village Adoption</option>
                          <option>Women Empowerment</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground uppercase">Date</label>
                        <input
                          type="date"
                          required
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          className="w-full rounded-xl border border-border bg-muted/20 py-2 px-3 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Location / Venue</label>
                      <input
                        type="text"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Description</label>
                      <textarea
                        rows={3}
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2 px-3 font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground uppercase">Participants</label>
                        <input
                          type="number"
                          value={newEvent.participants}
                          onChange={(e) => setNewEvent({ ...newEvent, participants: Number(e.target.value) })}
                          className="w-full rounded-xl border border-border bg-muted/20 py-2 px-3 font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground uppercase">Service Hours</label>
                        <input
                          type="number"
                          value={newEvent.hoursServed}
                          onChange={(e) => setNewEvent({ ...newEvent, hoursServed: Number(e.target.value) })}
                          className="w-full rounded-xl border border-border bg-muted/20 py-2 px-3 font-semibold"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent/90 inline-flex items-center justify-center gap-1"
                    >
                      <Plus className="h-4.5 w-4.5" /> Save Event
                    </button>
                  </form>
                </div>

                {/* List of active events */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-sm font-bold border-b border-muted pb-2 uppercase tracking-wider">Active Campaigns ({events.length})</h2>
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {events.map((evt) => (
                      <div key={evt.id} className="border border-border rounded-xl p-4 flex items-center justify-between bg-muted/10">
                        <div>
                          <h3 className="font-extrabold text-sm text-foreground">{evt.title}</h3>
                          <div className="flex gap-3 text-[10px] text-muted-foreground font-semibold mt-1">
                            <span className="uppercase text-primary">{evt.category}</span>
                            <span>&bull;</span>
                            <span>{new Date(evt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="rounded-full bg-muted hover:bg-destructive hover:text-white p-2 text-muted-foreground transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. NEWS TAB */}
            {activeTab === "news" && (
              <motion.div
                key="news"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Form to Add News */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-sm font-bold border-b border-muted pb-2 uppercase tracking-wider">Publish Announcement</h2>
                  
                  <form onSubmit={handleAddNews} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Title</label>
                      <input
                        type="text"
                        required
                        value={newNews.title}
                        onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold focus:outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Category</label>
                      <select
                        value={newNews.category}
                        onChange={(e) => setNewNews({ ...newNews, category: e.target.value as NewsItem["category"] })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold"
                      >
                        <option>Circular</option>
                        <option>Announcement</option>
                        <option>Camp</option>
                        <option>Recruitment</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Content Details</label>
                      <textarea
                        rows={4}
                        required
                        value={newNews.content}
                        onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2 px-3 font-semibold"
                      />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer py-1 text-xs">
                      <input
                        type="checkbox"
                        checked={newNews.isFeatured}
                        onChange={(e) => setNewNews({ ...newNews, isFeatured: e.target.checked })}
                        className="h-4 w-4 rounded text-primary"
                      />
                      <span className="font-bold">Highlight as Featured Announcement</span>
                    </label>

                    <button
                      type="submit"
                      className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent/90 inline-flex items-center justify-center gap-1"
                    >
                      <Plus className="h-4.5 w-4.5" /> Release Bulletin
                    </button>
                  </form>
                </div>

                {/* List of News */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-sm font-bold border-b border-muted pb-2 uppercase tracking-wider">Circular Archive ({news.length})</h2>
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {news.map((item) => (
                      <div key={item.id} className="border border-border rounded-xl p-4 flex items-center justify-between bg-muted/10">
                        <div>
                          <h3 className="font-extrabold text-sm text-foreground flex items-center gap-2">
                            {item.title}
                            {item.isFeatured && <span className="bg-accent text-white text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded">Featured</span>}
                          </h3>
                          <div className="flex gap-3 text-[10px] text-muted-foreground font-semibold mt-1">
                            <span className="uppercase text-primary">{item.category}</span>
                            <span>&bull;</span>
                            <span>{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="rounded-full bg-muted hover:bg-destructive hover:text-white p-2 text-muted-foreground transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. CERTIFICATES TAB */}
            {activeTab === "certificates" && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Form to Add Certificate */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-sm font-bold border-b border-muted pb-2 uppercase tracking-wider">Issue Student Certificate</h2>
                  
                  <form onSubmit={handleAddCertificate} className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Unique Certificate ID</label>
                      <input
                        type="text"
                        placeholder="JITNSS-2026-005"
                        required
                        value={newCertificate.id}
                        onChange={(e) => setNewCertificate({ ...newCertificate, id: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Student Full Name</label>
                      <input
                        type="text"
                        required
                        value={newCertificate.studentName}
                        onChange={(e) => setNewCertificate({ ...newCertificate, studentName: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground uppercase">Department</label>
                        <input
                          type="text"
                          value={newCertificate.department}
                          onChange={(e) => setNewCertificate({ ...newCertificate, department: e.target.value })}
                          className="w-full rounded-xl border border-border bg-muted/20 py-2 px-3 font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-muted-foreground uppercase">Year</label>
                        <input
                          type="text"
                          value={newCertificate.year}
                          onChange={(e) => setNewCertificate({ ...newCertificate, year: e.target.value })}
                          className="w-full rounded-xl border border-border bg-muted/20 py-2 px-3 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Event / Campaign Name</label>
                      <input
                        type="text"
                        value={newCertificate.event}
                        onChange={(e) => setNewCertificate({ ...newCertificate, event: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Service Hours Served</label>
                      <input
                        type="number"
                        value={newCertificate.hoursServed}
                        onChange={(e) => setNewCertificate({ ...newCertificate, hoursServed: Number(e.target.value) })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent/90 inline-flex items-center justify-center gap-1"
                    >
                      <Plus className="h-4.5 w-4.5" /> Register Certificate
                    </button>
                  </form>
                </div>

                {/* List of Certificates */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-sm font-bold border-b border-muted pb-2 uppercase tracking-wider">Issued Certificates ({certificates.length})</h2>
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="border border-border rounded-xl p-4 flex items-center justify-between bg-muted/10">
                        <div>
                          <h3 className="font-extrabold text-sm text-foreground">{cert.studentName} ({cert.id})</h3>
                          <div className="flex gap-3 text-[10px] text-muted-foreground font-semibold mt-1">
                            <span className="uppercase text-primary">{cert.event}</span>
                            <span>&bull;</span>
                            <span>{cert.hoursServed} Hours</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="rounded-full bg-muted hover:bg-destructive hover:text-white p-2 text-muted-foreground transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "committee" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Form to Add Committee Member */}
                <div className="bg-card border border-border p-6 rounded-2xl shadow-sm h-fit">
                  <h2 className="text-sm font-bold border-b border-muted pb-2 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Plus className="h-5 w-5 text-primary" /> Add Selected Member
                  </h2>

                  <form onSubmit={handleAddCommitteeMember} className="space-y-4 text-xs font-semibold">
                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Student Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter student full name"
                        value={newCommitteeMember.name}
                        onChange={(e) => setNewCommitteeMember({ ...newCommitteeMember, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Official Position</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter official position (e.g. President)"
                        value={newCommitteeMember.position}
                        onChange={(e) => setNewCommitteeMember({ ...newCommitteeMember, position: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Committee Category</label>
                      <select
                        value={newCommitteeMember.category}
                        onChange={(e) => setNewCommitteeMember({ ...newCommitteeMember, category: e.target.value as "Advisory" | "Core Committee" | "Junior Committee" | "Executive Members" })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold hover:cursor-pointer"
                      >
                        <option value="Advisory">Advisory</option>
                        <option value="Core Committee">Core Committee</option>
                        <option value="Junior Committee">Junior Committee</option>
                        <option value="Executive Members">Executive Members</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-muted-foreground uppercase">Role Description</label>
                      <textarea
                        rows={3}
                        placeholder="Short description of duties..."
                        value={newCommitteeMember.description}
                        onChange={(e) => setNewCommitteeMember({ ...newCommitteeMember, description: e.target.value })}
                        className="w-full rounded-xl border border-border bg-muted/20 py-2.5 px-3 font-semibold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-accent/90 inline-flex items-center justify-center gap-1"
                    >
                      <Plus className="h-4.5 w-4.5" /> Appoint to Committee
                    </button>
                  </form>
                </div>

                {/* List of Committee Members */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-sm font-bold border-b border-muted pb-2 uppercase tracking-wider">Officially Selected Committee ({committeeMembers?.length || 0})</h2>
                  
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {committeeMembers?.map((member) => (
                      <div key={member.id} className="border border-border rounded-xl p-4 flex items-center justify-between bg-muted/10">
                        <div>
                          <h3 className="font-extrabold text-sm text-foreground">{member.name}</h3>
                          <div className="flex flex-col gap-1 text-[10px] text-muted-foreground font-semibold mt-1">
                            <div>
                              <span className="uppercase text-primary font-bold">{member.position}</span>
                              <span className="mx-2">&bull;</span>
                              <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[8px] uppercase tracking-wide">{member.category}</span>
                            </div>
                            <p className="text-slate-500 font-medium italic mt-1">{member.description}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteCommitteeMember(member.id)}
                          className="rounded-full bg-muted hover:bg-destructive hover:text-white p-2 text-muted-foreground transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
