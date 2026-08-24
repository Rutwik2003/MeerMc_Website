"use client";

import { motion } from "framer-motion";
import { BookOpen, Construction, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/env";
import { GlowCard } from "@/components/ui/GlowCard";

export default function WikiPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlowCard hover={false} className="p-12 md:p-16 border-amber-500/20" glowColor="rgba(245, 158, 11, 0.3)">
            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="inline-flex items-center justify-center p-5 rounded-full bg-amber-500/10 mb-8 ring-1 ring-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
              >
                <Construction className="w-12 h-12 text-amber-500" />
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-6 drop-shadow-md">
                Coming Soon
              </h1>
              
              <div className="flex items-center justify-center gap-2 text-white mb-6 bg-white/5 px-4 py-2 rounded-full w-fit mx-auto border border-white/10">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Official Server Wiki</span>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                We are currently building the ultimate guide to the MeerMc universe. 
                Soon, you'll find comprehensive guides on claiming, economy, custom items, and advanced server mechanics right here.
              </p>

              <a 
                href={siteConfig.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold items-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:-translate-y-1 active:translate-y-0"
              >
                Join our Discord for updates
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </div>
  );
}
