import * as dotenv from 'dotenv';
dotenv.config();
import { Request, ResponseToolkit, ServerRoute } from '@hapi/hapi';
import Joi from 'joi';

import { postHandler } from '../controllers/post.controller';

export const pingRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/ping',
    handler: postHandler,
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