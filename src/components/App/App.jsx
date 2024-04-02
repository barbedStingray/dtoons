import React, { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';


// components
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LandingPage from '../../pages/LandingPage/LandingPage';
import AboutPage from '../../pages/AboutPage/AboutPage';

import HomePage from '../../pages/HomePage/HomePage';
import RulesPage from '../../pages/RulesPage/RulesPage';
import StorePage from '../../pages/StorePage/StorePage';
import CardDetails from '../../pages/CardDetails/CardDetails';




// css
import './App.css';



function App() {

  // store variables
  const dispatch = useDispatch();
  const location = useLocation();

  // const user = useSelector(store => store.user);


  // page reload, render dom
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  // console logs the location pathname of the dom
  useEffect(() => {
    console.log(`location.pathname`, location.pathname);
  }, [location]);


  return (

    <div className='dtoons'>


      <Nav />


      <Routes location={location} key={location.pathname}>

        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<AboutPage />} />
        
        <Route path='/user' element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
        <Route path='/rules' element={<ProtectedRoute> <RulesPage /> </ProtectedRoute>} />
        <Route path='/store' element={<ProtectedRoute> <StorePage /> </ProtectedRoute>} />
        <Route path='/cardDetails/:id' element={<ProtectedRoute> <CardDetails /> </ProtectedRoute>} />

      </Routes>

    </div>



  );
}

export default App;
