"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts, done) {
  fastify.addSchema({
    $id: "short_ascii_string",
    type: "string",
    maxLength: 32,
    pattern: "[ -~]",
  });

  fastify.addSchema({
    $id: "long_string",
    type: "string",
    maxLength: 4096,
  });

  fastify.addSchema({
    $id: "board_path_params",
    type: "object",
    required: ["path"],
    properties: {
      path: { $ref: "short_ascii_string" },
    },
  });

  fastify.addSchema({
    $id: "owned_board_array_info",
    type: "array",
    items: {
      type: "object",
      required: ["path", "title"],
      properties: {
        path: { $ref: "short_ascii_string" },
        title: { $ref: "short_ascii_string" },
        users: { $ref: "positive_int" },
      },
    },
  });

  fastify.addSchema({
    $id: "public_board_array_info",
    type: "array",
    items: {
      type: "object",
      required: ["path", "title", "owner"],
      properties: {
        path: { $ref: "short_ascii_string" },
        title: { $ref: "short_ascii_string" },
        owner: { $ref: "short_ascii_string" },
      },
    },
  });

  fastify.addSchema({
    $id: "subscribed_board_array_info",
    type: "array",
    items: {
      type: "object",
      required: ["path", "title", "owner", "access_lvl"],
      properties: {
        path: { $ref: "short_ascii_string" },
        title: { $ref: "short_ascii_string" },
        owner: { $ref: "short_ascii_string" },
        access_lvl: { $ref: "access_lvl" },
        users: { $ref: "positive_int" },
      },
    },
  });

  fastify.addSchema({
    $id: "access_lvl",
    type: "integer",
    minimum: 0,
    maximum: 2,
  });

  fastify.addSchema({
    $id: "positive_int",
    type: "integer",
    minimum: 0,
  });

  fastify.addSchema({
    additionalProperties: false,
    $id: "quote",
    type: "object",
    required: ["phrases"],
    properties: {
      phrases: {
        type: "array",
        minItems: 1,
        items: {
          additionalProperties: false,
          type: "object",
          required: ["msg"],
          properties: {
            msg: { $ref: "long_string" },
            by: { $ref: "short_ascii_string" },
            ctx: { $ref: "long_string" },
          },
          maxProperties: 3,
        },
      },
      ctx: { $ref: "long_string" },
      date: { type: "integer" },
    },
  });
});
