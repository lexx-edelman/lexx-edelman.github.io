// Доступ к кейсам из src/content/cases и подписи для типов и статусов.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Localized } from '../i18n/config';

export type Case = CollectionEntry<'cases'>;
export type CaseType = Case['data']['types'][number];
export type CaseStatus = NonNullable<Case['data']['status']>;

const byOrder = (a: Case, b: Case) => a.data.order - b.data.order;

export async function getCases() {
  const all = (await getCollection('cases')).sort(byOrder);
  return {
    all,
    featured: all.filter((c) => !c.data.archived),
    archived: all.filter((c) => c.data.archived),
  };
}

// Типы работы: фильтры на главной и теги на карточках
export const caseTypes: { id: CaseType; label: Localized; short: Localized }[] = [
  {
    id: 'systems',
    label: { en: 'Learning systems & process', ru: 'Системы и процессы обучения' },
    short: { en: 'Systems & process', ru: 'Системы и процессы' },
  },
  {
    id: 'ai',
    label: { en: 'AI in learning', ru: 'AI в обучении' },
    short: { en: 'AI', ru: 'AI' },
  },
  {
    id: 'experience',
    label: { en: 'Learning experiences', ru: 'Курсы и программы' },
    short: { en: 'Experiences', ru: 'Курсы' },
  },
];

export const statusLabels: Record<CaseStatus, Localized> = {
  shipped: { en: 'Shipped', ru: 'Запущен' },
  pilot: { en: 'Pilot', ru: 'Пилот' },
  'in-progress': { en: 'In progress', ru: 'В работе' },
};

/** Текст ещё не дописан: на сайте подсвечивается жёлтым */
export const isTodo = (s: string) => s.includes('TODO');
