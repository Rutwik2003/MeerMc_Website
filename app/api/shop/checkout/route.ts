import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { minecraftUsername, itemPurchased, amount, discordAccount, utrNumber, itemId, isCrate, quantity } = body;

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const channelId = process.env.DISCORD_ADMIN_CHANNEL_ID;

    if (!botToken || !channelId) {
      return NextResponse.json(
        { error: "Discord Bot not configured on server" },
        { status: 500 }
      );
    }

    if (!minecraftUsername || !itemPurchased || !amount || !utrNumber || !itemId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (typeof minecraftUsername !== "string" || !/^[a-zA-Z0-9_]{1,16}$/.test(minecraftUsername)) {
      return NextResponse.json({ error: "Invalid Minecraft username" }, { status: 400 });
    }

    if (typeof utrNumber !== "string" || !/^[a-zA-Z0-9]{6,20}$/.test(utrNumber)) {
      return NextResponse.json({ error: "Invalid UTR number format" }, { status: 400 });
    }

    const itemType = isCrate ? "crate" : "rank";
    if (itemType !== "crate" && itemType !== "rank") {
      return NextResponse.json({ error: "Invalid item type" }, { status: 400 });
    }
    const approveCustomId = `approve:${itemType}:${itemId}:${minecraftUsername}:${quantity || 1}`;
    const denyCustomId = `deny:${minecraftUsername}:${utrNumber}`;

    const discordPayload = {
      content: process.env.NEXT_PUBLIC_DISCORD_PING_ROLE ? `<@&${process.env.NEXT_PUBLIC_DISCORD_PING_ROLE}>` : "New Manual Payment!",
      embeds: [
        {
          title: "💰 New Manual Payment Received!",
          color: 3066993,
          fields: [
            { name: "Minecraft Username", value: `\`${minecraftUsername}\``, inline: true },
            { name: "Item Purchased", value: itemPurchased, inline: true },
            { name: "Amount", value: `₹${amount}`, inline: true },
            { name: "Discord Account", value: discordAccount || "Not Linked", inline: true },
            { name: "Transaction ID (UTR)", value: `\`${utrNumber}\``, inline: false },
          ],
          footer: { text: "Verify this payment on your phone before running the command!" },
          timestamp: new Date().toISOString(),
        },
      ],
      components: [
        {
          type: 1, // Action Row
          components: [
            {
              type: 2, // Button
              label: "Approve Payment",
              style: 3, // Success (Green)
              custom_id: approveCustomId,
            },
            {
              type: 2, // Button
              label: "Deny Payment",
              style: 4, // Danger (Red)
              custom_id: denyCustomId,
            },
          ],
        },
      ],
    };

    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${botToken}`,
        },
        body: JSON.stringify(discordPayload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord API Error:", errorText);
      return NextResponse.json(
        { error: "Failed to send Discord message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
