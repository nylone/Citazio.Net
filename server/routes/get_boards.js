'use strict'

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = async function (fastify, opts) {
    fastify.get('/boards', async (request, reply) => {
        const uid = request.session.uid;
        if (uid) {
            let boards = {}
            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
    
                const rows_owned = await conn.execute('CALL GET_OWN_BOARDS(?)', [uid]);
                const rows_subscribed = await conn.execute('CALL GET_SUBSCRIBED_BOARDS(?)', [uid]);
                const rows_public = await conn.execute('CALL GET_PUBLIC_BOARDS(?)', [uid]);
    
                const boards_owned = rows_owned[0]
                const boards_subscribed = rows_subscribed[0]
                const boards_public = rows_public[0]
    
                boards = {boards_owned, boards_public, boards_subscribed}
                reply.send(boards)
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
