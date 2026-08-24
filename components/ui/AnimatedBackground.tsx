"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const [fireflies, setFireflies] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate fireflies with random positions, delays, and durations
    // Only generating on mount to avoid hydration mismatch
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}vw`,
      y: `${Math.random() * 100}vh`,
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 5,
    }));
    
    setFireflies(generated);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#0a0410]">
      {/* Dark Purple Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0410] to-[#0a0410]" />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 mix-blend-overlay [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Fireflies (Particles) */}
      {fireflies.map((fly) => (
        <motion.div
          key={fly.id}
          className="absolute rounded-full bg-purple-400 shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"
          style={{ 
            width: fly.size, 
            height: fly.size, 
            left: fly.x, 
            top: fly.y 
          }}
          animate={{
            y: [0, -40, 0, 20, 0],
            x: [0, 20, 0, -20, 0],
            opacity: [0, 0.8, 0.2, 0.9, 0],
          }}
          transition={{
            duration: fly.duration,
            delay: fly.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
