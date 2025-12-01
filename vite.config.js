import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3500,
    open: true,
  },
  build: {
    outDir: "_site",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: "./src/assets/js/main.js",
      },
    },
  },
});
