import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, test } from "vitest";
import { nextTick } from "vue";

import { STORAGE_KEY, usePageStore } from "../src/stores/page.js";

const types = (page) => page.blocks.map((block) => block.type);

const freshStore = () => {
  setActivePinia(createPinia());
  return usePageStore();
};

describe("хранилище страницы", () => {
  let page;

  beforeEach(() => {
    page = freshStore();
  });

  test("добавленный блок получает поля по умолчанию и сразу выбран", () => {
    page.addBlock("hero");

    expect(page.blocks).toHaveLength(1);
    expect(page.blocks[0].fields.title).toBeTruthy();
    expect(page.selectedId).toBe(page.blocks[0].id);
    expect(page.selectedBlock).toBe(page.blocks[0]);
  });

  test("идентификаторы блоков не повторяются", () => {
    page.addBlock("hero");
    page.addBlock("cta");
    page.removeBlock(page.blocks[0].id);
    page.addBlock("features");

    const ids = page.blocks.map((block) => block.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("блоки меняются местами", () => {
    page.addBlock("hero");
    page.addBlock("features");
    page.addBlock("cta");

    page.moveBlock(page.blocks[2].id, -1);
    expect(types(page)).toEqual(["hero", "cta", "features"]);

    page.moveBlock(page.blocks[0].id, 1);
    expect(types(page)).toEqual(["cta", "hero", "features"]);
  });

  test("крайние блоки за границы списка не уходят", () => {
    page.addBlock("hero");
    page.addBlock("cta");

    page.moveBlock(page.blocks[0].id, -1);
    page.moveBlock(page.blocks[1].id, 1);

    expect(types(page)).toEqual(["hero", "cta"]);
  });

  test("удаление выбранного блока снимает выбор", () => {
    page.addBlock("hero");
    page.addBlock("cta");
    const selected = page.selectedId;

    page.removeBlock(selected);

    expect(types(page)).toEqual(["hero"]);
    expect(page.selectedId).toBeNull();
    expect(page.selectedBlock).toBeNull();
  });

  test("удаление другого блока выбор не трогает", () => {
    page.addBlock("hero");
    page.addBlock("cta");
    const selected = page.selectedId;

    page.removeBlock(page.blocks[0].id);

    expect(page.selectedId).toBe(selected);
  });

  test("правка поля меняет содержимое блока", () => {
    page.addBlock("hero");
    page.updateField(page.selectedId, "title", "Новый заголовок");

    expect(page.blocks[0].fields.title).toBe("Новый заголовок");
  });

  test("тема меняется только на известные значения", () => {
    page.setTheme("palette", "dark");
    page.setTheme("font", "comic");

    expect(page.theme).toEqual({ palette: "dark", font: "sans", width: "medium" });
  });

  test("начать заново очищает страницу", () => {
    page.addBlock("hero");
    page.setTheme("palette", "sand");

    page.reset();

    expect(page.blocks).toEqual([]);
    expect(page.selectedId).toBeNull();
    expect(page.theme.palette).toBe("light");
  });
});

describe("сохранение", () => {
  test("блоки и тема пишутся в localStorage и восстанавливаются", async () => {
    const page = freshStore();
    page.addBlock("hero");
    page.updateField(page.selectedId, "title", "Сохранилось");
    page.setTheme("palette", "sand");
    await nextTick();

    const restored = freshStore();

    expect(types(restored)).toEqual(["hero"]);
    expect(restored.blocks[0].fields.title).toBe("Сохранилось");
    expect(restored.theme.palette).toBe("sand");
    expect(restored.selectedId).toBeNull();
  });

  test("испорченная строка даёт пустую страницу", () => {
    localStorage.setItem(STORAGE_KEY, "{не json");

    const page = freshStore();

    expect(page.blocks).toEqual([]);
    expect(page.theme.palette).toBe("light");
  });

  test("чужие данные в хранилище отбрасываются", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ blocks: [{ id: 1, type: "unknown", fields: {} }, 5], theme: "dark" }),
    );

    const page = freshStore();

    expect(page.blocks).toEqual([]);
    expect(page.theme.palette).toBe("light");
  });

  test("недоступный localStorage приложение не роняет", async () => {
    const broken = () => {
      throw new Error("SecurityError");
    };
    globalThis.localStorage = { getItem: broken, setItem: broken };

    const page = freshStore();
    page.addBlock("cta");
    await nextTick();

    expect(types(page)).toEqual(["cta"]);
  });
});
