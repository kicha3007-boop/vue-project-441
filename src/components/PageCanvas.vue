<script setup>
import { computed, provide } from "vue";

import { blockComponents } from "../lib/blockComponents.js";
import { resolveTheme, themeKey } from "../lib/theme.js";
import texts from "../texts.js";

const props = defineProps({
  blocks: { type: Array, required: true },
  theme: { type: Object, required: true },
});

const resolved = computed(() => resolveTheme(props.theme));

// Тема раздаётся блокам через контекст, а не пропсами по цепочке.
provide(themeKey, resolved);

const canvasStyle = computed(() => ({
  backgroundColor: resolved.value.palette.background,
  color: resolved.value.palette.text,
  fontFamily: resolved.value.font.family,
}));
</script>

<template>
  <div data-testid="page-canvas" class="min-h-48 rounded-lg" :style="canvasStyle">
    <div class="mx-auto px-6 py-4" :style="{ maxWidth: resolved.width.maxWidth }">
      <p v-if="blocks.length === 0" data-testid="empty-page" class="py-12 text-center opacity-60">
        {{ texts.canvas.empty }}
      </p>
      <component
        :is="blockComponents[block.type]"
        v-for="block in blocks"
        :key="block.id"
        :fields="block.fields"
      />
    </div>
  </div>
</template>
