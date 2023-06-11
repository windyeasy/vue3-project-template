import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const loadPath = (path) => {
  return fileURLToPath(new URL(path, import.meta.url));
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": loadPath("./src"),
    },
  },
});
