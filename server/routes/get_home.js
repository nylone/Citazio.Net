'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/home', (request, reply) => {
    reply.sendFile('index.html')
  })
}
