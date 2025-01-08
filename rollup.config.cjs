const typescript = require("rollup-plugin-typescript2");

module.exports = {
  input: {
    index: 'src/index.ts',  
    configure: 'src/configure.ts',  
  },
  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].js',
    },
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs',
    }
  ],
  plugins: [typescript({
    tsconfig: './tsconfig.json',
    clean: true, 
  })],
  external: ["react", "fs", "path"],
};
