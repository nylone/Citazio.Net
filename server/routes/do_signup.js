'use strict'
const argon2 = require("argon2");

module.exports = async function (fastify, opts) {
  fastify.post('/signup', (request, reply) => {
    const uname = request.body?.uname;
    const pass = request.body?.pass;
    const token = request.body?.token;

    if (uname && pass && token) {
      argon2.hash(pass).then(
        async function onFulfilled(phc) {
          let conn;
          try {
            conn = await fastify.dbPool.getConnection();
            const rows = await conn.execute('CALL ADD_USER(?, ?, ?)', [uname, phc, token]);
            if (rows[0][0]) {
              const row = rows[0][0];
              const uid = row?.USER_ID;
              request.session.uid = uid;
              reply.redirect('/home')
            } else {
              reply.internalServerError(); // if the call succeeds the results should aways include the inserted id
            }
          } catch (err) {
            reply.badRequest(); // todo: adde better handling of user addition from the database
          } finally {
            if (conn) return conn.end();
          }
        },
        function onRejected() {
          reply.internalServerError();
        });
    } else {
      reply.badRequest();
    }
  });
}
