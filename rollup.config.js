import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  input: {
    index: 'src/index.ts',  // Entry for the index library
    configure: 'src/configure.ts',  // Entry for the configure module
  },
  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].js', // Output each entry as a separate file
    },
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs.js', // Separate output for CommonJS
    }
  ],
//   output: [
//     {
//       file: "dist/index.js",
//       format: "cjs", // CommonJS
//     },
//     {
//       file: "dist/index.esm.js",
//       format: "esm", // ESModule
//     },
//     {
//         file: "dist/configure.js",
//         format: "cjs", // CommonJS
//     },
//     {
//         file: "dist/configure.esm.js",
//         format: "esm", // ESModule
//     },
//   ],
  plugins: [typescript({
    tsconfig: './tsconfig.json',
    clean: true, // Clear cache
  })],
  external: ["react"], // Prevent bundling React
};
