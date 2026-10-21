import { describe, expect, test } from "vitest";

import { defaultFields } from "../src/lib/blockTypes.js";
import { escapeHtml, exportHtml } from "../src/lib/exportHtml.js";
import { defaultTheme, palettes } from "../src/lib/theme.js";

const block = (id, type, fields = {}) => ({
  id,
  type,
  fields: { ...defaultFields(type), ...fields },
});

describe("escapeHtml", () => {
  test("заменяет все четыре символа", () => {
    expect(escapeHtml(`<a href="x">Tom & Jerry</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&lt;/a&gt;",
    );
  });

  test("амперсанд заменяется первым и не задваивается", () => {
    expect(escapeHtml("<")).toBe("&lt;");
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });
});

describe("exportHtml", () => {
  test("собирает документ с текстом блоков", () => {
    const html = exportHtml(
      [block(1, "hero", { title: "Курс по Vue" }), block(2, "cta", { buttonLabel: "Купить" })],
      defaultTheme(),
    );

    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain("<h1>Курс по Vue</h1>");
    expect(html).toContain("Купить");
    expect(html.indexOf("Курс по Vue")).toBeLessThan(html.indexOf("Купить"));
  });

  test("экранирует пользовательский текст", () => {
    const html = exportHtml([block(1, "hero", { title: "<b>жирно</b>" })], defaultTheme());

    expect(html).toContain("&lt;b&gt;жирно&lt;/b&gt;");
    expect(html).not.toContain("<b>жирно</b>");
  });

  test("пункты преимуществ разбиваются по строкам без пустых", () => {
    const html = exportHtml(
      [block(1, "features", { items: "Быстро\n\n  \nНадёжно" })],
      defaultTheme(),
    );

    expect(html.match(/<li>/g)).toHaveLength(2);
  });

  test("переносит оформление темы в стили", () => {
    const html = exportHtml([], { palette: "dark", font: "serif", width: "wide" });

    expect(html).toContain(palettes.dark.background);
    expect(html).toContain("Georgia");
    expect(html).toContain("72rem");
  });

  test("свой тип блока попадает в выгрузку", () => {
    const html = exportHtml([block(1, "faq", { question: "Есть доставка?" })], defaultTheme());

    expect(html).toContain("<h3>Есть доставка?</h3>");
  });

  test("неизвестный тип останавливает выгрузку с именем типа", () => {
    expect(() => exportHtml([{ id: 1, type: "gallery", fields: {} }], defaultTheme())).toThrow(
      /gallery/,
    );
  });
});
