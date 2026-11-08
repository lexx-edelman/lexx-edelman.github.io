// Проверка при сборке: в готовом сайте не должно быть текста «TODO».
// Если он есть, сборка падает и показывает, на каких страницах.
// Для черновой сборки (посмотреть, не публикуя): ALLOW_TODO=1 npm run build — тогда только предупреждение.
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

export default function noTodo() {
  return {
    name: 'no-todo',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const found = [];
        for await (const file of htmlFiles(root)) {
          // Ищем только видимый текст и атрибуты, без скриптов и стилей
          const html = (await readFile(file, 'utf8')).replace(/<(script|style)[\s\S]*?<\/\1>/g, '');
          const count = (html.match(/TODO/g) ?? []).length;
          if (count) found.push(`  /${relative(root, file)} — ${count}`);
        }
        if (!found.length) return logger.info('TODO в готовом сайте нет.');
        const message = `На страницах остался текст TODO:\n${found.join('\n')}`;
        if (process.env.ALLOW_TODO) logger.warn(`${message}\n(ALLOW_TODO=1: сборка продолжена, но публиковать так нельзя)`);
        else throw new Error(`${message}\nДопишите тексты или пометьте кейс draft: true. Черновая сборка: ALLOW_TODO=1 npm run build`);
      },
    },
  };
}
