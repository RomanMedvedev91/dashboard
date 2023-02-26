import { ReactNode, useState } from 'react';
import { Grid } from '@mantine/core';
// import { useListState } from '@mantine/hooks';
import { DragDropContext, type OnDragEndResponder } from 'react-beautiful-dnd';
// import { Group, Title, Text, Card, Stack } from '@mantine/core';

import { Column } from './Column';
import { initialData, TaskType } from '../initalData';

export interface IDragAndDropListProps {
  data: {
    title: string;
    description: string;
    userIcon: ReactNode;
    cardId: string;
  }[];
}

export const DragAndDropList = () => {
  // const [state, handlers] = useListState(data);
  const [state, setState] = useState(initialData);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId as keyof typeof initialData.columns];
    const finish = state.columns[destination.droppableId as keyof typeof initialData.columns];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
    }

    // move between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      // onDragEnd={({ destination, source }) =>
      // handlers.reorder({ from: source.index, to: destination?.index || 0 })}
    >
      <Grid>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId as keyof typeof initialData.columns];
        const tasks: TaskType[] = column.taskIds.map(taskId => (
          initialData.tasks[taskId as keyof typeof initialData.tasks]
        ));
        return (
          <Grid.Col
            span={Math.floor(12 / state.columnOrder.length)}
            key={column.id}
            sx={{
              minHeight: '100%',
            }}
          >
            <Column column={column} tasks={tasks} />
          </Grid.Col>
        );
      })}
      </Grid>
    </DragDropContext>
  );
};
