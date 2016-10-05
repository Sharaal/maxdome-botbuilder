const mxdAuthCommands = require('mxd-auth-commands');
const mxdNotepadCommands = require('mxd-notepad-commands');

const { AssetsQuery, Heimdall } = require('mxd-heimdall');
const heimdall = new Heimdall({
  apikey: process.env.HEIMDALL_APIKEY,
  appid: process.env.HEIMDALL_APPID
});

const sessionStorage = require('mxd-session-storage')({ url: process.env.REDIS_URL });

const commands = {
  '!mxd-info': require('info-command').commands.info,
  '!mxd-login': mxdAuthCommands.commands['mxd-login']({ heimdall, sessionStorage }),
  '!mxd-logout': mxdAuthCommands.commands['mxd-logout']({ heimdall, sessionStorage }),
  '!mxd-notepad-add': mxdNotepadCommands.commands['mxd-notepad-add']({ heimdall }),
  '!mxd-notepad-remove': mxdNotepadCommands.commands['mxd-notepad-remove']({ heimdall }),
  '!mxd-search': require('mxd-search-command').commands['mxd-search']({
    AssetsQuery: AssetsQuery,
    heimdall: heimdall,
    pageSize: process.env.HEIMDALL_PAGESIZE || 3
  })
};

const builder = require('botbuilder');

module.exports = (connector) => {
  const bot = new builder.UniversalBot(connector);
  bot.dialog('/', async (session) => {
    const loggedin = require('./modules/loggedin.js')({ session });
    const message = session.message.text;
    const reply = require('./modules/reply.js')({ session });
    const heimdallLoggedin = mxdAuthCommands.modules['heimdall-loggedin']({ heimdall, sessionStorage })({ loggedin, reply });
    try {
      const { commandName, args } = require('./modules/commandName.js')({ message });
      if (commandName && commands[commandName]) {
        await commands[commandName]({ args, heimdallLoggedin, loggedin, reply });
      }
    } catch(e) {
      session.send(`error "${e.message}"`);
    }
  });
};
