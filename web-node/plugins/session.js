"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts, done) {
  const fastifySession = require("@fastify/session");
  const fastifyCookie = require("@fastify/cookie");
  const MySQLStore = require("express-mysql-session")(fastifySession);

  const config = fastify.config;

  const options = {
    ...config.database,
    ...{
      schema: {
        tableName: "sessions",
        columnNames: {
          session_id: "session_id",
          expires: "expires",
          data: "data",
        },
      },
    },
  };

  var sessionStore = new MySQLStore(options);

  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: config.sessions.secret,
    cookie: config.sessions.cookie,
    store: sessionStore,
  });
});
