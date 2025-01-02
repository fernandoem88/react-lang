import { existsSync, mkdirSync } from "fs";
import path from "path";

export const makeSureFileFolderExist = (destinationPath: string) => {
  const dirPath = path.dirname(destinationPath);
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
};

