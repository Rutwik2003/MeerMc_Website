# MeerMC Deployment & Setup Guide

This guide covers everything you need to do from start to finish to deploy your Minecraft plugin, setup your Discord bot, and launch your Next.js website on Vercel.

---

## Step 1: Compile & Install the Minecraft Plugin
Because we added custom Military-Grade HMAC Encryption to your plugin, you need to compile the latest code into a `.jar` file.

1. Open your terminal in the `coresuit` folder.
2. Compile the plugin by running your build tool (e.g., `./gradlew build` or `mvn clean package`).
3. Locate the generated `.jar` file (usually in `build/libs/` or `target/`).
4. Drag and drop this `.jar` into your Minecraft Server's `plugins/` folder.
5. Start (or Restart) your Minecraft Server so it generates the default configuration files.

---

## Step 2: Configure the Plugin
Now that the plugin is running, you need to set up the "Master Config" that your website will read from.

1. Go to your Minecraft Server files and open `plugins/CoreSuite/modules/website.yml`.
2. Ensure the following critical settings are correct:
   - `bind-ip: "0.0.0.0"` (Required so Vercel can reach it)
   - `port: 25580` (Or whatever port your game host provided you)
   - `api-key: "YOUR_VERY_STRONG_SECRET_KEY"` (Make this a random string of letters/numbers. Do not lose this!)
   - `site.url: "https://meermc.vercel.app"` (Make sure this matches your Vercel URL!)
3. Fill out the rest of the file (Store prices, Discord link, Server IPs, etc.).
4. **Restart your Minecraft Server** to apply the changes and start the HTTP server.

---

## Step 3: Discord Application & Bot Setup
Your website uses Discord for logging in, and your Discord server uses the Bot for commands and store approvals.

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a New Application.
2. In the **General Information** tab, copy these and save them to a notepad:
   - **Application ID** (This is your `DISCORD_CLIENT_ID`)
   - **Public Key** (This is your `DISCORD_PUBLIC_KEY`)
3. Go to the **OAuth2** tab:
   - Copy the **Client Secret** (This is your `DISCORD_CLIENT_SECRET`).
   - Click "Add Redirect", and add this exact URL: `https://meermc.vercel.app/api/auth/callback/discord`
4. Go to the **Bot** tab:
   - Click "Reset Token" and copy the **Bot Token** (This is your `DISCORD_TOKEN`).
   - Scroll down and **ENABLE** all Privileged Gateway Intents (Presence, Server Members, Message Content).
5. Go to the **General Information** tab again to set the **Interactions Endpoint URL**:
   - Set it to: `https://meermc.vercel.app/api/discord/interactions`
   - *(Note: Discord will try to verify this URL immediately. If your website is not deployed yet, it might fail. You can come back and add this AFTER Step 5).*

---

## Step 4: Local Development (Optional)
If you want to run the website locally on your computer (`npm run dev`) before deploying to Vercel, you need to connect it to your Game Server so it doesn't crash:
1. Create a `.env.local` file in your website folder.
2. Add your Minecraft server credentials so it doesn't try to connect to localhost (`127.0.0.1`):
```
PLUGIN_API_HOST=your_real_game_server_ip
PLUGIN_API_PORT=25580
PLUGIN_API_KEY=your_secret_api_key
```

---

## Step 5: Vercel Website Deployment
Now you will deploy the Next.js website. The website will automatically connect to your plugin during deployment to grab all the store prices and IPs.

1. Push your `meermc website up` folder to a GitHub repository.
2. Log into [Vercel](https://vercel.com/) and click "Add New -> Project".
3. Import your GitHub repository.
4. **CRITICAL:** Before clicking Deploy, open the **Environment Variables** section and add the following:

   **Minecraft Server Connection:**
   - `PLUGIN_API_HOST`: Your game server IP (e.g., `51.12.34.56` or `play.meermc.com`)
   - `PLUGIN_API_PORT`: The port you used (e.g., `25580`)
   - `PLUGIN_API_KEY`: The exact same secret key you put in `website.yml`

   **Discord Integration:**
   - `DISCORD_CLIENT_ID`: The Application ID from Step 3
   - `DISCORD_CLIENT_SECRET`: The Client Secret from Step 3
   - `DISCORD_PUBLIC_KEY`: The Public Key from Step 3
   - `DISCORD_TOKEN`: The Bot Token from Step 3

   **NextAuth (Login System):**
   - `NEXTAUTH_URL`: `https://meermc.vercel.app`
   - `NEXTAUTH_SECRET`: Generate a random 32-character string (you can use `openssl rand -base64 32` or a password generator)

5. Click **Deploy**! 

*When Vercel builds, you will see a log saying "Successfully synchronized website configuration with CoreSuite plugin!". This means it securely fetched your prices and IPs!*

---

## Step 6: Finalizing
1. **Discord Interactions:** If you couldn't save the Interactions Endpoint URL in Step 3, go back to the Discord Developer Portal and save `https://meermc.vercel.app/api/discord/interactions` now that the site is live.
2. **Updating Prices in the future:** Whenever you want to change a store price or server IP, just edit `website.yml` on your Minecraft server. Then, go to Vercel and click **Redeploy** to update the website instantly.
