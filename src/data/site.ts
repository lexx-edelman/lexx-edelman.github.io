// Весь контент сайта живёт здесь. Каждый текст — пара { en, ru }:
// en — основная версия сайта, ru — русская (/ru/...).
// Места, которые нужно уточнить, помечены комментарием «TODO».
import type { Localized } from '../i18n/config';

type L = Localized;

export const site = {
  // false — поисковики (Google, Яндекс) не будут показывать сайт в выдаче.
  // Поменяйте на true, когда будете готовы показывать портфолио.
  indexable: false,
  name: 'Alexander Edelman',
  initials: 'AE',
  avatar: '/avatar.jpg',
  bio: {
    en: 'Learning experience designer in corporate L&D. I build e-learning that changes how people work — and AI tools that make it faster to create.',
    ru: 'Дизайнер обучения в корпоративном L&D. Создаю курсы, которые меняют то, как люди работают, и ИИ-инструменты, которые ускоряют их разработку.',
  } as L,
  email: 'hello@example.com', // TODO: рабочая почта
  callUrl: 'https://cal.com', // TODO: ссылка на запись на звонок
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alex-edelman', icon: 'linkedin' },
    { label: 'Telegram', href: 'https://t.me/lexx_edelman', icon: 'telegram' },
  ],
};

// Пункты меню: адреса без языкового префикса, подписи — в src/i18n/ui.ts
export const nav = [
  { key: 'nav.projects', href: '/' },
  { key: 'nav.approach', href: '/approach/' },
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
  cover?: string; // путь к картинке в public/, например '/projects/factoring.jpg'
  tint: Tint;
  role: L;
  timeline: L;
  team: L;
  platform: L;
  body: Localized<string[]>; // абзацы текста кейса
}

// Общий абзац для курсов под NDA
const ndaNote: L = {
  en: 'The course materials are internal and can’t be shared publicly. I’m happy to walk you through the process, decisions and results on a call.',
  ru: 'Материалы курса внутренние, поэтому их нельзя показать публично. Могу рассказать о процессе, решениях и результатах на созвоне.',
};

const role: L = { en: 'Learning solutions manager', ru: 'Менеджер по разработке обучающих решений' };

export const projects: Project[] = [
  {
    slug: 'compliance-misselling',
    title: {
      en: 'A role-based compliance course on unfair market practices',
      ru: 'Комплаенс-курс о недобросовестных практиках с выбором роли',
    },
    client: { en: 'Sber · Compliance', ru: 'Сбер · Комплаенс' },
    year: 2026,
    description: {
      en: 'Turning dense regulation into a course employees can actually apply: learners pick their role and follow their own branch of scenarios.',
      ru: 'Как превратить сложное регулирование в курс, который сотрудники применяют на практике: каждый выбирает свою роль и проходит свою ветку сценариев.',
    },
    tint: ['#c9d8ff', '#f4d7f0', '#ffd9c7'],
    role,
    timeline: { en: '2026', ru: '2026' }, // TODO: сроки
    team: { en: 'Me, compliance experts, developers', ru: 'Я, эксперты комплаенса, разработчики' }, // TODO
    platform: { en: 'Web course in the corporate LMS', ru: 'Веб-курс в корпоративной LMS' },
    body: {
      en: [
        'The course explains unfair practices in the financial market to employees in different roles. Instead of one long read, learners choose their role and go through the scenarios that matter for their work.',
        'Key terms open in pop-ups so the main text stays readable for non-specialists. Progress counts only when learners complete the interactions, not when they scroll to the end.',
        ndaNote.en,
      ],
      ru: [
        'Курс объясняет недобросовестные практики на финансовом рынке сотрудникам в разных ролях. Вместо одного длинного текста сотрудник выбирает свою роль и проходит сценарии, которые важны именно для его работы.',
        'Ключевые термины открываются во всплывающих окнах, поэтому основной текст понятен неспециалисту. Прогресс засчитывается за выполненные задания, а не за прокрутку до конца.',
        ndaNote.ru,
      ],
    },
  },
  {
    slug: 'learning-to-learn',
    title: { en: 'Learning to learn: a course with an AI practice trainer', ru: '«Учись учиться»: курс с ИИ-тренажёром' },
    client: { en: 'Sber · Corporate learning', ru: 'Сбер · Корпоративное обучение' },
    year: 2026,
    description: {
      en: 'A course on learning skills where theory is followed by practice with an AI trainer that responds to each learner.',
      ru: 'Курс о навыках обучения, где за теорией следует практика с ИИ-тренажёром, который отвечает каждому ученику.',
    },
    tint: ['#ffd6c2', '#f7c6e0', '#d4dcff'],
    role,
    timeline: { en: '2026', ru: '2026' }, // TODO
    team: { en: 'Me, subject-matter experts', ru: 'Я и эксперты' }, // TODO
    platform: { en: 'E-learning + AI trainer', ru: 'Электронный курс + ИИ-тренажёр' },
    body: {
      en: [
        'TODO: the problem — why employees needed this course and what got in their way.',
        'TODO: the solution — course structure and how the AI trainer gives practice and feedback.',
        ndaNote.en,
      ],
      ru: [
        'TODO: проблема — зачем сотрудникам этот курс и что им мешало.',
        'TODO: решение — структура курса и как ИИ-тренажёр даёт практику и обратную связь.',
        ndaNote.ru,
      ],
    },
  },
  {
    slug: 'factoring',
    title: { en: 'Making factoring clear for bank employees', ru: 'Курс «Факторинг»: сложный продукт простыми словами' },
    client: { en: 'Sber · Corporate learning', ru: 'Сбер · Корпоративное обучение' },
    year: 2026,
    description: {
      en: 'A product course that explains a complex financing instrument through cases and practice.',
      ru: 'Продуктовый курс, который объясняет сложный финансовый инструмент через кейсы и практику.',
    },
    tint: ['#d7e3ff', '#e9d9ff', '#ffd6e6'],
    role,
    timeline: { en: '2026', ru: '2026' }, // TODO
    team: { en: 'Me, product experts', ru: 'Я и эксперты продукта' }, // TODO
    platform: { en: 'SCORM course in the LMS', ru: 'SCORM-курс в LMS' }, // TODO
    body: {
      en: ['TODO: the problem, the solution and the result.', ndaNote.en],
      ru: ['TODO: проблема, решение и результат.', ndaNote.ru],
    },
  },
  {
    slug: 'personal-effectiveness',
    title: {
      en: 'Redesigning a personal effectiveness course',
      ru: 'Редизайн курса по личной эффективности',
    },
    client: { en: 'Sber · Soft skills', ru: 'Сбер · Гибкие навыки' },
    year: 2026,
    description: {
      en: 'Rebuilding an old course around real workdays: managing a constant flow of tasks, with a checklist and a live training to back it up.',
      ru: 'Как пересобрать старый курс вокруг реального рабочего дня: работа в потоке задач, чек-лист и очный тренинг в поддержку.',
    },
    tint: ['#ffcfb8', '#f3d4ff', '#cfe2ff'],
    role,
    timeline: { en: '2026', ru: '2026' }, // TODO
    team: { en: 'Me, trainers', ru: 'Я и тренеры' }, // TODO
    platform: { en: 'E-learning + checklist + training', ru: 'Курс + чек-лист + тренинг' },
    body: {
      en: ['TODO: what was wrong with the old course and what changed.', ndaNote.en],
      ru: ['TODO: что было не так со старым курсом и что изменилось.', ndaNote.ru],
    },
  },
];

// Страница «Подход»
export const approach = {
  intro: {
    en: 'How I take a learning project from a request to results that show up in the work.',
    ru: 'Как я веду проект обучения: от запроса до результата, который виден в работе.',
  } as L,
  steps: [
    {
      title: { en: 'Analyze', ru: 'Анализ' },
      text: {
        en: 'I start with the business problem, not the content. I talk to stakeholders and experts, run a training needs analysis and define what people should do differently.',
        ru: 'Начинаю с бизнес-задачи, а не с контента. Говорю с заказчиками и экспертами, анализирую потребность в обучении и формулирую, что люди должны начать делать иначе.',
      },
      tags: ['Training needs analysis', 'Stakeholder interviews'],
    },
    {
      title: { en: 'Design', ru: 'Проектирование' },
      text: {
        en: 'I set measurable objectives and pick the right format: a course, practice, a job aid — or no training at all if it won’t solve the problem.',
        ru: 'Ставлю измеримые цели и выбираю формат: курс, практика, памятка — или вообще не обучение, если оно не решит задачу.',
      },
      tags: ['ADDIE', 'Bloom’s taxonomy'],
    },
    {
      title: { en: 'Develop', ru: 'Разработка' },
      text: {
        en: 'I build interactive e-learning with scenarios, branching and practice, and use AI to speed up drafting, editing and quality checks.',
        ru: 'Собираю интерактивные курсы со сценариями, ветвлением и практикой, а ИИ использую, чтобы быстрее писать, редактировать и проверять материалы.',
      },
      tags: ['E-learning', 'SCORM / xAPI', 'AI-assisted authoring'],
    },
    {
      title: { en: 'Launch', ru: 'Запуск' },
      text: {
        en: 'I test with real learners, remove friction, publish to the LMS and support the rollout together with the business.',
        ru: 'Тестирую на реальных сотрудниках, убираю трения, публикую в LMS и сопровождаю запуск вместе с бизнесом.',
      },
      tags: ['Pilot', 'QA', 'LMS'],
    },
    {
      title: { en: 'Evaluate', ru: 'Оценка' },
      text: {
        en: 'I measure more than completion: reaction, learning, behavior and business results. Then I use the data to improve the next version.',
        ru: 'Измеряю не только прохождение: реакцию, знания, поведение и бизнес-результат. Данные использую, чтобы улучшить следующую версию.',
      },
      tags: ['Kirkpatrick model', 'Learning analytics'],
    },
  ] as { title: L; text: L; tags: string[] }[],
  ai: [
    {
      title: { en: 'AI practice trainers', ru: 'ИИ-тренажёры' },
      text: {
        en: 'Learners practice conversations and decisions with an AI that gives instant, personal feedback.',
        ru: 'Сотрудники отрабатывают диалоги и решения с ИИ, который сразу даёт персональную обратную связь.',
      },
    },
    {
      title: { en: 'Knowledge assistants', ru: 'Ассистенты по базе знаний' },
      text: {
        en: 'RAG assistants answer questions from internal documents, so people get help in the flow of work.',
        ru: 'RAG-ассистенты отвечают на вопросы по внутренним документам, и люди получают помощь прямо в работе.',
      },
    },
    {
      title: { en: 'Faster production', ru: 'Быстрая разработка' },
      text: {
        en: 'Custom tools automate routine work: course authoring templates, longread drafts, SCORM package checks.',
        ru: 'Собственные инструменты убирают рутину: шаблоны сборки курсов, черновики лонгридов, проверка SCORM-пакетов.',
      },
    },
  ] as { title: L; text: L }[],
};

export const about = {
  photoCaption: { en: 'TODO: photo caption', ru: 'TODO: подпись к фото' } as L,
  greeting: { en: 'Hi, I’m Alexander.', ru: 'Привет, я Александр.' } as L,
  headline: {
    en: 'I design corporate learning and bring AI into how it’s made',
    ru: 'Проектирую корпоративное обучение и встраиваю ИИ в то, как оно создаётся',
  } as L,
  paragraphs: {
    en: [
      'I work in corporate learning at Sber, where I lead the development of asynchronous e-learning courses — from compliance and finance to soft skills — and gradually move toward managing learning processes as a whole.',
      'My work starts with the problem, not the content: what people need to do differently and what gets in their way. The learning path, interactions and assessment are built around that.',
      'Lately I’ve focused on AI in learning: practice trainers, knowledge assistants and tools that speed up course production and quality checks.',
      'TODO: a sentence about you outside of work.',
    ],
    ru: [
      'Работаю в корпоративном обучении Сбера: руковожу разработкой асинхронных электронных курсов — от комплаенса и финансов до гибких навыков — и постепенно перехожу к управлению процессами обучения целиком.',
      'Моя работа начинается с задачи, а не с контента: что люди должны делать иначе и что им мешает. Вокруг этого строятся маршрут обучения, интерактивы и оценка.',
      'Последнее время занимаюсь ИИ в обучении: тренажёрами для практики, ассистентами по базе знаний и инструментами, которые ускоряют разработку и проверку курсов.',
      'TODO: пара слов о вас вне работы.',
    ],
  } as Localized<string[]>,
  interests: [
    { en: 'AI in learning', ru: 'ИИ в обучении' },
    { en: 'Learning science', ru: 'Наука об обучении' },
    { en: 'Instructional design', ru: 'Педагогический дизайн' },
    { en: 'Knowledge management', ru: 'Управление знаниями' },
    { en: 'Obsidian', ru: 'Obsidian' },
    { en: 'Automation', ru: 'Автоматизация' },
    { en: 'Prompt engineering', ru: 'Промпт-инжиниринг' },
    { en: 'French', ru: 'Французский язык' }, // TODO: проверить
    { en: 'Tabletop RPGs', ru: 'Настольные ролевые игры' }, // TODO: проверить
  ] as L[],
  values: [
    {
      title: { en: 'Learner first', ru: 'Сначала ученик' },
      text: {
        en: 'I design for the person doing the work, not for the content owner or the checkbox.',
        ru: 'Проектирую для человека, который будет работать, а не для владельца контента или галочки в отчёте.',
      },
    },
    {
      title: { en: 'Clarity', ru: 'Ясность' },
      text: {
        en: 'Complex topics in plain language, without losing accuracy of terms and rules.',
        ru: 'Сложные темы простым языком — без потери точности терминов и правил.',
      },
    },
    {
      title: { en: 'Evidence', ru: 'Доказательность' },
      text: {
        en: 'Decisions based on learning science and data, not on habits and trends.',
        ru: 'Решения на основе науки об обучении и данных, а не привычек и трендов.',
      },
    },
    {
      title: { en: 'Smart automation', ru: 'Разумная автоматизация' },
      text: {
        en: 'AI takes the routine so people can focus on what needs judgment.',
        ru: 'ИИ забирает рутину, чтобы люди занимались тем, где нужно мышление.',
      },
    },
  ] as { title: L; text: L }[],
  // TODO: заменить на книги, которые вы правда любите
  books: [
    { title: 'Design for How People Learn', author: 'Julie Dirksen', color: '#e8743b' },
    { title: 'Map It', author: 'Cathy Moore', color: '#2f3b4c' },
    { title: 'Make It Stick', author: 'Brown, Roediger, McDaniel', color: '#f2d64b' },
    { title: 'Evidence-Informed Learning Design', author: 'Neelen & Kirschner', color: '#e9e4dc' },
    { title: 'Kirkpatrick’s Four Levels of Training Evaluation', author: 'J. & W. Kirkpatrick', color: '#4a6fd1' },
  ],
};

// Резюме: самое главное из PDF. Полная версия — public/cv/Alexander_Edelman_CV.pdf
export interface Job {
  company: string;
  logo: string; // картинка из public/logos/
  role: L;
  period: L;
  location: L;
  bullets: Localized<string[]>;
}

export const resume = {
  cvUrl: '/cv/Alexander_Edelman_CV.pdf',
  title: { en: 'Learning Technology & L&D Lead', ru: 'Лид по L&D и технологиям обучения' } as L,
  summary: {
    en: 'L&D professional with nearly 8 years across a course-development vendor, Yandex Practicum and corporate L&D at Sber. I handle training requests end to end — from what the business actually needs to a published course — and over the past year I’ve built AI pipelines that took over most of the production we used to buy from vendors.',
    ru: 'Почти 8 лет в L&D: студия разработки курсов, Яндекс Практикум и корпоративное обучение Сбера. Веду запросы на обучение от начала до конца — от того, что на самом деле нужно бизнесу, до опубликованного курса. За последний год построил ИИ-конвейеры, которые взяли на себя бо́льшую часть разработки, раньше заказанной у подрядчиков.',
  } as L,
  facts: [
    { en: '~8 years in L&D', ru: '~8 лет в L&D' },
    { en: 'Moscow · open to relocation', ru: 'Москва · готов к переезду' },
    { en: 'English C2', ru: 'Английский C2' },
  ] as L[],
  experience: [
    {
      company: 'Sber (SberUniversity)',
      logo: '/logos/sber.png',
      role: {
        en: 'Learning Solutions Development Manager, Head of Direction',
        ru: 'Менеджер по разработке обучающих решений, руководитель направления',
      },
      period: { en: 'Apr 2025 — now', ru: 'Апр 2025 — сейчас' },
      location: { en: 'Moscow', ru: 'Москва' },
      bullets: {
        en: [
          'Own corporate e-learning end to end: business request, learning concept, vendors, LMS launch, QA and post-launch updates.',
          'Built AI workflows for course copy, layout and illustrations, bringing outsourced production in-house.',
          'Delivered an AI-generated xAPI package that passed LMS testing and launched an AI conversational trainer in a company-wide course.',
          'Presented a learning personalization approach to senior leadership and got approval to test it.',
        ],
        ru: [
          'Веду корпоративные курсы целиком: запрос бизнеса, концепция обучения, подрядчики, запуск в LMS, тестирование и доработки после запуска.',
          'Построил ИИ-процессы для текстов, вёрстки и иллюстраций курсов — перенёс внутрь то, что раньше отдавали подрядчикам.',
          'Сделал сгенерированный ИИ xAPI-пакет, прошедший тестирование в LMS, и запустил ИИ-тренажёр диалогов в общекорпоративном курсе.',
          'Представил подход к персонализации обучения топ-менеджменту и получил одобрение на пилот.',
        ],
      },
    },
    {
      company: 'Yandex Practicum',
      logo: '/logos/yandex-practicum.png',
      role: { en: 'Instructional Designer', ru: 'Методист' },
      period: { en: 'Sep 2021 — Mar 2025', ru: 'Сен 2021 — Мар 2025' },
      location: { en: 'Moscow', ru: 'Москва' },
      bullets: {
        en: [
          'Designed and launched online programs for marketers, managers and designers, including online Master’s programs with leading Russian universities.',
          'Revised content based on completion and NPS data.',
          'Coordinated in-house and external experts through the full production cycle.',
        ],
        ru: [
          'Проектировал и запускал онлайн-программы для маркетологов, менеджеров и дизайнеров, включая онлайн-магистратуры с ведущими вузами.',
          'Дорабатывал контент по данным о доходимости и NPS.',
          'Координировал внутренних и внешних экспертов на всём цикле производства.',
        ],
      },
    },
    {
      company: 'CRMM',
      logo: '/logos/crmm.svg',
      role: { en: 'Lead Instructional Designer', ru: 'Ведущий методист' },
      period: { en: 'Dec 2018 — Sep 2021', ru: 'Дек 2018 — Сен 2021' },
      location: { en: 'Moscow', ru: 'Москва' },
      bullets: {
        en: [
          'Developed practice-focused asynchronous courses for large corporate clients, including Sber and oil & gas companies.',
          'Built a knowledge base of course templates and checklists used to onboard new instructional designers.',
          'Started as a project manager: ran e-learning projects from client specs to final QA and introduced weekly cross-team status meetings that reduced delays.',
        ],
        ru: [
          'Разрабатывал практико-ориентированные асинхронные курсы для крупных корпоративных клиентов, включая Сбер и нефтегазовые компании.',
          'Собрал базу знаний с шаблонами курсов и чек-листами, по которой адаптировались новые методисты.',
          'Начинал менеджером проектов: вёл e-learning-проекты от ТЗ клиента до финальной проверки и ввёл еженедельные статусы между командами, что сократило задержки.',
        ],
      },
    },
    {
      company: 'Tutoring app startup',
      logo: '/logos/startup.svg',
      role: { en: 'Founder', ru: 'Основатель' },
      period: { en: 'During university', ru: 'Во время учёбы' },
      location: { en: 'MGIMO business incubator', ru: 'Бизнес-инкубатор МГИМО' },
      bullets: {
        en: ['Took an app for private tutors — essentially a mini-LMS — from prototype to MVP with a designer and a developer.'],
        ru: ['Довёл приложение для частных репетиторов — по сути мини-LMS — от прототипа до MVP вместе с дизайнером и разработчиком.'],
      },
    },
  ] as Job[],
  skills: [
    { en: 'Needs analysis', ru: 'Анализ потребностей' },
    { en: 'Instructional design', ru: 'Педагогический дизайн' },
    { en: 'Assessment design', ru: 'Проектирование оценки' },
    { en: 'AI content pipelines', ru: 'ИИ-конвейеры контента' },
    { en: 'RAG', ru: 'RAG' },
    { en: 'SCORM & xAPI packaging and testing', ru: 'Сборка и тестирование SCORM и xAPI' },
    { en: 'LMS content operations', ru: 'Работа с контентом в LMS' },
    { en: 'Learning analytics', ru: 'Аналитика обучения' },
    { en: 'Vendor & stakeholder management', ru: 'Работа с подрядчиками и заказчиками' },
    { en: 'Procurement', ru: 'Закупки' },
    { en: 'Rapid prototyping with AI coding tools', ru: 'Быстрые прототипы с ИИ-инструментами' },
  ] as L[],
  tools: [
    { name: 'Articulate Rise', use: { en: 'E-learning authoring', ru: 'Сборка курсов' } },
    { name: 'CourseEditor', use: { en: 'E-learning authoring', ru: 'Сборка курсов' } },
    { name: 'Figma', use: { en: 'Layouts and visuals', ru: 'Макеты и визуал' } },
    { name: 'Tilda', use: { en: 'Landing pages', ru: 'Лендинги' } },
    { name: 'Notion', use: { en: 'Docs and projects', ru: 'Документы и проекты' } },
    { name: 'Claude Code', use: { en: 'AI pipelines', ru: 'ИИ-конвейеры' } },
    { name: 'Cursor', use: { en: 'Prototyping with AI', ru: 'Прототипы с ИИ' } },
  ] as { name: string; use: L }[],
  languages: [
    { name: { en: 'Russian', ru: 'Русский' }, level: { en: 'Native', ru: 'Родной' } },
    { name: { en: 'English', ru: 'Английский' }, level: { en: 'C2', ru: 'C2' } },
    { name: { en: 'German', ru: 'Немецкий' }, level: { en: 'B2', ru: 'B2' } },
    { name: { en: 'French', ru: 'Французский' }, level: { en: 'A1', ru: 'A1' } },
  ] as { name: L; level: L }[],
  // Пустой список — раздел «Награды» не показывается
  awards: [] as { title: L; meta: L }[],
  education: [
    {
      logo: '/logos/mgimo.png',
      title: { en: 'LLB + LLM (with honours), International & Civil Law', ru: 'Бакалавр и магистр права (с отличием), международное и гражданское право' },
      meta: { en: 'MGIMO University · 2016, 2018', ru: 'МГИМО · 2016, 2018' },
    },
    {
      logo: '/logos/netology.png',
      title: { en: 'Product development: analytics, production, promotion', ru: 'Разработка продукта: аналитика, производство, продвижение' },
      meta: { en: 'Netology · 2017 · course', ru: 'Нетология · 2017 · курс' },
    },
  ] as { logo: string; title: L; meta: L }[],
};
