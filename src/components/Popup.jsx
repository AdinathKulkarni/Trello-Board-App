import React, { useState } from 'react'

const Popup = ({ setPopupBox, onSave, title, btnText }) => {
  const [name, setName] = useState('');

  const changeHandler = (event) => setName(event.target.value);

  const saveHandler = () => {
    if (!name.trim()) return;
    onSave(name.trim());
    setName('');
    setPopupBox(false);
  };

  return (
    <div className='w-full max-w-md rounded-[28px] bg-slate-950/95 p-6 shadow-2xl ring-1 ring-white/10'>
      <div className='mb-4'>
        <p className='text-sm uppercase tracking-[0.3em] text-cyan-300'>{title}</p>
        <h2 className='mt-2 text-2xl font-semibold text-white'>Create a new column</h2>
      </div>

      <input
        type="text"
        required
        placeholder='Enter column name...'
        className='w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400'
        onChange={changeHandler}
        value={name}
      />

      <div className='mt-6 flex flex-wrap justify-end gap-3'>
        <button onClick={() => setPopupBox(false)} className='rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/15'>Cancel</button>
        <button onClick={saveHandler} className='rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400'>{btnText}</button>
      </div>
    </div>
  )
}

export default Popup