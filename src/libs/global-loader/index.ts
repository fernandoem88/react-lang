import { findTranslationPaths } from "./findTranslationPaths";
import { createLockFile } from "./createLockFile";
import { createContentDetailsFromFilePaths } from "./createContentDetailsFromFilePaths";
import { shouldCreateTranslationFiles } from "./shouldCreateTranslationFiles";
import { createTranslationFiles } from "./createTranslationFiles";
import { createHookFile } from "./createHookFile";
import { createIndexFile } from "./createIndexFile";

interface Params {
  rootDir: string,
  destinationFolder: string,
  languages: string[],
  defaultLang: string,
  alias?: (relativeImport: string) => string,
}

const createGlobalTranslations = ({
  rootDir,
  destinationFolder,
  languages = [],
  defaultLang,
  alias,
}: Params) => {
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

export const configure = ({
  rootDir,
  destinationFolder,
  languages = [],
  defaultLang,
  alias,
}: Params) => {
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


