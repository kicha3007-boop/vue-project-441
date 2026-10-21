<script setup>
import { ref } from "vue";

import PageCanvas from "../components/PageCanvas.vue";
import { exportHtml } from "../lib/exportHtml.js";
import { usePageStore } from "../stores/page.js";
import texts from "../texts.js";

const page = usePageStore();
const output = ref("");

const runExport = () => {
  output.value = exportHtml(page.blocks, page.theme);
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center gap-4">
      <button
        type="button"
        data-testid="export-button"
        class="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        @click="runExport"
      >
        {{ texts.preview.export }}
      </button>
      <span class="text-sm text-slate-500">{{ texts.preview.hint }}</span>
    </div>
    <PageCanvas :blocks="page.blocks" :theme="page.theme" />
    <label v-if="output" class="block">
      <span class="mb-1 block text-sm text-slate-600">{{ texts.preview.output }}</span>
      <textarea
        data-testid="export-output"
        readonly
        rows="14"
        class="w-full rounded-md border border-slate-300 bg-white p-2 font-mono text-xs"
        :value="output"
      ></textarea>
    </label>
  </div>
</template>
