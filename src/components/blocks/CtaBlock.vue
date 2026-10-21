<script setup>
import { inject } from "vue";

import { themeKey } from "../../lib/theme.js";

defineProps({
  fields: { type: Object, required: true },
});

const theme = inject(themeKey);
</script>

<template>
  <section class="py-10 text-center" data-testid="page-block" data-block-type="cta">
    <h2 class="text-2xl font-semibold">{{ fields.text }}</h2>
    <span
      class="mt-4 inline-block rounded-lg px-6 py-3 font-medium"
      :style="{ backgroundColor: theme.palette.accent, color: theme.palette.background }"
    >
      {{ fields.buttonLabel }}
    </span>
  </section>
</template>
