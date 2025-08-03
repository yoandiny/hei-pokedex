import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import { PokemonProfile } from './pages/PokemonProfile'
import Navbar from './component/Navbar'


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar />}>
          <Route path="/" element={<Homepage />} />
          <Route path='/profile' element={<PokemonProfile />} />
          </Route>
        </Routes>
       </BrowserRouter>
      
    </>
  )
}

export default App
