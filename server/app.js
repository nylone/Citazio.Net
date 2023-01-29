'use strict'

const config = require('config')

const fastify = require('fastify')({
  logger: config.app.logger
})

fastify.decorate("config", config)

const path = require('path')
const AutoLoad = require('@fastify/autoload')

// This loads all plugins defined in plugins
// those should be support plugins that are reused
// through your application
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
})

// This loads all plugins defined in routes
// define your routes in one of these
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
})

fastify.listen(fastify.config.server)
