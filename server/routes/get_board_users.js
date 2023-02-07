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
        required: ["access_lvl", "username"],
        properties: {
          access_lvl: { $ref: "access_lvl" },
          username: { $ref: "short_ascii_string" },
        },
      },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.get("/board/:path/users/get", { schema }, async (request, reply) => {
    const path = request.params.path;

    const uname = request.session.uname;
    if (uname) {
      let conn;
      try {
        conn = await fastify.dbPool.getConnection();

        const rows = await conn.execute("CALL get_board_users(?, ?)", [
          path,
          uname,
        ]);

        if (rows[0][0]?.result == false) {
          return reply.unauthorized();
        } else {
          const users = rows[0];
          return reply.send(users);
        }
      } catch (err) {
        return reply.internalServerError();
      } finally {
        if (conn) conn.end();
      }
    } else {
      return reply.unauthorized();
    }
  });
};
