import { Client, GatewayIntentBits } from "discord.js";
import { env } from "$env/dynamic/private";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", () => {
  console.log("Discord bot ready!");
});

export const initDiscord = () => {
  client.login(env.DISCORD_BOT_TOKEN);
};
