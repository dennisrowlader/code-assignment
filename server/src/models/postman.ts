export interface PostmanEchoResponse {
  args: {
    type: object;
    properties: {
      'message': string;
    };
  };
  headers: {
    type: object;
    properties: {
      'host': string;
      'x-request-start': string;
      'connection': string;
      'x-forwarded-proto': string;
      'x-forwarded-port': string;
      'x-amzn-trace-id': string;
      'accept': string;
      'accept-language': string;
      'sec-fetch-mode': string;
      'user-agent': string;
      'accept-encoding': string;
    };
  };
  url: string
}
