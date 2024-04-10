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
import MydToons from '../../pages/MydToons/MydToons';
import StorePage from '../../pages/StorePage/StorePage';
import CardDetails from '../../pages/CardDetails/CardDetails';
import DecksPage from '../../pages/DecksPage/DecksPage';
import EditDecksPage from '../../pages/DecksPage/EditDecksPage';

import NewdToon from '../../pages/NewdToon/NewdToon';

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

      <AnimatePresence
        mode='wait'
      // initial={false}
      >
        <Routes location={location} key={location.pathname}>

          {/* OPEN ROUTES */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<AboutPage />} />
          {/* <Route path='*' element={<AboutPage />} /> */}

          {/* USER ROUTES */}
          <Route path='/user' element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
          <Route path='/rules' element={<ProtectedRoute> <RulesPage /> </ProtectedRoute>} />
          <Route path='/store' element={<ProtectedRoute> <StorePage /> </ProtectedRoute>} />
          <Route path='/mydToons' element={<ProtectedRoute> <MydToons /> </ProtectedRoute>} />
          <Route path='/cardDetails/:id' element={<ProtectedRoute> <CardDetails /> </ProtectedRoute>} />
          <Route path='/decks' element={<ProtectedRoute> <DecksPage /> </ProtectedRoute>} />
          <Route path='/editDeck/:deckId' element={<ProtectedRoute> <EditDecksPage /> </ProtectedRoute>} />

          {/* ADMIN ROUTES */}
          <Route path='/newdToon' element={<ProtectedRoute> <NewdToon /> </ProtectedRoute>} />

        </Routes>
      </AnimatePresence>

    </div>



  );
}

export default App;
