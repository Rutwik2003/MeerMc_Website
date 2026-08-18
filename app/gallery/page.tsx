"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Search, Filter, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { galleryItems } from "@/config/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categories = ["All", "Builds", "Events", "PvP", "Community"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const featuredItems = galleryItems.filter(item => item.featured);
  // Fallback to first 3 items if no featured items exist
  const showcaseItems = featuredItems.length > 0 ? featuredItems : galleryItems.slice(0, 3);

  const activeImageIndex = filteredItems.findIndex((i) => i.id === selectedImage);
  const activeItem = filteredItems[activeImageIndex];

  // Auto-rotate featured showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [showcaseItems.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[activeImageIndex + 1].id);
      setIsZoomed(false);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex > 0) {
      setSelectedImage(filteredItems[activeImageIndex - 1].id);
      setIsZoomed(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") {
        setSelectedImage(null);
        setIsZoomed(false);
      }
      if (e.key === "ArrowRight" && activeImageIndex < filteredItems.length - 1) {
        setSelectedImage(filteredItems[activeImageIndex + 1].id);
        setIsZoomed(false);
      }
      if (e.key === "ArrowLeft" && activeImageIndex > 0) {
        setSelectedImage(filteredItems[activeImageIndex - 1].id);
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, activeImageIndex, filteredItems.length]);

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          title="Community Gallery" 
          subtitle="Explore the most stunning moments, legendary builds, and epic battles from our server." 
        />

        {/* Featured Showcase (New V2 Feature) */}
        {selectedCategory === "All" && showcaseItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="text-xl font-bold font-heading text-white tracking-wide">Featured Highlights</h3>
            </div>
            
            <div className="relative w-full h-[400px] md:h-[500px] bento-card rounded-[2.5rem] p-2 overflow-hidden border border-primary/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="relative w-full h-full rounded-[2rem] overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(showcaseItems[featuredIndex].id)}
                >
                  <Image
                    src={showcaseItems[featuredIndex].src}
                    alt={showcaseItems[featuredIndex].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0410] via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12">
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] sm:text-xs font-bold mb-2 sm:mb-3">
                      {showcaseItems[featuredIndex].category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white mb-2 drop-shadow-lg break-words">
                      {showcaseItems[featuredIndex].title}
                    </h2>
                    <p className="text-white/80 text-sm sm:text-lg max-w-2xl drop-shadow-md">
                      {showcaseItems[featuredIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Showcase Navigation Dots */}
              <div className="absolute bottom-8 right-8 flex gap-2 z-10">
                {showcaseItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFeaturedIndex(idx)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      idx === featuredIndex ? "bg-primary w-8 shadow-[0_0_10px_rgba(168,85,247,0.8)]" : "bg-white/30 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <Filter className="w-4 h-4 text-muted-foreground mr-2 hidden sm:block" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedImage(null);
              }}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary to-purple-600 border border-primary/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  "group relative cursor-pointer bento-card p-2 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)] hover:border-primary/40",
                  item.featured && "sm:col-span-2 sm:row-span-2 ring-1 ring-primary/30"
                )}
                onClick={() => setSelectedImage(item.id)}
              >
                <div className="aspect-square relative w-full h-full rounded-[1.5rem] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={item.featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0410]/90 via-[#0a0410]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>

                {/* Floating Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bento-card rounded-[2rem] border border-white/5"
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground font-medium">No images found in this category</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox V2 */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0410]/90 p-4 sm:p-8"
            onClick={() => {
              setSelectedImage(null);
              setIsZoomed(false);
            }}
          >
            <button
              onClick={() => {
                setSelectedImage(null);
                setIsZoomed(false);
              }}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-primary hover:scale-110 transition-all z-50 border border-white/20 shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>

            {activeImageIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-primary hover:scale-110 transition-all z-50 border border-white/20 shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {activeImageIndex < filteredItems.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-primary hover:scale-110 transition-all z-50 border border-white/20 shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-square sm:aspect-video flex flex-col items-center justify-center rounded-[2.5rem] bento-card p-2 md:p-3 border border-primary/20 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div 
                className={`relative w-full h-full shadow-2xl rounded-[2rem] overflow-hidden ${isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
                animate={isZoomed ? { scale: 2 } : { scale: 1, x: 0, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                drag={isZoomed}
                dragConstraints={{ top: -300, left: -300, right: 300, bottom: 300 }}
                dragElastic={0.1}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  className="object-cover sm:object-contain bg-black/40"
                  quality={100}
                  draggable={false}
                />
              </motion.div>
              
              <AnimatePresence>
                {!isZoomed && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-6 md:p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl pointer-events-none shadow-2xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold w-fit tracking-wider uppercase">
                        {activeItem.category}
                      </span>
                      <h3 className="text-xl md:text-3xl font-bold text-white drop-shadow-md">
                        {activeItem.title}
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm md:text-base drop-shadow-md mt-2">
                      {activeItem.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
