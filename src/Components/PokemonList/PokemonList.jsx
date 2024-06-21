import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import Search from "../Search/Search";

function PokemonList() {
    const [input, setInput] = useState("");
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextpage,setNextPage]=useState('');
    const [prevpage,setPrevPage]=useState('');
    const [pokelink,setPokeUrl]=useState('https://pokeapi.co/api/v2/pokemon')
    async function downloadPokemon() {
        setLoading(true)
        const response = await axios.get(pokelink);
        const pokeresults = response.data.results;
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
        const pokeurl = pokeresults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokeurl);
        
        const res = pokemonData.map((poke) => {
            const pokedata = poke.data;
            return {
                id: pokedata.id,
                name: pokedata.name,
                image: (pokedata.sprites.other) ? pokedata.sprites.other.dream_world.front_default : pokedata.sprites.front_shiny,
                types: pokedata.types
            };
        });
        setPokemonList(res);
        setLoading(false);
    }
    // The dependency array in the useEffect hook is crucial for controlling when the effect runs. If you omit the dependency array, the effect runs after every render. If you provide an empty array, the effect runs only once, after the initial render. When you include variables in the dependency array, the effect runs whenever those variables change.
    useEffect(() => {downloadPokemon();
    }, [pokelink]);

    const filteredPokemonList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(input)
    );

    return (
        <div className="pokemon-list-wrapper">
            <Search setInput={setInput} />
            <div className="controls">
                <button id="prev" disabled={prevpage==null} onClick={()=>setPokeUrl(prevpage)}>Prev</button>
                <button id="next" disabled={nextpage==null} onClick={()=>setPokeUrl(nextpage)}>Next</button>
            </div>
            <h1>Pokemon List</h1>
            <div id="poke-list">
                {loading ? "Loading..." :
                (filteredPokemonList.length === 0 ? (
                    <p>No pokemon found</p>
                ) : (
                    filteredPokemonList.map((p) => (
                        <Pokemon key={p.key} name={p.name} image={p.image} id={p.id}/>
                    ))
                ))
            }
            </div>
            
            
        </div>
    );
}

export default PokemonList;
