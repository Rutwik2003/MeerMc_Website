"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/env";
import { Copy, Check, Shield, Sword, Map, Users, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ServerPage() {
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const [openRule, setOpenRule] = useState<number | null>(null);

  const copyIp = (type: "java" | "bedrock") => {
    const ip = type === "java" 
      ? (siteConfig.server.javaPort === "25565" ? siteConfig.server.javaIp : `${siteConfig.server.javaIp}:${siteConfig.server.javaPort}`)
      : `${siteConfig.server.bedrockIp}:${siteConfig.server.bedrockPort}`;
    navigator.clipboard.writeText(ip);
    if (type === "java") {
      setCopiedJava(true);
      setTimeout(() => setCopiedJava(false), 2000);
    } else {
      setCopiedBedrock(true);
      setTimeout(() => setCopiedBedrock(false), 2000);
    }
  };

  const rules = [
    { title: "[1] Respect & Chat", text: "Treat everyone with respect. No toxicity, harassment, racism, or hate speech. Keep chat English only in global channels." },
    { title: "[2] No Cheating", text: "No hacked clients, x-ray texture packs, auto-clickers, or macros that provide an unfair advantage." },
    { title: "[3] Griefing & Claims", text: "Griefing unclaimed land is allowed, but do not bypass claims or intentionally harass players by claiming directly around their base." },
    { title: "[4] Fair Gameplay", text: "Exploiting server bugs or duping items is strictly prohibited. Report bugs for a reward." },
    { title: "[5] PvP Rules", text: "PvP is allowed in designated zones. Do not combat log or repeatedly target new players." },
    { title: "[6] Economy & Trading", text: "Scamming is not allowed in official trades. Always use the secure trading system." },
    { title: "[7] Accounts & Security", text: "Your account is your responsibility. Do not share accounts or evade bans using alts." },
    { title: "[8] Crossplay Fairness", text: "Both Java and Bedrock players must adhere to the same rules. No version-specific exploits." },
    { title: "[9] Building Rules", text: "No lag machines or inappropriate builds (NSFW/hate symbols). Keep mob farms optimized." },
    { title: "[10] AFK Safety", text: "AFK pools are allowed, but do not bypass the AFK kicker using macros or physical weights." },
    { title: "[11] Common Sense", text: "If you think something might be against the rules, it probably is. Ask a staff member first." }
  ];

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-pixel text-gradient tracking-wider mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] break-words px-2"
          >
            Server Information
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Everything you need to know about joining and playing on {siteConfig.name}.
          </motion.p>
        </div>

        {/* IP Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
          {/* Java IP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bento-card p-6 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <img src="/branding/icons/server-icon.png" alt="Java" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Java Edition</h3>
            <p className="text-sm text-purple-300 font-mono mb-2 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              {siteConfig.server.javaIp}
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Port {siteConfig.server.javaPort} • Version {siteConfig.server.version}
            </p>
            <button 
              onClick={() => copyIp("java")}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              {copiedJava ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
              {copiedJava ? "Copied!" : "Copy IP & Port"}
            </button>
          </motion.div>

          {/* Bedrock IP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bento-card p-6 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <img src="/branding/icons/server-icon.png" alt="Bedrock" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] grayscale" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bedrock Edition</h3>
            <p className="text-sm text-pink-300 font-mono mb-2 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
              {siteConfig.server.bedrockIp}
            </p>
            <p className="text-xs text-muted-foreground mb-6">Port {siteConfig.server.bedrockPort} • Version {siteConfig.server.bedrockVersion}</p>
            <button 
              onClick={() => copyIp("bedrock")}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              {copiedBedrock ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-pink-400" />}
              {copiedBedrock ? "Copied!" : "Copy IP & Port"}
            </button>
          </motion.div>
        </div>

        {/* Features / Game Modes Grid */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-pixel text-white mb-4">What to Expect</h2>
            <p className="text-muted-foreground">Discover our carefully crafted survival experience.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bento-card p-6 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white mb-2">Survival SMP</h3>
              <p className="text-sm text-muted-foreground">Classic survival gameplay with land claims, player-driven economy, and an active friendly community.</p>
            </div>
            <div className="bento-card p-6 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sword className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white mb-2">PvP Duels</h3>
              <p className="text-sm text-muted-foreground">Challenge players to 1v1 ranked duels. Climb the leaderboards and prove your skills.</p>
            </div>
            <div className="bento-card p-6 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white mb-2">Events</h3>
              <p className="text-sm text-muted-foreground">Weekly community events including building contests, treasure hunts, and boss battles.</p>
            </div>
            <div className="bento-card p-6 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white mb-2">Custom Features</h3>
              <p className="text-sm text-muted-foreground">Unique gameplay elements, items, and mechanics created exclusively for our community.</p>
            </div>
          </div>
        </div>

        {/* Server Rules Dropdown/Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-pixel text-white mb-4">Server Rules</h2>
            <p className="text-muted-foreground">By playing on {siteConfig.name}, you agree to these rules.</p>
          </div>

          <div className="space-y-3">
            {rules.map((rule, idx) => (
              <div key={idx} className="bento-card overflow-hidden">
                <button
                  onClick={() => setOpenRule(openRule === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                  <span className="font-bold text-white/90 text-sm sm:text-base">{rule.title}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-purple-400 transition-transform duration-300",
                    openRule === idx ? "rotate-180" : ""
                  )} />
                </button>
                <AnimatePresence>
                  {openRule === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-2 text-sm text-muted-foreground border-t border-white/[0.05]">
                        {rule.text}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Punishment Ladder */}
          <div className="mt-12 text-center pt-8 border-t border-white/10">
            <h4 className="font-bold text-white mb-4">Staff Action Policy</h4>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="bento-card px-3 py-1">Warning</span>
              <span className="text-purple-500/50">→</span>
              <span className="bento-card px-3 py-1">Mute</span>
              <span className="text-purple-500/50">→</span>
              <span className="bento-card px-3 py-1">Kick</span>
              <span className="text-purple-500/50">→</span>
              <span className="bento-card px-3 py-1">Temp Ban</span>
              <span className="text-purple-500/50">→</span>
              <span className="bento-card border-red-500/30 text-red-400 px-3 py-1">Perm Ban</span>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4 max-w-lg mx-auto">
              Severe offenses (hacking, malicious exploitation) will result in an immediate permanent ban without warning.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
