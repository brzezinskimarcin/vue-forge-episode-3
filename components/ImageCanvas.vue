<script setup lang="ts">
import { toPng } from 'html-to-image';

defineProps<{
  title: string;
  img: string;
  gradient: { from: string; to: string };
}>();

const src = ref('');
const image = ref();
onMounted(() => nextTick(async () => {
  const url = await toPng(image.value);
  src.value = url;
}));
</script>

<template>
  <div ref="image" :class="{ hidden: src }">
    <div class="relative drop-shadow-md">
      <img :src="img" class="aspect-video object-cover"/>
      <p
        :style="{ background: `linear-gradient(to top, ${gradient.from}, ${gradient.to})` }"
        class="absolute bottom-0 flex items-center justify-center w-full px-3 py-6 min-h-[80px] text-lg font-bold text-white uppercase tracking-tighter"
      >
        <span class="scale-y-150">
          {{ title }}
        </span>
      </p>
    </div>
  </div>
  <img :src="src" />
</template>
