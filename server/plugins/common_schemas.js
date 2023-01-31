'use strict'

const fp = require('fastify-plugin')


module.exports = fp(async function (fastify, opts, done) {

    fastify.addSchema({ 
        $id: 'short_ascii_string',
        type: 'string', 
        maxLength: 32,
        pattern: '[ -~]',
    });

    fastify.addSchema({ 
        $id: 'long_string',
        type: 'string', 
        maxLength: 4096,
    });

    fastify.addSchema({
        $id: 'board_path_params',
        type: 'object',
        required: ['path'],
        properties: {
            path: { $ref: 'short_ascii_string' },
        }
    })

    fastify.addSchema({
        $id: 'quote',
        type: 'object',
        required: ['phrases'],
        properties: {
            phrases: {
                type: 'array',
                minItems: 1,
                items: {
                    type: 'object',
                    required: ['msg'],
                    properties: {
                        msg: {$ref: 'long_string'},
                        by: {$ref: 'short_ascii_string'},
                        ctx: {$ref: 'long_string'}
                    },
                    maxProperties: 3,
                }
            },
            ctx: {$ref: 'long_string'},
            date: { type: 'integer' },
        }
    })
})