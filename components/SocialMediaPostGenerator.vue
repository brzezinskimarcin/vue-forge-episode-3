<script setup lang="ts">
import type { UrlForm } from '@/types';

const route = useRoute();
const form = ref<UrlForm>({
  url: route.query.url as string || '',
  temperature: 1,
});

const {
  data: twitterBody,
  state: twitterState,
  error: twitterError,
  fetchResponse: fetchTwitterData
} = useChatGPT('twitterPost');

const {
  data: facebookBody,
  state: facebookState,
  error: facebookError,
  fetchResponse: fetchFacebookData
} = useChatGPT('facebookPost');

const {
  title,
  image,
  state: imagesState,
  error: imagesError,
  fetchResponse: fetchImagesData
} = useDallE();

async function fetchAllData(updatedForm: UrlForm) {
  form.value = { ...updatedForm };
  await Promise.all([
    fetchTwitterData(form.value),
    fetchFacebookData(form.value)
  ]);
  fetchImagesData(form.value);
}

onMounted(() => {
  if (!form.value.url || route.query.extension !== 'true') {
    return;
  }
  fetchAllData(form.value);
});
</script>

<template>
  <h1 v-if="route.query.extension !== 'true'" class="text-4xl my-10">Social Media Post Generator</h1>
  <ImportUrlForm v-if="route.query.extension !== 'true'" v-bind="form" @submit="fetchAllData" />
  <div class="mt-10 flex flex-col gap-10 mb-10">
    <TwitterCard
      v-model:body="twitterBody"
      :state="twitterState"
      :error="twitterError"
      @generate="fetchTwitterData(form)"
    />
    <FacebookCard
      v-model:body="facebookBody"
      :state="facebookState"
      :error="facebookError"
      :url="form.url"
      @generate="fetchFacebookData(form)"
    />
    <ImagesCard
      :image="image"
      :title="title"
      :state="imagesState"
      :error="imagesError"
      @generate="fetchImagesData(form)"
    />
  </div>
</template>
