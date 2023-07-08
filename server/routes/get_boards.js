"use strict";

const schema = {
  response: {
    200: {
      type: "object",
      properties: {
        boards_owned: { $ref: "owned_board_array_info" },
        boards_public: { $ref: "public_board_array_info" },
        boards_subscribed: { $ref: "subscribed_board_array_info" },
      },
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.get("/boards/get", { schema }, async (request, reply) => {
    const uname = request.session.uname;
    let boards = {};
    let conn;
    try {
      conn = await fastify.dbPool.getConnection();

      let boards_owned, boards_subscribed;
      if (uname) {
        boards_owned = (await conn.execute("CALL get_own_boards(?)", [uname]))[0];
        boards_subscribed = (await conn.execute("CALL get_subscribed_boards(?)", [
          uname,
        ]))[0];
      }
      const boards_public = (await conn.execute("CALL get_public_boards()"))[0];

      boards = { boards_owned, boards_public, boards_subscribed };
      return reply.send(boards);
    } catch (err) {
      console.log(err);
      return reply.internalServerError();
    } finally {
      if (conn) conn.end();
    }
  });
};
