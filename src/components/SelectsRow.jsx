import { Row, Col, Form } from "react-bootstrap";

function SelectsRow({ artibute, artibuteChoices, setArtibute, constant, disabled }) {
    const choicesList = !artibuteChoices ? "" : artibuteChoices.map((n, i) => <option value={i} key={i}>{n}</option>);
    return (
        <Form.Group as={Row} className="mb-3">
            <Col>
                <Form.Select value={artibute[0+constant]} onChange={(e) => setArtibute(0+constant, e.target.value)} disabled={disabled}>
                    <option value=""></option>{choicesList}
                </Form.Select>
            </Col>
            <Col>
                <Form.Select value={artibute[1+constant]} onChange={(e) => setArtibute(1+constant, e.target.value)} disabled={disabled}>
                    <option value=""></option>{choicesList}
                </Form.Select>
            </Col>
        </Form.Group>
    )
}

export default SelectsRow
