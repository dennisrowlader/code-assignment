'use strict';

import * as dotenv from 'dotenv';
dotenv.config();
import Hapi, { Server } from '@hapi/hapi';

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
      cors: true
    }
  });

  // Routes
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      console.log(request.query.test);
      return 'Hello World';
    }
  });

  server.route({
    method: 'POST',
    path: '/ping',
    handler: (request, h) => {
      const payload = request.payload as IncomingMessage;
      const environment = process.env.ENV;
      const version = process.env.VERSION;
      console.log('environment and version are ' + environment + ' and ' + version);
      const message: ReturnMessage = {
        message: payload.message,
        timestamp: Date.now(),
        env: env.ENV,
        version: env.VERSION
      }
      return message;
    }
  });

  return server;

  // await server.start();
  // 
};

export const start = async () => {
  console.log(`Server running on ${server.settings.host}:${server.settings.port}`);
  server.start();
}

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection');
  console.error(err);
  process.exit(1);
});

init().then(() => start()).catch((err) => console.error('Error while starting the server', err));