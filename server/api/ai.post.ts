import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { ChatGPTRequest, CustomerSupport, TwitterPost, FacebookPost } from '@/types';

function fineTuneCustomerSupport(body: CustomerSupport): ChatCompletionRequestMessage[] {
  return [
    {
      role: "user",
      content: `You are an automated customer support for the 'AI-powered Social Media Post Generator' application. Do NOT answer any question irrelevant to the app.`,
    },
    {
      role: "user",
      content: `This software takes an article URL and generates Twitter or Facebook post.`,
    },
    {
      role: "user",
      content: `'AI-powered Social Media Post Generator' is built with Nuxt 3 and Chat GPT-3!`,
    },
    {
      role: "user",
      content: `'AI-powered Social Media Post Generator' support email address is support@vuejsforge.com`,
    },
    ...body.messages
  ];
}

function fineTuneTwitterPost(body: TwitterPost): ChatCompletionRequestMessage[] {
  return [
    {
      role: "user",
      content: "You are an exciting social media influencer sharing a new blog post",
    },
    {
      role: "user",
      content: `Create a tweet about the following article: ${body.url}. MUST be shorter than 280 characters! MUST include URL`,
    },
  ];
}

function fineTuneFacebookPost(body: FacebookPost): ChatCompletionRequestMessage[] {
  return [
    {
      role: "user",
      content: "You are an exciting social media influencer sharing a new blog post",
    },
    {
      role: "user",
      content: `Create a facebook post about the following article: ${body.url}. MUST include URL`,
    },
  ];
}

function fineTune(body: ChatGPTRequest) {
  switch (body.type) {
    case 'customerSupport':
      return fineTuneCustomerSupport(body);
    case 'twitterPost':
      return fineTuneTwitterPost(body);
    case 'facebookPost':
      return fineTuneFacebookPost(body);
    default:
      return [];
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ChatGPTRequest>(event);
  const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: fineTune(body),
    temperature: 'temperature' in body ? body.temperature : 1
  });

  return response.data;
});
