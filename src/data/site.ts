// Весь контент сайта, кроме кейсов, живёт здесь. Каждый текст — пара { en, ru }:
// en — основная версия сайта, ru — русская (/ru/...).
// Кейсы — в src/content/cases/*.yaml.
// Места, которые нужно уточнить, помечены «TODO» (на сайте они подсвечены жёлтым).
import type { Localized } from '../i18n/config';

type L = Localized;

export const site = {
  // false — поисковики (Google, Яндекс) не будут показывать сайт в выдаче.
  // Поменяйте на true, когда будете готовы показывать портфолио.
  indexable: false,
  name: { en: 'Alexander Edelman', ru: 'Александр Эдельман' } as L,
  initials: 'AE',
  avatar: '/avatar.jpg',
  // Главная фраза в шапке. TODO: утвердить формулировку
  tagline: {
    en: 'I design how learning gets built — from the behavior gap to the result, with AI.',
    ru: 'Проектирую, как создаётся обучение: от разрыва в поведении до результата, с помощью AI.',
  } as L,
  // Строка под ней (и в подвале)
  bio: {
    en: 'Instructional designer with a product mindset. 8 years in corporate L&D and edtech.',
    ru: 'Методолог с продуктовым мышлением. 8 лет в корпоративном обучении и edtech.',
  } as L,
  // Кейс, на который ведёт кнопка «Featured case» / «Главный кейс»
  featuredCase: 'ai-design-stage',
  email: 'hello@alexander-edelman.com',
  telegram: 'https://t.me/lexx_edelman',
  // Куда ведёт кнопка «Связаться» на каждой версии сайта: 'email' или 'telegram'
  contactBy: { en: 'email', ru: 'telegram' } as Localized<'email' | 'telegram'>,
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alex-edelman', icon: 'linkedin' },
    { label: 'Telegram', href: 'https://t.me/lexx_edelman', icon: 'telegram' }, // та же ссылка, что site.telegram
  ],
};

// Пункты меню: адреса без языкового префикса, подписи — в src/i18n/ui.ts
export const nav = [
  { key: 'nav.work', href: '/' },
  { key: 'nav.thinking', href: '/thinking/' },
  { key: 'nav.about', href: '/about/' },
  { key: 'nav.resume', href: '/resume/' },
] as const;

// Страница «How I think». case — адрес кейса (имя файла без .yaml) или 'TODO'.
// Черновики позиций: TODO — переписать своими словами.
export const thinking = {
  intro: {
    en: 'A few positions that shape how I work. Each one links to a case where you can see it in practice.',
    ru: 'Несколько позиций, на которых строится моя работа. У каждой есть ссылка на кейс, где видно, как это выглядит на практике.',
  } as L,
  items: [
    {
      title: {
        en: 'Content is getting cheap. The value moves to diagnosis, practice and honest measurement.',
        ru: 'Контент дешевеет. Ценность смещается в диагностику, практику и честное измерение.',
      },
      text: {
        en: 'With AI, a decent first draft of course text is no longer the hard part. What still takes judgment is understanding what people need to do differently and designing the practice that gets them there. I now spend more of my time on that, and I try to measure whether the learning worked rather than whether people reached the end.',
        ru: 'С AI приличный черновик текста курса перестал быть сложной частью работы. Сложным остаётся понять, что люди должны делать иначе, и спроектировать практику, которая их к этому приведёт. На это теперь уходит больше моего времени, и я стараюсь измерять, сработало ли обучение, а не дошли ли люди до конца.',
      },
      case: 'ai-design-stage',
    },
    {
      title: {
        en: 'AI adds the most value in design, not in writing the text.',
        ru: 'Больше всего AI даёт на этапе проектирования, а не при написании текста.',
      },
      text: {
        en: 'Generating text is the obvious use of AI, and it mostly speeds up a step that was already fast. The bigger gain comes earlier, when AI helps work through source materials, interviews and the brief to find the behavior gap. That’s why I put AI into the design stage, before anything gets written.',
        ru: 'Генерация текста — самое очевидное применение AI, и в основном она ускоряет шаг, который и так был быстрым. Больший выигрыш появляется раньше, когда AI помогает разобрать исходные материалы, интервью и ТЗ и найти разрыв в поведении. Поэтому я встроил AI в этап проектирования, до того как что-то написано.',
      },
      case: 'ai-design-stage',
    },
    {
      title: {
        en: 'A course without safe practice informs; it doesn’t teach.',
        ru: 'Курс без безопасной практики информирует, но не учит.',
      },
      text: {
        en: 'Reading a rule and applying it in a real situation are different skills. People need a place where they can make the wrong call and see what happens without real damage. Even in mandatory compliance training, I look for room to add situational tasks around the required content.',
        ru: 'Прочитать правило и применить его в рабочей ситуации — разные навыки. Людям нужно место, где можно ошибиться и увидеть последствия без реального ущерба. Даже в обязательном комплаенс-обучении я ищу, где добавить ситуационные задачи вокруг обязательного контента.',
      },
      case: 'compliance-misselling',
    },
    {
      title: {
        en: 'Test the riskiest assumption first, and cheaply.',
        ru: 'Сначала дёшево проверить самое рискованное допущение.',
      },
      text: {
        en: 'Most learning initiatives rest on one or two assumptions nobody has checked. If such an assumption is wrong, everything built on it goes to waste. In the personalization research I proposed testing the hypotheses on mockups and a small group before building any data infrastructure.',
        ru: 'Большинство инициатив в обучении держатся на одном-двух допущениях, которые никто не проверял. Если такое допущение неверно, всё построенное на нём пропадает. В исследовании персонализации я предложил проверить гипотезы на макетах и небольшой группе, прежде чем строить инфраструктуру данных.',
      },
      case: 'personalization-research',
    },
    {
      title: {
        en: 'A rough first draft moves a project faster than another meeting.',
        ru: 'Черновой вариант двигает проект быстрее, чем ещё одна встреча.',
      },
      text: {
        en: 'It’s hard for stakeholders to react to an abstract plan and easy to react to something they can see. I’d rather bring a rough prototype early and let people point at what’s wrong. With AI, such drafts are cheap enough to throw away.',
        ru: 'Заказчику трудно реагировать на абстрактный план и легко на то, что можно увидеть. Я предпочитаю пораньше принести сырой прототип, чтобы люди показали, что не так. С AI такие черновики настолько дешёвые, что их не жалко выбросить.',
      },
      case: 'TODO', // TODO: связать с кейсом или убрать позицию
    },
    {
      title: {
        en: 'The LMS is turning into an open ecosystem.',
        ru: 'LMS превращается в открытую экосистему.',
      },
      text: {
        en: 'Learning no longer has to live inside one closed platform. Standards like xAPI let tools outside the LMS report what people actually did. That changes both what we can measure and what we can build.',
        ru: 'Обучению больше не обязательно жить внутри одной закрытой платформы. Стандарты вроде xAPI позволяют инструментам вне LMS передавать, что люди на самом деле сделали. Это меняет и то, что мы можем измерять, и то, что можем строить.',
      },
      case: 'TODO', // TODO: связать с кейсом или заметкой про xAPI
    },
  ] as { title: L; text: L; case: string }[],
};

// TODO: Александр правит текст About своими словами
export const about = {
  photo: '/photos/about.jpg', // портрет 2:3
  photoCaption: { en: 'TODO: photo caption', ru: 'TODO: подпись к фото' } as L,
  greeting: { en: 'Hi, I’m Alexander.', ru: 'Привет, я Александр.' } as L,
  headline: {
    en: 'I came to learning design from law, and now I work on how AI changes it',
    ru: 'Я пришёл в обучение из права, а сейчас занимаюсь тем, как его меняет AI',
  } as L,
  paragraphs: {
    en: [
      'I studied international and civil law at MGIMO. While still at university, I founded a small startup and took an app for private tutors from prototype to MVP with a designer and a developer.',
      'In 2018 I moved into e-learning at CRMM, a course development studio. I started as a project manager and became lead instructional designer, building practice-focused courses for large corporate clients.',
      'At Yandex Practicum I designed online programs, including online Master’s programs with universities, and revised them based on completion and NPS data.',
      'Since 2025 I’ve been at SberUniversity, Sber’s corporate university, where I own e-learning projects end to end. Over the past year my work has shifted toward AI and the way learning gets designed and produced.',
      'TODO: a sentence about you outside of work.',
    ],
    ru: [
      'Я учился международному и гражданскому праву в МГИМО. Ещё во время учёбы основал небольшой стартап и вместе с дизайнером и разработчиком довёл приложение для частных репетиторов от прототипа до MVP.',
      'В 2018 году перешёл в электронное обучение, в студию разработки курсов CRMM. Начинал менеджером проектов, стал ведущим методистом и делал практико-ориентированные курсы для крупных корпоративных клиентов.',
      'В Яндекс Практикуме проектировал онлайн-программы, включая онлайн-магистратуры с вузами, и дорабатывал их по данным о доходимости и NPS.',
      'С 2025 года работаю в СберУниверситете, корпоративном университете Сбера, и веду проекты электронного обучения от начала до конца. За последний год моя работа сместилась к AI и к тому, как проектируется и создаётся обучение.',
      'TODO: пара слов о вас вне работы.',
    ],
  } as Localized<string[]>,
  looking: {
    en: [
      'I’m looking for a role at the intersection of L&D and product, where I can own how learning is designed and delivered and be responsible for whether it works.',
      'That could be an in-house L&D team in a tech or fintech company, or a learning product role in edtech. I’m based in Moscow and open to relocation.',
    ],
    ru: [
      'Ищу роль на стыке L&D и продукта, где можно владеть тем, как обучение проектируется и запускается, и отвечать за то, работает ли оно.',
      'Это может быть внутренняя L&D-команда в tech- или финтех-компании или продуктовая роль в обучении в edtech. Живу в Москве, готов к переезду.',
    ],
  } as Localized<string[]>,
  languages: [
    { name: { en: 'Russian', ru: 'Русский' }, level: { en: 'Native', ru: 'Родной' } },
    { name: { en: 'English', ru: 'Английский' }, level: { en: 'C2', ru: 'C2' } },
    { name: { en: 'German', ru: 'Немецкий' }, level: { en: 'B2', ru: 'B2' } },
  ] as { name: L; level: L }[],
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
