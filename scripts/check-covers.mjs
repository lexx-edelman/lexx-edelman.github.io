// Проверка обложек-фрагментов: ни один текст не обрезается.
// Открывает главную и страницы кейсов в headless Chrome на нескольких ширинах,
// проверяет каждую обложку в двух состояниях — по умолчанию и после анимации
// (как после наведения) — и падает, если текст выходит за обрезающий контейнер.
//
// Запуск при работающем сайте (npm run dev или npm run preview):
//   npm run check:covers                 — http://localhost:4321
//   npm run check:covers -- http://localhost:4322
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const widths = [1440, 1280, 768, 375];
const chromePath =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9334;
const profile = mkdtempSync(join(tmpdir(), 'check-covers-'));
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  'about:blank',
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page');
  } catch {}
}
if (!target) {
  console.error('Не удалось запустить Chrome. Путь можно задать через CHROME_PATH.');
  process.exit(2);
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
let onLoad = null;
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.method === 'Page.loadEventFired' && onLoad) onLoad();
  if (d.id && pending.has(d.id)) {
    pending.get(d.id)(d);
    pending.delete(d.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;
// Открыть страницу и дождаться полной загрузки (шрифты, картинки), не дольше 20 секунд
const open = async (url) => {
  const loaded = new Promise((r) => (onLoad = r));
  await send('Page.navigate', { url });
  await Promise.race([loaded, sleep(20000)]);
  onLoad = null;
  await evaluate('document.fonts.ready.then(() => true)');
  await sleep(300);
};

// Выполняется в странице: список обрезанных текстов во всех обложках
const inspect = `(() => {
  const problems = [];
  const clips = (el) => {
    const s = getComputedStyle(el);
    return s.overflowX !== 'visible' || s.overflowY !== 'visible';
  };
  const label = (el) => (el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 50);
  document.querySelectorAll('[data-cover]').forEach((cover) => {
    const box = cover.parentElement;
    // 1. Текст за пределами обрезающего контейнера
    const walker = document.createTreeWalker(cover, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || Number(s.opacity) === 0) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      for (let a = el; a && a !== document.body; a = a.parentElement) {
        if (!clips(a) && a !== box) continue;
        const c = a.getBoundingClientRect();
        for (const r of range.getClientRects()) {
          if (r.left < c.left - 1 || r.right > c.right + 1 || r.top < c.top - 1 || r.bottom > c.bottom + 1) {
            problems.push('текст выходит за край: «' + label(el) + '»');
            break;
          }
        }
        if (a === box) break;
      }
    }
    // 2. Содержимое не помещается в элемент с overflow: hidden
    [cover, ...cover.querySelectorAll('*')].forEach((el) => {
      if (clips(el) && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1))
        problems.push('содержимое не помещается: «' + label(el) + '»');
      // 3. clip-path у строчного элемента: Chrome оставляет видимой только первую строку
      const s = getComputedStyle(el);
      if (s.clipPath !== 'none' && s.display === 'inline' && el.getClientRects().length > 1)
        problems.push('clip-path обрезает строки: «' + label(el) + '»');
    });
  });
  return [...new Set(problems)];
})()`;

// Конечное состояние анимации (как после наведения)
const finishAnimations = `(() => {
  document.querySelectorAll('[data-cover]').forEach((c) => c.classList.add('anim', 'played'));
  return new Promise((r) => setTimeout(() => {
    document.getAnimations().forEach((a) => { try { a.finish(); } catch {} });
    setTimeout(r, 400);
  }, 50));
})()`;

await send('Page.enable');
let pages = [];
for (const home of ['/', '/ru/']) {
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await open(base + home);
  const links = await evaluate(
    `[...new Set([...document.querySelectorAll('a[href*="/projects/"]')].map((a) => a.pathname))]`,
  );
  pages.push(home, ...(links ?? []));
}
pages = [...new Set(pages)];

// Защита от пустой проверки: на главных должны найтись обложки и ссылки на кейсы
if (pages.length < 3) {
  console.error(`Найдено слишком мало страниц (${pages.length}). Сайт открылся?`);
  process.exit(2);
}

let failed = 0;
let covers = 0;
for (const width of widths) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
  for (const path of pages) {
    await open(base + path);
    covers += (await evaluate(`document.querySelectorAll('[data-cover]').length`)) ?? 0;
    const before = (await evaluate(inspect)) ?? [];
    await evaluate(finishAnimations);
    const after = (await evaluate(inspect)) ?? [];
    const all = [...new Set([...before, ...after])];
    if (all.length) {
      failed += all.length;
      console.log(`✗ ${width}px ${path}`);
      all.forEach((p) => console.log(`    ${p}`));
    }
  }
}

ws.close();
chrome.kill();
try {
  rmSync(profile, { recursive: true, force: true });
} catch {}

if (failed) {
  console.error(`\nОбрезано на обложках: ${failed}. Страниц проверено: ${pages.length}, ширины: ${widths.join(', ')}.`);
  process.exit(1);
}
if (!covers) {
  console.error('Не найдено ни одной обложки — проверять нечего.');
  process.exit(2);
}
console.log(
  `✓ Обложки целиком видны: ${pages.length} страниц × ${widths.length} ширины (${widths.join(', ')}px), проверено обложек: ${covers}.`,
);
