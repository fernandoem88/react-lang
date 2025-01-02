import { useEffect, useRef } from 'react';
import {
  type AppLang,
  useSetTranslationsContext,
  useTranslationsContext,
} from './Provider';
import { getStringReplacer } from '../getStringReplacer';
import { getUniqId } from '../getUniqId';
import { GetStringReplacerArgs } from '../../types';

const replacer = getStringReplacer('{{ ', ' }}');



export const createHook = <T extends Record<string, string>>(
  injectedTranslations: T | null,
  getTranslations: (en: AppLang) => Promise<{ default: T }>,
  options?: { isGlobal: boolean }
) => {
  const key = getUniqId(options?.isGlobal ? 'global-trans-' : 'partial-trans-');
  const useTrans = (lang: AppLang) => {
    const ctx = useTranslationsContext();
    const nthContext = ctx[key] ?? {};
    const defaultTrans = (injectedTranslations || ctx.__GLOBAL__ || {}) as T;

    const setContext = useSetTranslationsContext();
    const prevLang = useRef(lang);

    const trans = nthContext[lang] as T | undefined;
    const existInContext = !!trans;
    const [translationsRootName] = Object.keys(defaultTrans);

    useEffect(() => {
      if (existInContext) {
        prevLang.current = lang;
        return;
      }

      const timeout = setTimeout(async () => {
        try {
          const data = (await getTranslations(lang)).default;
          prevLang.current = lang;

          if (!timeout) return;

          setContext(context => {
            const prevTranslations = context[key] ?? {};

            const prevTranslationsInLang = prevTranslations[lang];

            return {
              ...context,
              [key]: {
                ...prevTranslations,
                [lang]: { ...prevTranslationsInLang, ...data },
              },
            };
          });
        } catch (error) {
          if (options?.isGlobal) {
            console.log(
              `global translations not found for ${lang}!`,
              `make sure it is set in the list of languages when initializing the "loadTranslations" configurator`
            );
            return;
          }

          const [context] = translationsRootName.split('.');
          console.log(
            `translations not found for ${lang} - check translations "${context}."`
          );
        }

        return () => clearTimeout(timeout);
      }, 0);
    }, [lang, existInContext, translationsRootName, setContext]);

    type GetParams<K extends keyof T> = GetStringReplacerArgs<
      T[K],
      '{{ ',
      ' }}',
      ' }}'
    >;

    const getSelectedTransalations = () => {
      // current translations with initial keys
      if (trans) return { ...defaultTrans, ...trans };
      // persisted or previous translations
      const previous = (nthContext[prevLang.current] || {}) as T;

      return { ...defaultTrans, ...previous };
    };

    const t = <K extends keyof T>(key: K, ...args: GetParams<K>) => {
      const translationText = getSelectedTransalations()[key];
      if (trans && !trans?.[key]) {
        console.log(`${lang}: missing "${key as string}"`);
      }
      const placeholder = ''; // key
      return replacer(translationText ?? placeholder, ...args);
    };

    return t;
  };

  return useTrans;
};
