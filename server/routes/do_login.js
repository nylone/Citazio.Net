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
        const rows = await conn.execute('CALL GET_USER_FROM_USERNAME(?)', [uname]);
        const timeout = sleep(100);
        if (rows[0][0]) {
          const row = rows[0][0];
          const uid = row?.USER_ID;
          const phc = row?.PHC;
          try {
            if (await argon2.verify(phc, pass)) {
              request.session.uid = uid;
              await timeout;
              reply.redirect('/home')
            } else {
              await timeout;
              reply.unauthorized();
            }
          } catch (e) {
            reply.internalServerError();
          }
        } else {
          await timeout;
          reply.unauthorized();
        }
      } catch (err) {
        reply.internalServerError();
      } finally {
        if (conn) return conn.end();
      }
    } else {
      reply.badRequest();
    }
  });
}
