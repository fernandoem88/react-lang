import { writeFileSync } from "fs";
import path from "path";

export const LOCK_FILE = "translations-lock.js";

interface Params { rootDir: string, filePaths: string[], languages: string[], defaultLang: string }

export const createLockFile = ({ rootDir, filePaths, languages, defaultLang }: Params) => {
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

