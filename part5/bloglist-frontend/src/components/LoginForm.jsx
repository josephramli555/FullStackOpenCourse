import PropTypes from 'prop-types'

const LoginForm = ({handleLogin,handlePasswordChange,handleUsernameChange,username,password}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes={
  handleLogin : PropTypes.func.isRequired,
  handlePasswordChange : PropTypes.func.isRequired,
  handleUsernameChange : PropTypes.func.isRequired,
  username : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired

}

export default LoginForm