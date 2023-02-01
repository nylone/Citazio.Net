'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/logout', async (request, reply) => {
        try {
            await request.session.destroy();
            return reply.send();
        } catch (err) {
            return reply.internalServerError()
        }
    })
}
