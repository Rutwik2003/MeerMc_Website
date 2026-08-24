'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
  as?: React.ElementType;
}

export function GlowCard({
  children,
  className,
  glowColor = 'rgba(168, 85, 247, 0.8)', // default primary purple
  hover = true,
  as: Component = 'div',
}: GlowCardProps) {
  return (
    <Component
      className={cn(
        'glow-card',
        hover && 'hover-lift',
        className
      )}
      style={{
        '--glow-color': glowColor,
      } as React.CSSProperties}
    >
      {/* Inner content wrapper is handled by globals.css child selector */}
      <div className="relative w-full h-full p-6">
        {children}
      </div>
    </Component>
  );
}
