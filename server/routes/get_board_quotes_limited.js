"use strict";

const schema = {
  params: {
    $ref: "limited_quotes_params",
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        required: ["quote", "username"],
        properties: {
          id: { type: "number" },
          quote: { $ref: "quote" },
          username: { $ref: "short_identifiable_string" },
          created: { $ref: "short_ascii_string" },
          updated: { $ref: "short_nullable_ascii_string" }
        },
      },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.get("/board/:path/quotes/get/:page/:size", { schema }, async (request, reply) => {
    const path = request.params.path;
    const page = request.params.page;
    const size = request.params.size;

    const uname = request.session.uname || null;
    let conn;
    try {
      conn = await fastify.dbPool.getConnection();

      const rows = await conn.execute("CALL get_board_quotes_limited(?, ?, ?, ?)", [
        path,
        uname,
        page,
        size,
      ]);

      if (rows[0][0]?.result == false) {
        return reply.unauthorized();
      } else {
        const quotes = rows[0];
        return reply.send(quotes);
      }
    } catch (err) {
      console.log(err);
      return reply.internalServerError();
    } finally {
      if (conn) conn.end();
    }
  });
};
