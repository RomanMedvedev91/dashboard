import { IconUser } from '@tabler/icons';
import { ReactNode } from 'react';

// export const initialData0 = [{
//   id: 'column1',
//   title: 'To Do',
//   cards: [{
//     id: 'card1',
//     title: 'Task 1',
//     labels: [{ color: 'gray', label: 'hold' }],
//     date: '2023-25-02',
//     tasks: [{
//       id: 'card1task1',
//       completed: false,
//       text: 'card 1 task 1',
//     }, {
//       id: 'card1task2',
//       completed: false,
//       text: 'card 1 task 2',
//     }],
//     description: 'Task 1 description',
//   }],
// }];

export type TaskType = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};
export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type DataType = {
  tasks: {
    [x: string]: TaskType;
  };
  columns: {
    [x: string]: ColumnType
  };
  columnOrder: string[];
};

export const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Card 1',
      description: 'Take out the garbage',
      icon: <IconUser size={20} stroke={1.5} />,

    },
    'task-2': {
      id: 'task-2',
      title: 'Card 2',
      description: 'Watch my favorite show',
      icon: <IconUser size={20} stroke={1.5} />,

    },
    'task-3': {
      id: 'task-3',
      title: 'Card 3',
      description: 'Charge my phone',
      icon: <IconUser size={20} stroke={1.5} />,
    },
    'task-4': {
      id: 'task-4',
      title: 'Card 4',
      description: 'Cook dinner',
      icon: <IconUser size={20} stroke={1.5} />,
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
