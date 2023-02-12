"use strict";
const argon2 = require("argon2");

module.exports = async function (fastify, opts) {
  fastify.post("/abandon", async (request, reply) => {
    const uname = request.session.uname;
    if (uname) {
        let conn;
        try {
          conn = await fastify.dbPool.getConnection();
          const rows = await conn.execute("CALL remove_user(?)", [uname]);
          if (rows[0][0].result) {
            await request.session.destroy();
            return reply.send();
          } else {
            return reply.badRequest();
          }
        } catch (err) {
          return reply.internalServerError();
        } finally {
          if (conn) conn.end();
        }
    } else {
      return reply.badRequest()
    }
  });
};
