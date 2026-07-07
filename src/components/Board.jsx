import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Popup from './Popup.jsx';
import Card from './Card.jsx';
import {DndContext,closestCenter,PointerSensor,useSensor,useSensors,DragOverlay} from '@dnd-kit/core';
import {SortableContext,verticalListSortingStrategy,arrayMove} from '@dnd-kit/sortable';

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

  const buttonText = columns.length === 0 ? 'Add Column' : 'Add another column';

  // find which column a card belongs to, by card id
  const findColumnIndex = (cardId) => {
    return columns.findIndex(col =>
      col.cards.some(card => card.id === cardId)
    );
  };

  const handleDragStart = (event) => {
    const { active } = event;
    // find the card being dragged so DragOverlay can render it
    for (const col of columns) {
      const card = col.cards.find(c => c.id === active.id);
      if (card) { setActiveCard(card); break; }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const fromColIdx = findColumnIndex(active.id);
    const toColIdx = findColumnIndex(over.id);

    if (fromColIdx === -1 || toColIdx === -1) return;

    setColumns(prev => {
      const copy = prev.map(col => ({
        ...col,
        cards: [...col.cards],
      }));

      if (fromColIdx === toColIdx) {
        // reorder within same column
        const col = copy[fromColIdx];
        const oldIdx = col.cards.findIndex(c => c.id === active.id);
        const newIdx = col.cards.findIndex(c => c.id === over.id);
        col.cards = arrayMove(col.cards, oldIdx, newIdx);
      } else {
        // move card to different column
        const fromCol = copy[fromColIdx];
        const toCol = copy[toColIdx];
        const cardIdx = fromCol.cards.findIndex(c => c.id === active.id);
        const [movedCard] = fromCol.cards.splice(cardIdx, 1);
        const overIdx = toCol.cards.findIndex(c => c.id === over.id);
        // insert at the right position, or append if not found
        if (overIdx === -1) {
          toCol.cards.push(movedCard);
        } else {
          toCol.cards.splice(overIdx, 0, movedCard);
        }
      }

      return copy;
    });
  };

  const handleAddCard = (index) => {
    if (!newCardText.trim()) return;
    setColumns(prev => {
      const copy = [...prev];
      const col = { ...copy[index] };
      col.cards = [
        ...(col.cards || []),
        // give each card a unique id — dnd-kit needs this
        { id: `card-${Date.now()}`, title: newCardText },
      ];
      copy[index] = col;
      return copy;
    });
    setNewCardText('');
    setAddCardIndex(null);
  };

  return (
    <div className='text-white flex items-start mt-8'>
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
          <Popup setPopupBox={setPopupBox} columns={columns} title='Add Title' btnText='Add Column' />
        </div>
      )}
    </div>
  );
};

export default Board;