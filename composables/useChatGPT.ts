import type { CreateChatCompletionResponse } from 'openai';
import type { AsyncState, ChatGPTRequest } from '@/types';

export function useChatGPT(type: ChatGPTRequest['type']) {
  const state = ref<AsyncState>(null);
  const error = ref<Error>();
  const data = ref<string>('');

  async function fetchResponse(body: Omit<ChatGPTRequest, 'type'>) {
    try {
      state.value = 'loading';
      error.value = undefined;
      data.value = '';

      const response = await $fetch<CreateChatCompletionResponse>('/api/ai', {
        method: 'POST',
        body: {
          type,
          ...body,
        }
      });

      if (!response.choices?.[0].message?.content) {
        throw new Error('Invalid API Response');
      }

      state.value = 'complete';
      data.value = response.choices?.[0].message?.content;
    } catch (err) {
      if (err instanceof Error) {
        state.value = 'error';
        error.value = err;
      }
    }
  }

  return { state, error, data, fetchResponse };
}
