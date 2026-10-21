import { createRouter, createWebHistory } from "vue-router";

import EditorView from "./views/EditorView.vue";
import HomeView from "./views/HomeView.vue";
import PreviewView from "./views/PreviewView.vue";
import ThemeView from "./views/ThemeView.vue";

export const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/editor", name: "editor", component: EditorView },
  { path: "/preview", name: "preview", component: PreviewView },
  { path: "/theme", name: "theme", component: ThemeView },
  { path: "/:pathMatch(.*)*", redirect: { name: "home" } },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
