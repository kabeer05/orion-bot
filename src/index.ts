import { OrionClient } from "./utils/OrionClient.js";
import { GatewayIntentBits as Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new OrionClient({
  intents: [
    Intents.GuildEmojisAndStickers,
    Intents.GuildMessages,
    Intents.Guilds,
    Intents.GuildMembers,
    Intents.MessageContent,
  ],
});

try {
  await client.login(process.env.TOKEN);
} catch (error) {
  console.error("There was an error logging in: ", error);
}
