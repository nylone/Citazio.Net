'use strict'

const schema = {
    body: {
      type: 'object',
      required: ['title', 'path', 'pub'],
      properties: {
        title: { $ref: 'short_ascii_string' },
        path: { $ref: 'short_ascii_string' },
        pub: { type: 'boolean' }
      }
    }
  }

module.exports = async function (fastify, opts) {
    fastify.post('/boards/add', { schema }, async (request, reply) => {
        const uname = request.session.uname;
        if (uname) {
            const title = request.body.title;
            const path = request.body.path;
            const pub = request.body.public;

            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
                const rows = await conn.execute('CALL add_board(?, ?, ?, ?)', [title, uname, path, pub]);
                const row = rows[0][0]
                if (row?.result) {
                    reply.send()
                } else {
                    reply.badRequest()
                }
            } catch (err) {
                reply.internalServerError();
            } finally {
                if (conn) return conn.end();
            }
        } else {
            reply.unauthorized()
        }
    })
}
