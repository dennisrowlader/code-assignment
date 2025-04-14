import { PostmanEchoResponse } from "../models/postman";

export class PostmanEcho {
  async callPostmanEcho(postmanUrl: string): Promise<PostmanEchoResponse> {
    const response = await fetch(postmanUrl);
          const data: PostmanEchoResponse = await response.json();
          return data;
  }
}