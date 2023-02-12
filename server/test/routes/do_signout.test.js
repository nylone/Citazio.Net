"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("signout", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/signout",
  });
  t.same(res.statusCode, 200);
});