<script setup lang="ts">
import type { AsyncState } from "@/types";

defineProps<{
  state: AsyncState;
  title: string;
  image: string;
  error?: Error;
}>();

const emit = defineEmits<{
  (e: 'generate'): void;
}>();

const gradients = [
  { from: 'rgba(0, 175, 153, 0.8)', to: 'rgba(144, 199, 63, 0.8)' },
  { from: 'rgba(178, 168, 203, 0.8)', to: 'rgba(254, 145, 115, 0.8)' },
  { from: 'rgba(154, 252, 247, 0.8)', to: 'rgba(110, 124, 250, 0.8)' },
  { from: 'rgba(213, 76, 127, 0.8)', to: 'rgba(237, 71, 88, 0.8)' },
];
</script>

<template>
  <Card
    :body="image"
    :state="state"
    :error="error"
    title="Images"
    empty-text="Import an article to generate a thumbnail"
  >
    <template #body>
      <div class="grid grid-cols-2 gap-4">
        <ImageCanvas
          v-for="(gradient, index) in gradients"
          :key="index"
          :title="title"
          :img="image"
          :gradient="gradient"
        />
      </div>
    </template>
    <div v-if="image && title" class="flex w-full justify-end items-center">
      <div class="flex gap-4">
        <button class="btn btn-accent" @click="emit('generate')">
          Regenerate
        </button>
      </div>
    </div>
  </Card>
</template>
