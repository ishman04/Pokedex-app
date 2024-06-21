import { Link } from 'react-router-dom';
import './Pokemon.css'
function Pokemon({name, image,id}){
    return(
        
        <div className="poke">
                <h2 id='name'> {name}</h2>
               <Link to={`pokemon/${id}`}> <div ><img class='poke-img' src={image}/></div></Link>
            
        </div>
        
    )
}
export default Pokemon;