<script setup>
import { computed, inject } from "vue";

import { splitLines } from "../../lib/blockTypes.js";
import { themeKey } from "../../lib/theme.js";

const props = defineProps({
  fields: { type: Object, required: true },
});

const theme = inject(themeKey);
const items = computed(() => splitLines(props.fields.items));
</script>

<template>
  <section class="py-8" data-testid="page-block" data-block-type="features">
    <h2 class="text-2xl font-semibold" :style="{ color: theme.palette.accent }">
      {{ fields.heading }}
    </h2>
    <ul class="mt-4 list-disc space-y-1 pl-6">
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </section>
</template>
