// Схема кейсов. Каждый кейс — файл src/content/cases/<slug>.yaml,
// где у каждого текста есть пара en / ru.
// Если чего-то нет в файле, этот раздел просто не показывается на странице.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({ en: z.string(), ru: z.string() });
const paragraphs = z.object({ en: z.array(z.string()), ru: z.array(z.string()) });

// Визуалы. Все примеры в них синтетические и из другой предметной области.
// section — в каком разделе страницы показать, placement — до или после текста раздела,
// cover: true — по этому визуалу рисуется обложка карточки.
const sections = z.enum(['problem', 'constraints', 'myRole', 'decisions', 'cut', 'artifact', 'outcome', 'learned']);
const visualBase = {
  section: sections,
  placement: z.enum(['before', 'after']).default('after'),
  cover: z.boolean().default(false),
  label: text, // текстовое описание для скринридеров
  caption: text.optional(), // подпись; под ней всегда идёт пометка об упрощении
};
const flowStep = z.object({
  title: text,
  note: text.optional(),
  checkpoint: z.boolean().default(false), // точка проверки человеком
});
const visual = z.discriminatedUnion('type', [
  z.object({
    ...visualBase,
    type: z.literal('flow'),
    steps: z.array(flowStep).min(2).max(6),
    end: z.object({ title: text, note: text.optional() }).optional(), // внешний этап, сделанный не мной
  }),
  z.object({
    ...visualBase,
    type: z.literal('chain'),
    steps: z.array(z.object({ label: text, text: text, accent: z.boolean().default(false) })).min(2),
  }),
  z.object({
    ...visualBase,
    type: z.literal('chat'),
    title: text,
    messages: z.array(z.object({ from: z.enum(['bot', 'learner']), text: text, final: z.boolean().default(false) })),
  }),
  z.object({
    ...visualBase,
    type: z.literal('scale'),
    levels: z.array(z.object({ title: text, text: text })).min(2).max(5),
  }),
  z.object({
    ...visualBase,
    type: z.literal('matrix'),
    x: z.object({ title: text, low: text, high: text }),
    y: z.object({ title: text, low: text, high: text }),
    // cells[строка][столбец]; строка 0 — верх (high по Y), столбец 0 — low по X
    cells: z.array(z.array(text).length(2)).length(2),
  }),
  z.object({
    ...visualBase,
    type: z.literal('rejected'),
    items: z.array(z.object({ title: text, reason: text })).min(1),
  }),
  z.object({
    ...visualBase,
    type: z.literal('stats'), // только подтверждённые цифры
    items: z.array(z.object({ value: z.string(), label: text })).min(1),
  }),
  z.object({
    ...visualBase,
    type: z.literal('item-analysis'), // данные — src/data/visuals/item-analysis.json
  }),
  z.object({
    ...visualBase,
    type: z.literal('rule-task'),
    rule: text,
    question: text,
    options: z.array(z.object({ text: text, feedback: text, best: z.boolean().default(false) })).min(2),
  }),
]);

const cases = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/cases' }),
  schema: z.object({
    title: text,
    summary: text, // 1–2 предложения для карточки и подзаголовка
    company: text,
    year: z.number().optional(),
    types: z.array(z.enum(['systems', 'ai', 'experience'])).min(1),
    role: text, // моя роль одной фразой
    team: text, // с кем работал, без имён
    timeline: text.optional(),
    status: z.enum(['shipped', 'pilot', 'in-progress']).optional(), // нет — на странице будет TODO
    order: z.number(), // порядок на главной
    archived: z.boolean().default(false), // true — кейс только в архиве
    nda: z.boolean().default(false), // показать примечание о закрытых материалах
    cover: z.string().optional(), // своя картинка вместо схемы-обложки (путь в public/)

    // Разделы страницы, в порядке показа
    overview: paragraphs.optional(), // только для архивных кейсов
    problem: paragraphs.optional(),
    constraints: paragraphs.optional(),
    myRole: z.object({ me: paragraphs, team: paragraphs.optional() }).optional(),
    decisions: z
      .array(
        z.object({
          title: text,
          options: z.array(text).min(2),
          chosen: z.number().optional(), // номер выбранного варианта, с нуля; нет — TODO
          // Режим «A vs B»: эскиз над каждым вариантом
          sketches: z.array(z.enum(['dialogue-graph', 'three-steps'])).optional(),
          between: text.optional(), // пояснение между вариантами
          why: text,
        }),
      )
      .optional(),
    cut: paragraphs.optional(),
    artifact: z.object({ text: paragraphs.optional() }).optional(),
    outcome: z
      .object({
        kind: z.enum(['result', 'plan']), // plan — «How we'll know it worked»
        text: paragraphs.optional(),
        before: paragraphs.optional(),
        after: paragraphs.optional(),
      })
      .optional(),
    learned: paragraphs.optional(),
    next: paragraphs.optional(),
    visuals: z.array(visual).default([]),
  }),
});

export const collections = { cases };
