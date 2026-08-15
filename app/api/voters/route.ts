import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    // ---------------------------------------------------------
    // OPTION A: MySQL Database (e.g. VotingPlugin)
    // ---------------------------------------------------------
    if (process.env.VOTE_DB_HOST && process.env.VOTE_DB_HOST.trim() !== '' && process.env.VOTE_DB_USER) {
      try {
        const connection = await mysql.createConnection({
          host: process.env.VOTE_DB_HOST,
          user: process.env.VOTE_DB_USER,
          password: process.env.VOTE_DB_PASS,
          database: process.env.VOTE_DB_NAME,
        });

        const tableName = process.env.VOTE_DB_TABLE || 'VotingPlugin_Users';
        // Assuming VotingPlugin schema: uuid, PlayerName, MonthTotal
        const [rows] = await connection.execute(
          `SELECT PlayerName as name, MonthTotal as votes FROM ${tableName} ORDER BY MonthTotal DESC LIMIT 3`
        );
        
        await connection.end();

        const voters = (rows as any[]).map((row, index) => ({
          rank: index + 1,
          name: row.name,
          votes: row.votes,
          reward: getRewardByRank(index + 1),
          color: getColorByRank(index + 1)
        }));

        if (voters.length > 0) {
          return NextResponse.json({ voters });
        }
      } catch (dbError) {
        console.error("Database connection failed, falling back...", dbError);
      }
    }

    // ---------------------------------------------------------
    // OPTION B: Minecraft-MP API Fallback
    // ---------------------------------------------------------
    if (process.env.MINECRAFT_MP_API_KEY) {
      try {
        const response = await fetch(
          `https://minecraft-mp.com/api/?object=servers&element=voters&key=${process.env.MINECRAFT_MP_API_KEY}&month=current&format=json`
        );
        
        if (response.ok) {
          const data = await response.json();
          // Minecraft-MP API returns { voters: [ { nickname: "name", votes: "10" } ] }
          if (data && data.voters && Array.isArray(data.voters)) {
            const topVoters = data.voters.slice(0, 3).map((voter: any, index: number) => ({
              rank: index + 1,
              name: voter.nickname,
              votes: parseInt(voter.votes, 10),
              reward: getRewardByRank(index + 1),
              color: getColorByRank(index + 1)
            }));
            
            return NextResponse.json({ voters: topVoters });
          }
        }
      } catch (apiError) {
        console.error("Minecraft-MP API failed, falling back...", apiError);
      }
    }

    // ---------------------------------------------------------
    // OPTION C: Default Mock Data (If nothing is configured)
    // ---------------------------------------------------------
    const mockVoters = [
      { rank: 1, name: "Rimuru0_0", votes: 42, reward: "$10 Store Credit", color: "from-yellow-400 to-amber-600" },
      { rank: 2, name: "Shishui", votes: 38, reward: "$5 Store Credit", color: "from-slate-300 to-slate-500" },
      { rank: 3, name: "Rocky_rutwik", votes: 35, reward: "3x Mythic Keys", color: "from-amber-600 to-orange-800" }
    ];

    return NextResponse.json({ voters: mockVoters });

  } catch (error) {
    console.error("Error fetching voters:", error);
    return NextResponse.json({ error: 'Failed to fetch voters' }, { status: 500 });
  }
}

// Helper functions for consistent UI
function getRewardByRank(rank: number) {
  switch(rank) {
    case 1: return "$10 Store Credit";
    case 2: return "$5 Store Credit";
    case 3: return "3x Mythic Keys";
    default: return "1x Rare Key";
  }
}

function getColorByRank(rank: number) {
  switch(rank) {
    case 1: return "from-yellow-400 to-amber-600";
    case 2: return "from-slate-300 to-slate-500";
    case 3: return "from-amber-600 to-orange-800";
    default: return "from-primary to-purple-600";
  }
}
