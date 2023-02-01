"use strict";

const fp = require("fastify-plugin");
const helmet = require("@fastify/helmet");
const cors = require("@fastify/cors");

module.exports = fp(async function (fastify, opts) {
  await fastify.register(helmet, { contentSecurityPolicy: false });
  await fastify.register(cors, {
    origin: true,
    allowedHeaders: [
      "Content-Type",
      "Content-Length",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  });
});
