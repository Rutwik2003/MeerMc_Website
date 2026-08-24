"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Shield, Clock, MapPin, Mic, UserX, MessageSquare, AlertTriangle, Lock, ChevronDown } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/env";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    minecraftUsername: "",
    discordUsername: "",
    age: "",
    timezone: "",
    playtime: "",
    micAccess: "yes",
    previousBans: "no",
    position: "Helper",
    experience: "",
    reason: "",
    scenario1: "",
    scenario2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!siteConfig.applicationsOpen) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card p-12 text-center max-w-lg mx-4"
        >
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-pixel text-white mb-4">Applications Closed</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We are not currently accepting staff applications. Check back later or keep an eye on our Discord for announcements!
          </p>
          <Link href="/about" className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-all">
            Back to Team Page
          </Link>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card p-12 text-center max-w-lg mx-4 border-green-500/30"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-pixel text-white mb-4">Application Sent!</h2>
          <p className="text-muted-foreground leading-relaxed">
            Thank you for applying to the {siteConfig.name} Staff Team! Your application has been submitted securely. 
            Our management team will review it and contact you on Discord if you are selected for an interview.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading 
          title="Staff Application" 
          subtitle="Help us build and protect the best community in Minecraft." 
        />

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="space-y-8"
        >
          {error && (
            <div className="bento-card bg-red-500/10 border-red-500/20 p-4 flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Section 1: Basic Info */}
          <div className="bento-card p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <Shield className="w-5 h-5 text-primary" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Minecraft Username</label>
                <input required type="text" name="minecraftUsername" value={formData.minecraftUsername} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="Notch" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Discord Username</label>
                <input required type="text" name="discordUsername" value={formData.discordUsername} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="user#1234 or @user" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Age</label>
                <input required type="number" min="13" max="99" name="age" value={formData.age} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="18" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input required type="text" name="timezone" value={formData.timezone} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="EST, GMT+1, etc." />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Logistics & Requirements */}
          <div className="bento-card p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <Clock className="w-5 h-5 text-primary" /> Logistics & Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Position Applying For</label>
                <div className="relative">
                  <select name="position" value={formData.position} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none cursor-pointer">
                    <option value="Helper" className="bg-[#120822] text-white">Helper (Entry Level Moderation)</option>
                    <option value="Moderator" className="bg-[#120822] text-white">Moderator</option>
                    <option value="Builder" className="bg-[#120822] text-white">Builder</option>
                    <option value="Developer" className="bg-[#120822] text-white">Developer</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Weekly Playtime (Hours)</label>
                <input required type="number" min="1" max="168" name="playtime" value={formData.playtime} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all" placeholder="How many hours can you dedicate?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Mic className="w-4 h-4" /> Working Microphone?</label>
                <div className="relative">
                  <select name="micAccess" value={formData.micAccess} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none cursor-pointer">
                    <option value="yes" className="bg-[#120822] text-white">Yes, I can use voice chat</option>
                    <option value="no" className="bg-[#120822] text-white">No</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><UserX className="w-4 h-4" /> Previous Punishments?</label>
                <div className="relative">
                  <select name="previousBans" value={formData.previousBans} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none cursor-pointer">
                    <option value="no" className="bg-[#120822] text-white">No, I have a clean record</option>
                    <option value="yes" className="bg-[#120822] text-white">Yes, I have been muted/banned before (Explain in experience)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Experience & Scenarios */}
          <div className="bento-card p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <MessageSquare className="w-5 h-5 text-primary" /> Experience & Scenarios
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Why do you want to join the {siteConfig.name} staff team?</label>
                <textarea required name="reason" value={formData.reason} onChange={handleChange} rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none" placeholder="What motivates you to apply here specifically?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Previous Experience</label>
                <textarea required name="experience" value={formData.experience} onChange={handleChange} rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none" placeholder="Have you been staff on other servers? List them here." />
              </div>
              
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                  <AlertTriangle className="w-4 h-4" /> Staff Scenarios
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">1. A player is consistently spamming the chat and bypassing the chat filter. What steps do you take?</label>
                  <textarea required name="scenario1" value={formData.scenario1} onChange={handleChange} rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none" placeholder="Explain your moderation procedure..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">2. You receive a report that a player is using a hacked client (e.g. X-Ray). Walk us through how you would investigate and handle this.</label>
                  <textarea required name="scenario2" value={formData.scenario2} onChange={handleChange} rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none" placeholder="Explain your investigation procedure..." />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
