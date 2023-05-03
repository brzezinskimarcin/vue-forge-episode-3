<script setup lang="ts">
import { nanoid } from "nanoid";
import { Message, User } from "@/types";

const { data, state, error, fetchResponse } = useChatGPT('customerSupport');

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
const usersTyping = computed(() => state.value === 'loading' ? [bot.value] : []);

async function handleNewMessage(message: Message) {
  messages.value.push(message);

  await fetchResponse({
    messages: messages.value.map((message) => ({
      role: 'user',
      content: message.text
    }))
  });

  if (data.value) {
    messages.value.push({
      id: nanoid(),
      userId: bot.value.id,
      createdAt: new Date(),
      text: data.value
    });
  }

  if (error.value) {
    messages.value.push({
      id: nanoid(),
      userId: bot.value.id,
      createdAt: new Date(),
      text: error.value.message
    });
  }
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
