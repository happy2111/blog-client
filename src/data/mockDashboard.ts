export const dashboardStats = [
  {
    id: 'deals',
    label: 'Активные сделки',
    value: '128',
    change: '+12%',
    trend: 'up' as const,
    icon: 'briefcase',
  },
  {
    id: 'revenue',
    label: 'Выручка (мес.)',
    value: '₽4.2M',
    change: '+8.4%',
    trend: 'up' as const,
    icon: 'trending',
  },
  {
    id: 'clients',
    label: 'Клиенты',
    value: '1,847',
    change: '+23',
    trend: 'up' as const,
    icon: 'users',
  },
  {
    id: 'tasks',
    label: 'Задачи на сегодня',
    value: '17',
    change: '−3',
    trend: 'down' as const,
    icon: 'check',
  },
];

export const pipelineStages = [
  { stage: 'Лиды', count: 342, percent: 100, color: 'bg-blue-500' },
  { stage: 'Квалификация', count: 218, percent: 64, color: 'bg-indigo-500' },
  { stage: 'Предложение', count: 96, percent: 28, color: 'bg-violet-500' },
  { stage: 'Переговоры', count: 54, percent: 16, color: 'bg-purple-500' },
  { stage: 'Закрыто', count: 31, percent: 9, color: 'bg-emerald-500' },
];

export const recentTasks = [
  { id: 1, title: 'Согласовать договор с ООО «Ромашка»', assignee: 'Иванов А.', due: 'Сегодня', priority: 'high' as const },
  { id: 2, title: 'Отправить КП клиенту #2847', assignee: 'Петрова М.', due: 'Завтра', priority: 'medium' as const },
  { id: 3, title: 'Обновить статус сделки #1092', assignee: 'Сидоров К.', due: '12 июн', priority: 'low' as const },
  { id: 4, title: 'Звонок по заявке от АО «Техно»', assignee: 'Козлова Е.', due: '13 июн', priority: 'high' as const },
];

export const statusLabels: Record<string, { label: string; className: string }> = {
  PUBLIC: { label: 'Открытый', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  PRIVATE: { label: 'Конфиденциальный', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
};
