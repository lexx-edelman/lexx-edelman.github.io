// Подписи интерфейса (кнопки, заголовки секций, меню).
// Контент (проекты, био, резюме) — в src/data/site.ts.
import type { Lang } from './config';

export const ui = {
  en: {
    'meta.portfolio': 'Portfolio',
    'nav.label': 'Main navigation',
    'nav.projects': 'Projects',
    'nav.approach': 'Approach',
    'nav.about': 'About',
    'nav.resume': 'Resume',
    'nav.home': 'Home',
    'lang.label': 'Language',

    'hero.latest': 'My latest work',
    'hero.contact': "Let's chat",

    'footer.links': 'Links',
    'footer.contact': 'Contact',
    'copy.done': 'Copied!',

    'about.title': 'About',
    'about.interests': ["What I'm into", 'right now'],
    'about.values': ['The values', 'behind my work'],
    'about.books': ['Books', 'I keep coming back to'],
    'about.call': 'Get in touch',

    'approach.title': 'Approach',
    'approach.process': ['How I work', 'step by step'],
    'approach.ai': ['AI in learning', 'how I use it'],

    'resume.title': 'Resume',
    'resume.download': 'Download full CV',
    'resume.pdf': 'PDF',
    'resume.experience': 'Experience',
    'resume.languages': 'Languages',
    'resume.tools': ['Tools', 'powering my work'],
    'resume.skills': 'Skills',
    'resume.awards': 'Awards',
    'resume.education': 'Education',

    'case.back': 'All projects',
    'case.role': 'Role',
    'case.timeline': 'Timeline',
    'case.team': 'Team',
    'case.platform': 'Platform',
    'case.overview': 'Overview',
    'case.more': 'More projects',
  },
  ru: {
    'meta.portfolio': 'Портфолио',
    'nav.label': 'Основная навигация',
    'nav.projects': 'Проекты',
    'nav.approach': 'Подход',
    'nav.about': 'Обо мне',
    'nav.resume': 'Резюме',
    'nav.home': 'На главную',
    'lang.label': 'Язык',

    'hero.latest': 'Последняя работа',
    'hero.contact': 'Связаться',

    'footer.links': 'Ссылки',
    'footer.contact': 'Контакты',
    'copy.done': 'Скопировано!',

    'about.title': 'Обо мне',
    'about.interests': ['Чем я увлекаюсь', 'сейчас'],
    'about.values': ['Ценности', 'в моей работе'],
    'about.books': ['Книги', 'к которым я возвращаюсь'],
    'about.call': 'Написать в Telegram',

    'approach.title': 'Подход',
    'approach.process': ['Как я работаю', 'по шагам'],
    'approach.ai': ['ИИ в обучении', 'как я его применяю'],

    'resume.title': 'Резюме',
    'resume.download': 'Скачать полное резюме',
    'resume.pdf': 'PDF, англ.',
    'resume.experience': 'Опыт',
    'resume.languages': 'Языки',
    'resume.tools': ['Инструменты', 'в работе'],
    'resume.skills': 'Навыки',
    'resume.awards': 'Награды',
    'resume.education': 'Образование',

    'case.back': 'Все проекты',
    'case.role': 'Роль',
    'case.timeline': 'Сроки',
    'case.team': 'Команда',
    'case.platform': 'Платформа',
    'case.overview': 'Обзор',
    'case.more': 'Другие проекты',
  },
} as const satisfies Record<Lang, Record<string, string | readonly string[]>>;

export type UIKey = keyof (typeof ui)['en'];
