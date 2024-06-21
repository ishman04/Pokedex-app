import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import Search from "../Search/Search";

function PokemonList() {
    const [input, setInput] = useState("");
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    async function downloadPokemon() {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
        const pokeresults = response.data.results;
        const pokeurl = pokeresults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokeurl);

        const res = pokemonData.map((poke) => {
            const pokedata = poke.data;
            return {
                key: pokedata.id,
                name: pokedata.name,
                image: (pokedata.sprites.other) ? pokedata.sprites.other.dream_world.front_default : pokedata.sprites.front_shiny,
                types: pokedata.types
            };
        });
        setPokemonList(res);
        setLoading(false);
    }
    useEffect(() => {downloadPokemon();
    }, []);

    const filteredPokemonList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(input)
    );

    return (
        <div className="pokemon-list-wrapper">
            <Search setInput={setInput} />
            <h1>Pokemon List</h1>
            {loading ? "Loading..." :
                (filteredPokemonList.length === 0 ? (
                    <p>No pokemon found</p>
                ) : (
                    filteredPokemonList.map((p) => (
                        <Pokemon key={p.key} name={p.name} image={p.image} />
                    ))
                ))
            }
        </div>
    );
}

export default PokemonList;
