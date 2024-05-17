import { useEffect, useState } from 'react'

// import './App.css'
import { Pokemon } from "./Pokemon";
import Card from './components/Card';
import ItemModal from "./components/ItemModal";
import AddItemModal from "./components/AddItemModal";
function App() {
  const [pokemons, setPokemons] = useState(null);
  const [cardPointer, setCardPointer] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);


  useEffect(() => {
    Pokemon.randPokemons()
      .then((pokemons) => setPokemons(pokemons.map((p) => p.getValues())))
      .catch((e) => console.log(e));
  }, []);

  const del = (i) => {
    let p = [...pokemons];
    p.splice(i, 1);
    setPokemons(p);
  };

  const jsx = pokemons?.map((v, i) => <Card i={i} key={i} pokemon={!pokemons ? null : pokemons[i]} del={() => del(i)} setCardPointer={() => { setCardPointer(i); setShowItemModal(true); }} />);

  const modalcss = `
  .d-modal{
    max-width: 75%;
  }
  .modal-content{
    background-color:#2f1b35;
    height: 88vh;
  }
  .btn-close {
    background-color:#dc3545;
  }
  .image-container {
    cursor: pointer;
    width:13rem;
  }
  .image-container img {
    transition: transform 0.1s ease; /* Adjust the duration as needed */
  }
  .image-container:active img {
    transform: scale(0.95); /* You can adjust the scale value as needed */
  }
  `;
  return (
    <>
      <style>{modalcss}</style>
      {cardPointer !== null && <ItemModal pokemon={pokemons[cardPointer]} show={showItemModal} close={() => setShowItemModal(false)} />}
      <AddItemModal addItem={(pokemon)=>setPokemons(prev => [...prev, pokemon])} show={showAddItemModal} close={() => setShowAddItemModal(false)} />
      {/* <Button variant="primary" onClick={()=>setShowItemModal(true) }>
        Launch demo modal
      </Button> */}

      <h1 className=" alert text-center text-light">Pokémon Manager</h1>
      <div className="container-fluid d-flex flex-wrap">
        {jsx && ([...jsx, (
          <div role='button' onClick={() => setShowAddItemModal(true)} className='card bg-light image-container' key={jsx.length}>
            <img src="/images/pokeball.png" alt="Add A Pokemon" className="p-5" />
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
