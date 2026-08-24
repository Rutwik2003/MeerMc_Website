"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Heart, Star, Search, Coins, ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/env";
import { PlayerAvatar } from "@/components/ui/PlayerAvatar";



const tierBadgeStyles: Record<string, string> = {
  "VIP+ Supporter": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Elite Supporter": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Banana Supporter": "bg-green-500/15 text-green-400 border-green-500/30",
  Supporter: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
};

function getTierBadgeStyle(tier: string): string {
  return tierBadgeStyles[tier] ?? "bg-white/10 text-white border-white/20";
}

export default function DonatorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [donators, setDonators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/donators')
      .then(res => res.json())
      .then(data => {
        // Format the data
        const formattedData = data.map((d: any, i: number) => ({
          rank: i + 1,
          username: d.username,
          tier: d.tier === 'vip' ? 'VIP+ Supporter' : 
                d.tier === 'elite' ? 'Elite Supporter' : 
                d.tier === 'cutie' ? 'Cutie Supporter' : 
                d.tier === 'investor' ? 'Investor Supporter' : 'Supporter',
          purchasedItems: ['Rank (Auto-Synced)'],
          amount: '?', // Amount not tracked in simple DB
        }));
        setDonators(formattedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const summary = {
    totalRaised: '?',
    totalDonations: donators.length,
    topSupporter: donators.length > 0 ? donators[0].username : 'N/A',
    topSupporterAmount: '?',
  };

  const featured = donators.slice(0, 2);
  const allDonators = useMemo(() => {
    if (!searchQuery.trim()) return donators;
    return donators.filter((d) =>
      d.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, donators]);
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
            Server Wall of Fame
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl lg:text-6xl font-pixel tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <span className="text-gradient">Server </span><span className="text-gradient">Donators</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Honoring the legendary supporters of <strong className="text-white">{siteConfig.name}</strong>. Every purchase directly helps
            maintain high-performance hardware, custom plugins, and lag-free gameplay!
            <br />
            <span className="text-xs text-amber-400/80 mt-2 block flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Donator list auto-syncs every 1 hour to ensure peak server performance.
            </span>
          </motion.p>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14"
        >
          {/* Total Raised */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/8 hover:bg-white/[0.05] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">₹{summary.totalRaised}</p>
              <p className="text-xs text-gray-400">Total Raised</p>
            </div>
          </div>

          {/* Total Donations */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/8 hover:bg-white/[0.05] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{summary.totalDonations}</p>
              <p className="text-xs text-gray-400">Total Donations</p>
            </div>
          </div>

          {/* Top Supporter */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/8 hover:bg-white/[0.05] transition-colors">
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{summary.topSupporter}</p>
              <p className="text-xs text-gray-400">Top Supporter (₹{summary.topSupporterAmount})</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Supporters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 flex flex-col items-center"
        >
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-pixel text-white mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-gradient">Featured Supporters</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl w-full">
            {featured.map((donator, i) => (
              <motion.div
                key={donator.username}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                className={cn(
                  "relative rounded-2xl border p-6 flex flex-col items-center text-center backdrop-blur-xl overflow-hidden transition-all hover:scale-[1.01]",
                  i === 0
                    ? "bg-amber-500/[0.04] border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.08)]"
                    : "bg-white/[0.03] border-white/10"
                )}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                    i === 0
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      : "bg-green-500/15 text-green-400 border-green-500/30"
                  )}>
                    <Star className="w-3 h-3" />
                    {i === 0 ? "Top Donator" : "Supporter"}
                  </span>
                </div>

                {/* Avatar */}
                <div className={cn(
                  "rounded-xl overflow-hidden mb-4 mt-2",
                  i === 0 && "ring-2 ring-amber-500/40 ring-offset-2 ring-offset-[hsl(262,67%,2%)]"
                )}>
                  <PlayerAvatar
                    username={donator.username}
                    size={64}
                    className="w-16 h-16"
                  />
                </div>

                {/* Name + Tier */}
                <h3 className="font-heading font-bold text-white text-lg mb-1">
                  {donator.username}
                </h3>
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border mb-4",
                  getTierBadgeStyle(donator.tier)
                )}>
                  {donator.tier}
                </span>

                {/* Purchased Items */}
                <div className="flex flex-wrap gap-2 justify-center mb-5">
                  {donator.purchasedItems.map((item: string) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] font-bold text-gray-300 uppercase tracking-wider"
                    >
                      🏷 {item}
                    </span>
                  ))}
                </div>

                {/* Contributed Amount */}
                <div className="w-full pt-4 border-t border-white/8">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Contributed</p>
                  <p className="text-2xl font-black text-amber-400">₹{donator.amount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Purchases & Donations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl mx-auto mb-16"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h2 className="flex items-start sm:items-center gap-2 text-base sm:text-lg font-heading font-bold text-white">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
              <span>ALL PURCHASES & DONATIONS ({allDonators.length})</span>
            </h2>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search player name or item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-72 pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-white/5 bg-white/[0.02]">
              <div className="col-span-1">Rank</div>
              <div className="col-span-2">Player</div>
              <div className="col-span-3">Tier & Status</div>
              <div className="col-span-3">Purchased Items</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-1">Profile</div>
            </div>

            {/* Rows */}
            {allDonators.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                No donators found matching your search.
              </div>
            ) : (
              allDonators.map((donator, i) => (
                <motion.div
                  key={donator.username}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.02 * i }}
                  className="px-4 sm:px-6 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <span className="text-primary font-bold text-sm">#{donator.rank}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-3">
                      <PlayerAvatar username={donator.username} size={32} className="w-8 h-8 rounded" />
                      <span className="font-heading font-bold text-white text-sm">{donator.username}</span>
                    </div>
                    <div className="col-span-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border",
                        getTierBadgeStyle(donator.tier)
                      )}>
                        <Star className="w-3 h-3" />
                        {donator.tier.toUpperCase()}
                      </span>
                    </div>
                    <div className="col-span-3 flex flex-wrap gap-1.5">
                      {donator.purchasedItems.map((item: string) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] font-medium text-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="col-span-2">
                      <span className="text-amber-400 font-bold text-base">₹{donator.amount}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-gray-500 text-xs uppercase tracking-wider hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                        Profile <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="md:hidden flex flex-col gap-3">
                    {/* Player row */}
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-bold text-sm w-6">#{donator.rank}</span>
                      <PlayerAvatar username={donator.username} size={32} className="w-8 h-8 rounded" />
                      <span className="font-heading font-bold text-white text-sm">{donator.username}</span>
                    </div>
                    {/* Tier + Items + Amount */}
                    <div className="flex flex-col gap-2 pl-9">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold border w-fit",
                        getTierBadgeStyle(donator.tier)
                      )}>
                        <Star className="w-3 h-3" />
                        {donator.tier.toUpperCase()}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {donator.purchasedItems.map((item: string) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] font-medium text-gray-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <span className="text-amber-400 font-bold text-lg">₹{donator.amount}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/15 via-purple-500/10 to-cyan-500/10 border border-primary/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                  WANT TO SUPPORT {siteConfig.name.toUpperCase()}?
                </h3>
                <p className="text-sm text-gray-400 max-w-lg">
                  Get exclusive ranks, keys, kits, and special perks while supporting the server!
                  Open a support ticket on Discord or visit our store.
                </p>
              </div>
            </div>

            <Link
              href="/shop"
              className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-sm hover:from-blue-500 hover:to-blue-400 transition-all shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.4)]"
            >
              <ShoppingBag className="w-4 h-4" />
              VISIT STORE / BUY RANKS
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
