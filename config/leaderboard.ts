import { LeaderboardPlayer } from '@/types';

/**
 * Format playtime from seconds to a human-readable string like "2D 7H"
 */
export function formatPlaytime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  if (days > 0) return `${days}D ${hours}H`;
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}H ${minutes}M`;
  return `${minutes}M`;
}

/**
 * Format net worth value to a compact string like "₹6.7M" or "₹360.8K"
 */
export function formatNetWorth(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `₹${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    return `₹${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
  }
  return `₹${value}`;
}

// ============================================================
// Mock Data — Replace getLeaderboardData() with an API call later
// ============================================================

const mockPlayers: LeaderboardPlayer[] = [
  {
    rank: 1,
    username: 'HyperPro',
    uuid: '',
    level: 29,
    netWorth: 6_700_000,
    kills: 7,
    deaths: 12,
    playtime: 198000, // 2D 7H
  },
  {
    rank: 2,
    username: 'ParkDangBee3',
    uuid: '',
    level: 37,
    netWorth: 8_300_000,
    kills: 0,
    deaths: 5,
    playtime: 432000, // 5D
  },
  {
    rank: 3,
    username: 'HarishMeena7777',
    uuid: '',
    level: 22,
    netWorth: 4_300_000,
    kills: 2,
    deaths: 8,
    playtime: 220800, // 2D 14H
  },
  {
    rank: 4,
    username: 'JacksonBhai7',
    uuid: '',
    level: 27,
    netWorth: 2_400_000,
    kills: 0,
    deaths: 31,
    playtime: 367200, // 4D 6H
  },
  {
    rank: 5,
    username: 'Abhishek0951304',
    uuid: '',
    level: 5,
    netWorth: 2_100_000,
    kills: 1,
    deaths: 2,
    playtime: 122400, // 1D 10H
  },
  {
    rank: 6,
    username: 'IndianTrump',
    uuid: '',
    level: 68,
    netWorth: 1_700_000,
    kills: 33,
    deaths: 43,
    playtime: 198000, // 2D 7H
  },
  {
    rank: 7,
    username: 'Devendra_422',
    uuid: '',
    level: 20,
    netWorth: 1_500_000,
    kills: 5,
    deaths: 78,
    playtime: 194400, // 2D 6H
  },
  {
    rank: 8,
    username: 'GTronnn',
    uuid: '',
    level: 48,
    netWorth: 647_600,
    kills: 12,
    deaths: 7,
    playtime: 338400, // 3D 23H
  },
  {
    rank: 9,
    username: 'RipZoro774883',
    uuid: '',
    level: 15,
    netWorth: 360_800,
    kills: 6,
    deaths: 7,
    playtime: 97200, // 1D 3H
  },
  {
    rank: 10,
    username: 'ShadowNinja99',
    uuid: '',
    level: 31,
    netWorth: 280_000,
    kills: 24,
    deaths: 19,
    playtime: 259200, // 3D
  },
  {
    rank: 11,
    username: 'PixelCrafter_X',
    uuid: '',
    level: 12,
    netWorth: 150_000,
    kills: 3,
    deaths: 14,
    playtime: 57600, // 16H
  },
  {
    rank: 12,
    username: 'BlockMaster2k',
    uuid: '',
    level: 8,
    netWorth: 95_000,
    kills: 1,
    deaths: 3,
    playtime: 36000, // 10H
  },
];

export type SortKey = 'netWorth' | 'kills' | 'playtime';

/**
 * Get leaderboard data, sorted by the given key.
 * 
 * 🔄 SWAP POINT: Replace this function body with a fetch() call
 * to your API endpoint when ready. Keep the return type the same.
 * 
 * Example:
 *   const res = await fetch('/api/leaderboard?sort=' + sortBy);
 *   const data = await res.json();
 *   return data.players;
 */
export function getLeaderboardData(sortBy: SortKey = 'netWorth'): LeaderboardPlayer[] {
  const sorted = [...mockPlayers].sort((a, b) => b[sortBy] - a[sortBy]);
  return sorted.map((player, index) => ({ ...player, rank: index + 1 }));
}
