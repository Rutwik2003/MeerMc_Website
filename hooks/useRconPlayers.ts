import { useState, useEffect, useCallback } from "react";

// Module-level cache to share state globally across all components
let globalPlayersCache: string[] = [];
let lastFetchTime = 0;
let isFetching = false;
let subscribers: Set<() => void> = new Set();

const notifySubscribers = () => {
  subscribers.forEach(callback => callback());
};

export function useRconPlayers() {
  const [players, setPlayers] = useState<string[]>(globalPlayersCache);
  const [loading, setLoading] = useState<boolean>(isFetching);

  useEffect(() => {
    // Sync state with global cache when mounting
    setPlayers(globalPlayersCache);
    setLoading(isFetching);

    const handleUpdate = () => {
      setPlayers(globalPlayersCache);
      setLoading(isFetching);
    };

    subscribers.add(handleUpdate);
    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);

  const fetchPlayers = useCallback(async (force = false, isBackground = false) => {
    const now = Date.now();
    // Cache for 10 seconds to prevent double fetching
    if (!force && globalPlayersCache.length > 0 && (now - lastFetchTime < 10000)) {
      return globalPlayersCache;
    }

    if (isFetching) return; // Prevent concurrent fetches

    isFetching = true;
    if (!isBackground) notifySubscribers();

    try {
      const res = await fetch("/api/players");
      const data = await res.json();
      if (data.players) {
        globalPlayersCache = data.players;
        lastFetchTime = Date.now();
      }
    } catch (err) {
      console.error("Failed to fetch RCON players", err);
    } finally {
      isFetching = false;
      notifySubscribers();
    }
  }, []);

  return {
    players,
    loading,
    fetchPlayers,
    lastFetchTime
  };
}
