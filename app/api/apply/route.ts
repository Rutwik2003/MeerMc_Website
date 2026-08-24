import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    let { minecraftUsername, discordUsername, age, timezone, playtime, micAccess, previousBans, position, experience, reason, scenario1, scenario2 } = data;

    // Validate inputs
    if (!minecraftUsername || !discordUsername || !age || !timezone || !playtime || !micAccess || !previousBans || !position || !experience || !reason || !scenario1 || !scenario2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (
      typeof minecraftUsername !== "string" ||
      typeof discordUsername !== "string" ||
      typeof timezone !== "string" ||
      typeof playtime !== "string" ||
      typeof position !== "string" ||
      typeof experience !== "string" ||
      typeof reason !== "string" ||
      typeof scenario1 !== "string" ||
      typeof scenario2 !== "string"
    ) {
      return NextResponse.json({ error: "Invalid data types" }, { status: 400 });
    }

    minecraftUsername = minecraftUsername.trim();
    discordUsername = discordUsername.trim();
    timezone = timezone.trim();
    experience = experience.trim();
    reason = reason.trim();
    scenario1 = scenario1.trim();
    scenario2 = scenario2.trim();

    if (!/^[a-zA-Z0-9_]{1,16}$/.test(minecraftUsername)) {
      return NextResponse.json({ error: "Invalid Minecraft username" }, { status: 400 });
    }

    if (experience.length > 1000 || reason.length > 1000 || scenario1.length > 1000 || scenario2.length > 1000) {
      return NextResponse.json({ error: "One of your long-form answers is too long (max 1000 characters)" }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_APPLY_WEBHOOK;
    if (!webhookUrl) {
      console.error("DISCORD_APPLY_WEBHOOK is not configured in environment variables.");
      return NextResponse.json({ error: "Server configuration error. Contact administrators." }, { status: 500 });
    }

    // Colors mapping based on position
    const colors: Record<string, number> = {
      Helper: 5763719,      // Green
      Moderator: 3447003,   // Blue
      Builder: 15105570,    // Orange
      Developer: 10181046,  // Purple
    };

    // Format the Discord embed
    const payload = {
      content: "📝 **New Staff Application Received!**",
      embeds: [
        {
          title: `Application for ${position}`,
          color: colors[position] || 3447003,
          fields: [
            { name: "Minecraft", value: `\`${minecraftUsername}\``, inline: true },
            { name: "Discord", value: `\`${discordUsername}\``, inline: true },
            { name: "Age", value: age, inline: true },
            { name: "Timezone", value: timezone, inline: true },
            { name: "Weekly Playtime", value: `${playtime} hours`, inline: true },
            { name: "Mic / Previous Bans", value: `Mic: **${micAccess.toUpperCase()}** | Bans: **${previousBans.toUpperCase()}**`, inline: true },
            { name: "Why join?", value: reason, inline: false },
            { name: "Previous Experience", value: experience, inline: false },
            { name: "Scenario 1 (Chat Spam)", value: scenario1, inline: false },
            { name: "Scenario 2 (Cheater)", value: scenario2, inline: false }
          ],
          thumbnail: {
            url: `https://crafatar.com/renders/body/${minecraftUsername}?scale=10&overlay=true`
          },
          footer: {
            text: "MeerMc Application System"
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text();
      console.error("Discord Webhook Error:", errorText);
      return NextResponse.json({ error: "Failed to forward application to Discord." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Application processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
