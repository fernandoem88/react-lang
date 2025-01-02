import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs", // CommonJS
    },
    {
      file: "dist/index.esm.js",
      format: "esm", // ESModule
    },
  ],
  plugins: [typescript({
    tsconfig: './tsconfig.json',
    clean: true, // Clear cache
  })],
  external: ["react"], // Prevent bundling React
};
