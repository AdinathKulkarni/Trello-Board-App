import React, { useState } from 'react'

const Popup = ({ setPopupBox, coloums, title, btnText }) => {

    const [name, setName] = useState('');

    const changeHandler = (event) => {
        setName(event.target.value);
    }

    const saveHandler = () => {
        coloums.push({name})
        setPopupBox(prev => !prev);
    }

    return (
        <div className='bg-slate-700 w-[500px] p-4 rounded-md shadow-lg '>
            <p>{title}</p>

            <input
                type="text"
                required
                placeholder='Enter column name . . .'
                className='text-black w-full mt-2 mb-4 p-2 rounded'
                onChange={changeHandler}
                value={name}
            />

            <div className='flex gap-2 justify-end'>
                <button onClick={() => setPopupBox(prev => !prev)} className='px-3 py-1 bg-gray-600 rounded'>Cancel</button>
                <button onClick={saveHandler} className='px-3 py-1 bg-blue-600 text-white rounded'>{btnText}</button>
            </div>
        </div>
    )
}

export default Popup