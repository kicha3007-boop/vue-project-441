<script setup>
import { blockTypes } from "../lib/blockTypes.js";
import { usePageStore } from "../stores/page.js";

const page = usePageStore();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="(type, name) in blockTypes"
      :key="name"
      type="button"
      :data-testid="`add-block-${name}`"
      class="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:border-blue-600 hover:text-blue-700"
      @click="page.addBlock(name)"
    >
      + {{ type.label }}
    </button>
  </div>
</template>
