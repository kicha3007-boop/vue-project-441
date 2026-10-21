<script setup>
import { blockTypes } from "../lib/blockTypes.js";
import { usePageStore } from "../stores/page.js";
import texts from "../texts.js";

const page = usePageStore();

const isSelected = (id) => page.selectedId === id;
</script>

<template>
  <p v-if="page.blocks.length === 0" class="text-sm text-slate-500">{{ texts.editor.noBlocks }}</p>
  <ol v-else class="space-y-2">
    <li
      v-for="(block, index) in page.blocks"
      :key="block.id"
      data-testid="block-item"
      :aria-current="isSelected(block.id) ? 'true' : undefined"
      class="flex items-center gap-2 rounded-md border px-3 py-2"
      :class="isSelected(block.id) ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white'"
    >
      <button
        type="button"
        data-testid="block-select"
        class="flex-1 text-left text-sm font-medium"
        @click="page.selectBlock(block.id)"
      >
        {{ index + 1 }}. {{ blockTypes[block.type].label }}
      </button>
      <button
        type="button"
        data-testid="block-move-up"
        :title="texts.editor.moveUp"
        :aria-label="texts.editor.moveUp"
        class="rounded border border-slate-300 px-2 text-sm disabled:opacity-30"
        :disabled="index === 0"
        @click="page.moveBlock(block.id, -1)"
      >
        ↑
      </button>
      <button
        type="button"
        data-testid="block-move-down"
        :title="texts.editor.moveDown"
        :aria-label="texts.editor.moveDown"
        class="rounded border border-slate-300 px-2 text-sm disabled:opacity-30"
        :disabled="index === page.blocks.length - 1"
        @click="page.moveBlock(block.id, 1)"
      >
        ↓
      </button>
      <button
        type="button"
        data-testid="block-remove"
        :title="texts.editor.remove"
        :aria-label="texts.editor.remove"
        class="rounded border border-slate-300 px-2 text-sm text-red-600"
        @click="page.removeBlock(block.id)"
      >
        ×
      </button>
    </li>
  </ol>
</template>
