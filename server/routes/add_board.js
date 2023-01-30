'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/boards', async (request, reply) => {
        const uname = request.session.uname;

        const title = request.body?.title;
        const path = request.body?.path;
        const pub = request.body?.public;
        if (uname) {
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
