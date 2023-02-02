"use strict";

const fp = require("fastify-plugin");
const helmet = require("@fastify/helmet");
const cors = require("@fastify/cors");

module.exports = fp(async function (fastify, opts) {
  await fastify.register(helmet, {contentSecurityPolicy: true});
  await fastify.register(cors, {
    origin: true,
    credentials: true,
  });
});
