export const COLUMNS = [
  {
    id: 'todo',
    title: 'Cần làm'
  },
  {
    id: 'doing',
    title: 'Đang làm'
  },
  {
    id: 'done',
    title: 'Hoàn thành'
  }
];

export const initialTaskState = {
  nextId: 4,
  tasks: [
    {
      id: 1,
      title: 'Đọc lý thuyết useReducer',
      priority: 'high',
      column: 'done'
    },
    {
      id: 2,
      title: 'Làm bài Kanban',
      priority: 'high',
      column: 'doing'
    },
    {
      id: 3,
      title: 'Ôn lại spread operator',
      priority: 'low',
      column: 'todo'
    }
  ]
};