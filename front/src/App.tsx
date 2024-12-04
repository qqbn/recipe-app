import { useState } from 'react'
import Switcher from './components/Switcher'
import Search from './components/Search'
import Notes from './components/Notes'
import './App.css'

function App() {
  const [active, setActive] = useState(false);

  const handleSetActive = () => {
    setActive(!active)
  }

  return (
    <>
      <h1 className="text-white text-8xl font-bold mt-6">Recipe app</h1>
      <Switcher handleSetActive={handleSetActive} active={active}></Switcher>
      {!active ? <Search /> : <Notes />}
    </>
  )
}

export default App
