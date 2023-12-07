import PropTypes from "prop-types";
import { Button, Container,Row } from "react-bootstrap";

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
        <form onSubmit={handleLogin} id="login-form">
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
              id="username"
            
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
              id="password"
             
            />
          </div>
          <Button type="submit" id="login-button">
            Login
          </Button>
        </form>
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
