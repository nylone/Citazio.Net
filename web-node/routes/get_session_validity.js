"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/session/check", {}, async (request, reply) => {
    const uname = request.session.uname;
    if (uname) {
      return reply.send();
    } else {
      return reply.unauthorized();
    }
  });
};
