import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

import { defaultFields, isKnownType } from "../lib/blockTypes.js";
import { loadState, saveState } from "../lib/storage.js";
import { defaultTheme, themeOptions } from "../lib/theme.js";

export const STORAGE_KEY = "landing-builder";

const isBlock = (block) =>
  block !== null &&
  typeof block === "object" &&
  Number.isInteger(block.id) &&
  isKnownType(block.type) &&
  block.fields !== null &&
  typeof block.fields === "object";

// Сохранённое состояние принимается, только если похоже на настоящее.
// Иначе страница начинается пустой.
const restore = () => {
  const saved = loadState(STORAGE_KEY);
  const blocks = Array.isArray(saved?.blocks) ? saved.blocks.filter(isBlock) : [];
  const theme = defaultTheme();
  Object.keys(theme).forEach((key) => {
    const value = saved?.theme?.[key];
    if (Object.hasOwn(themeOptions[key], value)) {
      theme[key] = value;
    }
  });
  return {
    blocks: blocks.map((block) => ({
      ...block,
      fields: { ...defaultFields(block.type), ...block.fields },
    })),
    theme,
  };
};

export const usePageStore = defineStore("page", () => {
  const initial = restore();

  const blocks = ref(initial.blocks);
  const theme = ref(initial.theme);
  const selectedId = ref(null);

  const selectedBlock = computed(
    () => blocks.value.find((block) => block.id === selectedId.value) ?? null,
  );
  const blockCount = computed(() => blocks.value.length);

  const nextId = () => blocks.value.reduce((max, block) => Math.max(max, block.id), 0) + 1;
  const indexOf = (id) => blocks.value.findIndex((block) => block.id === id);

  const addBlock = (type) => {
    const block = { id: nextId(), type, fields: defaultFields(type) };
    blocks.value.push(block);
    selectedId.value = block.id;
  };

  const selectBlock = (id) => {
    selectedId.value = id;
  };

  const moveBlock = (id, offset) => {
    const from = indexOf(id);
    const to = from + offset;
    if (from === -1 || to < 0 || to >= blocks.value.length) {
      return;
    }
    const [block] = blocks.value.splice(from, 1);
    blocks.value.splice(to, 0, block);
  };

  const removeBlock = (id) => {
    blocks.value = blocks.value.filter((block) => block.id !== id);
    if (selectedId.value === id) {
      selectedId.value = null;
    }
  };

  const updateField = (id, name, value) => {
    const block = blocks.value.find((item) => item.id === id);
    if (block) {
      block.fields[name] = value;
    }
  };

  const setTheme = (key, value) => {
    if (Object.hasOwn(themeOptions[key] ?? {}, value)) {
      theme.value[key] = value;
    }
  };

  const reset = () => {
    blocks.value = [];
    theme.value = defaultTheme();
    selectedId.value = null;
  };

  // Единственное место записи: любое действие хранилища попадает в сохранение само.
  watch(
    [blocks, theme],
    () => saveState(STORAGE_KEY, { blocks: blocks.value, theme: theme.value }),
    { deep: true },
  );

  return {
    blocks,
    theme,
    selectedId,
    selectedBlock,
    blockCount,
    addBlock,
    selectBlock,
    moveBlock,
    removeBlock,
    updateField,
    setTheme,
    reset,
  };
});
