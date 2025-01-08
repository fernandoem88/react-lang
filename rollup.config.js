import typescript from "rollup-plugin-typescript2";

const index = {
  input: {
    index: 'src/index.ts',  // Entry for the index library
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
  plugins: [typescript({
    tsconfig: './tsconfig.json',
    clean: true, // Clear cache
  })],
  external: ["react", "fs", "path"], // Prevent bundling React
}

const configure = {
  input: {
    configure: 'src/configure.ts',  // Entry for the configure module
  },
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs.js', // Separate output for CommonJS
    }
  ],
 
  plugins: [typescript({
    tsconfig: './tsconfig.json',
    clean: true, // Clear cache
  })],
  external: ["react", "fs", "path"], // Prevent bundling React
}

export default [
  index, configure
]

// export default {
//   // input: "src/index.ts",
//   input: {
//     index: 'src/index.ts',  // Entry for the index library
//     // configure: 'src/configure.ts',  // Entry for the configure module
//   },
//   output: [
//     {
//       dir: 'dist',
//       format: 'esm',
//       sourcemap: true,
//       entryFileNames: '[name].js', // Output each entry as a separate file
//     },
//     {
//       dir: 'dist',
//       format: 'cjs',
//       sourcemap: true,
//       entryFileNames: '[name].cjs.js', // Separate output for CommonJS
//     }
//   ],
//   // output: [
//   //   {
//   //     file: "dist/index.js",
//   //     format: "cjs", // CommonJS
//   //   },
//   //   {
//   //     file: "dist/index.esm.js",
//   //     format: "esm", // ESModule
//   //   },
//   // ],
//   plugins: [typescript({
//     tsconfig: './tsconfig.json',
//     clean: true, // Clear cache
//   })],
//   external: ["react", "fs", "path"], // Prevent bundling React
// };
