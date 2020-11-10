export const processPin = (receivedMessage) => {
  const { messages } = receivedMessage.channel;
  messages.array().slice(-2)[0].pin();
};
