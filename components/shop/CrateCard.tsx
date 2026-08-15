import Image from "next/image";
import { Check, CreditCard, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { CrateKey } from "@/types";

interface CrateCardProps {
  crate: CrateKey;
  onBuy: (crate: CrateKey) => void;
}

export default function CrateCard({ crate, onBuy }: CrateCardProps) {
  return (
    <div className="bento-card flex flex-col h-full group">
      
      {/* Top Banner Area */}
      <div className={cn("p-6 relative overflow-hidden bg-gradient-to-br", crate.color)}>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />

        <div className="flex justify-center mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110">
          <div className="w-24 h-24">
            {crate.image ? (
              <Image
                src={crate.image}
                alt={crate.name}
                width={96}
                height={96}
                className="object-contain drop-shadow-xl pixel-image"
              />
            ) : (
              <PackageOpen className="w-full h-full text-white/90 drop-shadow-lg" />
            )}
          </div>
        </div>
        
        <div className="text-center relative z-10">
          <h3 className="font-pixel text-2xl text-white mb-1 drop-shadow-md">{crate.name}</h3>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-white">₹{crate.price}</span>
            <span className="text-white/70 font-medium">/key</span>
          </div>
        </div>
      </div>

      {/* Description & Perks Area */}
      <div className="flex-1 p-6 bg-gradient-to-b from-white/[0.02] to-transparent">
        <p className="text-sm font-medium text-white/60 mb-6 text-center leading-relaxed">
          {crate.description}
        </p>
        <ul className="space-y-4">
          {crate.rewards.map((perk, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br", crate.color)}>
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
          onClick={() => onBuy(crate)}
          className={cn(
            "w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 text-white bg-gradient-to-r shadow-lg relative overflow-hidden group/btn",
            crate.color
          )}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300" />
          <CreditCard className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Buy Keys</span>
        </button>
      </div>
    </div>
  );
}
