export interface IncomingMessage {
  message: string
}

export interface ReturnMessage {
  message: string,
  timestamp: number,
  env: string,
  version: string
}