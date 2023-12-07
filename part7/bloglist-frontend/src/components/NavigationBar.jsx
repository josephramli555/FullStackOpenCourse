import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useUserValue } from "../context/AppContext";

const NavigationBar = ({handleLogout}) => {

  const name = useUserValue().name;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
          <Nav>
          <Navbar.Brand className="mr-2">{name} logged in</Navbar.Brand>
            <Form inline="true" onSubmit={handleLogout}>
              <Row>
                <Col xs="auto">
                  <Button variant="outline-danger" type="submit">Logout</Button>
                </Col>
              </Row>
            </Form>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
