'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts, done) {
    const path = require('path')

    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, '..', 'public'),
      })
})