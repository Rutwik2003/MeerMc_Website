'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse-ring" />
          <div className="absolute inset-2 rounded-full border-4 border-accent/40 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
          
          {/* Center core */}
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 animate-pulse shadow-glow-purple" />
        </div>
        
        <h2 className="font-pixel text-xl text-gradient animate-pulse">Loading...</h2>
      </div>
    </div>
  );
}
