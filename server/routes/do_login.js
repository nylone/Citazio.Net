'use strict'
const argon2 = require("argon2");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = async function (fastify, opts) {
  fastify.post('/login', async (request, reply) => {
    const uname = request.body?.uname;
    const pass = request.body?.pass;
    if (uname && pass) {
      let conn;
      try {
        conn = await fastify.dbPool.getConnection();
        const rows = await conn.execute('CALL get_phc_from_username(?)', [uname]);
        const timeout = sleep(100);
        if (rows[0][0]) {
          const phc = rows[0][0].phc;
          try {
            if (await argon2.verify(phc, pass)) {
              request.session.uname = uname;
              await timeout;
              reply.send()
            } else {
              await timeout;
              reply.unauthorized();
            }
          } catch (e) {
            reply.internalServerError(e);
          }
        } else {
          await timeout;
          reply.unauthorized();
        }
      } catch (err) {
        reply.internalServerError(err);
      } finally {
        if (conn) return conn.end();
      }
    } else {
      reply.badRequest();
    }
  });
}
