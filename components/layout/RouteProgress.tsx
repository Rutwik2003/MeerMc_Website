"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      // Route changed — animate completion
      setProgress(100);
      const t = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      prevPath.current = pathname;
      return () => clearTimeout(t);
    }
  }, [pathname]);

  // Listen for link clicks to start the progress bar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
      if (href === pathname) return;

      setVisible(true);
      setProgress(30);

      // Simulate progress
      const t1 = setTimeout(() => setProgress(60), 150);
      const t2 = setTimeout(() => setProgress(80), 400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
      style={{ opacity: visible || progress === 100 ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_10px_rgba(212,95,255,0.5)]"
        style={{
          width: `${progress}%`,
          transition: progress === 0 ? "none" : "width 300ms ease, opacity 300ms ease",
        }}
      />
    </div>
  );
}
