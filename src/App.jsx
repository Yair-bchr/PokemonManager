import { useEffect, useState } from 'react'

// import './App.css'
import { Pokemon } from "./Pokemon";
import Card from './components/Card';
import ItemModal from "./components/ItemModal";
function App() {
  const [pokemons, setPokemons] = useState(null);
  const [cardPointer, setCardPointer] = useState(null);
  const [show, setShow] = useState(false);


  useEffect(() => {
    Pokemon.randPokemons()
      .then((p) => setPokemons(p))
      .catch((e) => console.log(e));
  }, []);

  const del = (i) => {
    let p = [...pokemons];
    p.splice(i, 1);
    setPokemons(pokemons => p);
  };

  const jsx = pokemons?.map((v, i) => <Card key={i} pokemon={!pokemons?null:pokemons[i]} del={()=>del(i)} setCardPointer={()=>{setCardPointer(i); setShow(true);}}/>);

  const modalcss = `
  .modal {
    text-align: center;
    padding: 0!important;
  }
  .modal:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    margin-right: -50%;
  }
  .modal-dialog {
    display: inline-block;
    vertical-align: middle;
  }
  .modal-content{
    width:1450px;
    height:850px;
    background-color:#2f1b35;
  }
  `;
  return (
    <>
      <style>{modalcss}</style>
      {cardPointer !== null && <ItemModal pokemon={pokemons[cardPointer]} show={show} close={()=>setShow(false)}/>}
      {/* <Button variant="primary" onClick={()=>setShow(true) }>
        Launch demo modal
      </Button> */}

      <h1 className=" alert text-center text-light">Pokémon Manager</h1>
      <div className="container-fluid d-flex flex-wrap">
          {jsx && ([...jsx, (
            <div className='card bg-light' style={{width:'13rem'}} key={jsx.length}>
              <img src="/images/pokeball.png" alt="Add A Pokemon" className="p-5"/>
            </div>
          )])}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
