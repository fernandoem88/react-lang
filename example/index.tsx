import 'react-app-polyfill/ie11';
import * as React from 'react';
import { TranslationsProvider, AppLang } from '../.';
import { useTranslations } from './__trans__/useTranslations';

declare module "../." {
  export interface AppTypes {
    lang: "en" | "it" | "nl"
  }
}


const App = () => {
  return (
    <TranslationsProvider>
      <Header />
    </TranslationsProvider>
  );
};

const Header = () => {
  const [lang, setLang] = React.useState<AppLang>("en")
  const t = useTranslations(lang)

  const countryElement = <strong>{t("country.italy")}</strong>
  return <header>
    {t("header.label.hello", { country: countryElement })}
  </header>
}

// ReactDOM.render(<App />, document.getElementById('root'));
