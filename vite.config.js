import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// Порт 8080 и host нужны проверке: она открывает собранное приложение
// по http://localhost:8080 из соседнего контейнера.
const server = { port: 8080, host: true, allowedHosts: true };

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server,
  preview: server,
  test: {
    environment: "jsdom",
    // Только свои тесты: браузерные проверки Хекслета написаны под Playwright.
    include: ["tests/**/*.test.js"],
    setupFiles: ["./tests/setup.js"],
  },
});
