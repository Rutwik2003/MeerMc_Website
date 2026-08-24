import { NextResponse } from 'next/server';

// Cache this response for 15 seconds to prevent spamming the Minecraft server
export const revalidate = 15;

export async function GET() {
  const apiHost = process.env.PLUGIN_API_HOST || "127.0.0.1";
  const apiPort = process.env.PLUGIN_API_PORT || "25580";

  if (!process.env.PLUGIN_API_HOST) {
    console.warn("PLUGIN_API_HOST not configured. Using default 127.0.0.1");
  }

  try {
    const crypto = require("crypto");
    const timestamp = Date.now().toString();
    const apiKey = process.env.PLUGIN_API_KEY || "default_secret_key";
    const signature = crypto.createHmac("sha256", apiKey).update(timestamp).digest("hex");

    const response = await fetch(`http://${apiHost}:${apiPort}/api/players`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "X-Timestamp": timestamp,
        "X-Signature": signature
      },
      // Short timeout so the website doesn't hang if the server is offline
      signal: AbortSignal.timeout(3000) 
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    // The plugin returns { "players": ["Notch", "Jeb_"] }
    // which is already a clean array of strings!
    return NextResponse.json({ players: data.players || [] });
  } catch (error) {
    console.error("Plugin API Error:", error);
    return NextResponse.json({ error: "Failed to fetch players", players: [] }, { status: 500 });
  }
}
