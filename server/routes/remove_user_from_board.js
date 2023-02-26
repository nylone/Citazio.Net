"use strict";

const schema = {
  params: {
    $ref: "board_path_params",
  },
  body: {
    type: "object",
    required: ["uname"],
    properties: {
      uname: { $ref: "short_ascii_string" },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.post(
    "/board/:path/users/remove",
    { schema },
    async (request, reply) => {
      const session_uname = request.session.uname;

      const path = request.params.path;

      const uname = request.body.uname;

      if (session_uname) {
        let conn;
        try {
          conn = await fastify.dbPool.getConnection();
          const rows = await conn.execute(
            "CALL remove_user_from_board(?, ?, ?)",
            [uname, path, session_uname]
          );
          const row = rows[0][0];
          console.log(row);
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
