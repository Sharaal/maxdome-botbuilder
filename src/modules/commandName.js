module.exports = ({ message }) => {
  let commandName;
  let args;
  if (message[0] === '!') {
    const index = message.indexOf(' ');
    if (index !== -1) {
      commandName = message.substring(0, index);
      args = message.substring(index + 1);
    } else {
      commandName = message;
    }
  } else {
    commandName = '!mxd-search';
    args = message;
  }
  return { commandName, args };
};
