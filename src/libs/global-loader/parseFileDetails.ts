import { readFileSync } from "fs";
import path from "path";


const getLangFromFile = (file: string) => {
  return file
    .split("/")
    .pop()?.replace(/(\.ts|\.js)$/, "") ?? "";
};

const getFileContext = (file: string) => {
  const translations = readFileSync(file, { encoding: "utf-8" });
  const context = translations
    .split("\n")
    .find((line) => /^\"context:.*\"/.test(line))
    ?.split(":")[1]
    ?.replace(/\".*/, "");

  return context;
};

interface Params {

  rootDir: string,
  file: string,
  destinationFolder: string,
  alias?: (relativeImport: string) => string,
}

const getRelativePathToDestinationFolder = ({
  rootDir,
  file,
  destinationFolder,
  alias,
}: Params) => {
  if (alias) {
    const relativeToRoot = path
      .relative(rootDir, file)
      .replace(/(\.ts|\.js)$/, "")
      .replace(/^[^a-zA-Z0-9-_]+/g, "");

    return alias(relativeToRoot);
  }

  const globalFolder = path.join(destinationFolder, "global");
  const relativePath = path.relative(globalFolder, file);

  return relativePath.replace(/(\.ts|\.js)$/, "");
};

export interface ContentDetails {
  lang: string;
  relativePath: string;
  key: string;
  context: string | undefined;

}

export const parseFileDetails = ({
  rootDir,
  file,
  destinationFolder,
  languages,
  alias,
  index
}: Params & { index: number, languages: string[] }): ContentDetails | null => {
  const lang = getLangFromFile(file);

  if (!languages.includes(lang)) return null;

  // const id = getUniqId("_");
  const relativePath = getRelativePathToDestinationFolder({
    rootDir,
    file,
    destinationFolder,
    alias,
  });

  const context = getFileContext(file);

  const key = lang.replaceAll("-", "_") + index;

  const item = { lang, relativePath, key, context };

  return item;
};

