"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("abandon of an already present user", async (t) => {
  const app = await build(t);

  const user = Date.now();

  let res = await app.inject({
    method: "POST",
    url: "/signup",
    payload: {
      uname: user,
      pass: "test",
    },
  });

  res = await app.inject({
    method: "POST",
    url: "/abandon",
    headers: {
      Cookie: res.headers['set-cookie']
    }
  });
  t.same(res.statusCode, 200);
});

test("abandon of a non existing user", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/abandon",
  });
  t.same(res.statusCode, 400);
});
