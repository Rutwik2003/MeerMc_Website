import { NextResponse } from 'next/server';
import { Rcon } from 'rcon-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { RCON_HOST, RCON_PORT, RCON_PASSWORD } = process.env;

  if (!RCON_HOST || !RCON_PORT || !RCON_PASSWORD) {
    return NextResponse.json({ error: "RCON not configured" }, { status: 500 });
  }

  let rcon: Rcon | null = null;
  try {
    // Timeout of 3 seconds to prevent hanging requests
    rcon = await Rcon.connect({
      host: RCON_HOST,
      port: parseInt(RCON_PORT, 10),
      password: RCON_PASSWORD,
      timeout: 3000
    });

    const response = await rcon.send("list");
    
    // Parse response
    // Minecraft /list output format: "There are X of a max of Y players online: Player1, Player2"
    let players: string[] = [];
    const colonIndex = response.indexOf(":");
    
    if (colonIndex !== -1) {
      // Take everything after the first colon (handles Vanilla and start of Essentials)
      const afterFirstColon = response.substring(colonIndex + 1);
      
      // Split by comma for each player (or group of players)
      const rawPlayers = afterFirstColon.split(",");
      
      players = rawPlayers.map(part => {
        // If a part has another colon (e.g. " Member: .BedrockPlayer"), 
        // the actual username is always after the final colon in that segment.
        const actualNamePart = part.includes(":") ? part.split(":").pop()! : part;
        
        // Strip Minecraft color codes globally
        const cleanName = actualNamePart.replace(/§[0-9a-fk-or]/gi, '').trim();
        
        // Extract just the username (first word), dropping rank suffixes like 'developer'
        // This natively supports Bedrock Geyser prefixes like '.' or '*'
        return cleanName.split(" ")[0];
      }).filter(name => name.length > 0);
    }

    return NextResponse.json({ players });
  } catch (error) {
    console.error("RCON Error:", error);
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 });
  } finally {
    if (rcon) {
      rcon.end();
    }
  }
}
