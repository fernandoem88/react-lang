const { terser } = require('rollup-plugin-terser'); // Example: Add other Rollup plugins if needed

module.exports = {
  rollup(config, options) {
    // Ensure TypeScript uses the latest version
    config.plugins = config.plugins.map(plugin => {
      if (plugin.name === 'typescript') {
        return require('@rollup/plugin-typescript')({
          tsconfig: './tsconfig.json', // Use your custom TypeScript config
          typescript: require('typescript'), // Point to the latest TypeScript version
        });
      }
      return plugin;
    });

    // Add custom plugins if needed
    if (options.format === 'cjs') {
      config.plugins.push(terser());
    }

    return config;
  },
};
