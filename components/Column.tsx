import { Container, Stack, Title } from '@mantine/core';
import { Droppable } from 'react-beautiful-dnd';
import { Task } from './Task';
import { type TaskType, type ColumnType } from '../initalData';

export interface IColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}

export const Column = ({ column, tasks }: IColumnProps) => (
    <Container
      p="md"
      sx={(theme) => ({
        border: 'solid 2px',
        borderColor: theme.colors.gray[5],
        borderRadius: 5,
        minHeight: '100%',
      })}
    >
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Stack
            pt="md"
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={(theme) => ({
              backgroundColor: snapshot.isDraggingOver ? (
                theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1]) : undefined,
              flexGrow: 1,
              minHeight: 100,
            })}
          >
            {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Container>
  );
