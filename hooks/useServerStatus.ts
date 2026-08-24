import { useState, useEffect, useCallback } from "react";
import { ServerStatus } from "@/types";
import { siteConfig } from "@/config/env";

export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus>({
    online: false,
    players: 0,
    maxPlayers: 0,
    playerList: [],
    javaOnline: false,
    bedrockOnline: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatus = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      setLoading(true);
      
      const response = await fetch("/api/players", { signal: abortSignal });
      const data = await response.json();

      const playerList = data.players || [];
      const players = playerList.length;
      const maxPlayers = 50; // Hardcoded fallback or could be added to API
      const isOnline = !data.error;

      setStatus({
        online: isOnline,
        players,
        maxPlayers,
        playerList,
        javaOnline: isOnline,
        bedrockOnline: isOnline,
      });
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err : new Error("Failed to fetch server status"));
      setStatus(prev => ({ ...prev, online: false, javaOnline: false, bedrockOnline: false }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    
    fetchStatus(controller.signal);

    const intervalId = setInterval(() => {
      fetchStatus(controller.signal);
    }, 60000);

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [fetchStatus]);

  return { status, loading, error, refetch: () => fetchStatus() };
}
