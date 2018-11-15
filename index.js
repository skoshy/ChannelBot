const Discord = require(`discord.js`);
const secretConfig = require(`./.config.secret`);
const client = new Discord.Client();

const invokeCommands = [
  `!channel `,
  `!c `,
];
const commands = {
  create: [],
};

client.on(`message`, (receivedMessage) => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author === client.user) {
    return;
  }

  // parse message for commands
  invokeCommands.forEach((invokeCommand) => {
    if (receivedMessage.content.substr(0, invokeCommand.length) === invokeCommand) {
      // invoke command has been used
      receivedMessage.channel.send(`Invoke command used: ${receivedMessage.content}`);
      receivedMessage.guild.createChannel(`new-general`, `text`);
    }
  });
});

client.login(secretConfig.discord.secretToken);

function findPrivateChannelCategory(channels) {
  channels.forEach((channel, channelId) => {
    if (channel.type === `category`) {
      return channelId;
    }
  });

  return false;
}
