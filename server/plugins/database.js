"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts, done) {
  const mariadb = require("mariadb");
  const config = fastify.config.database;
  const pool = mariadb.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: config.connection_limit,
    supportBigNumbers: true,
  });

  fastify.decorate("dbPool", pool);
});
