import React from 'react'
import PokeList from '../component/PokeList'

const Homepage = () => {
  return (
    <div>
      <h1>Bienvenue sur le Pokédex</h1>
      <p>Rechercher un pokémon</p>

      <PokeList />
    </div>
  )
}

export default Homepage
