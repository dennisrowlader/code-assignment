import * as dotenv from 'dotenv';
dotenv.config();
import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import Joi from 'joi';

import { IncomingMessage, ReturnMessage } from '../models/message';
import { EnvVariables } from '../models/environment';

const env = process.env as unknown as EnvVariables;

export const pingRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/ping',
    handler: async(request: Request, h: ResponseToolkit) => {
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
        failAction: (request: Request, h: ResponseToolkit, error: any) => {
          return h
            .response({ message: 'Validation failed', errors: error?.message })
            .code(400)
            .takeover();
        },
      },
    },
  }
];