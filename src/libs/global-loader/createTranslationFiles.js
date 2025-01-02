const path = require("path");
const { writeFileSync } = require("fs");
const {
  createFileTextFromContentEntries,
} = require("./createFileTextFromContentEntries");
const { makeSureFileFolderExist } = require("./makeSureFileFolderExist");

const createTranslationFiles = ({ contents, destinationFolder }) => {
  const parsedContentEntries = Object.entries(contents).map((entry) => {
    const [lang, contentEntries] = entry;
    return {
      lang,
      content: createFileTextFromContentEntries(contentEntries, lang),
    };
  });

  parsedContentEntries.forEach(({ lang, content }) => {
    const destination = path.resolve(destinationFolder, `global/${lang}.ts`);
    makeSureFileFolderExist(destination);
    writeFileSync(destination, content, "utf8");
  });
};

module.exports = { createTranslationFiles };
