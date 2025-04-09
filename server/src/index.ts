'use strict';

import * as dotenv from 'dotenv';
dotenv.config();
import Hapi, { Server } from '@hapi/hapi';
import HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import { EnvVariables } from './models/environment';
import { pingRoutes } from './routes/ping.route';

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

  server.route(pingRoutes);

  return server;
};

export const start = async () => {
  console.log(
    `Server running on ${server.settings.host}:${server.settings.port}`
  );
  await server.start();
};

process.on('unhandledRejection', err => {
  console.error('unhandledRejection');
  console.error(err);
  process.exit(1);
});

init()
  .then(() => start())
  .catch(err => console.error('Error while starting the server', err));
