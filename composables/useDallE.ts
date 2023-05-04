import type { AsyncState, UrlForm } from '@/types';

export function useDallE() {
  const state = ref<AsyncState>(null);
  const error = ref<Error>();
  const image = ref<string>('');
  const title = ref<string>('');

  async function fetchResponse(body: Omit<UrlForm, 'temperature'>) {
    try {
      state.value = 'loading';
      error.value = undefined;
      image.value = '';

      const [img, heading] = await Promise.all([
        $fetch<string>('/api/image', {
          method: 'POST',
          body
        }),
        $fetch<string>('/api/scrape', {
          method: 'POST',
          body
        }),
      ]);

      image.value = img;
      title.value = heading;
      state.value = 'complete';
    } catch (err) {
      if (err instanceof Error) {
        state.value = 'error';
        error.value = err;
      }
    }
  }

  return { state, error, title, image, fetchResponse };
}
