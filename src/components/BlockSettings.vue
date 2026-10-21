<script setup>
import { computed } from "vue";

import { fieldsOf } from "../lib/blockTypes.js";
import { usePageStore } from "../stores/page.js";
import texts from "../texts.js";

const page = usePageStore();

const fields = computed(() => (page.selectedBlock ? fieldsOf(page.selectedBlock.type) : []));

const valueOf = (name) => page.selectedBlock.fields[name] ?? "";
const isEmpty = (name) => String(valueOf(name)).trim() === "";

const update = (name, event) => {
  page.updateField(page.selectedBlock.id, name, event.target.value);
};
</script>

<template>
  <p v-if="!page.selectedBlock" data-testid="no-selection" class="text-sm text-slate-500">
    {{ texts.settings.noSelection }}
  </p>
  <form v-else class="space-y-4" @submit.prevent>
    <div v-for="field in fields" :key="`${page.selectedBlock.id}-${field.name}`">
      <label :for="`field-${field.name}`" class="mb-1 block text-sm text-slate-600">
        {{ field.label }}
      </label>
      <textarea
        v-if="field.multiline"
        :id="`field-${field.name}`"
        :data-testid="`settings-field-${field.name}`"
        rows="4"
        class="w-full rounded-md border px-2 py-1"
        :class="isEmpty(field.name) ? 'border-red-500' : 'border-slate-300'"
        :value="valueOf(field.name)"
        @input="update(field.name, $event)"
      ></textarea>
      <input
        v-else
        :id="`field-${field.name}`"
        :data-testid="`settings-field-${field.name}`"
        type="text"
        class="w-full rounded-md border px-2 py-1"
        :class="isEmpty(field.name) ? 'border-red-500' : 'border-slate-300'"
        :value="valueOf(field.name)"
        @input="update(field.name, $event)"
      />
      <p
        v-if="isEmpty(field.name)"
        :data-testid="`settings-error-${field.name}`"
        class="mt-1 text-sm text-red-600"
      >
        {{ texts.settings.emptyError }}
      </p>
    </div>
  </form>
</template>
