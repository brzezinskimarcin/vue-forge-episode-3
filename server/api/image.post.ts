import { Configuration, OpenAIApi } from 'openai';
import { UrlForm } from '@/types';

export default defineEventHandler(async (event) => {
  const { url } = await readBody<UrlForm>(event);
  const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      { role: 'user', content: 'Help me with generating prompt for DALL-E' },
      { role: 'user', content: `I would like to generate a prompt for thumbnail, based on this article: ${url}` },
    ],
  });
  const message = data?.choices[0].message?.content?.trim();

  if (!message) {
    throw new Error('Problem with generating DALL-E prompt');
  }

  const response = await openai.createImage({
    prompt: `salvador dali style, surrealism, impressionism, colorful background ${message}`,
    n: 1,
    size: '512x512'
  });
  const image = response.data.data[0].url;
  if (!image) {
    throw new Error('Problem with generating image');
  }
  const res = await $fetch(image, { responseType: 'arrayBuffer' }) as Buffer;
  const base64String = Buffer.from(res).toString('base64');

  return `data:image/jpeg;base64,${base64String}`;
});
