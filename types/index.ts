import { ChatCompletionRequestMessage } from "openai";

export interface User {
  id: string;
  avatar: string;
  name: string;
}
export interface Message {
  id: string;
  userId: string;
  createdAt: Date;
  text: string;
}
export type AsyncState = null | "loading" | "error" | "complete";

export interface CustomerSupport {
  type: 'customerSupport';
  messages: ChatCompletionRequestMessage[];
}

export interface UrlForm {
  url: string;
  temperature: number;
}

export type TwitterPost = UrlForm & {
  type: 'twitterPost';
  
}

export type FacebookPost = UrlForm & {
  type: 'facebookPost';
}

export type ChatGPTRequest = CustomerSupport | TwitterPost | FacebookPost;
