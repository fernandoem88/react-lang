import { ContentDetails } from "./parseFileDetails";
import path from "path";
import { writeFileSync } from "fs";
import { createFileTextFromContentEntries } from "./createFileTextFromContentEntries";
import { makeSureFileFolderExist } from "./makeSureFileFolderExist";

interface Params { contents: Record<string, ContentDetails[]>, destinationFolder: string }

export const createTranslationFiles = ({ contents, destinationFolder }: Params) => {
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

