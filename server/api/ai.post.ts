import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const fineTuning: ChatCompletionRequestMessage[] = [
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
  }
];

export default defineEventHandler(async (event) => {
  const body = await readBody<ChatCompletionRequestMessage[]>(event);
  const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: fineTuning.concat(body),
    temperature: 1
  });

  return response.data;
});
