const path = require("path");
const { existsSync } = require("fs");
const { LOCK_FILE } = require("./createLockFile");

const shouldCreateTranslationFiles = ({
  rootDir,
  filePaths,
  defaultLang,
  languages,
}) => {
  const relativeLockFile = path.resolve(rootDir, LOCK_FILE);
  if (!existsSync(relativeLockFile)) return true;

  const lock = require(relativeLockFile.replace(".js", ""));

  if (lock.defaultLang !== defaultLang) return true;

  const hasNewLanguages = [...languages]
    .sort()
    .some((lang, index) => lang !== lock.languages?.[index]);

  if (hasNewLanguages) return true;

  const hasSomeDiff = filePaths.sort().some((file, index) => {
    const pathWithNoRoot = path.relative(rootDir, file);
    return pathWithNoRoot !== lock.filePaths[index];
  });

  return hasSomeDiff;
};

module.exports = { shouldCreateTranslationFiles };
