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
    "/board/:path/transfer",
    { schema },
    async (request, reply) => {
      const uname = request.session.uname;

      if (uname) {
        const new_owner = request.body.uname;
        const path = request.params.path;

        let conn;
        try {
          conn = await fastify.dbPool.getConnection();
          const rows = await conn.execute("CALL edit_board_owner(?, ?, ?)", [
            path,
            new_owner,
            uname,
          ]);
          const row = rows[0][0];
          if (row?.result) {
            return reply.send();
          } else {
            return reply.badRequest();
          }
        } catch (err) {
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
