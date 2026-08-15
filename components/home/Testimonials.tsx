"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/env";
import { testimonials } from "@/config/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  }, []);

  const handleManualPaginate = (newDirection: number) => {
    paginate(newDirection);
    setIsAutoPlaying(false); // Pause auto-play temporarily on manual interaction
    
    // Resume auto-play after 10s of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [paginate, isAutoPlaying]);

  const testimonial = testimonials[current];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeading 
          title="What Players Say" 
          subtitle="Don't just take our word for it. See what our community thinks about the server."
        />

        <div className="relative max-w-4xl mx-auto mt-12 px-12">
          {/* Main Card */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[300px] border border-primary/20 shadow-[0_0_40px_rgba(168,85,247,0.1)]">
            {/* Background Accents */}
            <Quote className="absolute top-6 left-6 w-24 h-24 text-primary/10 -rotate-12 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />

            <div className="relative z-10 flex items-center justify-center h-full">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 }
                  }}
                  className="w-full flex flex-col items-center text-center"
                >
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1.5 mb-6 bg-black/20 px-4 py-1.5 rounded-full border border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn("w-4 h-4", i < testimonial.rating ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" : "text-gray-600")}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground text-xl lg:text-2xl mb-8 leading-relaxed font-medium">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50" />
                      <img 
                        src={`${siteConfig.api.mcHeads}/avatar/${testimonial.name}/64`}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-lg border-2 border-primary/50 relative z-10 bg-black/50"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `${siteConfig.api.mcHeads}/avatar/Steve/64`;
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-white font-pixel text-sm tracking-wider mt-2">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-primary font-medium mt-1">
                        Player
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows - Desktop Absolute, Mobile Flow */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-0 lg:px-4 hidden sm:flex">
            <button
              onClick={() => handleManualPaginate(-1)}
              className="p-3 rounded-xl bg-background/80 backdrop-blur-md border border-primary/30 hover:bg-primary hover:text-white text-primary transition-all pointer-events-auto hover:scale-110 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleManualPaginate(1)}
              className="p-3 rounded-xl bg-background/80 backdrop-blur-md border border-primary/30 hover:bg-primary hover:text-white text-primary transition-all pointer-events-auto hover:scale-110 shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Arrows & Dots */}
          <div className="flex items-center justify-center gap-6 mt-8 sm:mt-6">
            <button
              onClick={() => handleManualPaginate(-1)}
              className="sm:hidden p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleManualPaginate(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    current === index
                      ? "bg-primary w-8 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
                      : "bg-primary/30 w-2 hover:bg-primary/60 hover:w-4"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleManualPaginate(1)}
              className="sm:hidden p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
