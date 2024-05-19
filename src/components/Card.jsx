import { Button } from "react-bootstrap";

function Card({ pokemon, deleteItem, setCardPointer }) {
    return (
        <div className='card bg-transparent' style={{width:'13rem'}}>
          <button type="button" onClick={deleteItem} className="btn btn-outline-secondary btn-sm">Delete</button>
          <img src={pokemon?.image} alt="pokemon" className="img-fluid card-img-top p-4"/>
          <div className="card-body">
            <Button variant="card-title text-light rounded-4 bg-black text-center w-100" onClick={setCardPointer}>{pokemon?.name}</Button>
            <p className="card-text text-primary rounded-4 text-center lightgray">{!pokemon?null:pokemon.abilities[0]}</p>
            <p className="card-text text-primary rounded-4 text-center lightgray">{!pokemon?(<div className="w-100 h-100 bg-primary"></div>):pokemon.moves[0]}</p>
          </div>
        </div>
      )
    }
    
    export default Card
      