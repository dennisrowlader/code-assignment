import { PostmanEchoResponse } from "./postman"

export interface IncomingMessage {
  message: string
}

export interface ReturnMessage {
  message?: string,
  postmanEcho?: PostmanEchoResponse,
  timestamp: number,
  env: string,
  version: string
}