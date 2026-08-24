"use client";

import { useState, useEffect, useMemo } from "react";
import { formatPlaytime, formatNetWorth, SortKey } from "@/config/leaderboard";
import { motion } from "framer-motion";
import { Trophy, Swords, Clock, DollarSign, Search, Crown, Medal, Users, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/env";
import { useServerStatus } from "@/hooks/useServerStatus";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";
import { StatBadge } from "@/components/ui/StatBadge";


const sortTabs: { key: SortKey; label: string; shortLabel: string; icon: React.ReactNode }[] = [
  { key: "netWorth", label: "NET WORTH", shortLabel: "WORTH", icon: <DollarSign className="w-3.5 h-3.5" /> },
  { key: "kills", label: "KILLS", shortLabel: "KILLS", icon: <Swords className="w-3.5 h-3.5" /> },
  { key: "playtime", label: "PLAYTIME", shortLabel: "TIME", icon: <Clock className="w-3.5 h-3.5" /> },
];

const podiumPositionConfig = [
  { order: "lg:order-2", scale: "lg:scale-110", border: "border-amber-500/60", glow: "shadow-[0_0_40px_rgba(245,158,11,0.2)]", crownColor: "text-amber-400", bg: "bg-amber-500/5" },
  { order: "lg:order-1", scale: "", border: "border-white/15", glow: "", crownColor: "text-gray-400", bg: "bg-white/[0.02]" },
  { order: "lg:order-3", scale: "", border: "border-white/15", glow: "", crownColor: "text-amber-700", bg: "bg-white/[0.02]" },
];

const crownIcons = [Crown, Medal, Medal];

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<SortKey>("netWorth");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshCountdown, setRefreshCountdown] = useState(30);
  const { status, loading: statusLoading } = useServerStatus();
  
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        // Format the data from DB
        const formattedData = data.map((d: any, i: number) => ({
          rank: i + 1,
          username: d.username,
          level: Math.floor(d.kills / 10) + 1, // pseudo-level
          kills: d.kills,
          deaths: d.deaths,
          netWorth: 0, // Placeholder
          playtime: 0 // Placeholder
        }));
        setPlayers(formattedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPlayers = useMemo(() => {
    let sorted = [...players];
    // In a real app we'd sort by `sortBy` here, but currently our DB only gives kills top 10
    if (sortBy === 'kills') sorted.sort((a, b) => b.kills - a.kills);
    
    if (!searchQuery.trim()) return sorted;
    return sorted.filter((p) =>
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [players, searchQuery, sortBy]);

  const isSearching = searchQuery.trim().length > 0;
  const top3 = isSearching ? [] : filteredPlayers.slice(0, 3);
  const rest = isSearching ? filteredPlayers : filteredPlayers.slice(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Hero */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Trophy className="w-3.5 h-3.5" />
            Live Rankings
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-pixel tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <span className="text-gradient">Leader</span><span className="text-gradient">board</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            The most feared and respected players on <strong className="text-white">{siteConfig.name}</strong>. Will you rise to the top?
            <br />
            <span className="text-xs text-amber-400/80 mt-2 block flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Leaderboard auto-syncs every 1 hour to ensure peak server performance.
            </span>
          </motion.p>

          {/* Server stat badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium">
              <div className={cn("w-2 h-2 rounded-full", status.online ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" : "bg-red-500")} />
              <Users className="w-3.5 h-3.5 text-green-400" />
              <span className="text-gray-200">
                {statusLoading ? "..." : `${status.players} Online`}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium">
              <Trophy className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-gray-200">{players.length} Players</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
              <RefreshCw className="w-3 h-3 text-primary" />
              {refreshCountdown}s
            </div>
          </motion.div>
        </div>

        {/* Top 3 Podium */}
        {top3.length >= 3 && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto mb-14 items-end"
          >
            {top3.map((player, i) => {
              const config = podiumPositionConfig[i];
              const CrownIcon = crownIcons[i];
              return (
                <motion.div
                  key={player.username}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.1 }}
                  className={cn(
                    "relative rounded-2xl border p-6 flex flex-col items-center text-center backdrop-blur-xl transition-all",
                    config.order,
                    config.scale,
                    config.border,
                    config.glow,
                    config.bg
                  )}
                >
                  {/* Crown / Medal */}
                  <div className={cn("mb-3", config.crownColor)}>
                    <CrownIcon className="w-6 h-6" />
                  </div>

                  {/* Avatar */}
                  <div className={cn(
                    "relative rounded-xl overflow-hidden mb-4",
                    i === 0 ? "ring-2 ring-amber-500/50 ring-offset-2 ring-offset-[hsl(262,67%,2%)]" : ""
                  )}>
                    <PlayerAvatar
                      username={player.username}
                      size={64}
                      className={cn("w-16 h-16", i === 0 && "w-20 h-20")}
                    />
                  </div>

                  {/* Name + Level */}
                  <h3 className="font-heading font-bold text-white text-base sm:text-lg uppercase tracking-wide mb-1 truncate max-w-full">
                    {player.username}
                  </h3>
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5",
                    i === 0
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-primary/15 text-primary border border-primary/30"
                  )}>
                    ★ LVL {player.level}
                  </span>

                  {/* Stats */}
                  <div className="flex gap-2 w-full">
                    <StatBadge
                      value={player.kills}
                      label="Kills"
                      colorClass="bg-blue-500/15 text-blue-400 flex-1"
                    />
                    <StatBadge
                      value={formatNetWorth(player.netWorth)}
                      label="Worth"
                      colorClass="bg-green-500/15 text-green-400 flex-1"
                    />
                    <StatBadge
                      value={formatPlaytime(player.playtime)}
                      label="Time"
                      colorClass="bg-purple-500/15 text-purple-400 flex-1"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Sort Tabs + Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 max-w-5xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {sortTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSortBy(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap",
                  sortBy === tab.key
                    ? "bg-primary/15 text-primary border-primary/40"
                    : "bg-white/[0.03] text-gray-400 border-white/10 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search player..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Rankings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-white/5">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Player</div>
            <div className="col-span-2 text-center">
              <span className="text-green-500">$</span> Net Worth
            </div>
            <div className="col-span-2 text-center">
              <span className="text-blue-400">⚔</span> Kills
            </div>
            <div className="col-span-2 text-center">
              <span className="text-red-400">✕</span> Deaths
            </div>
            <div className="col-span-2 text-center">
              <span className="text-purple-400">⏱</span> Playtime
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {rest.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                {searchQuery ? "No players found matching your search." : "No more players to show."}
              </div>
            )}
            {rest.map((player, i) => (
              <motion.div
                key={player.username}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.02 * i }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-4 sm:px-5 py-4 rounded-xl border border-transparent hover:bg-white/[0.03] hover:border-white/8 transition-all"
              >
                {/* Rank */}
                <div className="hidden md:flex col-span-1 items-center">
                  <span className="text-gray-500 font-mono text-sm font-bold">{player.rank}</span>
                </div>

                {/* Player Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <span className="md:hidden text-gray-500 font-mono text-sm font-bold w-6">{player.rank}</span>
                  <PlayerAvatar username={player.username} size={32} className="w-8 h-8 rounded" />
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-white text-sm uppercase tracking-wide">
                      {player.username}
                    </span>
                    <span className="text-[10px] text-primary font-bold">★ LVL {player.level}</span>
                  </div>
                </div>

                {/* Mobile Stats Row */}
                <div className="md:hidden grid grid-cols-2 gap-2 ml-9">
                  <StatBadge value={formatNetWorth(player.netWorth)} label="Worth" colorClass="bg-green-500/10 text-green-400 flex-1" />
                  <StatBadge value={player.kills} label="Kills" colorClass="bg-blue-500/10 text-blue-400 flex-1" />
                  <StatBadge value={player.deaths} label="Deaths" colorClass="bg-red-500/10 text-red-400 flex-1" />
                  <StatBadge value={formatPlaytime(player.playtime)} label="Time" colorClass="bg-purple-500/10 text-purple-400 flex-1" />
                </div>

                {/* Desktop Stats */}
                <div className="hidden md:flex col-span-2 justify-center">
                  <span className="px-4 py-1.5 rounded-lg bg-green-500/10 text-green-400 font-bold text-sm">
                    {formatNetWorth(player.netWorth)}
                  </span>
                </div>
                <div className="hidden md:flex col-span-2 justify-center">
                  <span className="px-4 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-sm">
                    {player.kills}
                  </span>
                </div>
                <div className="hidden md:flex col-span-2 justify-center">
                  <span className="px-4 py-1.5 rounded-lg bg-red-500/10 text-red-400 font-bold text-sm">
                    {player.deaths}
                  </span>
                </div>
                <div className="hidden md:flex col-span-2 justify-center">
                  <span className="px-4 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 font-bold text-sm">
                    {formatPlaytime(player.playtime)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
