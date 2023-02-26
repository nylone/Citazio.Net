"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("can update board", async (t) => {
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
    url: "/board/"+ "test" + user +"/update",
    headers: {
      Cookie: res.headers["set-cookie"],
    },
    payload: {
      title: "test board edited",
      pub: true,
    },
  });
  t.same(res.statusCode, 200);
});

test("cannot edit board (unauthorized)", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    method: "POST",
    url: "/board/not_there/update",
    payload: {
      title: "test board",
      path: "can't add",
      pub: false,
    },
  });
  t.same(res.statusCode, 401);
});

test("cannot edit board (not exists)", async (t) => {
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
      url: "/board/not_there/update",
      headers: {
        Cookie: res.headers["set-cookie"],
      },
      payload: {
        title: "test board edited",
        pub: true,
      },
    });
    t.same(res.statusCode, 400);
  });
