const builder = require('botbuilder');
const restify = require('restify');

const server = restify.createServer();
server.listen(process.env.PORT);

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});
require('./app')(connector);
server.post('/api/messages', connector.listen());
