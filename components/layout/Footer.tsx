"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/env";
import { CopyButton } from "@/components/ui/CopyButton";

const footerLinks = {
  quickLinks: [
    { name: "Server", href: "/server" },
    { name: "Shop", href: "/shop" },
    { name: "Gallery", href: "/gallery" },
    { name: "Commands", href: "/commands" },
    { name: "Vote", href: "/vote" },
  ],
  legal: [
    { name: "Terms of Service", href: "/tos" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refunds" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-purple-500/20 bg-[#0a0410]/80 backdrop-blur-xl overflow-hidden mt-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
                <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:border-primary/40 transition-colors">
                  <Image
                    src="/branding/logo/MeerMc_Logo.png"
                    alt={`${siteConfig.name} logo`}
                    fill
                    sizes="48px"
                    className="object-contain p-1 drop-shadow-md"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-pixel text-sm text-gradient">
                    {siteConfig.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Minecraft Server
                  </span>
                </div>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
                {siteConfig.description}. Join thousands of players on the ultimate Minecraft survival experience. Build, explore, and conquer.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center hover:bg-pink-500/20 transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-pixel text-xs text-primary uppercase mb-4 tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-pixel text-xs text-primary uppercase mb-4 tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © {currentYear} {siteConfig.name}. All rights reserved. <br className="md:hidden"/>Not affiliated with Mojang Studios.
          </p>
          
          <div className="flex items-center gap-3 bg-white/5 rounded-full p-1 pl-4 border border-white/10">
            <span className="text-muted-foreground text-xs font-medium">IP:</span>
            <span className="text-primary font-mono text-sm">{siteConfig.server.javaIp}</span>
            <CopyButton text={siteConfig.server.javaIp} variant="ghost" className="h-8 w-8 p-0 rounded-full bg-primary/20 hover:bg-primary hover:text-white" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
