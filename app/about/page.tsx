"use client";

import { motion } from "framer-motion";
import { Crown, Shield, Users, Clock, Map, Award, MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { teamMembers } from "@/config/team";
import { siteConfig } from "@/config/env";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { cn } from "@/lib/utils";

const values = [
  {
    title: "Community First",
    description: "Every decision we make prioritizes the player experience and community growth.",
    icon: Users,
  },
  {
    title: "Fair Play",
    description: "We maintain a level playing field with strict anti-cheat and clear rules.",
    icon: Shield,
  },
  {
    title: "Constant Evolution",
    description: "Regular updates, new features, and fresh content keep the experience exciting.",
    icon: Clock,
  },
  {
    title: "Open Communication",
    description: "Transparent dialogue between staff and players builds trust.",
    icon: MessageCircle,
  },
];

const timeline = [
  { year: "2023", event: "Server Founded", description: "MeerMc started its journey" },
  { year: "2024", event: "Community Growth", description: "Expanded to new game modes" },
  { year: "2025", event: "Season 1 Ends", description: "A legendary season comes to a close" },
  { year: "2026", event: "A New Era", description: "Massive updates and new features introduced" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          title="About MeerMc" 
          subtitle="Building the ultimate Minecraft community since 2023" 
        />

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <GlowCard hover={false} className="p-8 lg:p-12">
            <h2 className="font-pixel text-lg text-primary mb-6">Our Story</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground leading-relaxed mb-6">
                MeerMc started with a simple vision: create a Minecraft server where community
                comes first. Frustrated with pay-to-win servers and toxic environments, our
                founder set out to build something different—a place where every player matters.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From humble beginnings in 2023, we've grown into a thriving community of
                thousands. Our unique blend of classic survival gameplay, custom features, and
                an amazing player base has made MeerMc a home for Minecraft enthusiasts worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we continue to evolve. With regular updates, community events, and a
                dedicated staff team, we're committed to delivering the best Minecraft
                experience possible. Join us and become part of our story.
              </p>
            </div>
          </GlowCard>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionHeading title="Our Journey" className="mb-12" />
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="bento-card rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary font-mono text-sm">{item.year}</span>
                      <span className="text-foreground font-semibold">{item.event}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionHeading title="Our Values" className="mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <GlowCard className="h-full p-6 text-center hover:border-primary/30 transition-all flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionHeading title="Meet the Team" className="mb-12" />
          <div className="space-y-20">
            {teamMembers.map((team, teamIndex) => (
              <motion.div
                key={team.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: teamIndex * 0.1 }}
              >
                {/* Sleek Role Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className={cn("p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br shadow-lg shrink-0", team.color)}>
                      <team.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-pixel text-white truncate">{team.role}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                        {team.role === "Administrators" && "The core leadership driving the server forward."}
                        {team.role === "Developers" && "The engineers crafting custom experiences."}
                        {team.role === "Moderators" && "Keeping the community safe and fair."}
                        {team.role === "Helpers" && "Friendly faces ready to assist new players."}
                      </p>
                    </div>
                  </div>
                  {/* Quick apply button for empty roles */}
                  {team.members.length === 1 && team.members[0].isPlaceholder && (
                    siteConfig.applicationsOpen ? (
                      <Link href="/apply" className={cn(
                        "inline-flex px-5 py-2 rounded-xl text-white text-sm font-bold items-center gap-2 transition-all hover:scale-105 shadow-lg bg-gradient-to-r",
                        team.color
                      )}>
                        Apply for {team.role} <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="inline-flex px-5 py-2 rounded-xl text-muted-foreground text-sm font-bold items-center gap-2 bg-white/5 border border-white/10">
                        Applications Closed
                      </div>
                    )
                  )}
                </div>

                {/* Grid of Members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-8">
                  {team.members.map((member, memberIndex) => {
                    if (member.isPlaceholder) {
                      if (team.members.length === 1) return null; // Handled by header button
                      
                      return (
                        siteConfig.applicationsOpen ? (
                          <Link href="/apply" key={`apply-${team.role}`} className="group h-full">
                            <div className="bento-card rounded-[2rem] p-6 h-full border-dashed border-2 border-primary/20 hover:border-primary/50 transition-all flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10">
                              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                                <Users className="w-8 h-8 text-primary" />
                              </div>
                              <h4 className="font-bold text-lg text-primary text-center">Join Our Team</h4>
                              <p className="text-sm text-muted-foreground mt-2 text-center">We're looking for staff!</p>
                            </div>
                          </Link>
                        ) : (
                          <div key={`apply-${team.role}`} className="h-full">
                            <div className="bento-card rounded-[2rem] p-6 h-full border-dashed border-2 border-white/10 flex flex-col items-center justify-center bg-white/5 opacity-50">
                              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Users className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <h4 className="font-bold text-lg text-muted-foreground text-center">Team Full</h4>
                              <p className="text-sm text-muted-foreground mt-2 text-center">Not hiring right now.</p>
                            </div>
                          </div>
                        )
                      );
                    }
                    
                    return (
                      <div 
                        key={member.name} 
                        className="bento-card !overflow-visible rounded-[2rem] p-6 pt-0 border border-white/5 relative group hover:border-white/20 transition-all mt-16"
                      >
                        {/* Glow effect matching team color */}
                        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br transition-opacity duration-500", team.color)} />
                        
                        <div className="flex flex-col items-center relative z-10 h-full">
                          {/* 3D Skin Render bursting out of the card */}
                          <div className="h-48 w-full flex items-center justify-center relative -mt-16 mb-4 group-hover:-translate-y-4 transition-transform duration-500 ease-out">
                            {/* Subtle shadow beneath the character */}
                            <div className="absolute bottom-0 w-24 h-4 bg-black/40 blur-xl rounded-full" />
                            <img 
                              src={
                                member.skin?.startsWith("http")
                                  ? member.skin
                                  : `${siteConfig.api.mcHeads}/body/${member.skin || member.name}/256`
                              }
                              alt={`${member.name}'s skin`}
                              className="h-full object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] relative z-10"
                              loading="lazy"
                            />
                          </div>
                          
                          <div className="text-center mt-auto">
                            <h4 className="font-bold text-xl text-white mb-2 group-hover:text-primary transition-colors">{member.name}</h4>
                            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/40 border border-white/5 text-xs text-muted-foreground font-medium shadow-inner">
                              <Clock className="w-3 h-3 text-primary/70" /> Since {member.since}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
