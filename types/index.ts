import type { LucideIcon } from 'lucide-react';

export interface ServerStatus {
  online: boolean;
  players: number;
  maxPlayers: number;
  playerList: { name: string; uuid?: string }[];
  javaOnline: boolean;
  bedrockOnline: boolean;
}

export interface Rank {
  id: string;
  name: string;
  price: number;
  color: string;
  gradient: string;
  icon: string;
  perks: string[];
  luckpermsId: string;
  durationDays: number;
  popular?: boolean;
  image?: string;
}

export interface CrateKey {
  id: string;
  name: string;
  price: number;
  color: string;
  gradient: string;
  icon: string;
  description: string;
  rewards: string[];
  image?: string;
}

export interface TeamMember {
  name: string;
  skin?: string;
  avatar: string;
  since: string;
  isPlaceholder?: boolean;
}

export interface TeamRole {
  role: string;
  icon: LucideIcon;
  color: string;
  members: TeamMember[];
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
  title: string;
  description: string;
}

export interface Plugin {
  id: number;
  name: string;
  description: string;
  category: string;
  icon?: string;
  commands: { command: string; description: string }[];
}

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export interface ServerRule {
  title: string;
  description: string[];
  icon?: string;
}

export interface VoteSite {
  name: string;
  url: string;
  description: string;
  rewards: string[];
}
