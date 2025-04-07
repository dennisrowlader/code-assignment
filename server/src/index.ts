'use strict';

import * as dotenv from 'dotenv';
dotenv.config();
import Hapi, { Server } from '@hapi/hapi';
import HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Joi from 'joi';

import { IncomingMessage, ReturnMessage } from './models/message';
import { EnvVariables } from './models/environment';

const env = process.env as unknown as EnvVariables;

export let server: Server;

export const init = async () => {
  // Server details
  server = Hapi.server({
    port: env.PORT || 30000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  // Register swagger plugins
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Code Assignment API Documentation',
          version: '1.0.0',
        },
      },
    },
  ]);

  // Routes
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World';
    },
    options: {
      tags: ['api'],
      description: 'Returns a greeting message',
    },
  });

  server.route({
    method: 'POST',
    path: '/ping',
    handler: async(request, h) => {
      const payload = request.payload as IncomingMessage;
      if (request.query.mock && request.query.mock === true) {
        const message: ReturnMessage = {
          message: payload.message,
          timestamp: Date.now(),
          env: env.ENV,
          version: env.VERSION,
        };
        return h.response(message).code(200);
      } else {
        // Call postman echo
        const postmanUrl = `https://postman-echo.com/get?message=${payload.message}`;
        try {
          const response = await fetch(postmanUrl);
          // console.log('response => ', response);
          const data = await response.json();
          // console.log('data => ', data);
          const message: ReturnMessage = {
            postmanEcho: JSON.stringify(data),
            timestamp: Date.now(),
            env: env.ENV,
            version: env.VERSION
          };
          console.log('h.response => ', h.response(message));
          return h.response(message).code(200);
        } catch (e) {
          console.error('Error calling Postman: ', e);
          return h.response('Error calling Postman: ' + e).code(500);
        }
      }
    },
    options: {
      tags: ['api'],
      description:
        'Return the user message with timestamp, environment, and version',
      validate: {
        query: Joi.object({
          mock: Joi.boolean().optional(),
        }),
        payload: Joi.object({
          message: Joi.string().required().min(1).max(19).messages({
            'string.base': 'Message must be a string',
            'string.required': 'You must enter a message',
            'string.min': 'Message must be at least {#limit} characters',
            'string.max': 'Message must be at most {#limit} characters',
          }),
        }),
        failAction: (request, h, error) => {
          return h
            .response({ message: 'Validation failed', errors: error?.message })
            .code(400);
        },
      },
    },
  });

  return server;
};

export const start = async () => {
  console.log(
    `Server running on ${server.settings.host}:${server.settings.port}`
  );
  server.start();
};

process.on('unhandledRejection', err => {
  console.error('unhandledRejection');
  console.error(err);
  process.exit(1);
});

init()
  .then(() => start())
  .catch(err => console.error('Error while starting the server', err));
