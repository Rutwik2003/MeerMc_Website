"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading 
          title="Privacy Policy" 
          subtitle="Last updated: August 2026"
        />
        
        <GlowCard hover={false} className="p-8 md:p-12">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg text-white/90 mb-8">
              Your privacy is critically important to us. This policy explains how we collect, use, and protect your information when you play on MeerMc or use our website.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-primary/90">Minecraft Data:</strong> We store your Minecraft Username, UUID, IP address, and in-game statistics.</li>
              <li><strong className="text-primary/90">Discord Data:</strong> If you link your Discord account, we store your Discord ID, username, and avatar to sync roles.</li>
              <li><strong className="text-primary/90">Payment Data:</strong> When purchasing ranks or items, payment details are securely processed by our payment providers. We do not store your full credit card information.</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the collected information solely to operate, maintain, and improve the MeerMc network. This includes applying ranks you purchase, preventing cheating via IP bans, and providing support.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">Data Protection</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
            </p>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
