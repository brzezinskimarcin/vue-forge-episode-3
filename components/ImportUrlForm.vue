<script setup lang="ts">
interface UrlForm {
  url: string;
  temperature: number;
}

const props = defineProps<UrlForm>();
const emit = defineEmits<{
  (e: 'submit', payload: UrlForm): void;
}>();

const form = ref({ ...props });
const temperatureLabel = computed(() => form.value.temperature > 0.5
  ? 'More random, creative and risky'
  : 'More focused, deterministic, and safe'
);

</script>

<template>
  <form @submit.prevent="emit('submit', form)">
    <div class="flex pb-4">
      <input
        v-model="form.url"
        placeholder="Full Article URL"
        class="input input-bordered rounded-r-none w-full"
        type="text"
      />
      <button
        :disabled="!form.url"
        class="btn rounded-l-none"
      >
        Generate announcements
      </button>
    </div>
    <input
      v-model.number="form.temperature"
      type="range"
      min="0"
      max="1"
      step=".1"
      class="range range-accent"
    />
    <span>
      Temperature: {{ form.temperature }} - {{ temperatureLabel }}
    </span>
  </form>
</template>
