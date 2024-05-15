import { Button, Modal } from "react-bootstrap";

function ItemModal({ pokemon, show, close }) {
    return (
        
      <Modal variant="w-80 h-80" aria-hidden="true" show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>...</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
      )
    }
    
    export default ItemModal
      