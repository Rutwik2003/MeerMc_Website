import { REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// Try loading .env.local first, then fallback to .env
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

const commands = [
  {
    name: 'server',
    description: 'Get information and IP details about the MeerMc server',
  },
  {
    name: 'site',
    description: 'Get a link to the official MeerMc website',
  },
  {
    name: 'rank',
    description: 'View information about the available server ranks',
  },
  {
    name: 'verify',
    description: 'Link your Minecraft account using the code from /link',
    options: [
      {
        name: 'code',
        description: 'The 4-digit code from the Minecraft server',
        type: 4, // INTEGER
        required: true,
      }
    ]
  },
];

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

if (!token || !clientId) {
  console.error("Missing DISCORD_BOT_TOKEN or DISCORD_CLIENT_ID");
  process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
