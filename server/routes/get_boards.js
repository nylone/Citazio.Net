'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/boards', async (request, reply) => {
        const uname = request.session.uname;
        if (uname) {
            let boards = {}
            let conn;
            try {
                conn = await fastify.dbPool.getConnection();
    
                const rows_owned = await conn.execute('CALL get_own_boards(?)', [uname]);
                const rows_subscribed = await conn.execute('CALL get_subscribed_boards(?)', [uname]);
                const rows_public = await conn.execute('CALL get_public_boards(?)', [uname]);
    
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
