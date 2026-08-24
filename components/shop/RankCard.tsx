import Image from "next/image";
import { Check, CreditCard, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Rank } from "@/types";

interface RankCardProps {
  rank: Rank;
  onBuy: (rank: Rank) => void;
}

export default function RankCard({ rank, onBuy }: RankCardProps) {
  return (
    <div className="bento-card flex flex-col h-full group">
      
      {/* Top Banner Area */}
      <div className={cn("p-6 relative overflow-hidden bg-gradient-to-br", rank.color)}>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
        
        {rank.popular && (
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg border border-white/30 z-10">
            Most Popular
          </div>
        )}

        <div className="flex justify-center mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110">
          <div className="w-16 h-16 bg-black/30 rounded-2xl p-3 border border-white/20 shadow-inner">
            <Image
              src={`/branding/ranks/${rank.name.toLowerCase()}.png`}
              alt={rank.name}
              width={64}
              height={64}
              className="object-contain drop-shadow-xl pixel-image"
            />
          </div>
        </div>
        
        <div className="text-center relative z-10">
          <h3 className="font-pixel text-2xl text-white mb-1 drop-shadow-md">{rank.name}</h3>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-white">₹{rank.price}</span>
            <span className="text-white/70 font-medium">/mo</span>
          </div>
        </div>
      </div>

      {/* Perks Area */}
      <div className="flex-1 p-6 bg-gradient-to-b from-white/[0.02] to-transparent">
        <ul className="space-y-4">
          {rank.perks.map((perk, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br", rank.color)}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-white/90 leading-tight">{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buy Button */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onBuy(rank)}
          className={cn(
            "w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 text-white bg-gradient-to-r shadow-lg relative overflow-hidden group/btn",
            rank.color
          )}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300" />
          <CreditCard className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Purchase Rank</span>
        </button>
      </div>
    </div>
  );
}
