const secretConfig = require('./.config.secret')
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('message', (receivedMessage) => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) {
    return
  }

  receivedMessage.channel.send("Message received: " + receivedMessage.content)
})

client.login(secretConfig.discord.secretToken) // Replace XXXXX with your bot token
