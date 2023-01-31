'use strict'

module.exports = async function (fastify, opts) {
    fastify.put('/board/:path/quotes', async (request, reply) => {
        const uname = request.session.uname;

        const id = request.body?.id;
        const quote = fastify.quote_filter(request.body?.quote);

        if (quote) {
            const path = request.body?.path;
            if (uname) {
                let conn;
                try {
                    conn = await fastify.dbPool.getConnection();
                    const rows = await conn.execute('CALL edit_quote(?, ?, ?, ?)', [id, quote, path, uname]);
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
        } else {
            reply.badRequest()
        }
    })
}
