"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Vote, ExternalLink, Gift, Clock, Star, Trophy, ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/env";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function VotePage() {
  const [voters, setVoters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const res = await fetch("/api/voters");
        const data = await res.json();
        if (data.voters) {
          setVoters(data.voters);
        }
      } catch (error) {
        console.error("Failed to fetch voters", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoters();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-primary/10 text-primary ring-1 ring-primary/20 shadow-[0_0_40px_rgba(212,95,255,0.2)] mb-8">
            <Vote className="w-10 h-10" />
          </div>
          <SectionHeading 
            title="Vote For MeerMc" 
            subtitle="Support the server by voting daily! You earn amazing in-game rewards each time you vote on our partner sites." 
          />
        </motion.div>

        {/* Top Voters Leaderboard (Placeholder) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold font-pixel text-white flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Top Voters This Month
            </h3>
            <div className="text-sm text-muted-foreground bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hidden sm:block">
              Rewards distributed on the 1st
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              // Loading Skeletons
              [1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="bento-card p-6 rounded-[2rem] border border-white/5 animate-pulse h-40 bg-white/5" />
              ))
            ) : voters.length > 0 ? (
              voters.map((voter) => (
                <div key={voter.rank} className="bento-card p-6 rounded-[2rem] relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${voter.color} opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${voter.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      #{voter.rank}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{voter.votes}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Votes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                    <img src={`https://crafatar.com/renders/head/${voter.name}?overlay=true`} alt={voter.name} className="w-12 h-12 rounded-lg bg-black/40 border border-white/10" />
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">{voter.name}</h4>
                      <p className="text-xs text-primary font-medium flex items-center gap-1.5"><Gift className="w-3 h-3" /> {voter.reward}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 text-center py-8 text-muted-foreground bg-white/5 rounded-[2rem] border border-white/10">
                No voters found for this month yet. Be the first!
              </div>
            )}
          </div>
        </motion.div>

        {/* Voting Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {siteConfig.voteSites.map((site, index) => (
            <motion.div
              key={site.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="h-full"
            >
              <div className="bento-card rounded-[2rem] p-2 h-full border border-white/5 hover:border-primary/30 transition-all group shadow-lg">
                <div className="bg-black/40 rounded-[1.5rem] p-8 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 text-9xl opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
                    {index % 2 === 0 ? "🍎" : "⭐"}
                  </div>
                  
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div>
                      <h3 className="font-bold text-2xl text-white mb-2">{site.name}</h3>
                      <div className="inline-flex items-center text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Vote every 24 Hours
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10 flex-1 relative z-10">
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mb-4">
                      <Gift className="w-4 h-4 text-primary" /> Guaranteed Rewards
                    </div>
                    <ul className="space-y-3">
                      {site.rewards.map((reward, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/90 bg-white/5 border border-white/10 rounded-xl p-3">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium">{reward}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground mt-6 leading-relaxed border-l-2 border-white/10 pl-4">{site.description}</p>
                  </div>

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md relative z-10 group/btn"
                  >
                    Click to Vote
                    <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Information Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bento-card rounded-[2rem] p-8 md:p-12 text-center border border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10 font-pixel">Vote Shop (/vote shop)</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto relative z-10 leading-relaxed">
              Make sure your Minecraft username matches exactly when voting. Save up your Vote Points to purchase exclusive items, ranks, and cosmetics in-game via the Vote Shop!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
