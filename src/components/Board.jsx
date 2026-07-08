import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Popup from './Popup.jsx';
import Card from './Card.jsx';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

const Board = () => {
  const [popupBox, setPopupBox] = useState(false);
  const [columns, setColumns] = useState([
    { name: 'Sprint Ready', cards: [] },
    { name: 'In Dev', cards: [] },
    { name: 'Code Review', cards: [] },
  ]);
  const [addCardIndex, setAddCardIndex] = useState(null);
  const [newCardText, setNewCardText] = useState('');
  const [activeCard, setActiveCard] = useState(null); // for DragOverlay

  const sensors = useSensors(useSensor(PointerSensor));
  const buttonText = columns.length === 0 ? 'Add column' : 'Add another column';

  const findColumnIndex = (cardId) => columns.findIndex(col =>
    col.cards.some(card => card.id === cardId)
  );

  const handleDragStart = ({ active }) => {
    for (const col of columns) {
      const card = col.cards.find(c => c.id === active.id);
      if (card) { setActiveCard(card); break; }
    }
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveCard(null);
    if (!over || active.id === over.id) return;

    const fromColIdx = findColumnIndex(active.id);
    const toColIdx = findColumnIndex(over.id);
    if (fromColIdx === -1 || toColIdx === -1) return;

    setColumns(prev => {
      const next = prev.map(col => ({ ...col, cards: [...col.cards] }));

      if (fromColIdx === toColIdx) {
        const column = next[fromColIdx];
        const oldIndex = column.cards.findIndex(c => c.id === active.id);
        const newIndex = column.cards.findIndex(c => c.id === over.id);
        column.cards = arrayMove(column.cards, oldIndex, newIndex);
      } else {
        const fromColumn = next[fromColIdx];
        const toColumn = next[toColIdx];
        const movedIndex = fromColumn.cards.findIndex(c => c.id === active.id);
        const [movedCard] = fromColumn.cards.splice(movedIndex, 1);
        const overIndex = toColumn.cards.findIndex(c => c.id === over.id);
        if (overIndex === -1) {
          toColumn.cards.push(movedCard);
        } else {
          toColumn.cards.splice(overIndex, 0, movedCard);
        }
      }

      return next;
    });
  };

  const handleAddCard = (index) => {
    if (!newCardText.trim()) return;
    setColumns(prev => {
      const next = [...prev];
      const column = { ...next[index] };
      column.cards = [...(column.cards || []), { id: `card-${Date.now()}`, title: newCardText.trim() }];
      next[index] = column;
      return next;
    });
    setNewCardText('');
    setAddCardIndex(null);
  };

  const handleAddColumn = (name) => {
    if (!name.trim()) return;
    setColumns(prev => [...prev, { name: name.trim(), cards: [] }]);
    setPopupBox(false);
  };

  return (
    <div className='text-slate-100 flex min-h-96'>
      {/* DndContext wraps everything that participates in drag */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className='flex gap-12 items-start'>
          {columns.map((column, index) => (
            <div key={index} className='space-y-3'>
              <div className='bg-gray-600 text-white w-[200px] mr-4 px-2 py-2 rounded-md flex justify-between items-center shadow-2xl'>
                <span>{column.name}</span>
                <button>✏</button>
              </div>

              <div className='w-[200px]'>
                {/* SortableContext wraps the cards in each column */}
                <SortableContext
                  items={column.cards.map(c => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {column.cards.map(card => (
                    <Card key={card.id} id={card.id} title={card.title} />
                  ))}
                </SortableContext>

                {addCardIndex === index ? (
                  <div className='mt-2 flex gap-2 flex-col'>
                    <input
                      type='text'
                      className='w-full p-2 rounded text-black'
                      placeholder='Card title'
                      value={newCardText}
                      onChange={(e) => setNewCardText(e.target.value)}
                    />
                    <div className='space-x-4 flex justify-evenly'>
                      <button
                        className='px-3 py-1 bg-blue-800 text-white rounded'
                        onClick={() => handleAddCard(index)}
                      >Add</button>
                      <button
                        className='px-3 py-1 bg-gray-300 rounded'
                        onClick={() => { setAddCardIndex(null); setNewCardText(''); }}
                      >Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className='mt-2'>
                    <button
                      className='flex items-center gap-2 text-sm px-2 py-2 bg-gray-800 rounded'
                      onClick={() => setAddCardIndex(index)}
                    >
                      <CiCirclePlus /> Add a card
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* DragOverlay renders the card while it's being dragged */}
        <DragOverlay>
          {activeCard ? (
            <div className='bg-gray-500 text-white py-1 rounded flex gap-2 opacity-90 shadow-xl cursor-grabbing'>
              <div className='w-[2px] bg-red-200 rounded-full'></div>
              {activeCard.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className='self-start flex items-center p-2 bg-gray-800 rounded-md px-2 gap-2 text-[15px]'>
        <CiCirclePlus />
        <button onClick={() => setPopupBox(prev => !prev)}>{buttonText}</button>
      </div>

      {popupBox && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md'>
          <Popup setPopupBox={setPopupBox} onSave={handleAddColumn} title='Add Title' btnText='Add Column' />
        </div>
      )}
    </div>
  );
};

export default Board;