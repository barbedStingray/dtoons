
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

      <h2>dToons</h2>

          <div>
            { login ? <LoginForm /> : <RegisterForm /> }
          </div>

        <button onClick={() => setLogin(!login)}>{login ? 'Register' : 'Login'}</button>

    </div>
  );
}

export default LandingPage;


