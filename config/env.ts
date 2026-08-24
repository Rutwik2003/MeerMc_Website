export const siteConfig = {
  name: "MeerMc",
  description: "Premium Minecraft Server Experience",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://meermc.com",
  
  server: {
    javaIp: process.env.NEXT_PUBLIC_SERVER_IP || "play.meermc.com",
    javaPort: process.env.NEXT_PUBLIC_SERVER_PORT || "25565",
    bedrockIp: process.env.NEXT_PUBLIC_BEDROCK_IP || "bedrock.meermc.com",
    bedrockPort: process.env.NEXT_PUBLIC_BEDROCK_PORT || "19132",
    version: process.env.NEXT_PUBLIC_SERVER_VERSION || "1.21+",
    bedrockVersion: "1.21.11+",
  },
  
  social: {
    discord: process.env.NEXT_PUBLIC_DISCORD_LINK || "https://discord.gg/meermc",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_LINK || "https://instagram.com/meermc",
  },
  
  contacts: {
    discordIds: ["rimuru0_0.", "._.akii"],
  },
  
  payment: {
    upiId: process.env.NEXT_PUBLIC_UPI_ID || "",
  },
  
  applicationsOpen: process.env.NEXT_PUBLIC_APPLICATIONS_OPEN !== "false", // Default to true unless explicitly disabled
  
  debug: process.env.NEXT_PUBLIC_DEBUG_MODE === "true",
  
  api: {
    mcSrvStat: "https://api.mcsrvstat.us",
    mcHeads: "https://mc-heads.net",
    crafatar: "https://crafatar.com",
  },
  
  voteSites: [
    {
      name: "Minecraft-MP",
      url: "https://minecraft-mp.com/server/359928/vote",
      description: "Vote on Minecraft-MP to support MeerMc",
      rewards: ["1x Common Crate Key", "$100 In-game Money"],
    },
    {
      name: "Minecraft Servers",
      url: "https://minecraftservers.org/vote/689314",
      description: "Vote on MinecraftServers.org to help us grow",
      rewards: ["1x Rare Crate Key", "$250 In-game Money"],
    },
    {
      name: "Minerank",
      url: "https://www.minerank.com/meermc/vote",
      description: "Vote on Minerank for additional exclusive rewards",
      rewards: ["1x Mythic Crate Key", "$500 In-game Money"],
    },
  ],
} as const;
