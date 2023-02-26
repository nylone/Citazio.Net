"use strict";

const schema = {
  params: {
    $ref: "board_path_params",
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        required: ["quote", "username"],
        properties: {
          quote: { $ref: "quote" },
          username: { $ref: "short_ascii_string" },
        },
      },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.get("/board/:path/quotes/get", { schema }, async (request, reply) => {
    const path = request.params.path;

    const uname = request.session.uname;
    if (uname) {
      let conn;
      try {
        conn = await fastify.dbPool.getConnection();

        const rows = await conn.execute("CALL get_board_quotes(?, ?)", [
          path,
          uname,
        ]);

        if (rows[0][0]?.result == false) {
          return reply.unauthorized();
        } else {
          const quotes = rows[0];
          console.log(quotes);
          return reply.send(quotes);
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
  });
};
