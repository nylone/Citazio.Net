'use strict'

const schema = {
    params: {
        $ref: 'board_path_params',
    },
}

module.exports = async function (fastify, opts) {
    fastify.get('/board/:path/users', { schema }, async (request, reply) => {
        const path = request.params.path;

        const uname = request.session.uname;
        if (uname) {
            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
    
                const rows = await conn.execute('CALL get_board_users(?, ?)', [path, uname]);

                if (rows[0][0]?.result == false) {
                    return reply.unauthorized()
                } else {
                    const users = rows[0]
                    return reply.send(users)
                }
            } catch (err) {
                return reply.internalServerError(err);
            } finally {
                if (conn) conn.end();
            }
        } else {
            return reply.unauthorized()
        }
    })
}
