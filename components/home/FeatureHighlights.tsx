"use client";

import { motion } from "framer-motion";
import { Sword, Shield, Sparkles, Users, Map, Trophy } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sword,
    title: "Survival SMP",
    description: "Classic survival gameplay with a twist. Build, explore, and thrive together in an active economy.",
    color: "from-purple-500 to-violet-600",
    glow: "rgba(139, 92, 246, 0.5)",
  },
  {
    icon: Shield,
    title: "PvP Duels",
    description: "Challenge players in ranked PvP battles, climb the leaderboards, and prove your skills.",
    color: "from-violet-500 to-fuchsia-600",
    glow: "rgba(217, 70, 239, 0.5)",
  },
  {
    icon: Sparkles,
    title: "Custom Features",
    description: "Unique gameplay elements, items, and mechanics created exclusively for our community.",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6, 182, 212, 0.5)",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Join thousands of players in our Discord and participate in daily in-game discussions.",
    color: "from-fuchsia-500 to-pink-500",
    glow: "rgba(236, 72, 153, 0.5)",
  },
  {
    icon: Map,
    title: "Premium Ranks",
    description: "Support the server and get amazing perks, cosmetics, and quality-of-life commands.",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.5)",
  },
  {
    icon: Trophy,
    title: "Weekly Events",
    description: "Compete in building contests, treasure hunts, and tournaments for incredible rewards.",
    color: "from-emerald-400 to-teal-500",
    glow: "rgba(16, 185, 129, 0.5)",
  },
];

export default function FeatureHighlights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading 
          title="Why Choose MeerMc?" 
          subtitle="Discover the unique features and experiences that make our server stand out from the rest."
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants} className="h-full perspective-1000">
              <GlowCard 
                glowColor={feature.glow} 
                className="h-full bg-background/50 backdrop-blur-md border border-white/5 transition-transform duration-500 hover:rotate-x-2 hover:-rotate-y-2 group"
              >
                <div className="flex flex-col h-full">
                  {/* Icon Container */}
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg border border-white/10 relative overflow-hidden group-hover:scale-110 transition-transform duration-500 bg-background/50 backdrop-blur-sm"
                  )}>
                    <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-br", feature.color)} />
                    <feature.icon className={cn("w-8 h-8 relative z-10 text-white")} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
