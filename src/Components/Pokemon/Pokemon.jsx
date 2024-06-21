import './Pokemon.css'
function Pokemon({name, image,key}){
    return(
        <div className="allpoke">
            <div className='poke'>
                <h2>Name : {name}</h2>
                <div><img src={image}/></div>
            </div>
            
            
        </div>
    )
}
export default Pokemon;