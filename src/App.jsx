import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import { PokemonProfile } from './pages/PokemonProfile'


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path='/profile' element={<PokemonProfile />} />
        </Routes>
       </BrowserRouter>
      
    </>
  )
}

export default App
