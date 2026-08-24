'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/env';

interface PlayerAvatarProps {
  username: string;
  size?: number;
  className?: string;
  borderColor?: string;
}

export function PlayerAvatar({
  username,
  size = 32,
  className,
  borderColor,
}: PlayerAvatarProps) {
  return (
    <img
      src={`${siteConfig.api.mcHeads}/avatar/${username}/${size}`}
      alt={username}
      width={size}
      height={size}
      className={cn(
        'rounded bg-black/50',
        className
      )}
      style={borderColor ? { borderColor } : undefined}
      onError={(e) => {
        (e.target as HTMLImageElement).src = `${siteConfig.api.mcHeads}/avatar/Steve/${size}`;
      }}
    />
  );
}
