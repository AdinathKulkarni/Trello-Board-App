import React from 'react'
import logo from '../assets/Trello-White-Logo.wine.png'
import { RiHome4Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import profile from '../assets/DSC09745 (1).jpg'

const Header = () => {
  return (
    <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
      <div className='flex items-center gap-4'>
        <div className='flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900/80 shadow-xl ring-1 ring-white/10'>
          <img src={logo} alt="logo" className='h-10 w-auto' />
        </div>

        <div>
          <p className='text-xs uppercase tracking-[0.4em] text-cyan-300/80'>Team board</p>
          <h1 className='text-2xl font-semibold text-white'>Sprint workflow</h1>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <button className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-100'>
          <RiHome4Line />
        </button>

        <button className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-white shadow-lg transition hover:bg-cyan-400'>
          <FiPlus />
        </button>

        <select
          name="boards"
          id="boards"
          defaultValue="kanban"
          className='rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-lg outline-none transition focus:border-cyan-400'
        >
          <option value="kanban">Kanban Board</option>
          <option value="jira">Jira Board</option>
        </select>
      </div>

      <div className='flex min-w-[240px] max-w-sm items-center gap-3'>
        <div className='relative flex-1'>
          <input
            type="text"
            placeholder='Search tasks'
            className='w-full rounded-full border border-white/10 bg-slate-800/70 px-4 py-3 pr-11 text-sm text-white shadow-lg outline-none placeholder:text-slate-400 focus:border-cyan-400'
          />
          <CiSearch className='pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400' />
        </div>

        <div className='relative h-12 w-12 overflow-hidden rounded-full border border-white/15 shadow-xl'>
          <img src={profile} alt="profile pic" className='h-full w-full object-cover' />
        </div>
      </div>

    </div>
  )
}

export default Header