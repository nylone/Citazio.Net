"use strict";
const argon2 = require("argon2");

module.exports = async function (fastify, opts) {
  const schema = {
    body: {
      type: "object",
      required: ["pass",],
      properties: {
        pass: { $ref: "password" },
      },
    },
  };

  fastify.post("/password", { schema }, async (request, reply) => {
    const uname = request.session.uname;
    const pass = request.body.pass;

    if (uname) {
      let conn;
      try {
        const phc = await argon2.hash(pass);
        conn = await fastify.dbPool.getConnection();
        const rows = await conn.execute("CALL edit_user_phc(?, ?)", [
          uname,
          phc,
        ]);
        if (rows[0][0].result) {
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
