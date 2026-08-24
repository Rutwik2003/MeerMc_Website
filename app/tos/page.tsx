"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading 
          title="Terms of Service" 
          subtitle="Last updated: August 2026"
        />
        
        <GlowCard hover={false} className="p-8 md:p-12">
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg text-white/90 mb-8">
              By accessing and playing on MeerMc, you agree to abide by these Terms of Service. 
              These rules are designed to ensure a safe, fair, and enjoyable environment for all players.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">1. General Rules</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-primary/90">Respect:</strong> Respect all players and staff members. Harassment, hate speech, or toxicity will not be tolerated.</li>
              <li><strong className="text-primary/90">Fair Play:</strong> Do not use any unauthorized client modifications, hacks, or exploits.</li>
              <li><strong className="text-primary/90">No Advertising:</strong> Do not advertise other servers or services.</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Account Responsibility</h2>
            <p>
              You are entirely responsible for the security of your Minecraft and Discord accounts. 
              Any rule violations committed on your account will result in punishment, regardless of who was playing.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Purchases and Donations</h2>
            <p>
              All purchases made through our store are final. See our Refund Policy for more details. 
              If you are under 18, you must have permission from a parent or guardian before making any purchases.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our server 
              constitutes acceptance of any modified terms.
            </p>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
