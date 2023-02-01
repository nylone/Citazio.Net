'use strict'

const schema = {
    params: {
        $ref: 'board_path_params',
    },
    body: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'integer', minimum: 0 },
        }
    }
}

module.exports = async function (fastify, opts) {
    fastify.post('/board/:path/quotes/delete', { schema }, async (request, reply) => {
        const uname = request.session.uname;
        if (uname) {
            const id = request.body.id;
            const path = request.params.path;
            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
                const rows = await conn.execute('CALL remove_quote(?, ?, ?)', [id, path, uname]);
                const row = rows[0][0]
                if (row?.result) {
                    return reply.send()
                } else {
                    return reply.badRequest()
                }
            } catch (err) {
                return reply.internalServerError();
            } finally {
                if (conn) conn.end();
            }
        } else {
            return reply.unauthorized()
        }
    })
}
