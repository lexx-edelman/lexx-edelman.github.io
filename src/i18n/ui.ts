// Подписи интерфейса (кнопки, заголовки секций, меню).
// Контент (проекты, био, резюме) — в src/data/site.ts.
import type { Lang } from './config';

export const ui = {
  en: {
    'meta.portfolio': 'Portfolio',
    'nav.label': 'Main navigation',
    'nav.projects': 'Projects',
    'nav.experiments': 'Experiments',
    'nav.about': 'About',
    'nav.resume': 'Resume',
    'nav.home': 'Home',
    'lang.label': 'Language',

    'hero.latest': 'My latest work',
    'hero.contact': "Let's chat",

    'footer.links': 'Links',
    'footer.contact': 'Contact',
    'footer.call': 'Schedule a call',
    'copy.done': 'Copied!',

    'about.title': 'About',
    'about.interests': ["What I'm into", 'right now'],
    'about.values': ['The values', 'behind my work'],
    'about.books': ['Books', 'I keep coming back to'],
    'about.call': 'Book a call',

    'experiments.title': 'Experiments',

    'resume.title': 'Resume',
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
    'nav.experiments': 'Эксперименты',
    'nav.about': 'Обо мне',
    'nav.resume': 'Резюме',
    'nav.home': 'На главную',
    'lang.label': 'Язык',

    'hero.latest': 'Последняя работа',
    'hero.contact': 'Связаться',

    'footer.links': 'Ссылки',
    'footer.contact': 'Контакты',
    'footer.call': 'Назначить звонок',
    'copy.done': 'Скопировано!',

    'about.title': 'Обо мне',
    'about.interests': ['Чем я увлекаюсь', 'сейчас'],
    'about.values': ['Ценности', 'в моей работе'],
    'about.books': ['Книги', 'к которым я возвращаюсь'],
    'about.call': 'Назначить звонок',

    'experiments.title': 'Эксперименты',

    'resume.title': 'Резюме',
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
