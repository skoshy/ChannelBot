export const doesCommandMatchContent = (command, content) => {
  return (command === content || content.substr(0, command.length + 1) === `${command} `);
};
