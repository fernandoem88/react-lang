# Introduction

this is a fully typed react library for translations.


# Local Usage

first of all, define your languages set type by using the typescript augmentation approach in a  definition file eg: __types.d.ts__

```ts
declare module "react-lang" {
  export interface AppTypes {
    lang: "en" | "fr" | "it" // add whatever you want
  }
}
```

Define a folder where to put your translations _\_\_trans\_\__

- _/en.ts_

```ts
// export it as const to ensure the types
// this will be the translations set for en (English)
export default {
  "header.label.title": "Introduction To This Library",
  // any keyword should be defined within a double curly-brackets {{ keyword }}
  "header.text.hello-you": "Hello, my name is {{ name }}",
} as const
```

you can define other translations at the same way for _fr_, _it_, etc.
Note:  this is not mandatory. 

- _/fr.ts_
```ts
// for french
export default {
  "header.label.title": "Introduction à cette librairie.",
  "header.text.hello-you": "Bonjour, je m'appelle {{ name }}",
} as const
```

- _/it.ts_

```ts
// for italian
export default {
  "header.label.title": "Introduzione alla libreria.",
  "header.text.hello-you": "Buongiorno, mi chiamo {{ name }}",
} as const
```



now define the local hook to use for translation: _useMyTranslations.ts_

```ts
import { createHook } from "react-lang"
import en from "./__trans__/en"

// en will be used as the default translations dictionary.

export const useMyTranslations = createHook(en, (lang) => import(`./__trans__/${lang}`))
```

## Component With Translations

let's define now a component that will consume the defined translations

```tsx
import { useState } from "react"
import { type AppLang } from 'react-lang';

import { useMyTranslations } from "./useMyTranslations"

export const Header = () => {
  const [lang, setLang] = useState<AppLang>("en")
  const t = useMyTranslations(lang)

  const countryElement = <strong>{t("country.italy")}</strong>

  const StrongName = <strong>Fernando Ekutsu Mondele</strong>
  
  return (
    <header>
      <label>
        {t("header.label.title")}
      </label>
      <p>{t("header.text.hello-you", { name: MyName })}</p>
      <YourCustomLanguageSelector lang={lang} onChange={lang => setLang(lang)}/>
    </header>
  )
}

```



# Provider

the translations provider must be set in order to access the context

```tsx
import { TranslationsProvider } from 'react-lang';
import { Header } from "./Header"

export const Root = () => {
  return (
    <TranslationsProvider>
      <Header />
    </TranslationsProvider>
  )
}
```


# Global Usage

now let's say, we have 2 components with common translations, instead of defining useTRanslation1 and useTranslation2, we can define directly a global translation hook to use every where in the project.



## Configuration

in order to have a global _useTranslations_ hook, we need to configure the context when building the project, for eg in a _Nextjs_ project, it should be implemented in _next.config.js_.

```js

const { configure: configureReactLang } = require("react-lang")

const transContext = configureReactLang({
  defaultLang: "en",
  rootDir: __dirname,
  // the folder where the translations will be combined
  destinationFolder: "src/translations",
  languages: [ "de", "en", "es", "fr", "it"], // whatever you want
  // optional alias in order to convert
  alias: (file) => `@/${file.replace(/^src\//, "")}`,
});

// this will check up all __trans__ folders and import the translations
// after running this, a translations-lock.js file will be created at the root folder.
// the translations-lock.js is used to not generate a new translations folder every time we build the project.
// ps: re-start the project every time there is a new translation file so it can be added in the global context.
transContext.loadTranslations();

...

module.exports = // your nextjs config

```

## Global Provider


now the default translations should injected true the Provider

```tsx
import { TranslationsProvider } from 'react-lang';
import { Header } from "./Header"
// the default translations can be imported in server side once to not import it in client side every time
// src/translations is the provided folder path at the configuration
import { DEFAULT_TRANSLATIONS } from "./src/translations/global"

export const Root = () => {
  return (
    <TranslationsProvider defaultTranslations={DEFAULT_TRANSLATIONS}>
      <Header />
    </TranslationsProvider>
  )
}
```

##  useTRansltions

now you can delete the _useMyTranslations_ hook file and replace it with the global hook from the specified translations folder _src/translations_

```tsx
import { useState } from "react"
import { type AppLang } from 'react-lang';

// import { useMyTranslations } from "./useMyTranslations" // deleted
import { useTranslations } from "./src/translations" // +++

export const Header = () => {
  const [lang, setLang] = useState<AppLang>("en")
  // const t = useMyTranslations(lang)
  const t = useTranslations(lang) // +++

  const countryElement = <strong>{t("country.italy")}</strong>

  const StrongName = <strong>Fernando Ekutsu Mondele</strong>
  
  return (
    <header>
      <label>
        {t("header.label.title")}
      </label>
      <p>{t("header.text.hello-you", { name: MyName })}</p>
      <YourCustomLanguageSelector lang={lang} onChange={lang => setLang(lang)}/>
    </header>
  )
}
```








