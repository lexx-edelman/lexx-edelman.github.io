// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Впишите сюда свой домен, когда он будет: 'https://example.com'
  // (нужен, чтобы поисковики правильно связали EN и RU версии страниц)
  site: undefined,
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
});
