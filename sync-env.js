const fs = require('fs');
const path = require('path');
const http = require('http');

const envPath = path.join(__dirname, '.env.local');

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
    }
  });
  return env;
}

function updateEnv(filePath, updates) {
  let content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  
  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `${key}=${value}`);
    } else {
      content += `\n${key}=${value}`;
    }
  }
  
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`Updated ${filePath} with ${Object.keys(updates).length} values from plugin.`);
}

async function syncConfig() {
  const currentEnv = parseEnv(envPath);
  
  // Try to find API config in .env.local, fallback to process.env, then defaults
  const host = currentEnv.PLUGIN_API_HOST || process.env.PLUGIN_API_HOST || '127.0.0.1';
  const port = currentEnv.PLUGIN_API_PORT || process.env.PLUGIN_API_PORT || '25580';
  const apiKey = currentEnv.PLUGIN_API_KEY || process.env.PLUGIN_API_KEY;
  
  if (!apiKey) {
    console.error('Error: PLUGIN_API_KEY is missing in .env.local!');
    console.error('Please add PLUGIN_API_KEY=your_key to .env.local');
    process.exit(1);
  }

  console.log(`Fetching configuration from CoreSuite Plugin at http://${host}:${port}/api/config ...`);
  
  const crypto = require('crypto');
  const timestamp = Date.now().toString();
  const signature = crypto.createHmac('sha256', apiKey).update(timestamp).digest('hex');

  const options = {
    hostname: host,
    port: port,
    path: '/api/config',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-Timestamp': timestamp,
      'X-Signature': signature
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        try {
          const config = JSON.parse(data);
          
          // Map plugin config to Next.js env variables
          const envUpdates = {
            NEXT_PUBLIC_SITE_URL: config.site_url,
            NEXT_PUBLIC_SERVER_IP: config.server_java_ip,
            NEXT_PUBLIC_SERVER_PORT: config.server_java_port,
            NEXT_PUBLIC_BEDROCK_IP: config.server_bedrock_ip,
            NEXT_PUBLIC_BEDROCK_PORT: config.server_bedrock_port,
            NEXT_PUBLIC_SERVER_VERSION: config.server_version,
            NEXT_PUBLIC_DISCORD_LINK: config.social_discord,
            NEXT_PUBLIC_INSTAGRAM_LINK: config.social_instagram,
            NEXT_PUBLIC_UPI_ID: config.payment_upi_id,
            NEXT_PUBLIC_PRICE_VIP: config.store_rank_vip,
            NEXT_PUBLIC_PRICE_CUTIE: config.store_rank_cutie,
            NEXT_PUBLIC_PRICE_ELITE_RANK: config.store_rank_elite,
            NEXT_PUBLIC_PRICE_INVESTOR: config.store_rank_investor,
            NEXT_PUBLIC_PRICE_RARE_KEY: config.store_key_rare,
            NEXT_PUBLIC_PRICE_ELITE_KEY: config.store_key_elite,
            NEXT_PUBLIC_PRICE_INSANE_KEY: config.store_key_insane
          };
          
          updateEnv(envPath, envUpdates);
          console.log('✅ Successfully synchronized website configuration with CoreSuite plugin!');
          console.log('Restart your Next.js application for changes to take effect.');
        } catch (e) {
          console.error('Error parsing response from plugin:', e);
          process.exit(1);
        }
      } else {
        console.error(`Failed to fetch config. Status Code: ${res.statusCode}`);
        console.error('Response:', data);
        process.exit(1);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Problem connecting to CoreSuite Plugin API: ${e.message}`);
    console.error(`Make sure the Minecraft server is running and the WebsiteModule is active.`);
    process.exit(1);
  });

  req.end();
}

syncConfig();
