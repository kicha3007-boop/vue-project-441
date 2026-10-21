<script setup>
import AddBlockButtons from "../components/AddBlockButtons.vue";
import BlockList from "../components/BlockList.vue";
import BlockSettings from "../components/BlockSettings.vue";
import PageCanvas from "../components/PageCanvas.vue";
import { usePageStore } from "../stores/page.js";
import texts from "../texts.js";

const page = usePageStore();
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[340px_1fr]">
    <aside class="space-y-6">
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {{ texts.editor.addBlock }}
        </h2>
        <AddBlockButtons />
      </section>
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {{ texts.editor.blocks }}
        </h2>
        <BlockList />
      </section>
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {{ texts.editor.settings }}
        </h2>
        <BlockSettings />
      </section>
    </aside>
    <section class="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      <PageCanvas :blocks="page.blocks" :theme="page.theme" />
    </section>
  </div>
</template>
