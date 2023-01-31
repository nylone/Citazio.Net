'use strict'
const argon2 = require("argon2");

const schema = {
  body: {
    type: 'object',
    required: ['uname', 'pass'],
    properties: {
      uname: { $ref: 'short_ascii_string' },
      pass: { $ref: 'short_ascii_string' },
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = async function (fastify, opts) {
  fastify.post('/login', { schema }, async (request, reply) => {
    const uname = request.body.uname;
    const pass = request.body.pass;
    let conn;
    try {
      conn = await fastify.dbPool.getConnection();
      const rows = await conn.execute('CALL get_phc_from_username(?)', [uname]);
      const timeout = sleep(500);
      if (rows[0][0] && await argon2.verify(rows[0][0].phc, pass)) {
        request.session.uname = uname;
        await timeout;
        reply.send()
      } else {
        await timeout;
        reply.unauthorized();
      }
    } catch (err) {
      reply.internalServerError();
    } finally {
      if (conn) return conn.end();
    }
  });
}
