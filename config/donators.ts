import { Donator } from '@/types';

// ============================================================
// Mock Data — Replace getDonatorData() with an API call later
// ============================================================

const mockDonators: Donator[] = [
  {
    rank: 1,
    username: 'Rayaann',
    uuid: '',
    tier: 'VIP+ Supporter',
    tierColor: 'from-amber-500 to-yellow-400',
    purchasedItems: ['Spawner Key', 'Banana Rank'],
    amount: 320,
  },
  {
    rank: 2,
    username: 'MR_ANKIT_Yt',
    uuid: '',
    tier: 'Banana Supporter',
    tierColor: 'from-green-500 to-emerald-400',
    purchasedItems: ['Banana Rank'],
    amount: 59,
  },
  {
    rank: 3,
    username: 'CoolGamer_Pro',
    uuid: '',
    tier: 'Elite Supporter',
    tierColor: 'from-purple-500 to-fuchsia-400',
    purchasedItems: ['Elite Rank', 'Rare Key'],
    amount: 180,
  },
  {
    rank: 4,
    username: 'DiamondKing42',
    uuid: '',
    tier: 'Supporter',
    tierColor: 'from-cyan-500 to-blue-400',
    purchasedItems: ['VIP Rank'],
    amount: 50,
  },
  {
    rank: 5,
    username: 'BuilderBoss_MC',
    uuid: '',
    tier: 'Supporter',
    tierColor: 'from-cyan-500 to-blue-400',
    purchasedItems: ['Cutie Rank'],
    amount: 69,
  },
];

export interface DonatorSummary {
  totalRaised: number;
  totalDonations: number;
  topSupporter: string;
  topSupporterAmount: number;
}

/**
 * Get donator data.
 *
 * 🔄 SWAP POINT: Replace this function body with a fetch() call
 * to your API endpoint when ready. Keep the return type the same.
 *
 * Example:
 *   const res = await fetch('/api/donators');
 *   const data = await res.json();
 *   return data;
 */
export function getDonatorData(): { donators: Donator[]; summary: DonatorSummary } {
  const donators = [...mockDonators].sort((a, b) => b.amount - a.amount);

  const totalRaised = donators.reduce((sum, d) => sum + d.amount, 0);
  const topDonator = donators[0];

  return {
    donators,
    summary: {
      totalRaised,
      totalDonations: donators.length,
      topSupporter: topDonator?.username ?? 'N/A',
      topSupporterAmount: topDonator?.amount ?? 0,
    },
  };
}
