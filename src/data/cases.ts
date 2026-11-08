// Доступ к кейсам из src/content/cases и подписи для типов и статусов.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Localized } from '../i18n/config';

export type Case = CollectionEntry<'cases'>;
export type CaseType = Case['data']['types'][number];
export type CaseStatus = NonNullable<Case['data']['status']>;

const byOrder = (a: Case, b: Case) => a.data.order - b.data.order;

// Черновики (draft: true) не попадают никуда: ни на главную, ни в сборку страниц.
export async function getCases() {
  const all = (await getCollection('cases', (c) => !c.data.draft)).sort(byOrder);
  const main = all.filter((c) => !c.data.archived);
  return {
    all,
    main, // все кейсы главной по порядку
    featured: main.filter((c) => c.data.featured), // крупные карточки
    rest: main.filter((c) => !c.data.featured), // сетка в две колонки
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

/** Типы кейса в том порядке, как они записаны в types (первый — основной) */
export const typesOf = (c: Case) =>
  c.data.types.map((id) => caseTypes.find((type) => type.id === id)!).filter(Boolean);

/** Текст ещё не дописан: на сайте подсвечивается жёлтым */
export const isTodo = (s: string) => s.includes('TODO');
