import Hapi, { Request, ResponseToolkit } from '@hapi/hapi';

import { IncomingMessage, ReturnMessage } from '../models/message';
import { PostmanEchoResponse } from '../models/postman';
import { PostmanEcho } from '../services/postman-echo.service';

import { EnvVariables } from '../models/environment';

const env = process.env as unknown as EnvVariables;
const postmanService = new PostmanEcho();

export const postHandler: Hapi.Lifecycle.Method = async(request: Request, h: ResponseToolkit) => {
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
      const response: PostmanEchoResponse = await postmanService.callPostmanEcho(postmanUrl);
      const message: ReturnMessage = {
        postmanEcho: response,
        timestamp: Date.now(),
        env: env.ENV,
        version: env.VERSION
      };
      return h.response(message).code(200);
    } catch (e) {
      console.error('Error calling Postman: ', e);
      return h.response('Error calling Postman: ' + e).code(500);
    }
  }
}