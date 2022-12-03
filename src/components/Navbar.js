//Author Edimar Valentin Kery <edimar.valentin@upr.edu>
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logo from '../images/logo.png'


const Navbar = () => {
    return (
        <Container fluid>
            <Row>
                <Col sm={12} className="justify-content-center">
                    <img src={require('../images/logo.png')} height={200}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Navbar