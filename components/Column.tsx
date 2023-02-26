import * as React from 'react';
import { Droppable as Droppable1, DroppableProps } from 'react-beautiful-dnd';
import { Card, Stack, Title } from '@mantine/core';
import { Task } from './Task';
import { type TaskType, type ColumnType } from '../initalData';

export interface IColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  isDropDisabled?: boolean;
}

// to avoid Type error: 'Draggable' cannot be used as a JSX component
const Droppable = Droppable1 as React.ComponentClass<DroppableProps>;

export const Column = ({ column, tasks }: IColumnProps) => (
  <Card
    withBorder
    shadow="xl"
    radius="md"
    p="md"
    sx={{
      minHeight: '100%',
    }}
  >
    <Title>
      {column.title}
    </Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Stack
            ref={provided.innerRef}
            {...provided.droppableProps}
            pt="md"
            sx={(theme) => ({
              backgroundColor: snapshot.isDraggingOver ? (
                theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1]) : undefined,
              flexGrow: 1,
              minHeight: 100,
            })}
          >
            <>
              {tasks && tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </>
          </Stack>
        )}
      </Droppable>
  </Card>
);
