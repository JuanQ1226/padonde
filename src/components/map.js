//Author Edimar Valentin Kery <edimar.valentin@upr.edu>
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import {Container} from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCoffee, faCamera, faGasPump, faHospital, faMartiniGlassCitrus, faPeopleGroup, faStore, faTree, faUmbrellaBeach, faUtensils } from '@fortawesome/free-solid-svg-icons'

const SearchForm = () => {
    return (
        <Container>
            <Card className="mt-2">
                <Form controlId="searchForm">
                    <Row className='align-items-center'>
                        <Col sm={12} lg={8}>
                            <Form.Label inline>Categorias</Form.Label>
                            <Form.Group controlId='Categories'>
                                <Form.Check inline name="group1" type="checkbox" id="checkUtensils" label={<FontAwesomeIcon icon={faUtensils} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkCoffee" label={<FontAwesomeIcon icon={faCoffee} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkDrinks" label={<FontAwesomeIcon icon={faMartiniGlassCitrus} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkBeach" label={<FontAwesomeIcon icon={faUmbrellaBeach} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkNature" label={<FontAwesomeIcon icon={faTree} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkBooks" label={<FontAwesomeIcon icon={faBook} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkHospital" label={<FontAwesomeIcon icon={faHospital} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkActivity" label={<FontAwesomeIcon icon={faPeopleGroup} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkShop" label={<FontAwesomeIcon icon={faStore} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkScenary" label={<FontAwesomeIcon icon={faCamera} size="2x" />}></Form.Check>
                                <Form.Check inline name="group1" type="checkbox" id="checkGas" label={<FontAwesomeIcon icon={faGasPump} size="2x" />}></Form.Check>
                            </Form.Group>
                        </Col>
                        <Col sm={12} lg={2}>
                            <Form.Label inline>Distancia</Form.Label>
                            <Form.Range></Form.Range>
                        </Col>
                        <Col sm={12} lg={2}>
                            <Button variant= "primary" type="submit">Buscar</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default SearchForm

