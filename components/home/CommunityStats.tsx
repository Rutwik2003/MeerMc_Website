"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Users, TrendingUp, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { cn } from "@/lib/utils";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [count, value]);

  return (
    <span className="tabular-nums font-mono">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function CommunityStats() {
  const stats = [
    {
      icon: Users,
      value: 100,
      suffix: "+",
      label: "Total Players",
      color: "from-blue-500 to-cyan-400",
      glow: "rgba(6, 182, 212, 0.4)",
    },
    {
      icon: Award,
      value: 50,
      suffix: "+",
      label: "Custom Features",
      color: "from-purple-500 to-fuchsia-500",
      glow: "rgba(217, 70, 239, 0.4)",
    },
    {
      icon: TrendingUp,
      value: 100,
      suffix: "+",
      label: "Events Hosted",
      color: "from-pink-500 to-rose-400",
      glow: "rgba(244, 63, 94, 0.4)",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading 
          title="Our Community" 
          subtitle="Join our ever-growing family of passionate Minecraft players"
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <GlowCard glowColor={stat.glow} className="h-full bg-background/40 backdrop-blur-sm border border-white/5">
                <div className="flex flex-col items-center text-center p-4">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500",
                      "bg-gradient-to-br from-background to-black border border-white/10 shadow-xl"
                    )}
                  >
                    <div className={cn("absolute inset-0 rounded-full opacity-20 blur-xl bg-gradient-to-r", stat.color)} />
                    <stat.icon className={cn("w-10 h-10 relative z-10", "text-transparent bg-clip-text bg-gradient-to-br", stat.color)} style={{ stroke: 'url(#gradient-' + index + ')', color: 'inherit' }} />
                    <svg width="0" height="0">
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop stopColor="currentColor" offset="0%" />
                        <stop stopColor="#fff" offset="100%" />
                      </linearGradient>
                    </svg>
                  </div>
                  
                  <h3 className="text-4xl lg:text-5xl font-bold mb-3 text-white drop-shadow-md">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </h3>
                  
                  <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                    {stat.label}
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
