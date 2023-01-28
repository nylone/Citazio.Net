'use strict'

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = async function (fastify, opts) {
    fastify.get('/:bid/quotes/:fs/:fn', async (request, reply) => {
        const bid = request.params.bid;
        const fs = request.params.fs;
        const fn = request.params.fn;

        const uid = request.session.uid;
        if (uid) {
            let boards = {}
            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
    
                const rows = await conn.execute('CALL GET_QUOTES(?, ?, ?, ?)', [fs, fn, bid, uid]);
    
                const quotes = rows[0]
    
                reply.send(quotes)
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
