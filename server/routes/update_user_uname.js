"use strict";
const argon2 = require("argon2");

module.exports = async function (fastify, opts) {
  const schema = {
    body: {
      type: "object",
      required: ["uname",],
      properties: {
        uname: { $ref: "short_identifiable_string" },
      },
    },
  };

  fastify.post("/username", { schema }, async (request, reply) => {
    const uname = request.session.uname;
    const new_uname = request.body.uname;

    if (uname) {
      let conn;
      try {
        conn = await fastify.dbPool.getConnection();
        const rows = await conn.execute("CALL edit_user_username(?, ?)", [
          uname,
          new_uname,
        ]);
        if (rows[0][0].result) {
          request.session.uname = new_uname;
          return reply.send();
        } else {
          return reply.badRequest();
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
