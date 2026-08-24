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
      
      const [javaResponse, bedrockResponse] = await Promise.all([
        fetch(`${siteConfig.api.mcSrvStat}/3/${siteConfig.server.javaIp}:${siteConfig.server.javaPort}`, { signal: abortSignal }),
        fetch(`${siteConfig.api.mcSrvStat}/bedrock/3/${siteConfig.server.bedrockIp}:${siteConfig.server.bedrockPort}`, { signal: abortSignal })
      ]);

      const javaData = await javaResponse.json();
      const bedrockData = await bedrockResponse.json();

      const javaOnline = javaData.online === true;
      const bedrockOnline = bedrockData.online === true;
      
      // Since it's a crossplay server, Java pings typically include Geyser players.
      // Adding Bedrock pings on top causes double-counting. Prioritize Java count.
      const players = javaOnline 
        ? (javaData.players?.online || 0) 
        : (bedrockOnline ? (bedrockData.players?.online || 0) : 0);
        
      const maxPlayers = javaOnline 
        ? (javaData.players?.max || 0) 
        : (bedrockOnline ? (bedrockData.players?.max || 0) : 0);
        
      const playerList = javaOnline ? (javaData.players?.list || []) : [];

      setStatus({
        online: javaOnline || bedrockOnline,
        players,
        maxPlayers,
        playerList,
        javaOnline,
        bedrockOnline,
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
