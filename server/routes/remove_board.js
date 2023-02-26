"use strict";

const schema = {
  params: {
    $ref: "board_path_params",
  },
};

module.exports = async function (fastify, opts) {
  fastify.post(
    "/board/:path/remove",
    { schema },
    async (request, reply) => {
      const uname = request.session.uname;
      const path = request.params.path;

      if (uname) {
        let conn;
        try {
          conn = await fastify.dbPool.getConnection();
          const rows = await conn.execute("CALL remove_board(?, ?)", [
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
