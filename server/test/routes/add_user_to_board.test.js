"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("can add user to board", async (t) => {
  const app = await build(t);

  const user = Date.now();
  const user_to_add = user + 'additional';

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
    url: "/signup",
    payload: {
      uname: user_to_add,
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
    url: "/board/" + "test" + user + "/users/add",
    headers: {
      Cookie: res.headers["set-cookie"],
    },
    payload: {
      uname: user_to_add,
      access_lvl: 1,
    },
  });
  t.same(res.statusCode, 200);
});

test("cannot add user to board (board not exists)", async (t) => {
    const app = await build(t);

    const user = Date.now();
    const user_to_add = user + 'additional';
  
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
      url: "/signup",
      payload: {
        uname: user_to_add,
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
      url: "/board/" + "not_here" + "/users/add",
      headers: {
        Cookie: res.headers["set-cookie"],
      },
      payload: {
        uname: user_to_add,
        access_lvl: 1,
      },
    });
    t.same(res.statusCode, 400);
});

test("cannot add user to board (user not exists)", async (t) => {
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
      url: "/board/" + "test" + user + "/users/add",
      headers: {
        Cookie: res.headers["set-cookie"],
      },
      payload: {
        uname: "not_exists",
        access_lvl: 1,
      },
    });
    t.same(res.statusCode, 400);
});

test("cannot add user to board (unauthorized)", async (t) => {
    const app = await build(t);

    const user = Date.now();
  
    let res = await app.inject({
      method: "POST",
      url: "/board/" + "test" + user + "/users/add",
      payload: {
        uname: "not_exists",
        access_lvl: 1,
      },
    });
    t.same(res.statusCode, 401);
});