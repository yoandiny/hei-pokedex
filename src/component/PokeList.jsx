import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import noFoundPokemon from "../assets/images/pokemonNoFound.png"

export default function PokemonList({searchTerm = ""}) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const filteredPokemons = pokemons.filter((pokemon) =>{
    const term = searchTerm.toLowerCase();
    const nameMatch = pokemon.name.toLowerCase().includes(term);
    const idMatch = pokemon.id.toString() === term
    const typeMatch = pokemon.types.some(type =>
        type.type.name.toLowerCase().includes(term)
    );

    return nameMatch || idMatch || typeMatch
  })

  const handlePokemonClick = (pokemon) =>{
    localStorage.setItem("pokemonInfo", JSON.stringify(pokemon));
    navigate("/profile");

  }

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=42');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            if (!detailResponse.ok) {
              throw new Error(`Erreur lors du chargement des détails pour ${pokemon.name}`);
            }
            return detailResponse.json();
          })
        );

        setPokemons(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl mt-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-2xl mt-8">Erreur: {error}</div>;
  }

  const typeStyles = {
    grass: { bg: 'bg-green-300', text: 'text-white', symbol: '🌱' },
    poison: { bg: 'bg-purple-400', text: 'text-white', symbol: '☣️' },
    fire: { bg: 'bg-red-400', text: 'text-white', symbol: '🔥' },
    water: { bg: 'bg-blue-200', text: 'text-white', symbol: '💧' },
    bug: { bg: 'bg-lime-300', text: 'text-white', symbol: '🐞' },
    normal: { bg: 'bg-gray-300', text: 'text-black', symbol: '⬜' },
    electric: { bg: 'bg-yellow-100', text: 'text-black', symbol: '⚡' },
    ground: { bg: 'bg-yellow-400', text: 'text-white', symbol: '🌍' },
    fairy: { bg: 'bg-pink-400', text: 'text-black', symbol: '✨' },
    fighting: { bg: 'bg-red-700', text: 'text-white', symbol: '🥊' },
    psychic: { bg: 'bg-pink-700', text: 'text-white', symbol: '🔮' },
    rock: { bg: 'bg-gray-600', text: 'text-white', symbol: '🪨' },
    ghost: { bg: 'bg-indigo-800', text: 'text-white', symbol: '👻' },
    ice: { bg: 'bg-cyan-300', text: 'text-black', symbol: '❄️' },
    dragon: { bg: 'bg-purple-800', text: 'text-white', symbol: '🐉' },
    dark: { bg: 'bg-gray-800', text: 'text-white', symbol: '🌑' },
    steel: { bg: 'bg-gray-400', text: 'text-black', symbol: '⚙️' },
    flying: { bg: 'bg-indigo-100', text: 'text-black', symbol: '羽' },
  };

  return (
    <div className="flex justify-center">
      <div className="p-10 pt-25 w-full bg-gray-200">
        <div className="grid grid-cols-3  gap-y-20 place-items-center">
          {filteredPokemons.length === 0 ?
              <div className="col-span-3 text-center">
                <img
                    src={noFoundPokemon}
                    alt="No Pokémon found"
                    className="mx-auto w-60 h-auto mt-8"
                />
                <p className="text-black font-bold text-xl mt-4">No Pokemon found.</p>
              </div>
          :
            filteredPokemons.map((pokemon, index) => {
            const groupIndex = Math.floor(index / 3);
            const groupColors = [
              'bg-green-400',
              'bg-amber-500',
              'bg-blue-400',
              'bg-red-300',
            ];
            const groupBgColor = groupColors[groupIndex % groupColors.length];

            const spriteUrl =
              pokemon.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default ||
              pokemon.sprites?.front_default ||
              'https://via.placeholder.com/120';

            return (
              <div
                onClick={() => handlePokemonClick(pokemon)}
                key={pokemon.id}
                className={`xl:w-9/12 md:9/12 rounded-2xl shadow-xl p-4 hover:shadow-2xl transition-shadow cursor-pointer ${groupBgColor} shine-effect`} // Ajout de shine-effect
              >
                <div className="h-50 flex flex-col-reverse items-center justify-between gap-1">
                  <div className="flex justify-start">
                    <section>
                      <p className="text-[20px] text-white font-bold">#{pokemon.id}</p>
                      <h2 className="text-2xl text-white font-semibold capitalize">{pokemon.name}</h2>
                      <div className="flex gap-1 mt-6">
                        {pokemon.types.map((type) => {
                          const typeStyle = typeStyles[type.type.name] || {
                            bg: 'bg-gray-200',
                            text: 'text-black',
                            symbol: '❓',
                          };
                          return (
                            <div
                              key={type.type.name}
                              className={`px-3 py-1 rounded-[10px]  flex items-center  ${typeStyle.bg} ${typeStyle.text}`}
                            >
                              <span className="text-black font-bold">{typeStyle.symbol} {type.type.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </div>
                    <img
                      src={spriteUrl}
                      alt={pokemon.name}
                      className="z-200 w-32 h-32 object-contain  -translate-y-5"
                      loading="lazy"
                    />
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
    </div>
  );
}