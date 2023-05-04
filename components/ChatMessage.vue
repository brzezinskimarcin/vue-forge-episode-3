<script setup lang="ts">
import Markdown from 'vue3-markdown-it';
import { Message, User } from '@/types';
import { useTimeAgo } from '@vueuse/core';

const props = defineProps<{
  author: User;
  message?: Message;
  mine?: boolean;
}>();
const createdAgo = useTimeAgo(() => props.message!.createdAt);
</script>

<template>
  <div :class="['chat', mine ? 'chat-end' : 'chat-start']">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="author.avatar" />
      </div>
    </div>
    <div class="chat-header pb-1">
      {{ author.name }}
      <time v-if="message" class="text-xs opacity-50">
        {{ createdAgo }}
      </time>
    </div>
    <div data-testid="chat-message-text" :class="['chat-bubble prose prose-sm py-0', mine ? 'bg-teal-200' : 'bg-teal-400']">
      <slot>
        <Markdown v-if="message" :source="message.text" />
      </slot>
    </div>
  </div>
</template>
