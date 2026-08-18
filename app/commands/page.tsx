"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Copy, Check, Shield, Swords, ShoppingBag, Sparkles, Wrench, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { plugins } from "@/config/plugins";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";

const categories = [
  { id: "all", name: "All Plugins", icon: Zap },
  { id: "economy", name: "Economy", icon: ShoppingBag },
  { id: "protection", name: "Protection", icon: Shield },
  { id: "pvp", name: "PvP", icon: Swords },
  { id: "cosmetics", name: "Cosmetics", icon: Sparkles },
  { id: "utility", name: "Utility", icon: Wrench },
];

export default function CommandsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPlugin, setExpandedPlugin] = useState<number | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const filteredPlugins = useMemo(() => {
    return plugins.filter((plugin) => {
      const matchesCategory =
        selectedCategory === "all" || plugin.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.commands.some((cmd) =>
          cmd.command.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyCommand = async (command: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          title="Server Commands" 
          subtitle="Discover the custom commands and features available on MeerMc" 
        />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands..."
              className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                selectedCategory === category.id
                  ? "bg-primary/20 border border-primary/40 text-primary"
                  : "bg-primary/5 border border-primary/20 text-muted-foreground hover:bg-primary/10"
              )}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Plugin Cards */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredPlugins.map((plugin, index) => (
            <motion.div
              key={plugin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <GlowCard hover={false} className="p-0 overflow-hidden">
                <button
                  onClick={() => setExpandedPlugin(expandedPlugin === plugin.id ? null : plugin.id)}
                  className="w-full flex flex-col sm:flex-row items-center justify-between p-5 sm:p-6 text-center sm:text-left gap-3 sm:gap-4 relative"
                >
                  <div className="absolute top-4 right-4 sm:hidden">
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300",
                        expandedPlugin === plugin.id && "rotate-180"
                      )}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/20">
                      {(() => {
                        const IconComponent = categories.find(
                          (c) => c.id === plugin.category
                        )!.icon;
                        return <IconComponent className="w-6 h-6" />;
                      })()}
                    </div>
                    <div className="min-w-0 flex flex-col items-center sm:items-start flex-1 mt-1 sm:mt-0">
                      <h3 className="font-semibold text-foreground text-base whitespace-normal leading-tight break-words text-center sm:text-left w-full sm:w-auto">
                        {plugin.name}
                      </h3>
                      <span className="sm:hidden text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-md whitespace-nowrap border border-primary/20 mt-1.5 mb-1.5 inline-block">
                        {plugin.commands.length} cmds
                      </span>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-0.5 text-center sm:text-left w-full sm:w-auto">
                        {plugin.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Right Side */}
                  <div className="hidden sm:flex items-center gap-3 shrink-0 ml-1">
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-md whitespace-nowrap border border-primary/20">
                      {plugin.commands.length} cmds
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform duration-300",
                        expandedPlugin === plugin.id && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedPlugin === plugin.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-primary/10 bg-black/20"
                    >
                      <div className="p-4 sm:p-6 space-y-2">
                        {plugin.commands.map((cmd) => (
                          <div
                            key={cmd.command}
                            className="flex flex-col justify-center p-3 sm:p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group gap-2"
                          >
                            <div className="flex items-start sm:items-center justify-between gap-3 w-full">
                              <code className="font-mono text-xs sm:text-sm text-primary bg-primary/10 border border-primary/20 px-2.5 sm:px-3 py-1.5 rounded-md break-words whitespace-normal min-w-0">
                                {cmd.command}
                              </code>
                              <button
                                onClick={() => copyCommand(cmd.command)}
                                className="p-1.5 sm:p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-primary/20 hover:scale-105 flex-shrink-0"
                                title="Copy command"
                              >
                                {copiedCommand === cmd.command ? (
                                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                )}
                              </button>
                            </div>
                            <span className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                              {cmd.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPlugins.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">No commands found</h3>
            <p className="text-muted-foreground">No commands found matching your search</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
