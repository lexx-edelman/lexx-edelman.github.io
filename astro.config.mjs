// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Адрес сайта (нужен для ссылок между EN и RU версиями в поиске).
  // Сам домен подключён в настройках GitHub Pages репозитория.
  site: 'https://alexander-edelman.com',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },

  // Старые адреса, которые могли сохраниться в закладках и ссылках
  redirects: {
    '/experiments': '/approach/',
    '/ru/experiments': '/ru/approach/',
    ...Object.fromEntries(
      ['finance-dashboard', 'music-app', 'portfolio-system', 'finance-teams'].flatMap((slug) => [
        [`/projects/${slug}`, '/'],
        [`/ru/projects/${slug}`, '/ru/'],
      ]),
    ),
  },
});
