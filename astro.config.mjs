// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Адрес сайта. Когда купите домен — замените на 'https://ваш-домен.com'
  // и положите его же в public/CNAME (нужно для связи EN и RU версий в поиске)
  site: 'https://lexx-edelman.github.io',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
});
