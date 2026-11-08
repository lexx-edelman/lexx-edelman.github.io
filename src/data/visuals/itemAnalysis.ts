// Разбор синтетических данных item analysis: какие вопросы попадают в проблемные зоны
import data from './item-analysis.json';

export const Y_MAX = 0.7; // верх шкалы дискриминативности на графике
export const zones = data.zones;

export function analyzeItems() {
  const isEasy = (p: number) => p > zones.easy;
  const isHard = (p: number) => p < zones.hard;
  const isFlat = (d: number) => d < zones.flat;
  const items = data.items.map((it) => ({ ...it, flagged: isEasy(it.p) || isHard(it.p) || isFlat(it.d) }));
  return {
    items,
    n: items.length,
    k: items.filter((it) => it.flagged).length,
    easy: items.filter((it) => isEasy(it.p)).length,
    hard: items.filter((it) => isHard(it.p)).length,
    flat: items.filter((it) => isFlat(it.d)).length,
  };
}

/** Подставляет {n}, {k}… в строку из словаря */
export function fill(template: string, values: Record<string, number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}
