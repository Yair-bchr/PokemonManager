import { Button } from "react-bootstrap";

function Card({ pokemon, del, setCardPointer }) {
    return (
        <div className='card bg-transparent' style={{width:'13rem'}}>
          <button 
            type="button" 
            onClick={del}
            className="btn btn-outline-secondary btn-sm delete-button" 
            style={{position:'absolute', top:'0', right:'0'}}>Delete</button>
          <img src={pokemon?.image} alt="loading.." className="img-fluid card-img-top p-4"/>
          <div className="card-body">
            <Button variant="card-title text-light rounded-4 bg-black text-center w-100"  data-bs-toggle="modal" data-bs-target="#item-modal" onClick={setCardPointer}>{pokemon?.name}</Button>
            <p className="card-text text-primary rounded-4 text-center" style={{backgroundColor:'lightgray'}}>{!pokemon?null:pokemon.abilities[0].ability.name}</p>
            <p className="card-text text-primary rounded-4 text-center" style={{backgroundColor:'lightgray'}}>{!pokemon?null:pokemon.moves[0].move.name}</p>
          </div>
        </div>
      )
    }
    
    export default Card
      