"use strict";

const fp = require("fastify-plugin");

async function verify(response) {
  let formData = new FormData();
  formData.append("secret", this.secret_key);
  formData.append("response", response);
  let result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: formData,
      method: "POST",
    }
  );
  return result.json();
}

module.exports = fp(async (fastify, opts, done) => {
  const config = fastify.config;

  await fastify.decorate("turnstile", {
    verify,
    secret_key: config.turnstile.secret,
  });
});
