'use strict'

const fp = require('fastify-plugin')


module.exports = fp(async function (fastify, opts, done) {
    const fastifySession = require('@fastify/session');
    const fastifyCookie = require('@fastify/cookie');
    const MySQLStore = require('express-mysql-session')(fastifySession);

    const options = {
      host: 'localhost',
      port: 3306,
      user: 'theysaid',
      password: 'theysaid',
      database: 'theysaid',
      schema: {
        tableName: 'SESSIONS',
        columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
        }
      }
    };

    var sessionStore = new MySQLStore(options);

    fastify.register(fastifyCookie);
    fastify.register(fastifySession, {
      secret: 'a secret with minimum length of 32 characters',
      cookie: { secure: false },
      store: sessionStore,
    });
})