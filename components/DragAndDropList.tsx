import { ReactNode, useState } from 'react';
import * as React from 'react';

import { Container, Flex, Stack } from '@mantine/core';
import { DragDropContext as DragDropContext1, DragDropContextProps, type OnDragEndResponder } from 'react-beautiful-dnd';

import { Column } from './Column';
import { DataType, initialData } from '../initalData';

export interface IDragAndDropListProps {
  data: {
    title: string;
    description: string;
    userIcon: ReactNode;
    cardId: string;
  }[];
}

export const DragAndDropList = () => {
  const [state, setState] = useState<DataType>(initialData);

  const onDragEnd: OnDragEndResponder = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

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
      return;
    }

    // Moving from one list to another
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
// to avoid Type error: 'Draggable' cannot be used as a JSX component
  const DragDropContext = DragDropContext1 as React.ComponentClass<DragDropContextProps>;

  return (
    <Container size="xl">
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'md', sm: 'lg' }}
          justify="center"
          align={{ base: 'center', sm: 'flex-start' }}
          wrap="nowrap"
        >
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId as keyof typeof state.columns];
            const tasks = column.taskIds.map(taskId => (
              state.tasks[taskId as keyof typeof state.tasks]
            ));
            return (
              <Stack
                key={column.id}
                sx={{
                  minHeight: '100%',
                  minWidth: '350px',
                }}
              >
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                />
              </Stack>
            );
          })}
        </Flex>
      </DragDropContext>
    </Container>
  );
};
