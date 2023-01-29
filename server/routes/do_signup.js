'use strict'
const argon2 = require("argon2");

module.exports = async function (fastify, opts) {
  const requireTokens = fastify.config.app.requireTokens;

  fastify.post('/signup', (request, reply) => {
    const uname = request.body?.uname;
    const pass = request.body?.pass;
    const token = requireTokens ? request.body?.token : null;

    if (uname && pass && (token || requireTokens == false)) {
      argon2.hash(pass).then(
        async function onFulfilled(phc) {
          let conn;
          try {
            conn = await fastify.dbPool.getConnection();
            const rows = await conn.execute('CALL add_user(?, ?, ?)', [uname, phc, token || null]);
            if (rows[0][0].result) {
              request.session.uname = uname;
              reply.send();
            } else {
              reply.badRequest(rows[0][0].reason);
            }
          } catch (err) {
            reply.internalServerError();
          } finally {
            if (conn) return conn.end();
          }
        },
        function onRejected() {
          reply.internalServerError();
        });
    } else {
      reply.badRequest("missing fields");
    }
  });
}
