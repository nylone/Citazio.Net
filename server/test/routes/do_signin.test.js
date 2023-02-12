"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("signin with missing parameters", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/signin",
  });
  t.same(res.statusCode, 400);
});

test("signin of an already present user", async (t) => {
  const app = await build(t);

  const user = Date.now();

  await app.inject({
    method: "POST",
    url: "/signup",
    payload: {
      uname: user,
      pass: "test",
    },
  });

  const res = await app.inject({
    method: "POST",
    url: "/signin",
    payload: {
      uname: user,
      pass: "test",
    },
  });
  t.same(res.statusCode, 200);
});

test("signin of a new user", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/signin",
    payload: {
      uname: Date.now(),
      pass: "test",
    },
  });
  t.same(res.statusCode, 400);
});