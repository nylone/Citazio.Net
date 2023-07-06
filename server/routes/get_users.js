"use strict";

const schema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        required: ["username"],
        properties: {
          username: { $ref: "short_identifiable_string" },
        },
      },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.get("/users/get", { schema }, async (request, reply) => {
    const uname = request.session.uname;
    if (uname) {
      let conn;
      try {
        conn = await fastify.dbPool.getConnection();

        const rows = await conn.execute("CALL get_users(?)", [
          uname,
        ]);

        if (rows[0][0]?.result == false) {
          return reply.unauthorized();
        } else {
          const users = rows[0];
          return reply.send(users);
        }
      } catch (err) {
        console.log(err);
        return reply.internalServerError();
      } finally {
        if (conn) conn.end();
      }
    } else {
      return reply.unauthorized();
    }
  });
};
