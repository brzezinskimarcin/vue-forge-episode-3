<script setup lang="ts">
import type { AsyncState } from "@/types";

const props = defineProps<{
  state: AsyncState;
  title: string;
  body: string;
  maxLength?: number;
  error?: Error;
}>();

const emit = defineEmits<{
  (e: 'update:body', payload: string): void;
}>();

const textarea = ref();

function handleUpdateBody(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:body', input.value);
}

watch(
  () => props.body,
  () => {
    nextTick(() => {
      if (!textarea.value) return;
      textarea.value.style.height = `${Math.min(textarea.value.scrollHeight, 320)}px`;
    });
  }
);

</script>

<template>
  <div class="card shadow-xl border-t-4 border-accent">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <div class="mb-4 mt-2">
        <AppLoading v-if="state === 'loading'" />
        <p v-else-if="state === 'error'" class="text-red-500 text-sm font-normal">
          {{ error?.message }}
        </p>
        <p v-else-if="!body" class="italic opacity-80">
          Import an article to generate an announcement
        </p>
        <textarea
          v-else
          :maxlength="maxLength"
          :value="body"
          ref="textarea"
          class="w-full textarea textarea-bordered font-sans text-lg resize-none p-2"
          @input="handleUpdateBody"
        />
      </div>
      <div class="card-actions justify-end">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
