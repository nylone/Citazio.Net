"use strict";

const config = require("config");

let logger = {};
if (config.app.logger) {
  logger = {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  };
}

const fastify = require('fastify')({
  logger: logger,
});

await require('./app')(fastify);

fastify.listen(config.server);
