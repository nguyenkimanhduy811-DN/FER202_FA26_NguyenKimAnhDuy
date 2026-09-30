import {
  initialTaskState,
  COLUMNS
} from '../data/taskData';

export const TASK_ACTIONS = {
  ADD: 'task/add',
  MOVE: 'task/move',
  RENAME: 'task/rename',
  DELETE: 'task/delete',
  CLEAR_DONE: 'task/clearDone'
};

export const addTask = (title, priority) => ({
  type: TASK_ACTIONS.ADD,
  payload: {
    title,
    priority
  }
});

export const moveTask = (id, direction) => ({
  type: TASK_ACTIONS.MOVE,
  payload: {
    id,
    direction
  }
});

export const renameTask = (id, title) => ({
  type: TASK_ACTIONS.RENAME,
  payload: {
    id,
    title
  }
});

export const deleteTask = (id) => ({
  type: TASK_ACTIONS.DELETE,
  payload: id
});

export const clearDone = () => ({
  type: TASK_ACTIONS.CLEAR_DONE
});

export function taskReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.ADD: {
      const title = action.payload.title.trim();

      if (!title) {
        return state;
      }

      return {
        ...state,
        nextId: state.nextId + 1,
        tasks: [
          ...state.tasks,
          {
            id: state.nextId,
            title,
            priority: action.payload.priority,
            column: 'todo'
          }
        ]
      };
    }

    case TASK_ACTIONS.MOVE: {
      const { id, direction } = action.payload;

      const task = state.tasks.find(
        (item) => item.id === id
      );

      if (!task) {
        return state;
      }

      const currentIndex = COLUMNS.findIndex(
        (column) => column.id === task.column
      );

      const nextIndex =
        currentIndex + direction;

      if (
        nextIndex < 0 ||
        nextIndex >= COLUMNS.length
      ) {
        return state;
      }

      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === id
            ? {
                ...item,
                column: COLUMNS[nextIndex].id
              }
            : item
        )
      };
    }

    case TASK_ACTIONS.RENAME: {
      const title = action.payload.title.trim();

      if (!title) {
        return state;
      }

      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                title
              }
            : item
        )
      };
    }

    case TASK_ACTIONS.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter(
          (item) => item.id !== action.payload
        )
      };

    case TASK_ACTIONS.CLEAR_DONE:
      return {
        ...state,
        tasks: state.tasks.filter(
          (item) => item.column !== 'done'
        )
      };

    default:
      return initialTaskState === state
        ? state
        : state;
  }
}