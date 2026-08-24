"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

export default function RefundsPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading 
          title="Refund Policy" 
          subtitle="Last updated: August 2026"
        />
        
        <GlowCard hover={false} className="p-8 md:p-12 border-red-500/30" glowColor="rgba(239, 68, 68, 0.4)">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl mb-8 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
              <h2 className="text-xl font-bold text-red-400 mb-2">No Refunds Will Be Provided</h2>
              <p className="text-white/90">
                All purchases, donations, and rank upgrades made on the MeerMc store are strictly non-refundable. 
                By completing a transaction, you acknowledge and agree that no refunds will be provided under any circumstances.
              </p>
            </div>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">Why are there no refunds?</h2>
            <p>
              When you purchase a rank or item on our server, you receive digital goods and perks immediately. 
              Because these digital goods cannot be "returned," we cannot offer refunds. Your purchases directly support the 
              ongoing costs of hosting, maintaining, and improving the MeerMc network.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">Chargebacks and Disputes</h2>
            <p>
              Attempting to bypass our refund policy by opening a chargeback or dispute with your bank, credit card company, 
              or payment provider will result in a <strong className="text-red-400">permanent and unappealable ban</strong> from the entire MeerMc network.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">Server Bans</h2>
            <p>
              If you are banned, muted, or otherwise punished for breaking our Terms of Service, you will not receive a refund 
              for any prior purchases. Purchasing a rank does not exempt you from the server rules.
            </p>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
