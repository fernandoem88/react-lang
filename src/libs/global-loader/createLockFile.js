const { writeFileSync } = require("fs");
const path = require("path");

const LOCK_FILE = "translations-lock.js";

const createLockFile = ({ rootDir, filePaths, languages, defaultLang }) => {
  const cleanPaths = filePaths
    .map((file) => {
      const pathWithNoRoot = path.relative(rootDir, file);
      return pathWithNoRoot;
    })
    .sort();

  const sortedLanguages = [...languages].sort();

  const content = [
    `const defaultLang = "${defaultLang}";`,
    `const languages = ${JSON.stringify(sortedLanguages, null, 2)};`,
    `const filePaths = ${JSON.stringify(cleanPaths, null, 2)};`,
    "",
    "module.exports = { defaultLang, languages, filePaths };",
  ].join("\n");

  writeFileSync(LOCK_FILE, content, "utf8");
};

module.exports = { createLockFile, LOCK_FILE };
