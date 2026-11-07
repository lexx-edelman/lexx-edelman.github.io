// Весь контент сайта живёт здесь. Каждый текст — пара { en, ru }:
// en — основная версия сайта, ru — русская (/ru/...).
import type { Localized } from '../i18n/config';

type L = Localized;

export const site = {
  // false — поисковики (Google, Яндекс) не будут показывать сайт в выдаче.
  // Поменяйте на true, когда будете готовы показывать портфолио.
  indexable: false,
  name: 'Alexander Edelman',
  initials: 'AE',
  // Положите своё фото в public/avatar.jpg и впишите '/avatar.jpg'
  avatar: '/avatar.jpg',
  bio: {
    en: 'Product & web designer focused on clear interfaces, solid systems and meaningful details.',
    ru: 'Продуктовый и веб-дизайнер. Делаю понятные интерфейсы, аккуратные системы и внимание к деталям.',
  } as L,
  email: 'hello@example.com',
  callUrl: 'https://cal.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { label: 'Telegram', href: 'https://t.me/', icon: 'telegram' },
  ],
};

// Пункты меню: адреса без языкового префикса, подписи — в src/i18n/ui.ts
export const nav = [
  { key: 'nav.projects', href: '/' },
  { key: 'nav.experiments', href: '/experiments/' },
  { key: 'nav.about', href: '/about/' },
  { key: 'nav.resume', href: '/resume/' },
] as const;

// Цвета градиентной подложки карточки, пока нет обложки
type Tint = [string, string, string];

export interface Project {
  slug: string; // часть адреса: /projects/slug/
  title: L;
  client: L;
  year: number;
  description: L;
  cover?: string; // путь к картинке в public/, например '/projects/aviera.jpg'
  tint: Tint;
  role: L;
  timeline: L;
  team: L;
  platform: L;
  body: Localized<string[]>; // абзацы текста кейса
}

const ndaBody: Localized<string[]> = {
  en: [
    'This is where the story of the project goes: context, the problem, your process and decisions. Add images, quotes and results in numbers.',
    'Want to know more about this project and my role? Drop me a line.',
  ],
  ru: [
    'Здесь будет рассказ о проекте: контекст, проблема, ваш процесс и решения. Можно добавить изображения, цитаты и результаты в цифрах.',
    'Если хотите узнать больше о проекте и моей роли — напишите мне.',
  ],
};

export const projects: Project[] = [
  {
    slug: 'finance-dashboard',
    title: { en: 'Making financial data easier to understand', ru: 'Делаем финансовые данные понятнее' },
    client: { en: 'Project 1', ru: 'Проект 1' },
    year: 2026,
    description: {
      en: 'A short summary: who the product is for, what got in users’ way, and what changed after the redesign.',
      ru: 'Короткое описание задачи: для кого продукт, что мешало пользователям и что изменилось после редизайна.',
    },
    tint: ['#c9d8ff', '#f4d7f0', '#ffd9c7'],
    role: { en: 'Product Designer', ru: 'Продуктовый дизайнер' },
    timeline: { en: '3 months', ru: '3 месяца' },
    team: { en: 'Me and 4 developers', ru: 'Я и 4 разработчика' },
    platform: { en: 'Web', ru: 'Веб' },
    body: ndaBody,
  },
  {
    slug: 'music-app',
    title: { en: 'Creating a music discovery app', ru: 'Приложение для поиска музыки' },
    client: { en: 'Project 2', ru: 'Проект 2' },
    year: 2025,
    description: {
      en: 'A mobile app that helps people discover new artists and build playlists without extra complexity.',
      ru: 'Мобильное приложение, которое помогает находить новых артистов и собирать плейлисты без лишней сложности.',
    },
    tint: ['#ffd6c2', '#f7c6e0', '#d4dcff'],
    role: { en: 'Product Designer', ru: 'Продуктовый дизайнер' },
    timeline: { en: 'May 2025', ru: 'Май 2025' },
    team: { en: 'Me and 2 developers', ru: 'Я и 2 разработчика' },
    platform: { en: 'Mobile app', ru: 'Мобильное приложение' },
    body: ndaBody,
  },
  {
    slug: 'portfolio-system',
    title: { en: 'Designing a portfolio', ru: 'Дизайн портфолио' },
    client: { en: 'Personal project', ru: 'Личный проект' },
    year: 2025,
    description: {
      en: 'How I built the system behind my portfolio: grid, typography, components.',
      ru: 'Как я собирал систему для своего портфолио: сетка, типографика, компоненты.',
    },
    tint: ['#d7e3ff', '#e9d9ff', '#ffd6e6'],
    role: { en: 'Designer', ru: 'Дизайнер' },
    timeline: { en: '2 weeks', ru: '2 недели' },
    team: { en: 'Solo', ru: 'Соло' },
    platform: { en: 'Web', ru: 'Веб' },
    body: ndaBody,
  },
  {
    slug: 'finance-teams',
    title: { en: 'Expanding the product for finance teams', ru: 'Расширение продукта для финансовых команд' },
    client: { en: 'Project 1', ru: 'Проект 1' },
    year: 2024,
    description: {
      en: 'New expense approval flows for teams and managers.',
      ru: 'Новые сценарии согласования расходов для команд и руководителей.',
    },
    tint: ['#ffcfb8', '#f3d4ff', '#cfe2ff'],
    role: { en: 'Lead Designer', ru: 'Ведущий дизайнер' },
    timeline: { en: '6 months', ru: '6 месяцев' },
    team: { en: 'Me, a PM and 6 developers', ru: 'Я, PM и 6 разработчиков' },
    platform: { en: 'Web', ru: 'Веб' },
    body: ndaBody,
  },
];

export interface Experiment {
  title: L;
  image?: string;
  ratio: string; // соотношение сторон плитки, например '4/5'
  tint: [string, string];
}

export const experiments: Experiment[] = [
  { title: { en: 'Movement through type', ru: 'Движение через типографику' }, ratio: '3/4', tint: ['#f1f1f4', '#e3e4ea'] },
  { title: { en: 'Exploring Procreate', ru: 'Эксперименты в Procreate' }, ratio: '4/3', tint: ['#cfe3d0', '#9fc4a6'] },
  { title: { en: 'Color and digital brushwork', ru: 'Цвет и цифровая кисть' }, ratio: '4/3', tint: ['#b9d0ff', '#f6c9a8'] },
  { title: { en: 'Flower illustration series', ru: 'Серия иллюстраций с цветами' }, ratio: '4/3', tint: ['#ffe2d6', '#ffd0e0'] },
  { title: { en: 'Mood and texture', ru: 'Настроение и фактура' }, ratio: '3/4', tint: ['#3d4b5c', '#9fb1c4'] },
  { title: { en: 'Shapes and color systems', ru: 'Формы и цветовые системы' }, ratio: '1/1', tint: ['#ffd9e1', '#ffeef2'] },
  { title: { en: 'Abstract forms', ru: 'Абстрактные формы' }, ratio: '1/1', tint: ['#e8e1ff', '#c9d6ff'] },
  { title: { en: 'Social campaign concepts', ru: 'Концепты социальной кампании' }, ratio: '4/3', tint: ['#ffe7b8', '#ffc9a6'] },
  { title: { en: 'Digital painting', ru: 'Цифровая живопись' }, ratio: '3/4', tint: ['#d2ecf5', '#a8cfe0'] },
];

export const about = {
  photoCaption: { en: 'Photo caption', ru: 'Подпись к фото' } as L,
  greeting: { en: 'Hi, I’m Alexander.', ru: 'Привет, я Александр.' } as L,
  headline: {
    en: 'A designer who values clarity and real-world use',
    ru: 'Дизайнер, который ценит ясность и реальную пользу',
  } as L,
  paragraphs: {
    en: [
      'A couple of sentences about where you’re based and what products you work on. Briefly explain what you’re best at.',
      'How you got into design and what shaped your approach: structure first, visuals second.',
      'What matters to you in your work: removing noise, reducing friction, helping people move forward.',
      'What you do outside of work — photography, side projects, travel.',
    ],
    ru: [
      'Пара предложений о том, где вы живёте и над какими продуктами работаете. Здесь важно коротко объяснить, в чём ваша сила.',
      'Как вы пришли в профессию и что повлияло на ваш подход: сначала структура, потом визуал.',
      'Что для вас важно в работе: убирать лишнее, снижать трение, помогать людям двигаться вперёд.',
      'Чем занимаетесь вне работы — фотография, сайд-проекты, путешествия.',
    ],
  } as Localized<string[]>,
  interests: [
    { en: 'AI tools', ru: 'AI-инструменты' },
    { en: 'Minimal interfaces', ru: 'Минимализм' },
    { en: 'Street photography', ru: 'Уличная фотография' },
    { en: 'Design systems', ru: 'Дизайн-системы' },
    { en: 'Coffee', ru: 'Кофе' },
    { en: 'Long walks', ru: 'Долгие прогулки' },
    { en: 'Sketching', ru: 'Скетчи' },
    { en: 'Ambient music', ru: 'Эмбиент' },
    { en: 'Interior design', ru: 'Интерьеры' },
    { en: 'Books', ru: 'Книги' },
    { en: 'Travel', ru: 'Путешествия' },
  ] as L[],
  values: [
    {
      title: { en: 'Courage', ru: 'Смелость' },
      text: {
        en: 'I take initiative, explore new ideas and make decisions even when the path isn’t clear.',
        ru: 'Беру инициативу, пробую новое и принимаю решения, даже когда путь неочевиден.',
      },
    },
    {
      title: { en: 'Honesty', ru: 'Честность' },
      text: {
        en: 'I communicate openly, give feedback and focus on what truly matters for the outcome.',
        ru: 'Говорю открыто, даю обратную связь и фокусируюсь на том, что важно для результата.',
      },
    },
    {
      title: { en: 'Adaptability', ru: 'Гибкость' },
      text: {
        en: 'I learn quickly and adjust to challenges without losing direction.',
        ru: 'Быстро учусь и подстраиваюсь под задачи, не теряя направления.',
      },
    },
    {
      title: { en: 'Teamwork', ru: 'Команда' },
      text: {
        en: 'I love collaborating and believe the best results come from teamwork.',
        ru: 'Люблю работать вместе и верю, что лучшие результаты — командные.',
      },
    },
  ] as { title: L; text: L }[],
  // Названия книг обычно не переводят — оставлены одной строкой
  books: [
    { title: 'Grid Systems', author: 'Josef Müller-Brockmann', color: '#e8743b' },
    { title: 'The Design of Everyday Things', author: 'Don Norman', color: '#2f3b4c' },
    { title: 'Don’t Make Me Think', author: 'Steve Krug', color: '#f2d64b' },
    { title: 'Refactoring UI', author: 'Wathan & Schoger', color: '#e9e4dc' },
    { title: 'Interaction of Color', author: 'Josef Albers', color: '#4a6fd1' },
  ],
};

export const resume = {
  experience: [
    {
      role: { en: 'Product Designer', ru: 'Продуктовый дизайнер' },
      company: 'Company',
      period: { en: 'May 2023 — now', ru: 'Май 2023 — сейчас' },
      location: { en: 'Moscow', ru: 'Москва' },
      text: {
        en: 'What you did and what came of it: numbers, scale, who you worked with.',
        ru: 'Что вы делали и какой был результат: цифры, масштаб, с кем работали.',
      },
    },
    {
      role: { en: 'Product Designer', ru: 'Продуктовый дизайнер' },
      company: 'Company',
      period: { en: 'May 2022 — Aug 2022', ru: 'Май 2022 — Авг 2022' },
      location: { en: 'Remote', ru: 'Удалённо' },
      text: {
        en: 'Key tasks and achievements. A couple of sentences is enough.',
        ru: 'Ключевые задачи и достижения. Пара предложений достаточно.',
      },
    },
    {
      role: { en: 'Design Intern', ru: 'Стажёр-дизайнер' },
      company: 'Company',
      period: { en: 'Jan 2021 — Apr 2022', ru: 'Янв 2021 — Апр 2022' },
      location: { en: 'Saint Petersburg', ru: 'Санкт-Петербург' },
      text: {
        en: 'What you learned and what you shipped.',
        ru: 'Чему научились и что успели запустить.',
      },
    },
  ] as { role: L; company: string; period: L; location: L; text: L }[],
  tools: [
    { name: 'Figma', use: { en: 'UI design', ru: 'UI-дизайн' } },
    { name: 'Framer', use: { en: 'Websites, prototypes', ru: 'Сайты, прототипы' } },
    { name: 'Claude', use: { en: 'Ideation, prototyping', ru: 'Идеи, прототипирование' } },
    { name: 'Miro', use: { en: 'Workshops', ru: 'Воркшопы' } },
    { name: 'Notion', use: { en: 'Documentation', ru: 'Документация' } },
    { name: 'Procreate', use: { en: 'Illustration', ru: 'Иллюстрации' } },
  ] as { name: string; use: L }[],
  skills: [
    { en: 'Product design', ru: 'Продуктовый дизайн' },
    { en: 'UX research', ru: 'UX-исследования' },
    { en: 'Interaction design', ru: 'Интерфейсы' },
    { en: 'Design systems', ru: 'Дизайн-системы' },
    { en: 'Prototyping', ru: 'Прототипирование' },
    { en: 'User flows', ru: 'Пользовательские сценарии' },
    { en: 'Usability testing', ru: 'Юзабилити-тесты' },
    { en: 'Visual design', ru: 'Визуальный дизайн' },
    { en: 'Information architecture', ru: 'Информационная архитектура' },
  ] as L[],
  awards: [
    { title: { en: 'Award name', ru: 'Название награды' }, meta: { en: 'Organizer · 2023', ru: 'Организатор · 2023' } },
    {
      title: { en: 'Product Hunt — #1 product of the day', ru: 'Product Hunt — #1 продукт дня' },
      meta: { en: 'Product Hunt · 2021', ru: 'Product Hunt · 2021' },
    },
  ] as { title: L; meta: L }[],
  education: [
    {
      title: { en: 'Bachelor’s in Interaction Design', ru: 'Бакалавр, дизайн интерфейсов' },
      meta: { en: '2017 — 2021 · University', ru: '2017 — 2021 · Университет' },
    },
  ] as { title: L; meta: L }[],
};
