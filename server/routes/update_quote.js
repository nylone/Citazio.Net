'use strict'

const schema = {
    params: { $ref: 'board_path_params' },
    body: { 
        type: 'object',
        required: ['quote', 'id'],
        properties: {
            quote: { $ref: 'quote' },
            id: { type: 'integer', minimum: 0 },
        }
    }
}

module.exports = async function (fastify, opts) {
    fastify.post('/board/:path/quotes/update', { schema }, async (request, reply) => {
        const uname = request.session.uname;

        if (uname) {
            const id = request.body.id;
            const quote = request.body.quote;
            const path = request.params.path;

            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
                const rows = await conn.execute('CALL edit_quote(?, ?, ?, ?)', [id, quote, path, uname]);
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
