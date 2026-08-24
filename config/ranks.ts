import { Rank } from "@/types";

export const ranks: Rank[] = [
  {
    id: "vip",
    name: "VIP",
    luckpermsId: "vip",
    image: "/branding/ranks/vip.png",
    price: Number(process.env.NEXT_PUBLIC_PRICE_VIP) || 299,
    color: "from-green-500 to-emerald-600",
    gradient: "from-green-500 to-emerald-600",
    icon: "star",
    durationDays: 30,
    popular: false,
    perks: [
      "[VIP] Prefix",
      "Virtual Crafting Table (/craft)",
      "Custom Nicknames (/nick)",
      "Set up to 3 Homes",
      "2 Cosmetic Keys",
      "🎁 2x Common, 1x Uncommon, 1x Rare Key",
    ],
  },
  {
    id: "cutie",
    name: "Cutie",
    luckpermsId: "cutie",
    image: "/branding/ranks/cutie.png",
    price: Number(process.env.NEXT_PUBLIC_PRICE_CUTIE) || 199,
    color: "from-pink-500 to-rose-500",
    gradient: "from-pink-500 to-rose-500",
    icon: "heart",
    durationDays: 30,
    popular: true,
    perks: [
      "[Cutie] Prefix",
      "2 Cosmetic Keys",
      "Set up to 2 Homes",
      "🎁 2x Common, 1x Uncommon, 1x Rare Key"
    ],
  },
  {
    id: "elite",
    name: "Elite",
    luckpermsId: "elite",
    image: "/branding/ranks/creator.png",
    price: Number(process.env.NEXT_PUBLIC_PRICE_ELITE_RANK) || 399,
    color: "from-purple-500 to-violet-600",
    gradient: "from-purple-500 to-violet-600",
    icon: "crown",
    durationDays: 30,
    popular: false,
    perks: [
      "[Elite] Prefix",
      "Virtual Workbench (/craft)",
      "Virtual Enderchest (/echest)",
      "Custom Nicknames (/nick)",
      "Set up to 4 Homes",
      "4 Cosmetic Keys",
      "🎁 3x Common, 2x Uncommon, 2x Rare Key"
    ],
  },
  {
    id: "investor",
    name: "Investor",
    luckpermsId: "investor",
    image: "/branding/ranks/investor.png",
    price: Number(process.env.NEXT_PUBLIC_PRICE_INVESTOR) || 499,
    color: "from-amber-400 to-orange-500",
    gradient: "from-amber-400 to-orange-500",
    icon: "gem",
    durationDays: 30,
    popular: false,
    perks: [
      "[Investor] Prefix",
      "Set up to 6 Homes",
      "Custom Nicknames (/nick)",
      "Virtual Workbench (/craft)",
      "Virtual Enderchest (/echest)",
      "6 Cosmetic Keys",
      "🎁 5x Common, 2x Uncommon, 3x Rare Key"
    ],
  }
];
