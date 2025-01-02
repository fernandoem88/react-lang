import { createHook } from './create-hook';

export const createGlobalHook = <T extends Record<string, string>>(
  getTranslations: (lang: any) => Promise<{ default: T }>
) => {
  return createHook<T>(null, getTranslations, { isGlobal: true });
};
