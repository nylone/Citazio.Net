'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts, done) {

  const uname_len = 32;
  const text_len = 4096;

  function string_constraint(s, len) {
    return typeof (s) === "string" && String.length(s) <= len ? s : undefined;
  }

  function date_constraint(d) {
    return d === parseInt(data, 10) ? d : undefined;
  }

  function filter(input) {
    if (typeof(input) !== "object" || !Array.isArray(input.phrases)) {
      return undefined;
    }

    return {
      phrases: input.phrases.map(x => {
        return {
          msg: string_constraint(x.msg, text_len),
          by: string_constraint(x.by, uname_len),
          ctx: string_constraint(x.ctx, text_len),
        };
      }).filter(x => "msg" in x),
      ctx: string_constraint(input.ctx, text_len),
      date: date_constraint(input.date),
    }
  }

  fastify.decorate("quote_filter", filter);
})