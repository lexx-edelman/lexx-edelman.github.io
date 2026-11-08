// Схема кейсов. Каждый кейс — файл src/content/cases/<slug>.yaml,
// где у каждого текста есть пара en / ru.
// Если чего-то нет в файле, этот раздел просто не показывается на странице.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({ en: z.string(), ru: z.string() });
const paragraphs = z.object({ en: z.array(z.string()), ru: z.array(z.string()) });

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
    tint: z.tuple([z.string(), z.string(), z.string()]), // цвета обложки-заглушки
    cover: z.string().optional(),

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
          why: text,
        }),
      )
      .optional(),
    cut: paragraphs.optional(),
    artifact: z
      .object({
        diagram: z.string().optional(), // имя схемы из src/components/diagrams
        text: paragraphs.optional(),
        caption: text.optional(),
      })
      .optional(),
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
  }),
});

export const collections = { cases };
