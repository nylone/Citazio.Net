"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  await fastify.register(import("@fastify/rate-limit"), {
    global: true,
    max: 5,
    timeWindow: 1000,
  });
  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit(),
    },
    function (request, reply) {
      reply.notFound();
    }
  );
});
