import { useState, useCallback } from "react";

interface UseCopyToClipboardResult {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
  error: Error | null;
}

export function useCopyToClipboard(resetInterval = 2000): UseCopyToClipboardResult {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setError(null);
      setTimeout(() => setCopied(false), resetInterval);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to copy text"));
      setCopied(false);
      return false;
    }
  }, [resetInterval]);

  return { copy, copied, error };
}
