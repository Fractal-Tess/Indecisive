import { EmbedBuilder, TextChannel } from "discord.js";
import { env } from "$env/dynamic/private";

import type { ApplicationRecord } from "$lib/validation/application";
import { client } from "./bot";

export const sendApplicationToApplicationChat = async (
  data: ApplicationRecord,
  uiSreenshot: string
) => {
  const channel = await client.channels.fetch(env.DISCORD_CHANNEL_ID);
  if (!channel) {
    console.log("The channel doesn't exist");
    return;
  }

  if (channel instanceof TextChannel) {
    const embed = createEmbed(data, uiSreenshot);
    const message = await channel.send({ embeds: [embed] });
    const thread = await channel.threads.create({
      name: `Application for ${data.discord}`,
      startMessage: message,
    });
    thread.send(`New application ${env.DISCORD_ONAPPLICATION_TAG}`);
  } else {
    console.error(
      `Channel with id of ${env.DISCORD_CHANNEL_ID} is not a text channel`
    );
  }
};

const createEmbed = (record: ApplicationRecord, uiSreenshot: string) => {
  const embed = new EmbedBuilder()
    .setColor(0xffb52a)
    .setTitle("New application")
    .setAuthor({
      name: "Indecisive",
      iconURL: "https://indecisive.app.jet-black.xyz/logo.png",
      url: "https://indecisive.app.jet-black.xyz/",
    })
    .addFields(
      {
        name: "Name",
        value: record.name,
      },
      {
        name: "Age",
        value: record.age.toString(),
        inline: true,
      },
      {
        name: "Country",
        value: record.country,
        inline: true,
      }
    )
    .addFields(
      {
        name: "In-Game Name",
        value: record.inGameName,
      },
      {
        name: "Discord",
        value: record.discord,
        inline: true,
      }
    )
    .addFields({
      name: "Class/Spec",
      value: record.classAndSpec,
    })
    .addFields({
      name: "Apply reason",
      value: record.joinReason,
    })
    .addFields({
      name: "Experience",
      value: record.experience,
    })
    .addFields({
      name: "Notes",
      value: record.notes,
    })
    .addFields({
      name: "Able to attend raid days",
      value: record.attendRaidDaysNotes,
    })
    .addFields(
      {
        name: "Willing to play another class",
        value: record.willingToPlayAnotherClass,
      },
      { name: "Notes", value: record.willingToPlayAnotherClassNotes }
    )
    .setImage(uiSreenshot)
    .setTimestamp();

  console.log(uiSreenshot);
  return embed;
};
