import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser


  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register</h2>
      <div className='formDiv'>
        <h3>Username</h3>
        <input
          type="text"
          name="username"
          value={username}
          className='loginText'
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className='formDiv'>
        <h3>Password</h3>
        <input
          type="password"
          name="password"
          value={password}
          className='loginText'
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className='formDiv'>
        <input className='landingButton' type="submit" name="submit" value="Register" />
      </div>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

    </form>
  );
}

export default RegisterForm;
