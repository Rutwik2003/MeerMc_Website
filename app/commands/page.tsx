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
                  onClick={() =>
                    setExpandedPlugin(
                      expandedPlugin === plugin.id ? null : plugin.id
                    )
                  }
                  className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-colors gap-3 rounded-xl"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      {categories.find((c) => c.id === plugin.category)?.icon && (
                        <div className="text-primary">
                          {(() => {
                            const IconComponent = categories.find(
                              (c) => c.id === plugin.category
                            )!.icon;
                            return <IconComponent className="w-6 h-6" />;
                          })()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{plugin.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {plugin.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="text-[10px] sm:text-xs text-primary bg-primary/10 px-1.5 sm:px-2 py-1 rounded-md whitespace-nowrap border border-primary/20">
                      {plugin.commands.length} commands
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
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group gap-2"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                              <code className="font-mono text-xs sm:text-sm text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-md whitespace-nowrap w-fit">
                                {cmd.command}
                              </code>
                              <span className="text-xs sm:text-sm text-muted-foreground">
                                {cmd.description}
                              </span>
                            </div>
                            <button
                              onClick={() => copyCommand(cmd.command)}
                              className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:bg-primary/20 hover:scale-105 flex-shrink-0 self-start sm:self-center"
                              title="Copy command"
                            >
                              {copiedCommand === cmd.command ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
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
