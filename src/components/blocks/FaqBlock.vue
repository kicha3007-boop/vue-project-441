<script setup>
import { computed, inject } from "vue";

import { splitLines } from "../../lib/blockTypes.js";
import { themeKey } from "../../lib/theme.js";

const props = defineProps({
  fields: { type: Object, required: true },
});

const theme = inject(themeKey);
const paragraphs = computed(() => splitLines(props.fields.answer));
</script>

<template>
  <section class="py-6" data-testid="page-block" data-block-type="faq">
    <h3 class="text-xl font-semibold" :style="{ color: theme.palette.accent }">
      {{ fields.question }}
    </h3>
    <p v-for="(paragraph, index) in paragraphs" :key="index" class="mt-2 opacity-90">
      {{ paragraph }}
    </p>
  </section>
</template>
