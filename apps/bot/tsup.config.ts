import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/main.ts"],
  splitting: false,
  outDir: "build",
  clean: true,
  target: ["es2020"],
  format: ["cjs"],
});
