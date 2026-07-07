import React from 'react'
import logo from '../assets/Trello-White-Logo.wine.png'
import { RiHome4Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import profile from '../assets/DSC09745 (1).jpg'

const Header = () => {
  return (
    <div className='flex items-center space-x-16 justify-between'>
        <div>
            <img 
            src={logo} 
            alt="logo"
            width={174}
            height={104}
            />
        </div>

       <div className='space-x-4 flex items-center w-full'>
            {/* First Button - Home */}
            <div className='bg-white rounded-full w-12 h-12 flex items-center justify-center text-[20px] shadow-2xl'>
                <button className='flex items-center justify-center '>
                    <RiHome4Line />
                </button>
            </div>

            {/* Second Button - Plus */}
            <div className='bg-white rounded-full w-12 h-12 flex items-center justify-center text-[20px] shadow-2xl'>
                <button className='flex items-center justify-center'>
                    <FiPlus />
                </button>
            </div>

            {/* Dropdown Select */}
            <div>
                <select
                    name="boards" 
                    id="boards"
                    defaultValue=""
                    className='py-[8px] px-4 rounded-full w-[150px] shadow-2xl bg-white border border-gray-100 appearance-none'
                    >
                    <option value="" disabled hidden>Boards</option>
                    <option value="kanban">KanBan</option>
                    <option value="Jira">Jira</option>
                </select>
            </div>
        </div>

        <div className='relative w-full max-w-xs'>
            <input 
                type="text"
                placeholder='Search here'
                className='w-full rounded-full bg-gray-500 px-4 py-[8px] shadow-2xl focus:outline-none text-white placeholder-white'
            />
            <CiSearch className='pointer-events-none absolute right-3 text-white top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500' />
        </div>

        <div className='relative rounded-full w-[70px] h-12  flex items-center justify-center justify-center overflow-hidden'>
            <img 
                src={profile} 
                alt="profile pic"
                className='w-full object-cover object-center rounded-full'
            />
        </div>

    </div>
  )
}

export default Header