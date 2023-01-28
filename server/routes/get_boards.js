'use strict'

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

module.exports = async function (fastify, opts) {
    fastify.get('/boards', async (request, reply) => {
        const uid = request.session.uid;
        let boards = {}
        fastify.mysql.getConnection(
            async (err, client) => {
                if (err) return reply.internalServerError();
    
                await client.promise().query('CALL GET_OWN_BOARDS(?)', [uid],
                (err, result) => {
                    if (err) return reply.internalServerError();
    
                    const row = result[0][0];
                    boards.owned = { 
                        bid: row.BOARD_ID,
                        name: row.NAME,
                        path: row.PATH,
                    }
                    console.log(boards)
                });

                console.log(boards)
    
                client.query('CALL GET_SUBSCRIBED_BOARDS(?)', [uid],
                (err, result) => {
                    if (err) return reply.internalServerError();
    
                    const row = result[0][0];
                    boards.subscribed = row
                });
    
                client.query('CALL GET_PUBLIC_BOARDS(?)', [uid],
                (err, result) => {
                    if (err) return reply.internalServerError();
    
                    const row = result[0][0];
                    boards.public = row
                }); 

                client.release();
                console.log("released")
                reply.send(boards)
            }
        )
    })
}
