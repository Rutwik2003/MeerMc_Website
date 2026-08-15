"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { CrateKey } from "@/types";

interface CrateCarouselProps {
  crates: CrateKey[];
  onBuy: (crate: CrateKey) => void;
}

export default function CrateCarousel({ crates, onBuy }: CrateCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % crates.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + crates.length) % crates.length);
  };

  return (
    <div className="flex flex-col items-center mx-auto w-full py-10">
      
      {/* 3D Carousel Container */}
      <div className="relative flex items-center justify-center w-full max-w-sm sm:max-w-md h-[550px] perspective-1000">
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute -left-20 z-50 w-14 h-14 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-xl shadow-2xl"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button
          onClick={handleNext}
          className="hidden md:flex absolute -right-20 z-50 w-14 h-14 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-xl shadow-2xl"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <AnimatePresence initial={false}>
          {crates.map((item, index) => {
            let offset = index - currentIndex;
            if (offset < -1) offset += crates.length;
            if (offset > 1) offset -= crates.length;
            if (offset < -1 || offset > 1) return null;

            const isCenter = offset === 0;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: `${offset * 110}%`,
                  rotateY: offset * -25,
                  z: isCenter ? 50 : -100,
                  scale: isCenter ? 1 : 0.8,
                  opacity: isCenter ? 1 : 0.3,
                  filter: isCenter ? "brightness(1) blur(0px)" : "brightness(0.5) blur(4px)",
                  zIndex: isCenter ? 40 : 10,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 w-full transform-gpu preserve-3d"
                onClick={() => {
                  if (!isCenter) {
                    setDirection(offset);
                    setCurrentIndex(index);
                  }
                }}
                style={{ cursor: isCenter ? "default" : "pointer" }}
              >
                {/* The Crate Box */}
                <div
                  className={cn(
                    "h-full flex flex-col relative rounded-[2rem] overflow-hidden bg-black/60 backdrop-blur-2xl border-2 transition-colors duration-500 shadow-2xl",
                    isCenter ? "border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.3)]" : "border-white/10",
                    !isCenter && "pointer-events-none"
                  )}
                >
                  {/* Crate Header */}
                  <div className={cn("p-8 relative overflow-hidden bg-gradient-to-br", item.color)}>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
                    
                    <div className="flex justify-center mb-6 relative z-10">
                      <motion.div 
                        animate={{ y: isCenter ? [-5, 5, -5] : 0 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-32 h-32"
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="128px"
                            className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] pixel-image"
                          />
                        ) : (
                          <PackageOpen className="w-full h-full text-white drop-shadow-xl" />
                        )}
                      </motion.div>
                    </div>
                    
                    <div className="text-center relative z-10">
                      <h3 className="font-pixel text-2xl text-white mb-2 drop-shadow-md tracking-wide">{item.name}</h3>
                      <div className="inline-flex items-baseline gap-1 bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
                        <span className="text-2xl font-black text-white">₹{item.price}</span>
                        <span className="text-white/80 font-medium text-sm">/key</span>
                      </div>
                    </div>
                  </div>

                  {/* Rewards List */}
                  <div className="flex-1 p-8 bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col">
                    <p className="text-sm font-medium text-pink-200/80 mb-6 text-center">{item.description}</p>
                    <ul className="space-y-3 flex-1">
                      {item.rewards.map((perk) => (
                        <li key={perk} className="flex items-start gap-3">
                          <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br", item.color)}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white/90 font-medium text-sm leading-tight">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Purchase Area */}
                  <div className="p-8 pt-0">
                    <button
                      onClick={(e) => {
                         e.stopPropagation();
                         onBuy(item);
                      }}
                      disabled={!isCenter}
                      className={cn(
                        "w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 text-white bg-gradient-to-r shadow-lg relative overflow-hidden group/btn hover:scale-[1.02]",
                        item.color,
                        isCenter ? "hover:shadow-[0_0_30px_currentColor]" : ""
                      )}
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                      <CreditCard className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Buy Keys</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mobile Dots Navigation */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 active:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3">
          {crates.map((_, idx) => (
            <div 
              key={idx}
              className={cn(
                "h-2.5 rounded-full transition-all duration-500 ease-out",
                idx === currentIndex ? "w-10 bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.5)]" : "w-3 bg-white/20"
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 active:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
