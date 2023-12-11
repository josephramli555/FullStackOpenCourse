import PropTypes from "prop-types";
import { Button, Container, Form, Row } from "react-bootstrap";

const LoginForm = ({
  handleLogin,
  handlePasswordChange,
  handleUsernameChange,
  username,
  password,
}) => {
  return (
    <Container>
      <Row className="text-center">
        <h1>Blog App</h1>
        <h2>Login to Access Blog App</h2>
        <Form onSubmit={handleLogin} id="login-form">
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Passowrd"
              name="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit" id="login-button">
            Login
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
