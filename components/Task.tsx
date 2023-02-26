import { Card, Group, Title, Text } from '@mantine/core';
import { Draggable } from 'react-beautiful-dnd';
import { type TaskType } from '../initalData';

export interface ITaskProps {
  index: number;
  task: TaskType;
}

export const Task = ({ index, task }: ITaskProps) => (
    <Draggable
      key={task.id}
      index={index}
      draggableId={task.id}
    >
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          withBorder
          shadow={snapshot.isDragging ? 'lg' : undefined}
          sx={(theme) => ({
            backgroundColor: snapshot.isDragging ? (
              theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[3]) : undefined,
            '&:hover': {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[3],
            },
          })}
        >
          <Group>
            {task.icon}
            <Title order={4}>{task.title}</Title>
            <Text color="dimmed">{task.description}</Text>
          </Group>
        </Card>
      )}
    </Draggable>
  );
