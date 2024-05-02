import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';

import './StorePage.css';



const StorePage = () => {

  const dToons = useSelector((store) => store.dToonsStore);
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    fetchDtoonsStore();
  }, []);

  function fetchDtoonsStore() {
    console.log(`fetching dToon store`);
    dispatch({ type: 'FETCH_DTOONS_STORE' }); // no payload
  }

  // view dToon details on separate page

  // purchase dToon pack
  function buydToonPack() {

    // ? logic for different themed packs passed as parameters

    console.log('buying dtoon pack of 2', user.id);
    dispatch({ type: 'BUY_DTOON_PACK', payload: user });
    navigate('/newdToon');
  }

  return (
    <div className='dToonStore'>

      <div className='dToonTitles'>
        <h1>STORE dToons</h1>
        <button onClick={buydToonPack}>Buy dToon Pack</button>
        {/* This will eventually be a scrolling display */}
        <h2>So. Many. Cards.</h2>
      </div>

      <div>
        {dToons.map((dToon) => (
          <ExpandableCard
            key={dToon.id}
            dToon={dToon}
          />
        ))}
      </div>

    </div>
  )
}

export default StorePage
