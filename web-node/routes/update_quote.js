"use strict";

const schema = {
  params: { $ref: "board_path_quote_params" },
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
    "/board/:path/quote/:id/update",
    { schema },
    async (request, reply) => {
      const uname = request.session.uname;

      if (uname) {
        const quote = JSON.stringify(request.body.quote);
        const path = request.params.path;
        const id = request.params.id;


        let conn;
        try {
          conn = await fastify.dbPool.getConnection();
          const rows = await conn.execute("CALL edit_quote(?, ?, ?, ?)", [
            id,
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
