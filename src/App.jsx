import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import PokemonList from './component/PokeList.jsx'
import Navbar from './component/Navbar.jsx'


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
       </BrowserRouter>
      
    </>
  )
}

export default App
