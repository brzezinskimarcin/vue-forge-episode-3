<script setup lang="ts">
import type { CreateChatCompletionResponse } from "openai";
import { Message, User } from "~~/types";

const me = ref<User>({
  id: "user",
  avatar: "/avatar.jpg",
  name: "You",
});
const bot = ref<User>({
  id: "assistant",
  avatar: "/bot.jpg",
  name: "Botman",
});

const users = computed(() => [me.value, bot.value]);

const messages = ref<Message[]>([]);
const usersTyping = ref<User[]>([]);

async function handleNewMessage(message: Message) {
  messages.value.push(message);
  usersTyping.value.push(bot.value);

  const response = await $fetch<CreateChatCompletionResponse>('/api/ai', {
    method: 'POST',
    body: messages.value.map((message) => ({
      role: 'user',
      content: message.text
    }))
  });
  const messageFromApi = response.choices?.[0].message?.content;

  if (messageFromApi) {
    messages.value.push({
      id: response.id,
      userId: bot.value.id,
      createdAt: new Date(),
      text: messageFromApi
    });
  }
  usersTyping.value = [];
}
</script>

<template>
  <ChatBox
    :me="me"
    :users="users"
    :messages="messages"
    @new-message="handleNewMessage"
    :usersTyping="usersTyping"
  />
</template>
