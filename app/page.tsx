"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart, Vote } from "lucide-react";
import ServerStatus from "@/components/home/ServerStatus";
import { CopyButton } from "@/components/ui/CopyButton";
import { siteConfig } from "@/config/env";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState, useEffect } from "react";

const FeatureHighlights = dynamic(() => import("@/components/home/FeatureHighlights"), { ssr: false });
const CommunityStats = dynamic(() => import("@/components/home/CommunityStats"), { ssr: false });
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), { ssr: false });



export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-0 md:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-24 md:pb-20">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0 scale-105 transform origin-center">
          <Image 
            src="/gallery/canyon_minecraft.png" 
            alt="MeerMc Castle Background" 
            fill 
            className="object-cover opacity-80 mix-blend-overlay" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/60 via-[#0a0c10]/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
        </div>



        <div className="container mx-auto px-4 lg:px-8 relative z-10 mt-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 w-full"
              >
                <h1 className="font-pixel text-4xl lg:text-6xl xl:text-7xl mb-4 leading-tight">
                  <span className="text-white block mb-2 text-2xl lg:text-4xl text-gradient">Welcome to</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-fuchsia-500 to-pink-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] block glow-text pb-2">
                    {siteConfig.name}
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-medium">
                  The ultimate Minecraft survival experience. Build, explore, and conquer with our amazing community.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link
                  href="/shop"
                  className="blocky-button group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-primary to-purple-600 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2 hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                  Store
                </Link>
                
                <Link
                  href="/vote"
                  className="blocky-button group relative w-full sm:w-auto overflow-hidden bg-[#1a1025] border-2 border-primary/30 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:bg-primary/10 hover:border-primary/50 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Vote className="w-5 h-5 group-hover:rotate-12 transition-transform text-primary" />
                  Vote for Us
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-2 py-1 pl-4"
              >
                <span className="text-sm font-medium text-gray-300">Server IP:</span>
                <span className="font-mono text-primary font-bold">{siteConfig.server.javaIp}</span>
                <CopyButton text={siteConfig.server.javaIp} variant="default" className="rounded-full h-8 px-3 ml-2 text-xs" />
              </motion.div>
            </div>

            {/* Right Content - Server Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center lg:justify-end w-full"
            >
              <ServerStatus />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
            >
              <div className="w-1.5 h-2 rounded-full bg-primary" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <FeatureHighlights />

      {/* Community Stats */}
      <CommunityStats />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background pointer-events-none" />
        
        {/* Removed Heavy Animated Background Orbs */}

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bento-card max-w-4xl mx-auto p-8 lg:p-16 text-center"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-pixel text-gradient leading-tight">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Join {siteConfig.name} today and become part of our growing community. Grab your gear, invite your friends, and let's create something amazing.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center bg-black/40 border border-primary/30 rounded-xl p-1.5 w-full sm:w-auto">
                <div className="px-6 py-3 font-mono text-lg font-bold text-white whitespace-nowrap">
                  {siteConfig.server.javaIp}
                </div>
                <CopyButton text={siteConfig.server.javaIp} label="Copy IP" className="bg-primary hover:bg-primary/80 text-white rounded-lg px-6 py-3 font-bold uppercase tracking-wider text-sm h-auto" />
              </div>
              
              <Link
                href="/shop"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                Store
              </Link>
              <Link
                href="/vote"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all hover:scale-105"
              >
                <Vote className="w-5 h-5 text-primary" />
                Vote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
