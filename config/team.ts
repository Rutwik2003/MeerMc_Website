import { Crown, Shield, Users, Map, Award } from "lucide-react";
import { TeamRole } from "@/types";

/**
 * Team Members Configuration
 *
 * Each member supports an optional `skin` field for custom skins (like SkinRestorer):
 *
 *   - Not set / undefined  → Falls back to the member's `name` via mc-heads.net
 *   - A Minecraft username → Fetches that player's skin instead (e.g. "Notch")
 *   - A full URL           → Uses that image directly (e.g. "https://example.com/skin.png")
 *
 * Examples:
 *   { name: "shishui", skin: "Notch", avatar: "SH", since: "2024" }           // shows Notch's skin
 *   { name: "shishui", skin: "https://i.imgur.com/xyz.png", avatar: "SH", since: "2024" }  // shows custom URL image
 *   { name: "rocky_rutwik", avatar: "RR", since: "2023" }                      // shows rocky_rutwik's own skin
 */
export const teamMembers: TeamRole[] = [
  {
    role: "Administrators",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    members: [
      { name: "Rimuru0_0", avatar: "0Z", since: "2024" },
    ],
  },
  {
    role: "Developers",
    icon: Award,
    color: "from-purple-500 to-violet-500",
    members: [
      { name: "Shishui", skin: "Itachi", avatar: "SH", since: "2023" },
      { name: "Rocky_rutwik", avatar: "RR", since: "2023" },
    ],
  },
  {
    role: "Moderators",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    members: [
      { name: "Apply Now!", avatar: "?", since: "Today", isPlaceholder: true },
    ],
  },
  {
    role: "Helpers",
    icon: Map,
    color: "from-green-500 to-emerald-500",
    members: [
      { name: "Apply Now!", avatar: "?", since: "Today", isPlaceholder: true },
    ],
  },
];
