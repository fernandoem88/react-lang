import { createHook } from "../../dist"
import en from "./en"

// en is the default
export const useTranslations = createHook(en, (lang) => import(`./${lang}`))