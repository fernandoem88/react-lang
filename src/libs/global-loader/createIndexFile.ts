import path from "path";
import { makeSureFileFolderExist } from "./makeSureFileFolderExist";
import { writeFileSync } from "fs";

interface Params { defaultLang: string, destinationFolder: string }

export const createIndexFile = ({ defaultLang, destinationFolder }: Params) => {
  const defaultLangKey = defaultLang.replace("-", "_");

  const indexFileText = [
    "// autogenerated: exporting default lang",
    "",
    `import ${defaultLangKey} from "./${defaultLang}";`,
    "",
    `export const DEFAULT_TRANSLATIONS = ${defaultLangKey};`,
    "",
    "export type ITranslations = typeof DEFAULT_TRANSLATIONS",
  ].join("\n");

  const destination = path.resolve(destinationFolder, "global/index.ts");

  makeSureFileFolderExist(destination);
  writeFileSync(destination, indexFileText, "utf8");
};
