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
    let uname = request.session.uname;

    if (uname) {
      uname = request.body.uname;
      let conn;
      try {
        conn = await fastify.dbPool.getConnection();
        const rows = await conn.execute("CALL edit_user_username(?)", [
          uname,
        ]);
        if (rows[0][0].result) {
          request.session.uname = uname;
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
