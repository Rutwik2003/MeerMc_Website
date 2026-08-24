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

    const response = await fetch(`http://${apiHost}:${apiPort}/api/leaderboard`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "X-Timestamp": timestamp,
        "X-Signature": signature
      },
      signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Plugin API Error:", error);
    return NextResponse.json([]);
  }
}
