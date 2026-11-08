// Синтетические данные для графика item analysis (кейс про Яндекс Практикум).
// Данные условные: 30 вопросов теста, фиксированный seed, чтобы результат не менялся.
// Запуск: node scripts/generate-item-analysis.mjs
import { writeFileSync } from 'node:fs';

// Простой детерминированный генератор (mulberry32)
function rng(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(20261108);
const between = (a, b) => a + (b - a) * rand();
const round = (x) => Math.round(x * 100) / 100;

// Пороги зон, те же, что на графике
export const zones = { easy: 0.9, hard: 0.2, flat: 0.2 };

const items = [];
// 26 «нормальных» вопросов вне проблемных зон
while (items.length < 26) {
  const p = between(0.28, 0.86);
  const d = between(0.26, 0.62);
  items.push({ p: round(p), d: round(d) });
}
// 4 проблемных: два слишком лёгких, один слишком трудный, один не различает
items.push({ p: 0.94, d: 0.27 }, { p: 0.97, d: 0.23 }, { p: 0.13, d: 0.32 }, { p: 0.56, d: 0.07 });

// Перемешиваем и нумеруем
for (let i = items.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1));
  [items[i], items[j]] = [items[j], items[i]];
}
const data = { seed: 20261108, zones, items: items.map((it, i) => ({ id: i + 1, ...it })) };
writeFileSync(new URL('../src/data/visuals/item-analysis.json', import.meta.url), JSON.stringify(data, null, 2) + '\n');
console.log(`Wrote ${data.items.length} items`);
