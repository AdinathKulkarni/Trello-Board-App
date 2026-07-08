import './styles/styles.css'
import Header from './components/Header'
import Board from './components/Board'

function App() {
  return (
    <div className='background min-h-screen px-4 py-8 sm:px-8'>
      <div className='mx-auto max-w-7xl space-y-8'>
        <header className='rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl'>
          <Header />
        </header>

        <main className='rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl'>
          <Board />
        </main>
      </div>
    </div>
  )
}

export default App
