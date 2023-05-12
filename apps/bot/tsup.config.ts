import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/main.ts"],
  dts: true,
  splitting: false,
  sourcemap: true,
  outDir: "build",
  clean: true,
  minify: true,
  target: ["es2022"],
  format: ["cjs"],
});
