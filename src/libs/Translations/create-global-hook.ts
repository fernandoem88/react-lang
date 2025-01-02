import { createHook } from './create-hook';
import type { AppLang } from './Provider';

export const createGlobalHook = <T extends Record<string, string>>(
  getTranslations: (lang: AppLang) => Promise<{ default: T }>
) => {
  return createHook<T>(null, getTranslations, { isGlobal: true });
};
