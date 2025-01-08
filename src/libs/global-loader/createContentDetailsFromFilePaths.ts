import { ContentDetails, parseFileDetails } from "./parseFileDetails";

interface Params {
  rootDir: string,
  filePaths: string[],
  defaultLang: string,
  languages: string[],
  destinationFolder: string,
  alias?: (relativeImport: string) => string,
}



export const createContentDetailsFromFilePaths = ({
  rootDir,
  filePaths,
  defaultLang,
  languages,
  destinationFolder,
  alias,
}: Params) => {
  const contents = { [defaultLang]: [] as ContentDetails[] };

  filePaths.forEach((file, index) => {
    const details = parseFileDetails({
      rootDir,
      file,
      languages,
      destinationFolder,
      alias,
      index
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

