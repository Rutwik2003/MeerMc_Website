"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Rank } from "@/types";

interface ComparisonTableProps {
  ranks: Rank[];
}

export default function ComparisonTable({ ranks }: ComparisonTableProps) {
  const features = [
    { name: "Custom Nicknames (/nick)", checks: [true, false, true, true] },
    { name: "Virtual Workbench (/craft)", checks: [true, false, true, true] },
    { name: "Virtual Enderchest (/echest)", checks: [false, false, true, true] },
    { name: "Cosmetic Keys", checks: ["2", "2", "4", "6"] },
    { name: "Bonus Crate Keys", checks: [true, true, true, true] },
    { name: "Set Homes", checks: ["3", "2", "4", "6"] },
  ];

  return (
    <div className="bento-card border border-white/10 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-3 sm:px-6 py-4 sm:py-5 text-left text-white/70 font-medium uppercase tracking-wider text-[10px] sm:text-xs whitespace-nowrap">Feature</th>
              {ranks.map((rank) => (
                <th key={rank.id} className="px-2 sm:px-6 py-4 sm:py-5 text-center">
                  <div className={cn("inline-flex items-center justify-center px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r text-white text-[10px] sm:text-xs font-bold tracking-wide shadow-lg border border-white/20", rank.color)}>
                    {rank.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {features.map((feature, i) => (
              <tr key={feature.name} className={cn("transition-colors group", i % 2 !== 0 ? "bg-white/[0.02] hover:bg-white/5" : "hover:bg-white/5")}>
                <td className="px-3 sm:px-6 py-3 sm:py-5 text-white/90 font-medium group-hover:text-white transition-colors text-xs sm:text-sm whitespace-nowrap">{feature.name}</td>
                {feature.checks.map((check, j) => (
                  <td key={j} className="px-2 sm:px-6 py-3 sm:py-5 text-center">
                    {typeof check === "boolean" ? (
                      check ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mx-auto drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                      ) : (
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-white/20 mx-auto" />
                      )
                    ) : (
                      <span className="font-bold text-white/80">{check}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
