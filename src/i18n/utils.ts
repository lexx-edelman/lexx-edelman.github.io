import { defaultLang, langs, type Lang, type Localized } from './config';
import { ui, type UIKey } from './ui';

const prefixed = langs.filter((l) => l !== defaultLang);
const prefixRe = new RegExp(`^/(${prefixed.join('|')})(?=/|$)`);

/** Язык текущей страницы по её адресу */
export function getLang(url: URL): Lang {
  const match = url.pathname.match(prefixRe);
  return (match?.[1] as Lang) ?? defaultLang;
}

/** Адрес страницы без языкового префикса: /ru/about/ → /about/ */
export function stripLang(pathname: string): string {
  return pathname.replace(prefixRe, '') || '/';
}

/** Ссылка на страницу на нужном языке: ('/about/', 'ru') → /ru/about/ */
export function localePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean}`;
}

/** Функция-переводчик подписей интерфейса */
export function useTranslations(lang: Lang) {
  return <K extends UIKey>(key: K): (typeof ui)['en'][K] => (ui[lang][key] ?? ui[defaultLang][key]) as (typeof ui)['en'][K];
}

/** Достаёт нужный язык из { en, ru } */
export function tr<T>(value: Localized<T>, lang: Lang): T {
  return value[lang] ?? value[defaultLang];
}

/** Параметры для getStaticPaths: собирает страницу для каждого языка */
export function localeStaticPaths() {
  return langs.map((lang) => ({
    params: { locale: lang === defaultLang ? undefined : lang },
    props: { lang },
  }));
}
