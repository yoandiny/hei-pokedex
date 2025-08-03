import { useEffect, useState } from "react";

const typeStyles = {
  grass: { bg: 'bg-green-300', text: 'text-white', symbol: '🌱', pageBg: 'bg-green-500' },
  poison: { bg: 'bg-purple-300', text: 'text-white', symbol: '☣️', pageBg: 'bg-purple-500' },
  fire: { bg: 'bg-red-300', text: 'text-white', symbol: '🔥', pageBg: 'bg-red-400' },
  water: { bg: 'bg-blue-300', text: 'text-white', symbol: '💧', pageBg: 'bg-blue-500' },
  bug: { bg: 'bg-lime-300', text: 'text-white', symbol: '🐞', pageBg: 'bg-lime-500' },
  normal: { bg: 'bg-gray-300', text: 'text-black', symbol: '⬜', pageBg: 'bg-gray-500' },
  electric: { bg: 'bg-yellow-400', text: 'text-black', symbol: '⚡', pageBg: 'bg-yellow-600' },
  ground: { bg: 'bg-yellow-300', text: 'text-white', symbol: '🌍', pageBg: 'bg-yellow-500' },
  fairy: { bg: 'bg-pink-400', text: 'text-black', symbol: '✨', pageBg: 'bg-pink-600' },
  fighting: { bg: 'bg-red-700', text: 'text-white', symbol: '🥊', pageBg: 'bg-red-900' },
  psychic: { bg: 'bg-pink-700', text: 'text-white', symbol: '🔮', pageBg: 'bg-pink-900' },
  rock: { bg: 'bg-gray-600', text: 'text-white', symbol: '🪨', pageBg: 'bg-gray-800' },
  ghost: { bg: 'bg-indigo-800', text: 'text-white', symbol: '👻', pageBg: 'bg-indigo-900' },
  ice: { bg: 'bg-cyan-300', text: 'text-black', symbol: '❄️', pageBg: 'bg-cyan-500' },
  dragon: { bg: 'bg-purple-800', text: 'text-white', symbol: '🐉', pageBg: 'bg-purple-900' },
  dark: { bg: 'bg-gray-800', text: 'text-white', symbol: '🌑', pageBg: 'bg-gray-900' },
  steel: { bg: 'bg-gray-400', text: 'text-black', symbol: '⚙️', pageBg: 'bg-gray-600' },
  flying: { bg: 'bg-indigo-300', text: 'text-black', symbol: '羽', pageBg: 'bg-indigo-500' },
};

export const PokemonProfile = () => {
  const [pokemonInfo] = useState(JSON.parse(localStorage.getItem("pokemonInfo")));
  const [pokemonDesc, setPokemonDesc] = useState("");
  const [pokemonWeakness1, setPokemonWeakness1] = useState(null);
  const [pokemonWeakness2, setPokemonWeakness2] = useState(null);

  const getComplementData = async () => {
    try {
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInfo.id}`);
      if (!speciesRes.ok) throw new Error("Error fetching description");
      const speciesData = await speciesRes.json();
      setPokemonDesc(speciesData.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text || "Description not available");

      const type1Res = await fetch(`https://pokeapi.co/api/v2/type/${pokemonInfo.types[0].type.name}`);
      if (!type1Res.ok) throw new Error("Error fetching first type");
      const type1Data = await type1Res.json();
      setPokemonWeakness1(type1Data.damage_relations.double_damage_from[0]?.name || "None");

      if (pokemonInfo.types.length > 1) {
        const type2Res = await fetch(`https://pokeapi.co/api/v2/type/${pokemonInfo.types[1].type.name}`);
        if (!type2Res.ok) throw new Error("Error fetching second type");
        const type2Data = await type2Res.json();
        setPokemonWeakness2(type2Data.damage_relations.double_damage_from[0]?.name || "None");
      }
    } catch (error) {
      console.error("Error in getComplementData:", error);
      setPokemonDesc("Error loading data");
    }
  };

  useEffect(() => {
    getComplementData();
  }, []);

  const spriteUrl =
    pokemonInfo.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
    pokemonInfo.sprites?.front_default ||
    "https://via.placeholder.com/120";

  const backgroundClass = typeStyles[pokemonInfo.types[0].type.name]?.pageBg || 'bg-gray-100';

  return (
    <div className="flex">
      <div className={`w-1/2 flex justify-center h-180 p-6 ${backgroundClass}`}>
        <span>
          <h1 className="text-4xl font-bold">#{pokemonInfo.id} {pokemonInfo.name}</h1>
          <img className="w-80 h-80 mt-20" src={spriteUrl} alt={pokemonInfo.name} />
        </span>
      </div>
      <div className="pl-10 pt-5 bg-gray-200">
        <span>
          <p className="text-lg">{pokemonDesc}</p>
          <section className="flex gap-5 items-center">
            <h3 className="text-xl font-semibold mt-4">Type:</h3>
            <p className={`inline-block mt-2 px-3 py-1 rounded-full ${typeStyles[pokemonInfo.types[0].type.name]?.bg || 'bg-gray-200'} ${typeStyles[pokemonInfo.types[0].type.name]?.text || 'text-black'}`}>
              {typeStyles[pokemonInfo.types[0].type.name]?.symbol || ''} {pokemonInfo.types[0].type.name}
            </p>
            {pokemonInfo.types[1] && (
              <p className={`inline-block px-3 py-1 rounded-full ml-2 ${typeStyles[pokemonInfo.types[1].type.name]?.bg || 'bg-gray-200'} ${typeStyles[pokemonInfo.types[1].type.name]?.text || 'text-black'}`}>
                {typeStyles[pokemonInfo.types[1].type.name]?.symbol || ''} {pokemonInfo.types[1].type.name}
              </p>
            )}

            <h3 className="text-xl font-semibold mt-4">Weakness:</h3>
            {pokemonWeakness1 && (
              <p className={`inline-block mt-2 px-3 py-1 rounded-full ${typeStyles[pokemonWeakness1]?.bg || 'bg-gray-200'} ${typeStyles[pokemonWeakness1]?.text || 'text-black'}`}>
                {typeStyles[pokemonWeakness1]?.symbol || ''} {pokemonWeakness1}
              </p>
            )}
            {pokemonWeakness2 && (
              <p className={`inline-block px-3 py-1 rounded-full ml-2 ${typeStyles[pokemonWeakness2]?.bg || 'bg-gray-200'} ${typeStyles[pokemonWeakness2]?.text || 'text-black'}`}>
                {typeStyles[pokemonWeakness2]?.symbol || ''} {pokemonWeakness2}
              </p>
            )}
          </section>

          <section className="mt-6 text-xl">
            <p>Height: {pokemonInfo.height / 10} m</p>
            <p>Weight: {pokemonInfo.weight / 10} Kg</p>
            <p>Ability: {pokemonInfo.abilities[0].ability.name}</p>
            {pokemonInfo.abilities[1] && <p>Ability: {pokemonInfo.abilities[1].ability.name}</p>}
          </section>
        </span>
        <section className="mt-20 font-bold text-xl">
          <p>
            HP: <progress className="w-100" value={pokemonInfo.stats[0].base_stat} max="255"></progress> {pokemonInfo.stats[0].base_stat}
          </p>
          <p>
            Attack: <progress className="w-100 mt-3" value={pokemonInfo.stats[1].base_stat} max="255"></progress> {pokemonInfo.stats[1].base_stat}
          </p>
          <p>
            Defense: <progress className="w-100 mt-3" value={pokemonInfo.stats[2].base_stat} max="255"></progress> {pokemonInfo.stats[2].base_stat}
          </p>
          <p>
            Special Attack: <progress className="w-100 mt-3" value={pokemonInfo.stats[3].base_stat} max="255"></progress> {pokemonInfo.stats[3].base_stat}
          </p>
          <p>
            Special Defense: <progress className="w-100 mt-3" value={pokemonInfo.stats[4].base_stat} max="255"></progress> {pokemonInfo.stats[4].base_stat}
          </p>
          <p>
            Speed: <progress className="w-100 mt-3" value={pokemonInfo.stats[5].base_stat} max="255"></progress> {pokemonInfo.stats[5].base_stat}
          </p>
        </section>
      </div>
    </div>
  );
};