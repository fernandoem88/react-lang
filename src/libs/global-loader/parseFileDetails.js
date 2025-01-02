const { readFileSync } = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const getLangFromFile = (file) => {
  return file
    .split("/")
    .pop()
    .replace(/(\.ts|\.js)$/, "");
};

const getFileContext = (file) => {
  const translations = readFileSync(file, { encoding: "utf-8" });
  const context = translations
    .split("\n")
    .find((line) => /^\"context:.*\"/.test(line))
    ?.split(":")[1]
    ?.replace(/\".*/, "");

  return context;
};

const getRelativePathToDestinationFolder = ({
  rootDir,
  file,
  destinationFolder,
  alias = "",
}) => {
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

const parseFileDetails = ({
  rootDir,
  file,
  destinationFolder,
  languages,
  alias,
}) => {
  const lang = getLangFromFile(file);

  if (!languages.includes(lang)) return;

  const id = uniqid().replace("-", "_");
  const relativePath = getRelativePathToDestinationFolder({
    rootDir,
    file,
    destinationFolder,
    alias,
  });

  const context = getFileContext(file);

  const key = lang.replaceAll("-", "_") + id;

  const item = { lang, relativePath, key, context };

  return item;
};

module.exports = { parseFileDetails };
