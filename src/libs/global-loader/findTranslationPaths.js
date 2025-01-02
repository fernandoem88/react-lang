const { readdirSync } = require("fs");
const path = require("path");

/**
 * Recursively find all root folder paths named "__trans__".
 * @param {string} rootDirname - The root directory from where to start looking for translations.
 * @returns {string[]} - Array of root folder paths.
 * @example
 * const projectDir = path.resolve(__dirname, "src");
 * const transFolders = findTransFolders(projectDir);
 * console.log("translation root folders:", transFolders);
 */
function findTranslationPaths(dirname) {
  let results = [];

  // Read the contents of the current directory
  const list = readdirSync(dirname, { withFileTypes: true });

  for (const entry of list) {
    const fullPath = path.join(dirname, entry.name);

    // If it's a directory and named "__trans__", add it to results
    if (entry.isDirectory() && entry.name === "__trans__") {
      const filesInTrans = readdirSync(fullPath);
      results.push(...filesInTrans.map((file) => path.join(fullPath, file)));
    } else if (entry.isDirectory()) {
      // If it's another directory, recurse into it
      results.push(...findTranslationPaths(fullPath));
    }
  }

  return results;
}

module.exports = { findTranslationPaths };
