"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("signup with missing parameters", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/signup",
  });
  t.same(res.statusCode, 400);
  t.end();
});

test("signup of an already present user", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/signup",
    payload: {
      uname: "already present",
      pass: "test",
    },
  });
  t.same(res.statusCode, 400);
});

test("signup of a new user", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/signup",
    payload: {
      uname: Date.now(),
      pass: "test",
    },
  });
  t.same(res.statusCode, 200);
});