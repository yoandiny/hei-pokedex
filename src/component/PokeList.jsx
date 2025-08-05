import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

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
    poison: { bg: 'bg-purple-300', text: 'text-white', symbol: '☣️' },
    fire: { bg: 'bg-red-300', text: 'text-white', symbol: '🔥' },
    water: { bg: 'bg-blue-300', text: 'text-white', symbol: '💧' },
    bug: { bg: 'bg-lime-300', text: 'text-white', symbol: '🐞' },
    normal: { bg: 'bg-gray-300', text: 'text-black', symbol: '⬜' },
    electric: { bg: 'bg-yellow-400', text: 'text-black', symbol: '⚡' },
    ground: { bg: 'bg-yellow-300', text: 'text-white', symbol: '🌍' },
    fairy: { bg: 'bg-pink-400', text: 'text-black', symbol: '✨' },
    fighting: { bg: 'bg-red-700', text: 'text-white', symbol: '🥊' },
    psychic: { bg: 'bg-pink-700', text: 'text-white', symbol: '🔮' },
    rock: { bg: 'bg-gray-600', text: 'text-white', symbol: '🪨' },
    ghost: { bg: 'bg-indigo-800', text: 'text-white', symbol: '👻' },
    ice: { bg: 'bg-cyan-300', text: 'text-black', symbol: '❄️' },
    dragon: { bg: 'bg-purple-800', text: 'text-white', symbol: '🐉' },
    dark: { bg: 'bg-gray-800', text: 'text-white', symbol: '🌑' },
    steel: { bg: 'bg-gray-400', text: 'text-black', symbol: '⚙️' },
    flying: { bg: 'bg-indigo-300', text: 'text-black', symbol: '羽' },
  };

  return (
    <div className="flex justify-center">
      <div className="p-10 w-full bg-neutral-600">
        <div className="grid grid-cols-3 gap-6">
          {filteredPokemons.map((pokemon, index) => {
            const groupIndex = Math.floor(index / 3);
            const groupColors = [
              'bg-green-300',
              'bg-amber-200',
              'bg-blue-200',
              'bg-red-200',
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
                className={`rounded-2xl shadow-xl p-4 hover:shadow-2xl transition-shadow cursor-pointer ${groupBgColor} shine-effect`} // Ajout de shine-effect
              >
                <div className="flex flex-row items-start justify-between gap-1">
                  <section>
                    <p className="text-[20px] font-bold">#{pokemon.id}</p>
                    <h2 className="text-2xl font-semibold capitalize">{pokemon.name}</h2>
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
                            className={`px-3 py-1 rounded-[7px] flex items-center border border-dashed ${typeStyle.bg} ${typeStyle.text}`}
                          >
                            {typeStyle.symbol} {type.type.name}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  <div>
                    <img
                      src={spriteUrl}
                      alt={pokemon.name}
                      className="w-32 h-32 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}