'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/board/:path/quotes/:fs/:fn', async (request, reply) => {
        const path = request.params.path;
        const fs = request.params.fs;
        const fn = request.params.fn;

        const uname = request.session.uname;
        if (uname) {
            let boards = {}
            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
    
                const rows = await conn.execute('CALL get_board_quotes(?, ?, ?, ?)', [fs, fn, path, uname]);

                if (rows[0][0].result) {
                    const quotes = rows[0]
                    reply.send(quotes)
                } else {
                    reply.unauthorized()
                }
            } catch (err) {
                reply.internalServerError(err);
            } finally {
                if (conn) return conn.end();
            }
        } else {
            reply.unauthorized()
        }
    })
}
