"use strict";

const schema = {
  params: { $ref: "board_path_params" },
  body: {
    type: "object",
    required: ["quote"],
    properties: {
      quote: { $ref: "quote" },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.post(
    "/board/:path/quotes/add",
    { schema },
    async (request, reply) => {
      const uname = request.session.uname;
      if (uname) {
        let conn;
        try {
          conn = await fastify.dbPool.getConnection();
          const quote = JSON.stringify(request.body.quote);
          const path = request.params.path;
          const rows = await conn.execute("CALL add_quote(?, ?, ?)", [
            quote,
            path,
            uname,
          ]);
          const row = rows[0][0];
          if (row?.result) {
            return reply.send();
          } else {
            return reply.badRequest();
          }
        } catch (err) {
          console.log(err);
          return reply.internalServerError();
        } finally {
          if (conn) conn.end();
        }
      } else {
        return reply.unauthorized();
      }
    }
  );
};
