import { ReactNode } from 'react';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Group, Title, Text, Card, Stack } from '@mantine/core';

export interface IDragAndDropListProps {
  data: {
    title: string;
    description: string;
    userIcon: ReactNode;
    cardId: string;
  }[];
}

export const DragAndDropList = ({ data }: IDragAndDropListProps) => {
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
    <Draggable key={item.cardId} index={index} draggableId={item.cardId}>
      {(provided, snapshot) => (
        <Card
          shadow={snapshot.isDragging ? 'md' : undefined}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Group>
            {item.userIcon}
            <Title order={4}>{item.title}</Title>
            <Text color="dimmed">{item.description}</Text>
          </Group>
        </Card>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
      handlers.reorder({ from: source.index, to: destination?.index || 0 })}
    >
      <Droppable
        droppableId="dnd-list"
        direction="vertical"
      >
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
};
