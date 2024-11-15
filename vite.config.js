import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import { fileURLToPath, URL } from "url";
import antdvFix from 'vite-plugin-antdv-fix'
export default defineConfig({
  plugins: [vue(),antdvFix()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
