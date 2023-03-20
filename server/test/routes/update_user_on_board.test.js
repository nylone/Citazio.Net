"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("can update user on board", async (t) => {
  const app = await build(t);

  const user = Date.now();
  const user_to_edit = user + 'additional';

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
      uname: user_to_edit,
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

  res = await app.inject({
    method: "POST",
    url: "/board/" + "test" + user + "/users/add",
    headers: {
      Cookie: res.headers["set-cookie"],
    },
    payload: {
      uname: user_to_edit,
      access_lvl: 1,
    },
  });

  res = await app.inject({
    method: "POST",
    url: "/board/" + "test" + user + "/user/"+ user_to_edit +"/update",
    headers: {
      Cookie: res.headers["set-cookie"],
    },
    payload: {
      access_lvl: 2,
    },
  });
  t.same(res.statusCode, 200);
});

test("cannot edit user on board (user not exists)", async (t) => {
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
      url: "/board/" + "test" + user + "/user/"+ "user" +"/update",
      headers: {
        Cookie: res.headers["set-cookie"],
      },
      payload: {
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
      url: "/board/" + "test" + user + "/user/"+ "user" +"/update",
      payload: {
        access_lvl: 1,
      },
    });

    t.same(res.statusCode, 401);
});