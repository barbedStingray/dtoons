import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';

import './StorePage.css';
import useStoreDtoons from '../../components/Scripts/useStoreDtoons';




const StorePage = () => {

  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [storeDtoons, statusDtoons] = useStoreDtoons();
  console.log('store dtoons CUSTOM HOOK', storeDtoons, statusDtoons);


  // purchase dToon pack
  function buydToonPack() {

    // ? logic for different themed packs passed as parameters

    console.log('buying dtoon pack of 2', user.id);
    dispatch({ type: 'BUY_DTOON_PACK', payload: user });
    navigate('/newdToon');
  }

  return (
    <div className='dToonStore'>


    <div className='rainbow'>
    </div>

    {/* <button className='rainbow'>BUY</button> */}


      {/* <div className='dToonTitles'>
        <h1>STORE dToons</h1>
        <button onClick={buydToonPack}>Buy dToon Pack</button>
        <h2>So. Many. Cards.</h2>
      </div> */}

      {/* <div>
        {storeDtoons.map((dToon) => (
          <ExpandableCard key={dToon.id} dToon={dToon} />
        ))}
      </div> */}

    </div>
  )
}

export default StorePage
