// import { useEffect, useState } from "react";
// import axios from 'axios';
// import './PokemonList.css';
// import Pokemon from "../Pokemon/Pokemon";
// import Search from "../Search/Search";

// function PokemonList() {
//     // const [input, setInput] = useState("");
//     // const [pokemonList, setPokemonList] = useState([]);
//     // const [loading, setLoading] = useState(true);
//     // const [nextpage,setNextPage]=useState('');
//     // const [prevpage,setPrevPage]=useState('');
//     // const [pokelink,setPokeUrl]=useState('https://pokeapi.co/api/v2/pokemon')

//     const [pokemonListState,setPokemonListState]=useState({
//         input: '',
//         pokemonList: [],
//         loading: true,
//         nextpage: '',
//         prevpage: '',
//         pokelink: 'https://pokeapi.co/api/v2/pokemon'
// })
//     async function downloadPokemon() {
//         setPokemonListState({...pokemonListState,loading: true});
//         const response = await axios.get(pokemonListState.pokelink);

//         const pokeresults = response.data.results;
//         setPokemonListState({
//             ...pokemonListState,
//             nextpage:response.data.next,
//             prevpage:response.data.previous});
//         const pokeurl = pokeresults.map((pokemon) => axios.get(pokemon.url));
//         const pokemonData = await axios.all(pokeurl);
        
//         const res = pokemonData.map((poke) => {
//             const pokedata = poke.data;
//             return {
//                 id: pokedata.id,
//                 name: pokedata.name,
//                 image: (pokedata.sprites.other) ? pokedata.sprites.other.dream_world.front_default : pokedata.sprites.front_shiny,
//                 types: pokedata.types
//             };
//         });
//         setPokemonListState({
//             ...pokemonListState,
//             pokemonList:res,
//             loading:false});
//     }
//     // The dependency array in the useEffect hook is crucial for controlling when the effect runs. If you omit the dependency array, the effect runs after every render. If you provide an empty array, the effect runs only once, after the initial render. When you include variables in the dependency array, the effect runs whenever those variables change.
//     useEffect(() => {downloadPokemon();
//     }, [pokemonListState.pokelink]);

//     const filteredPokemonList = pokemonListState.pokemonList.filter((pokemon) =>
//         pokemon.name.toLowerCase().startsWith(input)
//     );

//     return (
//         <div className="pokemon-list-wrapper">
//             <Search set={setPokemonListState}  func={pokemonListState}/>
//             <div className="controls">
//                 <button id="prev" disabled={pokemonListState.prevpage==null} onClick={()=>setPokemonListState({...pokemonListState,pokelink:pokemonListState.prevpage})}>Prev</button>
//                 <button id="next" disabled={pokemonListState.nextpage==null} onClick={()=>setPokemonListState({...pokemonListState,pokelink:pokemonListState.nextpage})}>Next</button>
//             </div>
//             <h1>Pokemon List</h1>
//             <div id="poke-list">
//                 {setPokemonListState.loading ? "Loading..." :
//                 (filteredPokemonList.length === 0 ? (
//                     <p>No pokemon found</p>
//                 ) : (
//                     filteredPokemonList.map((p) => (
//                         <Pokemon key={p.key} name={p.name} image={p.image} id={p.id}/>
//                     ))
//                 ))
//             }
//             </div>
            
            
//         </div>
//     );
// }

// export default PokemonList;

import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
import Search from "../Search/Search";

function PokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        input: "",
        pokemonList: [],
        loading: true,
        nextpage: '',
        prevpage: '',
        pokelink: 'https://pokeapi.co/api/v2/pokemon'
    });

    async function downloadPokemon() {
        setPokemonListState((prevState) => ({ ...prevState, loading: true }));
        const response = await axios.get(pokemonListState.pokelink);
        const pokeresults = response.data.results;

        setPokemonListState((prevState) => ({
            ...prevState,
            nextpage: response.data.next,
            prevpage: response.data.previous
        }));

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

        setPokemonListState((prevState) => ({
            ...prevState,
            pokemonList: res,
            loading: false
        }));
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.pokelink]);

    const handleInputChange = (inputValue) => {
        setPokemonListState((prevState) => ({
            ...prevState,
            input: inputValue
        }));
    };

    const filteredPokemonList = pokemonListState.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(pokemonListState.input)
    );

    return (
        <div className="pokemon-list-wrapper">
            <Search set={handleInputChange} func={pokemonListState} />
            <div className="controls">
                <button id="prev" disabled={!pokemonListState.prevpage} onClick={() => setPokemonListState((prevState) => ({ ...prevState, pokelink: prevState.prevpage }))}>Prev</button>
                <button id="next" disabled={!pokemonListState.nextpage} onClick={() => setPokemonListState((prevState) => ({ ...prevState, pokelink: prevState.nextpage }))}>Next</button>
            </div>
            <h1>Pokemon List</h1>
            <div id="poke-list">
                {pokemonListState.loading ? "Loading..." :
                    (filteredPokemonList.length === 0 ? (
                        <p>No pokemon found</p>
                    ) : (
                        filteredPokemonList.map((p) => (
                            <Pokemon key={p.id} name={p.name} image={p.image} id={p.id} />
                        ))
                    ))
                }
            </div>
        </div>
    );
}

export default PokemonList;
