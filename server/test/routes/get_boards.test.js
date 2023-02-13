"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("can get boards", async (t) => {
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
    method: "GET",
    url: "/boards/get",
    headers: {
      Cookie: res.headers['set-cookie']
    }
  });
  t.same(res.statusCode, 200);
});

test("cannot get boards", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "GET",
    url: "/boards/get",
  });
  t.same(res.statusCode, 401);
});