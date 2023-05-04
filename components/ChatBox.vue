<script setup lang="ts">
import type { Message, User } from '@/types';
import { nanoid } from 'nanoid';

const props = defineProps<{
  messages: Message[];
  users: User[];
  me: User;
  usersTyping?: User[];
}>();

const emit = defineEmits<{
  (e: 'newMessage', payload: Message): void;
}>();

const open = ref(false);
const messagesRef = ref();
const inputRef = ref();

function findAuthor({ userId }: Message) {
  return props.users.find(({ id }) => id === userId)!;
}

function addNewMessage(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement;
  emit('newMessage', {
    id: nanoid(),
    userId: props.me.id,
    createdAt: new Date(),
    text: input.value
  });
  input.value = '';
}

function scrollToBottom() {
  messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
}

watch(
  () => props.messages.length,
  () => nextTick(scrollToBottom)
);

watch(open, () => {
  if (!open.value) {
    return;
  }
  nextTick(() => {
    scrollToBottom();
    (inputRef.value as HTMLInputElement).focus();
  });
});

</script>

<template>
  <div>
    <div class="fixed bottom-4 right-4">
      <button
        v-if="!open"
        class="bg-teal-200 p-2 rounded-lg"
        data-testid="open-chat-button"
        @click="open = true"
      >
        <IconChat class="h-8 w-8" />
      </button>
      <div
        v-if="open"
        class="bg-teal-100 w-[400px] rounded-lg overflow-hidden"
        data-testid="chat-box"
      >
        <header
          class="bg-teal-300 p-4 flex justify-between items-center"
        >
          <span>
            Customer Support Chat
          </span>
          <button @click="open = false">
            <IconMinimize />
          </button>
        </header>
        <main class="p-4 overflow-y-auto max-h-[80vh]" ref="messagesRef">
          <div v-if="!messages.length" class="text-center w-[350px] m-auto">
            <strong class="text-lg">Chat with Botman!</strong>
            <p>Our A.I. powered assistant</p>
            <strong class="block mt-10">Go ahead and ask us something:</strong>
            <ul class="list-inside list-disc text-left">
              <li>What is social media post generator?</li>
              <li>How can I get human support?</li>
              <li>How was this tool built?</li>
            </ul>
          </div>
          <ChatMessage
            v-for="message in messages"
            :key="message.id"
            :author="findAuthor(message)"
            :message="message"
            :mine="message.userId === me.id"
            class="mb-2"
            data-testid="chat-message"
          />
          <ChatMessage
            v-for="user in usersTyping"
            :key="user.id"
            :author="user"
            >
            <AppLoading />
          </ChatMessage>
        </main>
        <footer class="p-4">
          <input
            ref="inputRef"
            class="input w-full"
            type="text"
            placeholder="Type your message"
            data-testid="chat-input"
            @keypress.enter="addNewMessage"
          />
        </footer>
      </div>
    </div>
  </div>
</template>
