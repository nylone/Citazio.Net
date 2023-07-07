"use strict";

const schema = {
  response: {
    200: {
      type: "object",
      required: ["username"],
      properties: {
        username: { $ref: "short_identifiable_string" },
      },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.get("/session/get", { schema }, async (request, reply) => {
    const uname = request.session.uname;
    if (uname) {
      return reply.send({username: uname})
    } else {
      return reply.unauthorized();
    }
  });
};
