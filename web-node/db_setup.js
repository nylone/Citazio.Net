const { runInNewContext } = require("vm");

const run = async () => {
  const config = require("config").database;
  const mariadb = require("mariadb");
  const fs = require("fs");
  let conn;
  try {
    let gen, tables, functions, procedures;

    tables = fs.readFileSync("../database/tables.sql", "utf8");
    views = fs.readFileSync("../database/views.sql", "utf8");
    functions = fs.readFileSync("../database/functions.sql", "utf8");
    procedures = fs.readFileSync("../database/procedures.sql", "utf8");

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

    await conn.query("use " + config.database + ";");
    await conn.query("alter database " + config.database + " COLLATE = 'utf8_bin';");
    await conn.query(tables);
    await conn.query(views);
    await conn.query(functions);
    await conn.query(procedures);

    console.log("database updated!");
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.end();
  }
};

run().then();
