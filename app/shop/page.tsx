"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";
import { ShoppingCart, Check, CreditCard, Sparkles, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/env";
import { Rank, CrateKey } from "@/types";
import { ranks } from "@/config/ranks";
import { crates } from "@/config/crates";
import CheckoutModal from "@/components/shop/CheckoutModal";
import ComparisonTable from "@/components/shop/ComparisonTable";

export default function ShopPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"ranks" | "crates">("ranks");
  const [minecraftUsername, setMinecraftUsername] = useState("");
  const [showCheckout, setShowCheckout] = useState<Rank | CrateKey | null>(null);
  
  // Selection State for the Interactive Showcase
  const [selectedRank, setSelectedRank] = useState<Rank>(ranks[0]);
  const [selectedCrate, setSelectedCrate] = useState<CrateKey>(crates[0]);

  // Categories (easy to add "spawners" or "cosmetics" here later)
  const categories = [
    { id: "ranks", label: "Ranks" },
    { id: "crates", label: "Crates" },
  ];

  useEffect(() => {
    if (showCheckout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCheckout]);

  const handlePurchase = (item: Rank | CrateKey) => {
    if (status !== "authenticated") {
      toast.error("Please link your Discord account first to purchase items.");
      return;
    }
    if (!minecraftUsername.trim()) {
      toast.error("Please enter your Minecraft username first!");
      return;
    }
    setShowCheckout(item);
  };

  const currentItem = activeTab === "ranks" ? selectedRank : selectedCrate;
  const isRank = activeTab === "ranks";

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Store Header */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-pixel text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Server Shop
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Support {siteConfig.name} and unlock exclusive perks, cosmetics, and crate keys!
          </motion.p>
        </div>

        {/* Username Input Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bento-card p-2 flex flex-col md:flex-row items-center gap-4 bg-white/[0.02]">
            <div className="flex-1 flex items-center w-full px-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
              <ShoppingCart className="w-5 h-5 text-purple-400 mr-3" />
              <input
                type="text"
                placeholder="Enter Minecraft Username to begin..."
                value={minecraftUsername}
                onChange={(e) => setMinecraftUsername(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full py-2 placeholder:text-muted-foreground/70 font-medium"
              />
            </div>
            
            <div className="flex gap-2 px-2 pb-2 md:pb-0 w-full md:w-auto overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as any)}
                  className={cn(
                    "flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold transition-all text-sm whitespace-nowrap",
                    activeTab === cat.id 
                      ? cat.id === "ranks" ? "bg-purple-500/20 text-purple-300 border border-purple-500/50" : "bg-pink-500/20 text-pink-300 border border-pink-500/50"
                      : "bg-white/[0.03] text-muted-foreground hover:bg-white/[0.08]"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          {status !== "authenticated" && (
            <div className="text-center mt-6 flex flex-col items-center">
              <p className="text-sm text-red-400 font-medium mb-3">
                You must link your Discord before purchasing.
              </p>
              <button
                onClick={() => signIn("discord")}
                className="px-6 py-2.5 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2]/30 text-[#5865F2] font-bold border border-[#5865F2]/50 transition-all flex items-center gap-2"
              >
                Link Discord Account
              </button>
            </div>
          )}
        </motion.div>
        
        {/* The Interactive Showcase Layout */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* LEFT SIDE: The Stage (Sticky) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "bento-card overflow-hidden flex flex-col border",
                    "color" in currentItem ? currentItem.color.replace('from-', 'border-').split(' ')[0] : 'border-white/10'
                  )}
                >
                  {/* Stage Header / Icon */}
                  <div className={cn(
                    "p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[250px] bg-gradient-to-br",
                    "color" in currentItem ? currentItem.color : "from-purple-900/50 to-background"
                  )}>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
                    <motion.div 
                      initial={{ y: 20 }} animate={{ y: 0 }} 
                      className="relative z-10 w-32 h-32 flex items-center justify-center bg-black/40 rounded-3xl p-4 border border-white/20 shadow-2xl backdrop-blur-xl"
                    >
                      {isRank ? (
                        <Image
                          src={(currentItem as Rank).image}
                          alt={currentItem.name}
                          width={100}
                          height={100}
                          className="object-contain drop-shadow-2xl pixel-image"
                        />
                      ) : (
                        (currentItem as CrateKey).image ? (
                          <Image
                            src={(currentItem as CrateKey).image!}
                            alt={currentItem.name}
                            width={100}
                            height={100}
                            className="object-contain drop-shadow-2xl pixel-image"
                          />
                        ) : (
                          <PackageOpen className="w-16 h-16 text-white" />
                        )
                      )}
                    </motion.div>
                  </div>

                  {/* Stage Body */}
                  <div className="p-8 flex-1 bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-pixel text-white mb-2">{currentItem.name}</h2>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-black text-white">₹{currentItem.price}</span>
                        <span className="text-white/50">{isRank ? "/mo" : "/key"}</span>
                      </div>
                    </div>

                    <div className="flex-1 mb-8">
                      <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Included {isRank ? "Perks" : "Rewards"}
                      </h4>
                      <ul className="space-y-3">
                        {(isRank ? (currentItem as Rank).perks : (currentItem as CrateKey).rewards).map((perk, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className={cn(
                              "w-4 h-4 mt-0.5 shrink-0",
                              "color" in currentItem ? currentItem.color.replace('from-', 'text-').split(' ')[0] : 'text-purple-400'
                            )} />
                            <span className="text-sm text-white/90 leading-relaxed">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handlePurchase(currentItem)}
                      className={cn(
                        "w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 text-white bg-gradient-to-r shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:scale-[1.02]",
                        "color" in currentItem ? currentItem.color : "from-purple-600 to-pink-600"
                      )}
                    >
                      <CreditCard className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Purchase Now</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE: The Catalog (Scrollable List) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <h3 className="font-pixel text-xl text-white mb-6">
              Select a {isRank ? "Rank" : "Crate Key"}
            </h3>
            
            <div className="flex flex-col gap-3">
              {activeTab === "ranks" && ranks.map((rank) => (
                <button
                  key={rank.id}
                  onClick={() => setSelectedRank(rank)}
                  className={cn(
                    "bento-card w-full text-left p-4 flex items-center gap-6 transition-all duration-300",
                    selectedRank.id === rank.id 
                      ? "bg-white/[0.08] border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-[1.01]" 
                      : "hover:bg-white/[0.04] opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="w-16 h-16 bg-black/40 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <Image
                      src={rank.image}
                      alt={rank.name}
                      width={48}
                      height={48}
                      className="object-contain pixel-image"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={cn(
                        "font-pixel text-lg",
                        selectedRank.id === rank.id ? "text-white" : "text-white/80"
                      )}>{rank.name}</h4>
                      <span className="font-black text-lg text-white">₹{rank.price}</span>
                    </div>
                    <p className="text-sm text-white/50 line-clamp-1">{rank.perks[0]} and more...</p>
                  </div>
                </button>
              ))}

              {activeTab === "crates" && crates.map((crate) => (
                <button
                  key={crate.id}
                  onClick={() => setSelectedCrate(crate)}
                  className={cn(
                    "bento-card w-full text-left p-4 flex items-center gap-6 transition-all duration-300",
                    selectedCrate.id === crate.id 
                      ? "bg-white/[0.08] border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.15)] scale-[1.01]" 
                      : "hover:bg-white/[0.04] opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="w-16 h-16 bg-black/40 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    {crate.image ? (
                      <Image
                        src={crate.image}
                        alt={crate.name}
                        width={48}
                        height={48}
                        className="object-contain pixel-image"
                      />
                    ) : (
                      <PackageOpen className="w-8 h-8 text-white/70" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={cn(
                        "font-pixel text-lg",
                        selectedCrate.id === crate.id ? "text-white" : "text-white/80"
                      )}>{crate.name}</h4>
                      <span className="font-black text-lg text-white">₹{crate.price}</span>
                    </div>
                    <p className="text-sm text-white/50 line-clamp-1">{crate.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Comparison Table only shows for Ranks */}
            <AnimatePresence>
              {activeTab === "ranks" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-16 overflow-hidden"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-pixel text-white mb-2">Rank Comparison</h2>
                    <p className="text-sm text-muted-foreground">Compare all features side-by-side.</p>
                  </div>
                  <ComparisonTable ranks={ranks} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Crate Info shows for Crates */}
            <AnimatePresence>
              {activeTab === "crates" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-16 overflow-hidden"
                >
                  <div className="bento-card p-6 flex flex-col items-center text-center">
                    <PackageOpen className="w-12 h-12 text-pink-400 mb-4" />
                    <h3 className="text-xl font-pixel text-white mb-2">How Crate Keys Work</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Crate keys can be used in-game at spawn to open special loot crates. 
                      You are guaranteed to win at least one item from the crate's loot pool. 
                      Purchases directly support server hosting and development!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCheckout && (
          <CheckoutModal
            onClose={() => setShowCheckout(null)}
            item={showCheckout}
            itemType={activeTab === "ranks" ? "rank" : "crate"}
            session={session}
            minecraftUsername={minecraftUsername}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
