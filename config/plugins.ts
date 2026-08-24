import { Plugin } from "@/types";

export const plugins: Plugin[] = [
  {
    id: 1,
    name: "EssentialsX",
    category: "utility",
    description: "Core utility plugin for basic server commands, economy, and teleportation.",
    commands: [
      { command: "/spawn", description: "Teleport to spawn" },
      { command: "/nick", description: "Change your display name (Elite+)" },
      { command: "/craft", description: "Open virtual workbench (Elite+)" },
      { command: "/echest", description: "Open virtual enderchest (Elite+)" },
      { command: "/tpa <player>", description: "Request teleport to player" },
      { command: "/msg <player> <msg>", description: "Send private message" },
    ],
  },
  {
    id: 2,
    name: "GriefPrevention",
    category: "protection",
    description: "Protect your builds and land using the golden shovel claiming system.",
    commands: [
      { command: "/trust <player>", description: "Give a player access to your claim" },
      { command: "/untrust <player>", description: "Revoke access from your claim" },
      { command: "/abandonclaim", description: "Delete the claim you're standing in" },
      { command: "/claimslist", description: "List all your claims" },
    ],
  },
  {
    id: 3,
    name: "UltraCosmetics",
    category: "cosmetics",
    description: "Show off with amazing particle effects, pets, morphs, and mounts!",
    commands: [
      { command: "/uc menu", description: "Open the main cosmetics menu" },
    ],
  },
  {
    id: 4,
    name: "EconomyShopGUI",
    category: "economy",
    description: "The global server shop. Buy and sell items easily via a GUI.",
    commands: [
      { command: "/shop", description: "Open the main shop interface" },
      { command: "/sellall", description: "Sell all items in your inventory" },
      { command: "/sellgui", description: "Open a GUI to sell items" },
    ],
  },
  {
    id: 5,
    name: "ExcellentCrates",
    category: "utility",
    description: "Open crates at spawn for amazing rewards using crate keys.",
    commands: [
      { command: "/crates", description: "View available crates and rewards" },
      { command: "Left-Click Crate", description: "Preview possible crate rewards" },
    ],
  },
  {
    id: 6,
    name: "BetterTeams",
    category: "pvp",
    description: "Create teams, forge alliances, and dominate the server together.",
    commands: [
      { command: "/team create <name>", description: "Create a new team" },
      { command: "/team invite <player>", description: "Invite someone to your team" },
      { command: "/team chat", description: "Toggle team-only chat" },
      { command: "/team sethome", description: "Set your team's base location" },
    ],
  },
  {
    id: 7,
    name: "VotingPlugin",
    category: "utility",
    description: "Vote for the server on tracking sites to earn free rewards!",
    commands: [
      { command: "/vote", description: "Get the links to vote for the server" },
      { command: "/votetop", description: "See the top voters" },
      { command: "/voteshop", description: "Spend your vote points" },
    ],
  },
  {
    id: 8,
    name: "GSit",
    category: "cosmetics",
    description: "Interact with the world by sitting on stairs, slabs, or crawling.",
    commands: [
      { command: "/sit", description: "Sit on the block you're looking at" },
      { command: "/lay", description: "Lay down on the ground" },
      { command: "/crawl", description: "Start crawling" },
    ],
  },
];
