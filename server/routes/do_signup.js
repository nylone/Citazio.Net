'use strict'
const argon2 = require("argon2");

module.exports = async function (fastify, opts) {
  const requireTokens = fastify.config.app.requireTokens;

  const schema = {
    body: {
      type: 'object',
      required: requireTokens ? ['uname', 'pass', 'token'] : ['uname', 'pass'],
      properties: {
        uname:  { $ref: 'short_ascii_string' },
        pass:   { $ref: 'short_ascii_string' },
        token:  { $ref: 'short_ascii_string' },
      }
    }
  }

  fastify.post('/signup', { schema }, async (request, reply) => {
    const uname = request.body.uname;
    const pass = request.body.pass;
    const token = request.body.token || null;

    let conn;
    try {
      const phc = await argon2.hash(pass);
      conn = await fastify.dbPool.getConnection();
      const rows = await conn.execute('CALL add_user(?, ?, ?)', [uname, phc, token]);
      if (rows[0][0].result) {
        request.session.uname = uname;
        return reply.send();
      } else {
        return reply.badRequest();
      }
    } catch (err) {
      return reply.internalServerError();
    } finally {
      if (conn) conn.end();
    }
  });
}
