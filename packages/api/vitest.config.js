import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: "./src/test-utils/setup.ts",
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
