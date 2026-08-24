const { REST, Routes } = require('discord.js');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const commands = [
  {
    name: 'server',
    description: 'Get the Minecraft server connection information.',
  },
  {
    name: 'site',
    description: 'Get a link to the official website.',
  },
  {
    name: 'rank',
    description: 'View information about the server ranks.',
  },
  {
    name: 'verify',
    description: 'Link your Discord account to your Minecraft account.',
    options: [
      {
        name: 'code',
        description: 'The verification code you got in-game using /link',
        type: 3, // STRING
        required: true,
      }
    ]
  }
];

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

if (!token || !clientId) {
  console.error("Missing DISCORD_TOKEN or DISCORD_CLIENT_ID in your .env or .env.local file!");
  process.exit(1);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands globally with the current set
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error("Error registering commands:", error);
  }
})();
