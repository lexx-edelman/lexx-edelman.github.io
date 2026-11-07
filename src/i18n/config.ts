// Языки сайта. Основной (defaultLang) живёт в корне: /about/
// Остальные — с префиксом: /ru/about/
// Чтобы добавить язык: допишите его сюда, в ui.ts и во все { en, ru } в data/site.ts.

export const languages = {
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  ru: { label: 'RU', name: 'Русский', htmlLang: 'ru', ogLocale: 'ru_RU' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langs = Object.keys(languages) as Lang[];

// Текст, переведённый на все языки
export type Localized<T = string> = Record<Lang, T>;
