import { EmbedBuilder, TextChannel } from 'discord.js';

import { env } from '../env.js';
import { client } from './client.js';
import type { Application } from '../trpc/application/router.js';

export const sendApplicationToApplicationChat = async (
  application: Application
) => {
  const channel = await client.channels.fetch(env.DISCORD_CHANNEL_ID);
  if (!channel) {
    console.error("The channel doesn't exist");
    return;
  }

  if (channel instanceof TextChannel) {
    const embed = createEmbed(application);
    const message = await channel.send({ embeds: [embed] });
    const thread = await channel.threads.create({
      name: `Application for ${application.discord}`,
      startMessage: message
    });
    const msg = `New application ${env.DISCORD_ONAPPLICATION_TAG}`;
    thread.send(msg);
  } else {
    console.error(
      `Channel with id of ${env.DISCORD_CHANNEL_ID} is not a text channel`
    );
  }
};

const createEmbed = (application: Application) => {
  const embed = new EmbedBuilder()
    .setColor(0xffb52a)
    .setTitle('New application')
    .setAuthor({
      name: 'Indecisive',
      iconURL: 'https://indecisive.app.jet-black.xyz/logo.png',
      url: 'https://indecisive.app.jet-black.xyz/'
    })
    .addFields(
      {
        name: 'Name',
        value: application.name
      },
      {
        name: 'Age',
        value: application.age.toString(),
        inline: true
      },
      {
        name: 'Country',
        value: application.country,
        inline: true
      }
    )
    .addFields(
      {
        name: 'In-Game Name',
        value: application.inGameName
      },
      {
        name: 'Discord',
        value: application.discord,
        inline: true
      }
    )
    .addFields({
      name: 'Class/Spec',
      value: application.classAndSpec
    })
    .addFields({
      name: 'Apply reason',
      value: application.joinReason
    })
    .addFields({
      name: 'Experience',
      value: application.experience
    })
    .addFields({
      name: 'Notes',
      value: application.notes
    })
    .addFields({
      name: 'Able to attend raid days',
      value: application.attendRaidDaysNotes
    })
    .addFields(
      {
        name: 'Willing to play another class',
        value: application.willingToPlayAnotherClass
      },
      { name: 'Notes', value: application.willingToPlayAnotherClassNotes }
    )
    .setImage(application.uiImageUrl)
    .setTimestamp();

  return embed;
};
