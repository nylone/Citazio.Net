"use strict";

module.exports = async function (fastify, opts) {
  fastify.post("/signout", async (request, reply) => {
    try {
      await request.session.destroy();
      return reply.send();
    } catch (err) {
      console.log(err);
      return reply.internalServerError();
    }
  });
};
