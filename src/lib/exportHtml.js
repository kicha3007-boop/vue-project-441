import { splitLines } from "./blockTypes.js";
import { resolveTheme } from "./theme.js";

// Амперсанд заменяется первым, иначе он испортит уже подставленные сущности.
export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const listItems = (text) => splitLines(text).map((line) => `<li>${escapeHtml(line)}</li>`);

const renderers = {
  hero: ({ title, subtitle }) =>
    [
      '<section class="block hero">',
      `  <h1>${escapeHtml(title)}</h1>`,
      `  <p class="lead">${escapeHtml(subtitle)}</p>`,
      "</section>",
    ].join("\n"),
  features: ({ heading, items }) =>
    [
      '<section class="block features">',
      `  <h2>${escapeHtml(heading)}</h2>`,
      "  <ul>",
      ...listItems(items).map((item) => `    ${item}`),
      "  </ul>",
      "</section>",
    ].join("\n"),
  cta: ({ text, buttonLabel }) =>
    [
      '<section class="block cta">',
      `  <h2>${escapeHtml(text)}</h2>`,
      `  <a class="button" href="#">${escapeHtml(buttonLabel)}</a>`,
      "</section>",
    ].join("\n"),
  faq: ({ question, answer }) =>
    [
      '<section class="block faq">',
      `  <h3>${escapeHtml(question)}</h3>`,
      ...splitLines(answer).map((line) => `  <p>${escapeHtml(line)}</p>`),
      "</section>",
    ].join("\n"),
};

const renderBlock = (block) => {
  const render = renderers[block.type];
  if (!render) {
    throw new Error(`Неизвестный тип блока: ${block.type}`);
  }
  return render(block.fields);
};

// Чистая функция: блоки и тема на входе, строка HTML на выходе.
export const exportHtml = (blocks, theme, title = "Лендинг") => {
  const { palette, font, width } = resolveTheme(theme);
  const body = blocks.map(renderBlock).join("\n");

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
  body { margin: 0; background: ${palette.background}; color: ${palette.text}; font-family: ${font.family}; }
  main { max-width: ${width.maxWidth}; margin: 0 auto; padding: 2rem 1rem; }
  .block { padding: 2rem 0; }
  h1, h2, h3 { color: ${palette.accent}; }
  .lead { font-size: 1.25rem; opacity: 0.8; }
  .button { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 0.5rem; background: ${palette.accent}; color: ${palette.background}; text-decoration: none; }
</style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>
`;
};
