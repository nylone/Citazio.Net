'use strict'

module.exports = async function (fastify, opts) {
    fastify.put('/board/:path/users', async (request, reply) => {
        const session_uname = request.session.uname;

        const path = request.params.path;

        const uname = request.body?.uname;
        const access_lvl = request.body?.access_lvl;

        if (session_uname) {
            if (uname && access_lvl <= 2) {
                let conn;
                try {
                    conn = await fastify.dbPool.getConnection();
                    const rows = await conn.execute('CALL edit_user_on_board(?, ?, ?, ?)', [uname, path, access_lvl, session_uname]);
                    const row = rows[0][0]
                    console.log(row)
                    if (row?.result) {
                        reply.send()
                    } else {
                        reply.badRequest()
                    }
                } catch (err) {
                    reply.internalServerError(err);
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