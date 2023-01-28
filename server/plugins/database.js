'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts, done) {
  const mariadb = require('mariadb');
  const pool = mariadb.createPool({
       host: 'localhost', 
       user:'theysaid', 
       password: 'theysaid',
       database: 'theysaid',
       connectionLimit: 5,
       supportBigNumbers: true,
  });
  
  fastify.decorate("dbPool", pool);
})