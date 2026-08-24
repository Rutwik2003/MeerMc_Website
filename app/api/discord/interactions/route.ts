import { NextResponse } from "next/server";
import nacl from "tweetnacl";
import { siteConfig } from "@/config/env";

// This is required for Discord to verify the webhook ownership securely
function verifyDiscordSignature(req: Request, rawBody: string) {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const publicKey = process.env.DISCORD_PUBLIC_KEY;

  if (!signature || !timestamp || !publicKey) {
    return false;
  }

  try {
    return nacl.sign.detached.verify(
      Buffer.from(timestamp + rawBody),
      Buffer.from(signature, "hex"),
      Buffer.from(publicKey, "hex")
    );
  } catch (err) {
    console.error("Signature verification failed", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    
    if (!verifyDiscordSignature(req, rawBody)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const interaction = JSON.parse(rawBody);

    // Discord Ping Event (Type 1)
    if (interaction.type === 1) {
      return NextResponse.json({ type: 1 });
    }

    // Button Click Event (Type 3)
    if (interaction.type === 3 && interaction.data) {
      const customId = interaction.data.custom_id; // e.g. "approve:rank:vip:PlayerName:1"
      
      const adminUsername = interaction.member?.user?.username || interaction.user?.username || "Admin";

      if (customId.startsWith("deny:")) {
        // Return type 7 (UPDATE_MESSAGE) to remove the buttons and show it was denied
        return NextResponse.json({
          type: 7,
          data: {
            content: `❌ **Payment Denied** by ${adminUsername}`,
            components: [], // Removes buttons
          },
        });
      }

      if (customId.startsWith("approve:")) {
        const parts = customId.split(":");
        if (parts.length < 5) {
          return NextResponse.json({ error: "Invalid custom_id format" }, { status: 400 });
        }

        const [_, itemType, itemId, username, quantityStr] = parts;
        const quantity = parseInt(quantityStr, 10) || 1;

        if (!/^[a-zA-Z0-9_]{1,16}$/.test(username)) {
          return NextResponse.json({ error: "Invalid username format" }, { status: 400 });
        }

        let commandsToRun: string[] = [];

        // Generate commands based on the item purchased
        if (itemType === "rank") {
          // quantity is the number of months selected
          const days = quantity * 30;
          commandsToRun.push(`lp user ${username} parent addtemp ${itemId} ${days}d accumulate`);
          
          // Bonus crate keys and cosmetic keys based on rank
          if (itemId === "vip" || itemId === "cutie") {
            commandsToRun.push(`crate key give ${username} common 2`);
            commandsToRun.push(`crate key give ${username} uncommon 1`);
            commandsToRun.push(`crate key give ${username} rare 1`);
            commandsToRun.push(`uc give key 2 ${username}`);
          } else if (itemId === "elite") {
            commandsToRun.push(`crate key give ${username} common 3`);
            commandsToRun.push(`crate key give ${username} uncommon 2`);
            commandsToRun.push(`crate key give ${username} rare 2`);
            commandsToRun.push(`uc give key 4 ${username}`);
          } else if (itemId === "investor" || itemId === "creator" || itemId === "partner") {
            commandsToRun.push(`crate key give ${username} common 5`);
            commandsToRun.push(`crate key give ${username} uncommon 2`);
            commandsToRun.push(`crate key give ${username} rare 3`);
            commandsToRun.push(`uc give key 6 ${username}`);
          }
        } else if (itemType === "crate") {
          commandsToRun.push(`crate key give ${username} ${itemId} ${quantity}`);
        }

        if (commandsToRun.length === 0) {
          return NextResponse.json({ error: "Unknown item type" }, { status: 400 });
        }

        // Execute via Plugin API
        const apiHost = process.env.PLUGIN_API_HOST || "127.0.0.1";
        const apiPort = process.env.PLUGIN_API_PORT || "25580";
        const apiKey = process.env.PLUGIN_API_KEY;

        if (!apiKey) {
          console.error("PLUGIN_API_KEY not configured");
          return NextResponse.json(
            {
              type: 4, 
              data: { content: "⚠️ Plugin API Key is not configured in .env", flags: 64 },
            }
          );
        }

        try {
          const crypto = require("crypto");
          const payloadBody = commandsToRun.join("\n");
          const timestamp = Date.now().toString();
          const signature = crypto.createHmac("sha256", apiKey).update(timestamp + payloadBody).digest("hex");

          const response = await fetch(`http://${apiHost}:${apiPort}/api/execute`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "text/plain",
              "X-Timestamp": timestamp,
              "X-Signature": signature
            },
            body: payloadBody
          });

          if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
          }

          let rconResponses = commandsToRun.map(cmd => `\`> ${cmd}\`\n\`Success\``);

          // Update the original message to show it was approved and buttons removed
          return NextResponse.json({
            type: 7,
            data: {
              content: `✅ **Payment Approved** by ${adminUsername}.\n\n**Rewards Issued:**\n${rconResponses.join("\n\n")}`,
              components: [], // Removes buttons
            },
          });
        } catch (apiError) {
          console.error("Plugin API Error:", apiError);
          // Ephemeral error message to the admin
          return NextResponse.json({
            type: 4,
            data: {
              content: `❌ Failed to connect to Minecraft Server via Plugin API. Is the server online?`,
              flags: 64
            },
          });
        }
      }
    }

    // Slash Command Event (Type 2)
    if (interaction.type === 2 && interaction.data) {
      const commandName = interaction.data.name;

      if (commandName === "server") {
        return NextResponse.json({
          type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
          data: {
            embeds: [
              {
                title: `🌟 ${siteConfig.name} Network 🌟`,
                description: `Join the most amazing Minecraft experience today!\n\n**Java IP:** \`${siteConfig.server.javaIp}\`\n**Bedrock IP:** \`${siteConfig.server.bedrockIp}\`\n**Port:** \`${siteConfig.server.bedrockPort}\`\n**Version:** \`${siteConfig.server.version}\`\n\nDive into custom survival, collect unique cosmetics, and join our amazing community!`,
                color: 0x9333ea, // Tailwind Purple-600
                footer: {
                  text: `${siteConfig.name} Server Info`
                }
              }
            ]
          }
        });
      }

      if (commandName === "site") {
        return NextResponse.json({
          type: 4,
          data: {
            embeds: [
              {
                title: "🌐 Official Website",
                description: `Visit our official website to view the gallery, check server commands, and more!\n\n👉 **[${siteConfig.name}](${siteConfig.url})**`,
                color: 0xa855f7, // Tailwind Purple-500
              }
            ]
          }
        });
      }

      if (commandName === "rank") {
        return NextResponse.json({
          type: 4,
          data: {
            embeds: [
              {
                title: `👑 ${siteConfig.name} Ranks`,
                description: `Support the server and get incredible perks, cosmetics, and keys!\n\n⭐ **VIP**\n🌸 **Cutie**\n💎 **Elite**\n📈 **Investor**\n\n🛒 **[Buy a rank in the Shop!](${siteConfig.url}/shop)**`,
                color: 0xd946ef, // Tailwind Fuchsia-500
              }
            ]
          }
        });
      }

      if (commandName === "verify") {
        const codeOption = interaction.data.options?.find((opt: any) => opt.name === 'code');
        const code = codeOption?.value;
        const discordId = interaction.member?.user?.id || interaction.user?.id;

        if (!code || !discordId) {
          return NextResponse.json({ type: 4, data: { content: "Invalid verification data.", flags: 64 } });
        }

        const apiHost = process.env.PLUGIN_API_HOST || "127.0.0.1";
        const apiPort = process.env.PLUGIN_API_PORT || "25580";
        const apiKey = process.env.PLUGIN_API_KEY;

        try {
          const crypto = require("crypto");
          const payloadBody = `${code}:${discordId}`;
          const timestamp = Date.now().toString();
          const signature = crypto.createHmac("sha256", apiKey || "default_secret_key").update(timestamp + payloadBody).digest("hex");

          const response = await fetch(`http://${apiHost}:${apiPort}/api/link`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "text/plain",
              "X-Timestamp": timestamp,
              "X-Signature": signature
            },
            body: payloadBody
          });

          if (!response.ok) {
            if (response.status === 400) {
              return NextResponse.json({ type: 4, data: { content: "❌ Invalid or expired code.", flags: 64 } });
            }
            throw new Error("Plugin API error");
          }

          return NextResponse.json({
            type: 4,
            data: {
              content: `✅ Your Discord account has been successfully linked to your Minecraft account!`,
              flags: 64 // Ephemeral
            }
          });
        } catch (err) {
          return NextResponse.json({
            type: 4,
            data: { content: "❌ Failed to connect to the server to verify your code. Try again later.", flags: 64 }
          });
        }
      }
    }

    // Acknowledge other interaction types gracefully
    return NextResponse.json({ type: 4, data: { content: "Interaction received." } });
  } catch (error) {
    console.error("Interaction Endpoint Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
