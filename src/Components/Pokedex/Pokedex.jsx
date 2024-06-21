import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search"
import './Pokedex.css'
function Pokedex(){
    return(
        <div className="Pokedex-wrapper">
        
            <PokemonList />
        </div>
    
    )
}
export default Pokedex;