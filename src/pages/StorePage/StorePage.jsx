import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './StorePage.css';



const StorePage = () => {

  const dToons = useSelector((store) => store.dToonsStore);
  const user = useSelector((store) => store.user);
  const newToons = useSelector((store) => store.congratsNewdToons);

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
    <div>
      <h1>STORE dToons</h1>

      <button onClick={buydToonPack}>Buy dToon Pack</button>

      {/* This will eventually be a scrolling display */}
      <h2>So. Many. Cards.</h2>

      {dToons.map((toon, i) => (
        <div key={i} >
          <p>id: {toon.id}</p>
          <img className='toonImage' src={toon.image} alt='toon image here' />
        </div>
      ))}

    </div>
  )
}

export default StorePage
