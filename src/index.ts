import * as Discord from 'discord.js';
import { values } from 'lodash';
import { keepAlive } from './server';

const client = new Discord.Client();

const { DISCORD_BOT_SECRET_TOKEN } = process.env;

const invokeCommands = [
  `!channel `,
  `!c `,
  `!pin `,
];
const commands = {
  create: [],
};

client.on(`message`, (receivedMessage) => {
  console.log(
    'received message',
  );

  console.log(receivedMessage.channel.messages);

  // Prevent bot from responding to its own messages
  if (receivedMessage.author.id === client.user.id) {
    return;
  }

  if (receivedMessage.content === '!pin') {
    values(receivedMessage.channel.messages).slice(-1).pin();
  }

  // // parse message for commands
  // invokeCommands.forEach((invokeCommand) => {
  //   if (receivedMessage.content.substr(0, invokeCommand.length) === invokeCommand) {
  //     // invoke command has been used
  //     console.log('invoke command used');
  //     receivedMessage.channel.send(`Invoke command used: ${receivedMessage.content}`);
  //     // receivedMessage.guild.createChannel(`new-general`, `text`);
  //   }
  // });
});

keepAlive();
client.login(DISCORD_BOT_SECRET_TOKEN);

console.log('Logged in');

function findPrivateChannelCategory(channels) {
  channels.forEach((channel, channelId) => {
    if (channel.type === `category`) {
      return channelId;
    }
  });

  return false;
}
