// Все значения оформления собраны здесь: компоненты и выгрузка берут их по имени.
export const palettes = {
  light: { label: "Светлая", background: "#ffffff", text: "#1f2933", accent: "#2563eb" },
  dark: { label: "Тёмная", background: "#111827", text: "#f3f4f6", accent: "#38bdf8" },
  sand: { label: "Песочная", background: "#f5ecd7", text: "#3f3422", accent: "#b45309" },
};

export const fonts = {
  sans: { label: "Без засечек", family: "'Helvetica Neue', Arial, sans-serif" },
  serif: { label: "С засечками", family: "Georgia, 'Times New Roman', serif" },
};

export const widths = {
  narrow: { label: "Узкая", maxWidth: "36rem" },
  medium: { label: "Средняя", maxWidth: "52rem" },
  wide: { label: "Широкая", maxWidth: "72rem" },
};

export const themeOptions = { palette: palettes, font: fonts, width: widths };

export const defaultTheme = () => ({ palette: "light", font: "sans", width: "medium" });

// Имена из темы превращаются в сами значения оформления.
export const resolveTheme = (theme) => ({
  palette: palettes[theme.palette] ?? palettes.light,
  font: fonts[theme.font] ?? fonts.sans,
  width: widths[theme.width] ?? widths.medium,
});

// Ключ для provide/inject: компонент страницы раздаёт тему, блоки её получают.
export const themeKey = Symbol("landing-theme");
