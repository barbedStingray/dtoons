
// IMPORTS
// middleware
import React, { useState, useEffect } from 'react';
// import { motion as m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// // css
// import './LandingPage.css';

// components
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import { useSelector } from 'react-redux';



function LandingPage() {

  const user = useSelector(store => store.user);
  const navigate = useNavigate();


  // variables
  const [login, setLogin] = useState(true); // toggle for login display


  useEffect(() => {
    if (user.id) {
      navigate('/user');
    }
  }, [user]);



  return (
    <div className='landingPage'>

      <h2>DTOON TITLE</h2>

      <div>
        {login ?
          <div className='loginBox'>
            <LoginForm />
            <button onClick={() => setLogin(!login)} className='swapLogin'>{login ? 'Register' : 'Login'}</button>
          </div>
          :
          <div className='loginBox'>
            <RegisterForm />
            <button onClick={() => setLogin(!login)} className='swapLogin'>{login ? 'Register' : 'Login'}</button>
          </div>
        }
      </div>

    </div>
  );
}

export default LandingPage;


