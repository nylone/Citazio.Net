'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/logout', async (request, reply) => {
        try {
            await request.session.destroy();
            reply.send();
        } catch (err) {
            reply.internalServerError()
        }
    })
}
