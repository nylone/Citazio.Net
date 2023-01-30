'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/board/:path/quotes', async (request, reply) => {
        const path = request.params.path;

        const uname = request.session.uname;
        if (uname) {
            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
    
                const rows = await conn.execute('CALL get_board_quotes(?, ?)', [path, uname]);

                if (rows[0][0]?.result == false) {
                    reply.unauthorized()
                } else {
                    const quotes = rows[0]
                    reply.send(quotes)
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
