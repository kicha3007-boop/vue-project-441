<script setup>
import { RouterLink, RouterView } from "vue-router";

import texts from "./texts.js";

const links = [
  { name: "home", testId: "nav-home", label: texts.nav.home },
  { name: "editor", testId: "nav-editor", label: texts.nav.editor },
  { name: "preview", testId: "nav-preview", label: texts.nav.preview },
  { name: "theme", testId: "nav-theme", label: texts.nav.theme },
];
</script>

<template>
  <div class="min-h-screen text-slate-900">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <span class="text-lg font-bold">{{ texts.appTitle }}</span>
        <nav class="flex gap-1">
          <RouterLink
            v-for="link in links"
            :key="link.name"
            :to="{ name: link.name }"
            :data-testid="link.testId"
            class="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
            exact-active-class="bg-slate-900 text-white hover:bg-slate-900"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-7xl px-6 py-6">
      <RouterView />
    </main>
  </div>
</template>
