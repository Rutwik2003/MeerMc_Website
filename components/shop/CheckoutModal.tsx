"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, X, Smartphone, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Rank, CrateKey } from "@/types";
import { siteConfig } from "@/config/env";

interface CheckoutModalProps {
  item: Rank | CrateKey | null;
  itemType: "rank" | "crate";
  onClose: () => void;
  session: any;
  minecraftUsername: string;
}

export default function CheckoutModal({ item, itemType, onClose, session, minecraftUsername }: CheckoutModalProps) {
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) return null;

  let finalPrice = 0;
  let purchaseDescription = "";

  if (itemType === "rank") {
    const discountMultiplier = 1 - (selectedDuration - 1) * 0.04;
    finalPrice = Math.round(item.price * selectedDuration * discountMultiplier);
    purchaseDescription = `**${item.name}** (${selectedDuration} Month${selectedDuration > 1 ? 's' : ''})`;
  } else {
    finalPrice = item.price * selectedQuantity;
    purchaseDescription = `**${item.name}** (x${selectedQuantity})`;
  }

  const submitWebhook = async () => {
    if (!utrNumber.trim() || utrNumber.length < 6) {
      toast.error("Please enter a valid Transaction ID/UTR.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minecraftUsername,
          itemPurchased: purchaseDescription,
          amount: finalPrice,
          discordAccount: session?.user?.name || "Not Linked",
          utrNumber,
          itemId: item.id,
          isCrate: itemType === "crate",
          quantity: itemType === "crate" ? selectedQuantity : selectedDuration,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to submit payment webhook, but proceeding.");
      }
    } catch (error) {
      console.error("Webhook failed", error);
      toast.error("Failed to submit payment webhook, but proceeding.");
    }
    
    setIsSubmitting(false);
    setCheckoutStep(4);
  };

  const upiId = siteConfig.payment.upiId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl glass-card bg-card/95 border border-primary/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition-colors p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column / Header Area */}
        <div className={cn("p-4 pr-12 md:p-10 text-left md:text-center relative overflow-hidden bg-gradient-to-br flex flex-row md:flex-col justify-start md:justify-center items-center md:w-2/5 shrink-0 gap-4 md:gap-0", item.color)}>
          <div className="absolute inset-0 opacity-10 bg-[url('/branding/textures/noise.png')]" />
          
          <h2 className="hidden md:block text-3xl font-pixel text-white mb-6 relative z-10 drop-shadow-md">Checkout</h2>
          
          <div className="relative w-16 h-16 shrink-0 md:w-32 md:h-32 md:mb-6 bg-black/20 rounded-xl md:rounded-3xl p-2 md:p-4 border border-white/10 shadow-inner z-10">
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 64px, 128px"
                className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] p-1 md:p-2 pixel-image"
              />
            )}
          </div>
          
          <div className="relative z-10 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-md p-3 md:p-6 rounded-xl md:rounded-2xl border border-white/20 shadow-lg w-full text-left flex flex-col justify-center md:items-center">
            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col justify-center w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold">Item:</span>
                <span className="text-sm font-bold text-white drop-shadow-sm">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold">Player:</span>
                <span className="text-xs font-bold text-white font-pixel truncate drop-shadow-md">{minecraftUsername}</span>
              </div>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col items-center w-full space-y-3">
              <p className="text-white/90 text-xs uppercase tracking-widest font-bold drop-shadow-sm">Item</p>
              <h3 className="text-3xl font-bold text-white leading-none text-center drop-shadow-sm">{item.name}</h3>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent my-3" />
              <p className="text-white/90 text-xs uppercase tracking-widest font-bold drop-shadow-sm">Player</p>
              <p className="text-xl font-bold text-white font-pixel tracking-widest leading-relaxed break-words text-center w-full drop-shadow-md">{minecraftUsername}</p>
            </div>
          </div>
        </div>

        {/* Right Column / Actions Area */}
        <div className="p-5 md:p-10 md:pt-16 md:w-3/5 flex flex-col overflow-visible md:overflow-y-auto relative">
          {checkoutStep === 1 && (
            <div className="text-center space-y-6">
              <div className="bg-background/40 backdrop-blur-sm border border-destructive/30 p-5 rounded-2xl flex items-start gap-3">
                <div className="bg-destructive/20 text-destructive p-2 rounded-xl">
                  <Loader2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-foreground font-bold text-sm mb-0.5">
                    Offline Mode Warning
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    MeerMc is an offline mode server. Please verify your username is spelled <strong>EXACTLY</strong> correct.
                  </p>
                </div>
              </div>

              {/* Duration / Quantity Selector */}
              {itemType === "rank" ? (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-foreground mb-3 text-left">Select Duration:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 6].map((months) => {
                      const discount = (months - 1) * 4;
                      return (
                        <button
                          key={months}
                          onClick={() => setSelectedDuration(months)}
                          className={cn(
                            "py-3 px-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1",
                            selectedDuration === months 
                              ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                              : "bg-background border-primary/20 text-muted-foreground hover:border-primary/50"
                          )}
                        >
                          <span className="font-bold text-sm">{months} Month{months > 1 ? 's' : ''}</span>
                          {discount > 0 && <span className="text-xs text-green-400 font-semibold">-{discount}% off</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-foreground mb-3 text-left">Select Quantity:</p>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setSelectedQuantity(qty)}
                        className={cn(
                          "py-3 rounded-xl border-2 transition-all font-bold",
                          selectedQuantity === qty 
                            ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                            : "bg-background border-primary/20 text-muted-foreground hover:border-primary/50"
                        )}
                      >
                        {qty}x
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center bg-background/50 p-5 rounded-2xl border border-white/5 shadow-inner">
                <span className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Total Amount</span>
                <span className="text-3xl font-bold text-foreground">₹{finalPrice}</span>
              </div>

              <div className="bg-background/40 backdrop-blur-sm border border-amber-500/30 p-5 rounded-2xl flex items-start gap-3 mb-2">
                <div className="bg-amber-500/20 text-amber-500 p-2 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-foreground font-bold text-sm mb-0.5">
                    Manual Verification
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Payments are verified manually. If purchased late at night, it may be approved the next morning. You will get your rank!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left mb-6">
                <input 
                  type="checkbox" 
                  id="terms-checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary/50 bg-background shrink-0"
                />
                <label htmlFor="terms-checkbox" className="text-xs text-muted-foreground cursor-pointer">
                  I understand that MeerMc is an offline mode server, and I have read and agree to the <a href="/tos" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms of Service</a>, <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>, and <a href="/refunds" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Refund Policy</a>.
                </label>
              </div>

              <button
                onClick={() => setCheckoutStep(2)}
                disabled={!agreedToTerms}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-base transition-all flex justify-center items-center text-white blocky-button bg-gradient-to-r shadow-lg",
                  !agreedToTerms ? "opacity-50 cursor-not-allowed bg-gray-500" : cn("hover:brightness-110 hover:shadow-xl", item.color)
                )}
              >
                Confirm & Proceed
              </button>
            </div>
          )}

          {checkoutStep === 2 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-background/50 p-4 rounded-xl border border-white/5">
                <span className="text-muted-foreground font-medium">Total Amount</span>
                <span className="text-3xl font-bold text-foreground">₹{finalPrice}</span>
              </div>

              <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center mx-auto shadow-lg w-full border-4 border-primary/20">
                <p className="text-black/60 text-xs font-semibold mb-2">Send payment directly to this UPI ID:</p>
                <div className="bg-black/5 px-4 py-3 rounded-xl border border-black/10 w-full text-center">
                  <span className="text-xl font-bold tracking-wider text-black select-all">{upiId}</span>
                </div>
              </div>

              <a 
                href={`upi://pay?pa=${upiId}&pn=MeerMc&am=${finalPrice}&cu=INR`}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 text-white blocky-button bg-gradient-to-r hover:brightness-110 shadow-lg hover:shadow-xl",
                  item.color
                )}
              >
                <Smartphone className="w-5 h-5" />
                Pay on Mobile (UPI Deep Link)
              </a>

              <div className="bg-background/40 backdrop-blur-sm border border-primary/30 p-5 rounded-2xl flex items-start gap-3">
                <div className="bg-primary/20 text-primary p-2 rounded-xl">
                  <Check className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-foreground font-bold text-sm mb-0.5">
                    Important Note
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Please type <strong className="text-foreground">{minecraftUsername}</strong> in your payment notes!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep(3)}
                className="w-full py-3 rounded-xl bg-primary/20 text-primary font-medium hover:bg-primary/30 transition-colors"
              >
                I have paid!
              </button>
            </div>
          )}

          {checkoutStep === 3 && (
            <div className="space-y-6 text-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Verify Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Please enter the 12-digit UPI Transaction ID (UTR) or Reference Number from your payment app so we can verify it.
                </p>
              </div>
              
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                placeholder="e.g. 312345678901"
                className="w-full px-4 py-4 rounded-xl bg-input border border-primary/20 text-foreground text-center font-bold tracking-widest placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-xl shadow-inner"
              />

              <button
                onClick={submitWebhook}
                disabled={isSubmitting || utrNumber.length < 6}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 text-white blocky-button bg-gradient-to-r shadow-lg",
                  (isSubmitting || utrNumber.length < 6) ? "opacity-50 cursor-not-allowed bg-gray-500" : cn("hover:brightness-110 hover:shadow-xl", item.color)
                )}
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</>
                ) : (
                  "Submit Payment"
                )}
              </button>
            </div>
          )}

          {checkoutStep === 4 && (
            <div className="text-center py-6">
              <div className="w-24 h-24 mx-auto bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/30">
                <Check className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-3">Payment Sent!</h3>
              <p className="text-muted-foreground text-base">
                Thank you for supporting MeerMc! An admin has been notified and will verify your transaction (<strong>{utrNumber}</strong>) shortly to activate your rank.
              </p>
              <button
                onClick={onClose}
                className="mt-8 w-full py-3 rounded-xl bg-primary/20 text-primary font-bold hover:bg-primary/30 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
