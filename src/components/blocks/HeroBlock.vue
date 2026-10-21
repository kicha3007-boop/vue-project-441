<script setup>
import { inject } from "vue";

import { themeKey } from "../../lib/theme.js";

defineProps({
  fields: { type: Object, required: true },
});

const theme = inject(themeKey);
</script>

<template>
  <section class="py-10" data-testid="page-block" data-block-type="hero">
    <h1 class="text-4xl font-bold" :style="{ color: theme.palette.accent }">
      {{ fields.title }}
    </h1>
    <p class="mt-3 text-lg opacity-80">{{ fields.subtitle }}</p>
  </section>
</template>
