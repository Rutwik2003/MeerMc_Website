"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CopyDiscordId({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(id);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = id;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success(`Copied ${id} to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <span 
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-0.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-md cursor-pointer transition-all whitespace-nowrap"
      title="Click to copy Discord ID"
    >
      {copied ? (
        <>
          <span className="font-mono text-sm font-semibold">Copied!</span>
          <Check className="w-3.5 h-3.5" />
        </>
      ) : (
        <>
          <span className="font-mono text-sm font-semibold">{id}</span>
          <Copy className="w-3.5 h-3.5" />
        </>
      )}
    </span>
  );
}
