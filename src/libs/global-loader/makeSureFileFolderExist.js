const { existsSync, mkdirSync } = require("fs");
const path = require("path");

const makeSureFileFolderExist = (destinationPath) => {
  const dirPath = path.dirname(destinationPath);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

module.exports = { makeSureFileFolderExist };
