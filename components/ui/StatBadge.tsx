'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StatBadgeProps {
  value: string | number;
  label: string;
  colorClass?: string;
  className?: string;
}

export function StatBadge({
  value,
  label,
  colorClass = 'bg-white/10 text-white',
  className,
}: StatBadgeProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl px-4 py-2.5 min-w-[70px]',
        colorClass,
        className
      )}
    >
      <span className="text-sm font-bold leading-tight">{value}</span>
      <span className="text-[10px] uppercase tracking-wider opacity-70 mt-0.5">
        {label}
      </span>
    </div>
  );
}
