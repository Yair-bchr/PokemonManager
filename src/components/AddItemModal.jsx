import { useState, useEffect, useCallback } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { Pokemon } from "../Pokemon";
function AddItemModal({ show, close, addItem }) {
    const [pokemonId, setPokemonId] = useState("");
    const [moves, setMoves] = useState(Array(4).fill(""));
    const [abilities, setAbilities] = useState(Array(2).fill(""));

    const [nameChoices, setNameChoices] = useState();
    const [moveChoices, setMoveChoices] = useState();
    const [abilityChoices, setAbilityChoices] = useState();
    
    const [characteristic, setCharacteristic] = useState("");
    const [height, setHeight] = useState("");
    
    const nameChoicesjsx = !nameChoices ? "" : nameChoices.map((n, i) => <option value={i} key={i}>{n}</option>);
    const moveChoicesjsx = !moveChoices ? "" : moveChoices.map((n, i) => <option value={i} key={i}>{n}</option>);
    const abilityChoicesjsx = !abilityChoices ? "" : abilityChoices.map((n, i) => <option value={i} key={i}>{n}</option>);
    const img = !pokemonId ? null : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    useEffect(() => {
        Pokemon.getAllNames()
            .then((names) => setNameChoices(names?.results?.map((n) => n.name)))
            .catch((e) => console.log(e));
    }, []);

    const handleReset = useCallback(() => {
        setPokemonId("");
        setMoves(Array(4).fill(""));
        setAbilities(Array(2).fill(""));
        setHeight("");
    }, [pokemonId]);

    const handleSave = () => {
        addItem(new Pokemon(nameChoices[pokemonId], abilities.map((ability) => abilityChoices[ability]), moves.map((move) => moveChoices[move]), height, characteristic, img));
        close();
    }

    const isNotValid = !pokemonId || !height
            || abilities.reduce((acc, v) => acc || !v, false)//looks for atleast one empty ability
            || moves.reduce((acc, v) => acc || !v, false);

    useEffect(() => {
        if(!!pokemonId){
            Pokemon.getPokemon(pokemonId)
                .then((pokemon) => {
                    setAbilityChoices(pokemon.abilities.map((a) => a.ability.name));
                    setMoveChoices(pokemon.moves.map((m) => m.move.name));
                })
                .catch((e) => console.log(e));
        } else handleReset();
    }, [pokemonId]);

    useEffect(() => {
        Pokemon.randCharacteristic()
                .then((c) => setCharacteristic(c.descriptions[7].description))
                .catch((e) => console.log(e));
    }, [handleReset]);

    

    const setArtibute = (artibute, index, value) => {
        const set = (prev) => {
            const temp = [...prev]; 
            temp[index] = value; 
            return temp; 
        }
        switch (artibute) {
            case "abilities":
                setAbilities(set);
                break;
            case "moves":
                setMoves(set);
                break;
        }
    }

    return (

        <Modal centered dialogClassName="d-modal" variant="" aria-hidden="true" show={show} onHide={close} className="text-light">
            <Modal.Header closeButton >
                <Modal.Title className="text-info">New Pokémon</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-between">
                <div className="w-50">
                    <h2 className="m-5">Create A New Pokémon</h2>
                    <div className="m-4 card bg-light w-75 container text-center" style={{maxHeight:'75%'}}>
                        <br />
                        <Row className="p-1">
                            <Col>Name:</Col>
                            <Col>
                                <Form.Select value={pokemonId} onChange={(e) => setPokemonId(e.target.value)}>
                                    <option value=""></option>{nameChoicesjsx}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="p-1">
                            <Col>Abilities:</Col>
                            <Col>
                                <Form.Group as={Row} className="mb-3">
                                    <Col>
                                        <Form.Select value={abilities[0]} onChange={(e) => setArtibute("abilities", 0, e.target.value)} disabled={!pokemonId}>
                                            <option value=""></option>{abilityChoicesjsx}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Select value={abilities[1]} onChange={(e) => setArtibute("abilities", 1, e.target.value)} disabled={!pokemonId}>
                                            <option value=""></option>{abilityChoicesjsx}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="p-1">
                            <Col>Moves:</Col>
                            <Col>
                                <Form.Group as={Row} className="mb-3">
                                    <Col>
                                        <Form.Select value={moves[0]} onChange={(e) => setArtibute("moves", 0, e.target.value)} disabled={!pokemonId}>
                                            <option value=""></option>{moveChoicesjsx}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Select value={moves[1]} onChange={(e) => setArtibute("moves", 1, e.target.value)} disabled={!pokemonId}>
                                            <option value=""></option>{moveChoicesjsx}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Col>
                                        <Form.Select value={moves[2]} onChange={(e) => setArtibute("moves", 2, e.target.value)} disabled={!pokemonId}>
                                            <option value=""></option>{moveChoicesjsx}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Select value={moves[3]} onChange={(e) => setArtibute("moves", 3, e.target.value)} disabled={!pokemonId}>
                                            <option value=""></option>{moveChoicesjsx}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="p-1">
                            <Col>Height:</Col>
                            <Col>
                                <Form.Group as={Row} className="mb-3">
                                    <Col>
                                        <Form.Control type="number" value={height} onChange={(e)=>setHeight(e.target.value)} disabled={!pokemonId} placeholder="Enter height..."/>
                                    </Col>
                                    <Col sm="auto" className="text-center text-muted border rounded" style={{ transform: 'translateX(-25%)' }}>cm</Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="p-1">
                            <Col>Characteristic:</Col>
                            <Col>
                                <Form.Control type="text" placeholder={characteristic} readOnly />
                            </Col>
                        </Row>
                        <br />
                    </div>
                    {!pokemonId && <p className="text-danger m-4">* Choose a name to start creating a pokémon.</p>}
                    <p className="text-info m-4">* Characteristics are determined by the game engine at the time of a pokemon's capture and cannot be chosen.</p>
                </div>
                <div className="w-50 d-flex align-items-center justify-content-center">
                    <div className="w-50">
                        <img src={img} className={`img-fluid card-img-top p-4 ${img !== null && "border border-white-50"}`} />
                        <p className="bg-danger text-light m-1 text-center lead text-uppercase">{!pokemonId ? null : nameChoices[pokemonId]}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave} disabled={isNotValid}>
                    Save
                </Button>
                <Button variant="warning" onClick={handleReset} disabled={!pokemonId}>
                    Reset
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddItemModal
