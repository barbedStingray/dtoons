import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login


  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      
      <div className='formDiv'>
      <h3>Username</h3>
          <input
            type="text"
            name="username"
            required
            value={username}
            className='loginText'
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div className='formDiv'>
      <h3>Password</h3>
          <input
            type="password"
            name="password"
            required
            value={password}
            className='loginText'
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div className='formDiv'>
        <input className='landingButton' type="submit" name="submit" value="Log In" />
      </div>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

    </form>
  );
}

export default LoginForm;
