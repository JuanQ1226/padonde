//Author Edimar Valentin Kery <edimar.valentin@upr.edu>
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCoffee, faCamera, faGasPump, faHospital, faMartiniGlassCitrus, faPeopleGroup, faStore, faTree, faUmbrellaBeach, faUtensils } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import App, {selectedTypes} from '../App';


class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.setStateTrue = this.setStateTrue.bind(this)
        let paramms = new URLSearchParams(window.location.search); 
        this.state={
            rangeValue: 15,
            food: (paramms.get('food')=='on'),
            coffee: (paramms.get('coffee')=='on'),
            beach: (paramms.get('beach')=='on'),
            nature: (paramms.get('nature')=='on'),
            books: (paramms.get('books')=='on'),
            hospitals: (paramms.get('hospitals')=='on'),
            activities: (paramms.get('activities')=='on'),
            markets: (paramms.get('markets')=='on'),
            scenary: (paramms.get('scenary')=='on'),
            gas: (paramms.get('gas')=='on'),
            drinks: (paramms.get('drinks')=='on')
        }

    }
    

    setStateTrue(StateName){
        this.setState({StateName: true})
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
      }

    render() {
        return (
            <Container>
                <Card className="mt-2" >
                    <Form controlId="searchForm">
                        <Row className='align-items-center'>
                            <Col sm={12} lg={10} className='mb-1'>
                                <Form.Group controlId='Categories'>
                                    <Form.Check inline checked={this.state.food} name="food" type="checkbox" id="checkUtensils"  onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faUtensils} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.coffee} name="coffee" type="checkbox" id="checkCoffee" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faCoffee} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.drinks} name="drinks" type="checkbox" id="checkDrinks" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faMartiniGlassCitrus} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.beach} name="beach" type="checkbox" id="checkBeach" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faUmbrellaBeach} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.nature} name="nature" type="checkbox" id="checkNature" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faTree} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.books} name="books" type="checkbox" id="checkBooks" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faBook} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.hospitals} name="hospitals" type="checkbox" id="checkHospital" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faHospital} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.activities} name="activities" type="checkbox" id="checkActivity" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faPeopleGroup} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.markets} name="markets" type="checkbox" id="checkShop" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faStore} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.scenary} name="scenary" type="checkbox" id="checkScenary" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faCamera} size="2x" />}></Form.Check>
                                    <Form.Check inline checked={this.state.gas} name="gas" type="checkbox" id="checkGas" onChange={this.handleInputChange} label={<FontAwesomeIcon icon={faGasPump} size="2x" />}></Form.Check>
                                </Form.Group>
                            </Col>
                            <Col sm={12} lg={2}>
                                <Button variant="primary" type="submit">Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Container>);
    }


}



export default SearchForm

