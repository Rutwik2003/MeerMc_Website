"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Users, Loader2, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useServerStatus } from "@/hooks/useServerStatus";
import { useRconPlayers } from "@/hooks/useRconPlayers";
import { siteConfig } from "@/config/env";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Server", href: "/server" },
  { name: "Shop", href: "/shop" },
  { name: "Gallery", href: "/gallery" },
  { name: "Commands", href: "/commands" },
  { name: "About", href: "/about" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshCountdown, setRefreshCountdown] = useState(30);
  
  const { players: rconPlayers, loading: isFetchingPlayers, fetchPlayers: fetchRconPlayers } = useRconPlayers();
  
  const pathname = usePathname();
  const activeLink = pathname;
  
  const { status, loading, refetch } = useServerStatus();
  const { copy } = useCopyToClipboard();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!sidebarOpen || !status.online) return;

    const timer = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          fetchRconPlayers(true, true); // force=true, isBackground=true
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sidebarOpen, status.online, fetchRconPlayers]);

  const openSidebar = async () => {
    setSidebarOpen(true);
    refetch();
    
    // Only fetch RCON if server is technically online (from last known state) and we haven't fetched yet
    if (rconPlayers.length === 0) {
      setRefreshCountdown(30);
      await fetchRconPlayers();
    }
  };
  
  const handleCopyIp = () => {
    copy(siteConfig.server.javaIp);
    toast.success("IP Copied to clipboard!");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md",
          scrolled
            ? "bg-[#0f111a]/90 border-b border-white/5 shadow-lg"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group z-50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center"
              >
                <Image
                  src="/branding/logo/MeerMc_Logo.png"
                  alt="MeerMc logo"
                  fill
                  sizes="48px"
                  className="object-contain drop-shadow-md"
                  priority
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-pixel text-xs lg:text-sm text-primary group-hover:text-secondary transition-colors text-gradient">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-muted-foreground hidden sm:block">
                  Minecraft Server
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                    activeLink === link.href
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/20 rounded-lg border border-primary/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={openSidebar}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <div className={cn("w-2 h-2 rounded-full", status.online ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" : "bg-red-500")} />
                <span className="text-gray-200">
                  {loading ? "..." : `${status.players} Online`}
                </span>
              </button>
              
              <button
                onClick={handleCopyIp}
                className="blocky-button bg-primary/20 border border-primary/50 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                Copy IP
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-[#0f111a]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-lg transition-all text-sm font-medium",
                          activeLink === link.href
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3"
                  >
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        openSidebar();
                      }}
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-white/5 text-gray-300 font-semibold text-sm hover:bg-white/10"
                    >
                      <div className={cn("w-2.5 h-2.5 rounded-full", status.online ? "bg-green-500" : "bg-red-500")} />
                      {loading ? "Loading..." : `${status.players} Players Online`}
                    </button>
                    <button
                      onClick={() => {
                        handleCopyIp();
                        setIsOpen(false);
                      }}
                      className="w-full px-6 py-3 rounded-lg bg-primary/20 border border-primary/50 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all"
                    >
                      Copy IP Address
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Slide-out Sidebar for Online Players */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0c10]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Online Players
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {status.online ? (
                      <span className="text-green-400">{status.players} / {status.maxPlayers} Online</span>
                    ) : (
                      <span className="text-red-400">Server Offline</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {isFetchingPlayers || loading ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span>Fetching live players...</span>
                  </div>
                ) : !status.online ? (
                   <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <div className="w-16 h-16 mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                      <X className="w-8 h-8 text-red-500" />
                    </div>
                    <span className="text-lg font-medium text-white mb-2">Server Offline</span>
                    <span className="text-sm text-center px-4">Cannot fetch player list while the server is offline.</span>
                  </div>
                ) : rconPlayers.length > 0 ? (
                  <div className="space-y-3">
                    {rconPlayers.map((name: string, i: number) => {
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={i} 
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <img 
                            src={`${siteConfig.api.mcHeads}/avatar/${name}/32`} 
                            alt={name}
                            className="w-8 h-8 rounded bg-black/50"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `${siteConfig.api.mcHeads}/avatar/Steve/32`;
                            }}
                          />
                          <span className="font-medium text-gray-200">{name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-gray-600" />
                    </div>
                    <span className="text-base font-medium text-white mb-1">0 players online</span>
                    <span className="text-sm text-center px-4">Nobody is currently playing on the server.</span>
                  </div>
                )}
              </div>

              {/* Refresh Footer */}
              {status.online && (
                <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    Refreshing in {refreshCountdown}s
                  </span>
                  <button 
                    onClick={() => { setRefreshCountdown(30); fetchRconPlayers(true, false); }}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <RefreshCw className={cn("w-3.5 h-3.5", isFetchingPlayers && "animate-spin")} />
                    Refresh Now
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
