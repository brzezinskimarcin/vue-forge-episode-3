import { type CreateChatCompletionRequest, Configuration, OpenAIApi } from 'openai';

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateChatCompletionRequest['messages']>(event);
  const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: body,
    temperature: 1
  });

  return response.data;
});
