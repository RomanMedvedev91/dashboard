import { IconUser } from '@tabler/icons';
import { DragAndDropList } from '../components/DragAndDropList';

const dataCards = [{
  title: 'Card 1',
  description: 'Description Card 1',
  userIcon: <IconUser size={20} stroke={1.5} />,
  cardId: '#1',
}, {
  title: 'Card 2',
  description: 'Description Card 2',
  userIcon: <IconUser size={20} stroke={1.5} />,
  cardId: '#2',
}, {
  title: 'Card 3',
  description: 'Description Card 3',
  userIcon: <IconUser size={20} stroke={1.5} />,
  cardId: '#3',
}];

export default function HomePage() {
  return (
    <>
    <DragAndDropList
      data={dataCards}
    />
    </>
  );
}
