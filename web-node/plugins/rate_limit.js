"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  const config = fastify.config.server.rateLimit;

  if (config.enabled) {
    await fastify.register(import("@fastify/rate-limit"), {
      global: true,
      max: config.maxRequests,
      timeWindow: config.timeWindow,
    });
    fastify.setNotFoundHandler(
      {
        preHandler: fastify.rateLimit(),
      },
      function (request, reply) {
        reply.notFound();
      }
    );
  }
});
