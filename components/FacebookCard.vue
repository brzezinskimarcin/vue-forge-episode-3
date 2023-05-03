<script setup lang="ts">
import type { AsyncState } from "@/types";

const props = defineProps<{
  state: AsyncState;
  body: string;
  url: string;
  error?: Error;
}>();

const emit = defineEmits<{
  (e: 'update:body', payload: string): void;
  (e: 'generate'): void;
}>();

const { copy } = useClipboard();

const bodyModel = computed({
  get() {
    return props.body;
  },
  set(value) {
    emit('update:body', value || '');
  }
});

async function openFacebookPost() {
  await copy(bodyModel.value);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}`
  );
}
</script>

<template>
  <Card
    v-model:body="bodyModel"
    :state="state"
    :error="error"
    title="Facebook"
  >
    <div
      v-if="body.trim()"
      class="flex w-full justify-end items-center"
    >
      <div class="flex gap-4">
        <button class="btn btn-neutral" @click="emit('generate')">
          Regenerate
        </button>
        <button class="btn btn-accent" @click="openFacebookPost">
          Copy Text and Open Facebook
        </button>
      </div>
    </div>
  </Card>
</template>
