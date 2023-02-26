"use strict";

const schema = {
  params: { $ref: "board_path_params" },
  body: {
    type: "object",
    required: [],
    properties: {
      title: { $ref: "short_ascii_string" },
      public: { type: "boolean" },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.post("/board/:path/update", { schema }, async (request, reply) => {
    const uname = request.session.uname;

    if (uname) {
      const title = request.body.title || null;
      const public_flag = request.body.public || null;
      const path = request.params.path;

      let conn;
      try {
        conn = await fastify.dbPool.getConnection();
        const rows = await conn.execute("CALL edit_board(?, ?, ?, ?)", [
          path,
          title,
          public_flag,
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
  });
};
