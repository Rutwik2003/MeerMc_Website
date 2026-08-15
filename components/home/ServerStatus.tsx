"use client";

import { useState } from "react";
import { Users, User, ChevronDown, ServerOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useServerStatus } from "@/hooks/useServerStatus";
import { useRconPlayers } from "@/hooks/useRconPlayers";
import { siteConfig } from "@/config/env";

export default function ServerStatus() {
  const { status, loading, error } = useServerStatus();
  const [showPlayers, setShowPlayers] = useState(false);
  
  const { players: rconPlayers, loading: isFetchingPlayers, fetchPlayers: fetchRconPlayers } = useRconPlayers();

  const isOnline = status.online && !error;

  const handleTogglePlayers = async () => {
    const willShow = !showPlayers;
    setShowPlayers(willShow);

    if (willShow && rconPlayers.length === 0) {
      await fetchRconPlayers();
    }
  };

  return (
    <div className="bg-[#0f111a]/80 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-white/10 flex flex-col gap-5 w-full max-w-sm shadow-2xl relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className={cn(
        "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 transition-colors duration-1000",
        isOnline ? "bg-green-500" : "bg-red-500"
      )} />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
          Server Status
        </span>
        <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full border border-white/5">
          <div className={cn(
            "w-2.5 h-2.5 rounded-full", 
            isOnline ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          )} />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            {loading ? "Pinging..." : isOnline ? "Online" : "Offline"}
          </span> 
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex items-center justify-between text-sm bg-black/20 p-3 rounded-xl border border-white/5 relative z-10">
        <span className="text-gray-400 font-medium">Players Online</span>
        <div className="flex items-center gap-2">
          <Users className={cn("w-4 h-4", isOnline ? "text-primary" : "text-gray-500")} />
          <span className="font-bold text-white font-mono text-base">
            {loading ? "..." : isOnline ? `${status.players}/${status.maxPlayers}` : "0/0"}
          </span>
        </div>
      </div>

      {/* Player List Expandable */}
      {isOnline && status.players > 0 && (
        <div className="relative z-10">
          <button 
            onClick={handleTogglePlayers}
            className="w-full flex items-center justify-center gap-2 text-xs text-primary hover:text-white bg-primary/10 hover:bg-primary/20 transition-colors py-2 rounded-lg font-bold uppercase tracking-wider"
          >
            {showPlayers ? "Hide Players" : `View Players (${status.players})`}
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", showPlayers && "rotate-180")} />
          </button>
          
          <AnimatePresence>
            {showPlayers && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                {isFetchingPlayers ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-xs text-muted-foreground font-medium uppercase tracking-wider animate-pulse">
                      Fetching Live Players...
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar pr-2 pb-2">
                    {rconPlayers.length > 0 ? (
                      rconPlayers.map((name, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white/90 hover:bg-white/10 transition-colors">
                          <img 
                            src={`${siteConfig.api.mcHeads}/avatar/${name}/16`}
                            alt={name}
                            className="w-4 h-4 rounded-sm bg-black/50"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `${siteConfig.api.mcHeads}/avatar/Steve/16`;
                            }}
                          />
                          <span className="font-medium">{name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="w-full text-center py-4 text-xs text-muted-foreground">
                        No players could be fetched.
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Offline state info */}
      {!isOnline && !loading && (
        <div className="text-xs text-center text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20 relative z-10 flex flex-col items-center gap-1">
          <ServerOff className="w-4 h-4 mb-1" />
          <span>Cannot reach the server.</span>
          <span className="text-gray-500">Please check back later.</span>
        </div>
      )}
    </div>
  );
}
