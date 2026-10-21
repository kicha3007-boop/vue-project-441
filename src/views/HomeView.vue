<script setup>
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { usePageStore } from "../stores/page.js";
import texts from "../texts.js";

const page = usePageStore();
const router = useRouter();

const hasWork = computed(() => page.blockCount > 0);

const startOver = () => {
  page.reset();
  router.push({ name: "editor" });
};
</script>

<template>
  <section class="mx-auto max-w-2xl py-12 text-center">
    <h1 class="text-4xl font-bold text-slate-900">{{ texts.home.heading }}</h1>
    <p class="mt-4 text-lg text-slate-600">{{ texts.home.lead }}</p>
    <p v-if="hasWork" data-testid="saved-summary" class="mt-6 text-slate-700">
      {{ texts.home.summary(page.blockCount) }}
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink
        data-testid="start-building"
        :to="{ name: 'editor' }"
        class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        {{ hasWork ? texts.home.continue : texts.home.start }}
      </RouterLink>
      <button
        v-if="hasWork"
        type="button"
        data-testid="start-over"
        class="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium hover:border-slate-500"
        @click="startOver"
      >
        {{ texts.home.startOver }}
      </button>
    </div>
  </section>
</template>
