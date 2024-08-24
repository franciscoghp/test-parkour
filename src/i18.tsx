// src/i18n.ts
"use client"
import { IntlProvider } from 'react-intl';
import enMessages from '../public/locales/en/common.json';
import esMessages from '../public/locales/es/common.json';

export interface Messages {
  [key: string]: string;
}

const messages: { [locale: string]: Messages } = {
  en: enMessages,
  es: esMessages,
};

export function I18nProvider({ locale, children }: { locale: string, children: React.ReactNode }) {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}
