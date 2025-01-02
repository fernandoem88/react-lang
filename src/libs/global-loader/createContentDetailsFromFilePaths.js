const { parseFileDetails } = require("./parseFileDetails");

const createContentDetailsFromFilePaths = ({
  rootDir,
  filePaths,
  defaultLang,
  languages,
  destinationFolder,
  alias,
}) => {
  const contents = { [defaultLang]: [] };

  filePaths.forEach((file) => {
    const details = parseFileDetails({
      rootDir,
      file,
      languages,
      destinationFolder,
      alias,
    });

    if (!details) {
      return;
    }

    const { lang } = details;

    const contentEntries = contents[lang] || [];
    contentEntries.push(details);
    contents[lang] = contentEntries;
  });

  return contents;
};

module.exports = { createContentDetailsFromFilePaths };
