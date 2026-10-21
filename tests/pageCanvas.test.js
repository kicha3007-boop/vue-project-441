import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import PageCanvas from "../src/components/PageCanvas.vue";
import { defaultFields } from "../src/lib/blockTypes.js";
import { palettes } from "../src/lib/theme.js";

const theme = { palette: "light", font: "sans", width: "medium" };

const block = (id, type, fields = {}) => ({
  id,
  type,
  fields: { ...defaultFields(type), ...fields },
});

const renderedTypes = (wrapper) =>
  wrapper.findAll('[data-testid="page-block"]').map((node) => node.attributes("data-block-type"));

describe("PageCanvas", () => {
  test("пустой список показывает заглушку", () => {
    const wrapper = mount(PageCanvas, { props: { blocks: [], theme } });

    expect(wrapper.find('[data-testid="empty-page"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-testid="page-block"]')).toHaveLength(0);
  });

  test("каждый блок рисуется компонентом своего типа по порядку", () => {
    const blocks = [block(1, "cta"), block(2, "hero"), block(3, "features"), block(4, "faq")];
    const wrapper = mount(PageCanvas, { props: { blocks, theme } });

    expect(wrapper.find('[data-testid="empty-page"]').exists()).toBe(false);
    expect(wrapper.findAll('[data-block-type="hero"]')).toHaveLength(1);
    expect(renderedTypes(wrapper)).toEqual(["cta", "hero", "features", "faq"]);
  });

  test("содержимое блока приходит из полей", () => {
    const blocks = [block(1, "features", { heading: "Плюсы", items: "Раз\n\nДва" })];
    const wrapper = mount(PageCanvas, { props: { blocks, theme } });

    expect(wrapper.text()).toContain("Плюсы");
    expect(wrapper.findAll("li")).toHaveLength(2);
  });

  test("тема задаёт фон страницы и доезжает до блоков", async () => {
    const wrapper = mount(PageCanvas, { props: { blocks: [block(1, "hero")], theme } });
    const canvas = () => wrapper.find('[data-testid="page-canvas"]').element;
    const headingColor = () => wrapper.find("h1").element.style.color;
    const lightAccent = headingColor();

    await wrapper.setProps({ theme: { ...theme, palette: "dark", font: "serif" } });

    expect(canvas().style.fontFamily).toContain("Georgia");
    expect(canvas().style.backgroundColor).not.toBe("");
    expect(headingColor()).not.toBe(lightAccent);
    expect(palettes.dark.accent).not.toBe(palettes.light.accent);
  });
});
