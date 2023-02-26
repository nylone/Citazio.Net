"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("can remove board", async (t) => {
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

  await app.inject({
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

  res = await app.inject({
    method: "POST",
    url: "/board/" + "test" + user + "/remove",
    headers: {
      Cookie: res.headers["set-cookie"],
    },
  });
  t.same(res.statusCode, 200);
});

test("cannot remove board (unauthorized)", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/board/not_there/remove",
  });
  t.same(res.statusCode, 401);
});

test("cannot remove board (not exists)", async (t) => {
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
    url: "/board/not_there/remove",
    headers: {
      Cookie: res.headers["set-cookie"],
    }
  });
  t.same(res.statusCode, 400);
});
