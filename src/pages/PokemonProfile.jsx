import { useEffect, useState } from "react";


export const PokemonProfile = () => {
    const [pokemonInfo] = useState(JSON.parse(localStorage.getItem("pokemonInfo")));
    const [pokemonDesc, setPokemonDesc] = useState("");
    const [pokemonWeakness1, setPokemonWeakness1] = useState(null);
    const [pokemonWeakness2, setPokemonWeakness2] = useState(null);

    const getComplementData = () =>{
        try {
             fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInfo.id}`)
            .then(res => res.json())
            .then(data => setPokemonDesc(data.flavor_text_entries[0].flavor_text))

            fetch(`https://pokeapi.co/api/v2/type/${pokemonInfo.types[0].type.name}`)
            .then(res => res.json())
            .then(data =>{
                setPokemonWeakness1(data.damage_relations.double_damage_from[0].name)
                if(pokemonInfo.types.length > 1){
                fetch(`https://pokeapi.co/api/v2/type/${pokemonInfo.types[1].type.name}`)
                .then(res => res.json())
                .then(data => setPokemonWeakness2(data.damage_relations.double_damage_from[0].name))
            }
            })
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getComplementData();
       

        
    },[])
    return (
        <div>
        <div>
            <span>
                <h1>#{pokemonInfo.id}  {pokemonInfo.name}</h1>
                <img src={pokemonInfo.sprites.front_default} alt="" />
                <h3>Type</h3>
                <p>{pokemonInfo.types[0].type.name}</p>
                <p>{pokemonInfo.types[1]?.type.name}</p>

                <h3>Weakness</h3>
                <p>{pokemonWeakness1}</p>
                <p>{pokemonWeakness2}</p>


            </span>
            <span>
                <p>{pokemonDesc}</p>
                
                <section>
                    <p>Height: {pokemonInfo.height/10} m</p>
                    <p>Weight : {pokemonInfo.weight/10} Kg</p>
                    <p>Ability : {pokemonInfo.abilities[0].ability.name}</p>
                    {pokemonInfo.abilities[1] && <p>Ability : {pokemonInfo.abilities[1].ability.name}</p>}
                    
                </section>

            </span>
        </div>
        <div>
            <section>
                    <p>HP: <progress value={pokemonInfo.stats[0].base_stat/10} max={pokemonInfo.stats[0].base_stat}></progress> {pokemonInfo.stats[0].base_stat} </p>
                    <p>Attack: <progress value={pokemonInfo.stats[1].base_stat/10} max={pokemonInfo.stats[1].base_stat}></progress> {pokemonInfo.stats[1].base_stat} </p>
                    <p>Defense: <progress value={pokemonInfo.stats[2].base_stat/10} max={pokemonInfo.stats[2].base_stat}></progress> {pokemonInfo.stats[2].base_stat} </p>
                    <p>Special attack: <progress value={pokemonInfo.stats[3].base_stat/10} max={pokemonInfo.stats[3].base_stat}></progress> {pokemonInfo.stats[3].base_stat} </p>
                    <p>Special defense: <progress value={pokemonInfo.stats[4].base_stat/10} max={pokemonInfo.stats[4].base_stat}></progress> {pokemonInfo.stats[4].base_stat} </p>
                    <p>Speed: <progress value={pokemonInfo.stats[5].base_stat/10} max={pokemonInfo.stats[5].base_stat}></progress> {pokemonInfo.stats[5].base_stat} </p>
                </section>
        </div>
            
            
        </div>
    )
}
