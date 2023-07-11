"use strict";

const schema = {
  params: {
    $ref: "board_path_params",
  },
  response: {
    200: {
        type: "object",
        required: ["public", "title"],
        properties: {
          owner: { $ref: "short_identifiable_string" },
          public: { type: "boolean" },
          title: { $ref: "short_ascii_string" },
          created: { $ref: "short_ascii_string" },
          last_updated: { $ref: "short_ascii_string" },
          users: { $ref: "positive_int" },
      },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.get("/board/:path/info/get", { schema }, async (request, reply) => {
    const path = request.params.path;

    const uname = request.session.uname || null;
    let conn;
    try {
      conn = await fastify.dbPool.getConnection();

      const rows = await conn.execute("CALL get_board_info(?, ?)", [
        path,
        uname,
      ]);

      if (rows[0][0]?.result == false) {
        return reply.unauthorized();
      } else {
        const info = rows[0][0];
        return reply.send(info);
      }
    } catch (err) {
      console.log(err);
      return reply.internalServerError();
    } finally {
      if (conn) conn.end();
    }
  });
};
