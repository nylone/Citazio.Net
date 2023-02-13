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

const fastify = require("fastify")({
  logger: logger,
});

require("./app")(fastify).then(fastify.listen(config.server));
