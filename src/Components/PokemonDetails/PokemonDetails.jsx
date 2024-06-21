import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './PokemonDetails.css'
function PokemonDetails(){
    const st={
        marginLeft: '20px'
    }
    const {id}=useParams();
    const [pokemon,setPokemon]=useState([]);
    async function downloadPokemons(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=>t.type.name),
        })
    }
    useEffect(()=>{
        downloadPokemons();
    },[id])
    
    return(
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image}/> 
            <div className="pokemon-details-name">{pokemon.name}</div>
            <div className="content">
                <div className="height">Height: {pokemon.height}</div>
                <div className="weight">Weight: {pokemon.weight}</div>
                <div className="pokemon-details-types">Types:
                {pokemon.types && pokemon.types.map((p,id)=> <div style={st} key={p.name}> {id+1}. {p} </div> )}
                </div>
            </div>
            
        </div>
    )
}
export default PokemonDetails