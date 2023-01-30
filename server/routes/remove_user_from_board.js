'use strict'

module.exports = async function (fastify, opts) {
    fastify.delete('/board/:path/users', async (request, reply) => {
        const session_uname = request.session.uname;

        const path = request.params.path;

        const uname = request.body?.uname;

        if (session_uname) {
            if (uname) {
                let conn;
                try {
                    conn = await fastify.dbPool.getConnection();
                    const rows = await conn.execute('CALL remove_user_from_board(?, ?, ?)', [uname, path, session_uname]);
                    const row = rows[0][0]
                    console.log(row)
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
                reply.badRequest()
            }
        } else {
            reply.unauthorized()
        }
    })
}