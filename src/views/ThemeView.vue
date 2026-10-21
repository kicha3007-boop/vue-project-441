<script setup>
import PageCanvas from "../components/PageCanvas.vue";
import { themeOptions } from "../lib/theme.js";
import { usePageStore } from "../stores/page.js";
import texts from "../texts.js";

const page = usePageStore();
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[300px_1fr]">
    <aside class="space-y-6">
      <section v-for="(options, group) in themeOptions" :key="group">
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {{ texts.theme[group] }}
        </h2>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(option, name) in options"
            :key="name"
            type="button"
            :data-testid="`theme-${group}-${name}`"
            :aria-pressed="page.theme[group] === name"
            class="rounded-md border px-3 py-1.5 text-sm"
            :class="
              page.theme[group] === name
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-slate-300 bg-white'
            "
            @click="page.setTheme(group, name)"
          >
            {{ option.label }}
          </button>
        </div>
      </section>
    </aside>
    <section class="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      <PageCanvas :blocks="page.blocks" :theme="page.theme" />
    </section>
  </div>
</template>
