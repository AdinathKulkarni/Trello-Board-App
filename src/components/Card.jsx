import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Card = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='bg-gray-500 text-white py-1 rounded mt-2 flex gap-2 cursor-grab active:cursor-grabbing'
    >
      <div className='w-[2px] bg-red-200 rounded-full'></div>
      {title}
    </div>
  );
};

export default Card;