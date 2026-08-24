import { NextResponse } from 'next/server';

// Cache this response for 1 hour (3600 seconds) to prevent spamming the Minecraft server
export const revalidate = 3600;

export async function GET() {
  const apiHost = process.env.PLUGIN_API_HOST || "127.0.0.1";
  const apiPort = process.env.PLUGIN_API_PORT || "25580";

  try {
    const crypto = require("crypto");
    const timestamp = Date.now().toString();
    const apiKey = process.env.PLUGIN_API_KEY || "default_secret_key";
    const signature = crypto.createHmac("sha256", apiKey).update(timestamp).digest("hex");

    const response = await fetch(`http://${apiHost}:${apiPort}/api/voters`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "X-Timestamp": timestamp,
        "X-Signature": signature
      },
      signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) {
      throw new Error("Plugin API Error");
    }

    const data = await response.json(); // returns [{username: "Player", votes: 10}]
    
    // Map the plugin data to what the frontend expects
    const voters = data.map((voter: any, index: number) => ({
      rank: index + 1,
      name: voter.username,
      votes: voter.votes,
      reward: getRewardByRank(index + 1),
      color: getColorByRank(index + 1)
    }));

    if (voters.length > 0) {
      return NextResponse.json({ voters });
    } else {
      return NextResponse.json({ voters: getMockVoters() });
    }

  } catch (error) {
    console.error("Error fetching voters:", error);
    // Return mock data fallback if server is offline
    return NextResponse.json({ voters: getMockVoters() });
  }
}

// Helper functions for consistent UI
function getRewardByRank(rank: number) {
  switch(rank) {
    case 1: return "$10 Store Credit";
    case 2: return "$5 Store Credit";
    case 3: return "3x Mythic Keys";
    default: return "1x Rare Key";
  }
}

function getColorByRank(rank: number) {
  switch(rank) {
    case 1: return "from-yellow-400 to-amber-600";
    case 2: return "from-slate-300 to-slate-500";
    case 3: return "from-amber-600 to-orange-800";
    default: return "from-primary to-purple-600";
  }
}

function getMockVoters() {
  return [
    { rank: 1, name: "Rimuru0_0", votes: 42, reward: "$10 Store Credit", color: "from-yellow-400 to-amber-600" },
    { rank: 2, name: "Shishui", votes: 38, reward: "$5 Store Credit", color: "from-slate-300 to-slate-500" },
    { rank: 3, name: "Rocky_rutwik", votes: 35, reward: "3x Mythic Keys", color: "from-amber-600 to-orange-800" }
  ];
}
