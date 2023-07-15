const { runInNewContext } = require("vm");

if (process.argv.length === 3) {
  const to_generate = process.argv[2];
  const run = async () => {
    const crypto = require("crypto");
    const config = require("config").database;
    const mariadb = require("mariadb");
    const fs = require("fs");
    let conn;
    try {
      conn = await mariadb.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        connectionLimit: config.connection_limit,
        supportBigNumbers: true,
        multipleStatements: true,
      });

      for (i = 0; i < to_generate; i++) {
        let token;
        let rows;
        do {
          token = crypto.randomBytes(16).toString("hex");
          rows = await conn.execute("call add_token(?)", [token]);
        } while (rows[0][0]?.result !== 1);
        console.log(token);
      }
    } catch (err) {
      console.log(err);
    } finally {
      if (conn) conn.end();
    }
  };

  run().then();
}
