const typescript = require("rollup-plugin-typescript2");

/*
"size-limit": [
  {
    "path": "dist/react-lang.cjs.production.min.js",
    "limit": "10 KB"
  },
  {
    "path": "dist/react-lang.esm.js",
    "limit": "10 KB"
  }
]
*/

module.exports = {
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
      entryFileNames: '[name].cjs', // Separate output for CommonJS
    }
  ],
  plugins: [typescript({
    tsconfig: './tsconfig.json',
    clean: true, // Clear cache
  })],
  external: ["react", "fs", "path"], // Prevent bundling React
};
