'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts, done) {
  function string_constraint(s, len) {
    return typeof (s) === "string" && String.length(s) <= len ? s : undefined;
  }

  function filter(input) {
    if (typeof(input) !== "object" || !Array.isArray(input.array)) {
      return undefined;
    }

    return {
      array: input.array.map(x => {
        return {
          msg: string_constraint(x.msg, 256),
          by: string_constraint(x.by, 32),
          ctx: string_constraint(x.ctx, 256),
        };
      }).filter(x => "msg" in x),
      ctx: string_constraint(input.ctx, 256),
      date: string_constraint(input.date, 32),
    }
  }

  fastify.decorate("quote_filter", filter);
})