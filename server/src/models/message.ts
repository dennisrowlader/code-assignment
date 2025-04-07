export interface IncomingMessage {
  message: string
}

export interface ReturnMessage {
  message?: string,
  postmanEcho?: string,
  timestamp: number,
  env: string,
  version: string
}