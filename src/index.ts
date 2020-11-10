import * as Discord from 'discord.js';
import { keepAlive } from 'src/server';
import { processPin } from 'src/commands';
import { doesCommandMatchContent } from 'src/utils';

const { DISCORD_BOT_SECRET_TOKEN } = process.env;

const client = new Discord.Client();

const commands = {
  '!pin': processPin,
};

client.on(`message`, async (receivedMessage) => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author.id === client.user.id) {
    return;
  }

  // cycle through commands
  Object.keys(commands).some((command) => {
    if (doesCommandMatchContent(command, receivedMessage.content)) {
      commands[command](receivedMessage);
      return true;
    }

    return false;
  });

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


function findPrivateChannelCategory(channels) {
  channels.forEach((channel, channelId) => {
    if (channel.type === `category`) {
      return channelId;
    }
  });

  return false;
}

client.login(DISCORD_BOT_SECRET_TOKEN);
console.log(`Logged in`);
keepAlive();
