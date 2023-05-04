<script setup lang="ts">
import type { AsyncState } from "@/types";

const MAX_LENGTH = 280;

const props = defineProps<{
  state: AsyncState;
  body: string;
  error?: Error;
}>();

const emit = defineEmits<{
  (e: 'update:body', payload: string): void;
  (e: 'generate'): void;
}>();

const bodyModel = computed({
  get() {
    return props.body;
  },
  set(value) {
    emit('update:body', value || '');
  }
});

const newPostURL = computed(() => `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.body)}`);

</script>

<template>
  <Card
    v-model:body="bodyModel"
    :state="state"
    :max-length="MAX_LENGTH"
    :error="error"
    title="Twitter"
    empty-text="Import an article to generate a tweet"
  >
    <div
      v-if="body.trim()"
      class="flex w-full justify-between items-center"
    >
      <div class="text-xs">
        Character Count:
        <strong>{{ body.length }}</strong> / {{  MAX_LENGTH }}
      </div>
      <div class="flex gap-4">
        <button class="btn btn-neutral" @click="emit('generate')">
          Regenerate
        </button>
        <a class="btn btn-accent" :href="newPostURL" target="_blank">
          Post
        </a>
      </div>
    </div>
  </Card>
</template>
