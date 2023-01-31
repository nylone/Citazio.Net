'use strict'

const schema = {
    params: {
        $ref: 'board_path_params',
    },
    body: {
        type: 'object',
        required: ['uname', 'access_lvl'],
        properties: {
            uname: { $ref: 'short_ascii_string' },
            access_lvl: { type: 'integer', minimum: 0, maximum: 2 },
        }
    }
}

module.exports = async function (fastify, opts) {
    fastify.post('/board/:path/users/add', { schema }, async (request, reply) => {
        const session_uname = request.session.uname;
        if (session_uname) {
            const path = request.params.path;
            const uname = request.body.uname;
            const access_lvl = request.body.access_lvl;
            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
                const rows = await conn.execute('CALL add_user_to_board(?, ?, ?, ?)', [uname, path, access_lvl, session_uname]);
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
            reply.unauthorized()
        }
    })
}