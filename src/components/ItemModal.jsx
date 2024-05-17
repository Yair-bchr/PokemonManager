import { Button, Modal, Row, Col } from "react-bootstrap";
function ItemModal({ pokemon, show, close }) {
    const abilities = pokemon.abilities.map((p, i) => <p key={i}>{p}</p>);
    const moves = pokemon.moves.map((p, i) => <p key={i}>{p}</p>);
    return (
        
      <Modal centered dialogClassName="d-modal"  variant="" aria-hidden="true" show={show} onHide={close} className="text-light">
      <Modal.Header closeButton >
        <Modal.Title className="text-info">Pokémon Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between">
        <div className="w-50">
                <h2 className="m-5">{pokemon.name}</h2>
                <div className="m-4 card bg-light w-100 container text-center">
                    <br/>
                    <Row className="bold" style={{fontFamily:'courier'}}>
                        <Col>Abilities</Col>
                        <Col>Moves</Col>
                    </Row>
                    <Row className="fst-italic">
                        <Col>{abilities}</Col>
                        <Col>{moves}</Col>
                    </Row>
                    <Row className="bold" style={{fontFamily:'courier'}}>
                        <Col>Height</Col>
                        <Col>Characteristic</Col>
                    </Row>
                    <Row className="fst-italic">
                        <Col>{pokemon.height*10}cm</Col>
                        <Col>{pokemon.characteristic}</Col>
                    </Row>
                    <br/>
                </div>
        </div>
        <div className="w-50 d-flex align-items-center justify-content-center">
            <div className="w-50">
                <img src={pokemon?.image} alt="pokemon" className="img-fluid card-img-top p-4 border border-white-50 "/>
                <p className="bg-danger text-light m-1 text-center lead text-uppercase">{pokemon.name}</p>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
      )
    }
    
    export default ItemModal
      