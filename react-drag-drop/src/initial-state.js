export const initialState = {
  todos: {
    'todo-1': { id: 'todo-1', body: 'Eat' },
    'todo-2': { id: 'todo-2', body: 'Code' },
    'todo-3': { id: 'todo-3', body: 'Sleep' },
    'todo-4': { id: 'todo-4', body: 'Repeat' }
  },
  columns: {
    'col-1': {
      id: 'col-1',
      title: 'All',
      todoIds: ['todo-1', 'todo-2', 'todo-3', 'todo-4']
    },
    'col-2': {
      id: 'col-2',
      title: 'Active',
      todoIds: []
    },
    'col-3': {
      id: 'col-3',
      title: 'Completed',
      todoIds: []
    }
  },
  columnOrder: ['col-1', 'col-2', 'col-3']
}
