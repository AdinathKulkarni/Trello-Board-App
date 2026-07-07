import '../src/styles/styles.css'
import { useState } from 'react'
import Header from './components/Header'
import Board from './components/Board'

function App() {
  
  return (
    <div className='background min-w-screen min-h-screen p-12'>

      <div className=''>
        <Header />
      </div>

      <div>
        <Board />
      </div>

    </div>
  )
}

export default App
