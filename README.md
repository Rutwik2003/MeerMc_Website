# 🌟 MeerMC Server Website

The official, high-performance website for **MeerMC**, a premium Minecraft server. Built with Next.js App Router, TailwindCSS, and Framer Motion for buttery-smooth animations and instant navigation.

## ✨ Features

- **Blazing Fast Navigation:** Utilizes Next.js App Router and a global route progress bar for zero-latency page transitions.
- **Dynamic Discord Integration:** Uses NextAuth for seamless Discord login.
- **Automated RCON Store:** Includes a fully automated manual payment system. Users checkout via UPI, a rich webhook is sent to an Admin Discord channel, and Admins can click a button inside Discord to instantly execute RCON commands on the Minecraft server.
- **Live Server Status:** Pings the Minecraft server directly to display live player counts.
- **Responsive & Premium Design:** Uses glassmorphism, Framer Motion micro-animations, and modern UI paradigms to create a highly immersive experience.

## 🚀 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **UI:** React 19, shadcn/ui
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Minecraft RCON:** `rcon-client`
- **Discord Signatures:** `tweetnacl`
- **Language:** TypeScript

---

## 🛠️ Local Development Setup

### 1. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` or `.env` file in the root directory (do not commit this to GitHub). You must configure the following variables to match `.env.example`:

```env
# ⚙️ General
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_UPI_ID=your_upi_id@bank

# 🌐 Minecraft Server IP (For Live Stats & RCON)
NEXT_PUBLIC_SERVER_IP=play.meermc.com
NEXT_PUBLIC_BEDROCK_IP=bedrock.meermc.com
NEXT_PUBLIC_BEDROCK_PORT=19132
NEXT_PUBLIC_SERVER_VERSION=1.20+

# 💬 Discord Login (NextAuth)
# Generate a secret by running: openssl rand -base64 32
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
DISCORD_CLIENT_ID=your-discord-oauth2-client-id
DISCORD_CLIENT_SECRET=your-discord-oauth2-client-secret

# 💰 Shop Pricing
NEXT_PUBLIC_PRICE_VIP=50
NEXT_PUBLIC_PRICE_CUTIE=100
NEXT_PUBLIC_PRICE_ELITE_RANK=250
NEXT_PUBLIC_PRICE_INVESTOR=500
NEXT_PUBLIC_PRICE_RARE_KEY=50
NEXT_PUBLIC_PRICE_ELITE_KEY=89
NEXT_PUBLIC_PRICE_INSANE_KEY=120

# 🤖 Discord Bot & RCON Automation
DISCORD_BOT_TOKEN=your-discord-bot-token
DISCORD_PUBLIC_KEY=your-discord-public-key
DISCORD_ADMIN_CHANNEL_ID=your-admin-channel-id
NEXT_PUBLIC_DISCORD_PING_ROLE=your-admin-role-id
DISCORD_APPLY_WEBHOOK=your-discord-webhook-url

# 🎮 Minecraft RCON Credentials
RCON_HOST=play.meermc.com
RCON_PORT=25575
RCON_PASSWORD=your-rcon-password
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 How the Discord RCON Bot Works

This website acts as its own Discord Bot backend. You do not need to host a separate bot!

1. A player fills out the checkout form and clicks "Submit".
2. The website POSTs a rich embed to the `DISCORD_ADMIN_CHANNEL_ID` using the Bot Token.
3. The embed includes an **[Approve Payment]** and **[Deny Payment]** button. The data (username, rank, duration) is cryptographically embedded into the button's internal `custom_id`.
4. When an Admin clicks a button, Discord's servers ping the website at `/api/discord/interactions`.
5. The website verifies Discord's signature using the `DISCORD_PUBLIC_KEY`.
6. If approved, it securely connects to the Minecraft server via RCON, executes the command (e.g. `lp user <player> parent addtemp vip 30d`), and edits the Discord message to include the exact server output.

### Testing the Bot Locally
Because Discord needs a public URL to ping when you click a button, you must use a tunnel to test locally:
```bash
npx localtunnel --port 3000
```
Take the generated URL (e.g. `https://cool-cat-44.loca.lt`) and paste it into the **Interactions Endpoint URL** field in the Discord Developer Portal as:
`https://cool-cat-44.loca.lt/api/discord/interactions`

---

## ☁️ Deployment

This project is optimized for deployment on **Netlify** using `@netlify/plugin-nextjs`. 
Ensure you define your environment variables in your deployment platform dashboard before deploying.

### License
MIT License

