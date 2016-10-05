const builder = require('botbuilder');

const connector = new builder.ConsoleConnector().listen();
require('./app')(connector);
