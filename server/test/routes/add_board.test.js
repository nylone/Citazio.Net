"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("can add board", async (t) => {
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
    url: "/boards/add",
    headers: {
      Cookie: res.headers["set-cookie"],
    },
    payload: {
      title: "test board",
      path: "test" + user,
      pub: false,
    },
  });
  t.same(res.statusCode, 200);
});

test("cannot add board", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/boards/add",
    payload: {
      title: "test board",
      path: "can't add",
      pub: false,
    },
  });
  t.same(res.statusCode, 401);
});
