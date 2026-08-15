"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import CopyDiscordId from "@/components/ui/CopyDiscordId";
import { siteConfig } from "@/config/env";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

const faqs = [
  {
    question: "How do I join the server?",
    answer: `You can join the server using the IP address: ${siteConfig.server.javaIp}. Currently, we support Minecraft Java Edition versions ${siteConfig.server.version} through the latest release. Bedrock players can join using ${siteConfig.server.bedrockIp} on port ${siteConfig.server.bedrockPort}.`
  },
  {
    question: "How do I get a rank?",
    answer: "You can purchase ranks in our online store by clicking 'Store' in the navigation bar. Alternatively, you can participate in community events or use Vote Points to get free perks!"
  },
  {
    question: "Is claiming land free?",
    answer: "Yes! We use a golden shovel claiming system. You start with a set amount of claim blocks, and you earn more just by playing on the server."
  },
  {
    question: "How do I apply for staff?",
    answer: "We are often looking for dedicated players to join our staff team. You can apply by clicking the 'Apply Now' button in our About page or directly visiting the /apply page."
  },
  {
    question: "I lost my items, can I get them back?",
    answer: (
      <>
        If you lost items due to a server crash or bug, please contact on Discord IDs{" "}
        {siteConfig.contacts.discordIds.map((id, index) => (
          <span key={id}>
            <CopyDiscordId id={id} />
            {index < siteConfig.contacts.discordIds.length - 1 ? " or " : ""}
          </span>
        ))}
        . Items lost to normal gameplay (dying, lava, etc.) are generally not refunded.
      </>
    )
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10">
            <MessageCircleQuestion className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle={
            <span className="flex flex-wrap items-center justify-center gap-1">
              Got questions? We've got answers. If you can't find what you're looking for, feel free to contact on Discord IDs 
              {siteConfig.contacts.discordIds.map((id, index) => (
                <span key={id} className="inline-flex items-center">
                  <CopyDiscordId id={id} />
                  {index < siteConfig.contacts.discordIds.length - 1 ? " or " : ""}
                </span>
              ))}
              .
            </span> as unknown as string
          }
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowCard hover={false} className="p-0 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors rounded-xl"
                >
                  <span className="font-semibold text-lg text-white/90">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-black/20"
                    >
                      <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-primary/10 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
