const { findTranslationPaths } = require("./findTranslationPaths");
const { createLockFile } = require("./createLockFile");

const {
  createContentDetailsFromFilePaths,
} = require("./createContentDetailsFromFilePaths");
const {
  shouldCreateTranslationFiles,
} = require("./shouldCreateTranslationFiles");
const { createTranslationFiles } = require("./createTranslationFiles");
const { createHookFile } = require("./createHookFile");
const { createIndexFile } = require("./createIndexFile");

const createGlobalTranslations = ({
  rootDir,
  destinationFolder,
  languages = [],
  defaultLang,
  alias,
}) => {
  if (rootDir === undefined) {
    console.log("rootDir must be a string");
    return;
  }

  const filePaths = findTranslationPaths(rootDir).filter(
    (file) => !file.startsWith(destinationFolder)
  );

  if (
    !shouldCreateTranslationFiles({
      rootDir,
      filePaths,
      defaultLang,
      languages,
    })
  )
    return;

  createLockFile({ rootDir, filePaths, defaultLang, languages });

  const contents = createContentDetailsFromFilePaths({
    rootDir,
    filePaths,
    defaultLang,
    languages,
    destinationFolder,
    alias,
  });

  createTranslationFiles({ contents, destinationFolder });
  createIndexFile({ defaultLang, destinationFolder });
  createHookFile(destinationFolder);

  // const isDev = process.env.NODE_ENV === "development";
};

const configure = ({
  rootDir,
  destinationFolder,
  languages = [],
  defaultLang,
  alias,
}) => {
  function loadTranslations() {
    return createGlobalTranslations({
      rootDir,
      destinationFolder,
      languages,
      defaultLang,
      alias,
    });
  }

  return { loadTranslations };
};

module.exports = { configure };
