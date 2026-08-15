import { CrateKey } from "@/types";

export const crates: CrateKey[] = [
  {
    id: "rare",
    name: "Rare Key",
    image: "/branding/shop/rare_key.png",
    price: Number(process.env.NEXT_PUBLIC_PRICE_RARE_KEY) || 50,
    color: "from-blue-500 to-indigo-600",
    gradient: "from-blue-500 to-indigo-600",
    icon: "key",
    description: "Open the Rare Crate at spawn for rare items",
    rewards: [
      "Open the Rare Crate at spawn",
      "Chance for rare items",
      "Support the server!"
    ],
  },
  {
    id: "elite",
    name: "Elite Key",
    image: "/branding/shop/elite_key.png",
    price: Number(process.env.NEXT_PUBLIC_PRICE_ELITE_KEY) || 89,
    color: "from-purple-500 to-violet-600",
    gradient: "from-purple-500 to-violet-600",
    icon: "key",
    description: "Open the Elite Crate at spawn for epic items",
    rewards: [
      "Open the Elite Crate at spawn",
      "High chance for epic items",
      "Special chat announcement"
    ],
  },
  {
    id: "insane",
    name: "Insane Key",
    image: "/branding/shop/insane_key.png",
    price: Number(process.env.NEXT_PUBLIC_PRICE_INSANE_KEY) || 120,
    color: "from-red-500 to-rose-600",
    gradient: "from-red-500 to-rose-600",
    icon: "key",
    description: "Open the Insane Crate at spawn for legendary items",
    rewards: [
      "Open the Insane Crate at spawn",
      "Guaranteed legendary rewards",
      "Global server announcement"
    ],
  }
];
