import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface Props {
  defaultTranslations?: { [translationKey: string]: string };
  children: ReactNode;
}


export interface AppTypes {
  // tobe augmented with Lang: "en" | "it"
}

export type AppLang = AppTypes extends { lang: infer R } ? R : ""

type TranslationContext = {
  __GLOBAL__: { [translationKey: string]: string };
  [contextId: string]: Partial<
    Record<AppLang, { [translationKey: string]: string }>
  >;
};

const ctx = createContext<TranslationContext>({ __GLOBAL__: {} });
const setCtx = createContext<Dispatch<SetStateAction<TranslationContext>>>(
  () => { }
);

export const useTranslationsContext = () => useContext(ctx);
export const useSetTranslationsContext = () => useContext(setCtx);

export const TranslationsProvider = ({
  children,
  defaultTranslations = {},
}: Props) => {
  const [context, setContext] = useState<TranslationContext>({
    __GLOBAL__: defaultTranslations,
  });

  return (
    <ctx.Provider value={context}>
      <setCtx.Provider value={setContext}>{children}</setCtx.Provider>
    </ctx.Provider>
  );
};
