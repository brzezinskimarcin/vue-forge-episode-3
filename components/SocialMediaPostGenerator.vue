<script setup lang="ts">
import type { UrlForm } from '@/types';

const form = ref<UrlForm>({
  url: '',
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

function fetchAllData(updatedForm: UrlForm) {
  form.value = { ...updatedForm };
  fetchTwitterData(form.value);
  fetchFacebookData(form.value);
}
</script>

<template>
  <h1 class="text-4xl my-10">Social Media Post Generator</h1>
  <ImportUrlForm v-bind="form" @submit="fetchAllData" />
  <div class="mt-10 flex flex-col gap-10">
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
    <!-- Images Card Here -->
  </div>
</template>
