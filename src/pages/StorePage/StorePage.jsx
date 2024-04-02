import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './StorePage.css';



const StorePage = () => {

  const dToons = useSelector((store) => store.dToons);

  const navigate = useNavigate();
  const dispatch = useDispatch();


useEffect(() => {
  fetchDtoons();
}, []);

function fetchDtoons() {
  console.log(`fetching dToon store`);
  dispatch({ type: 'FETCH_DTOONS' }); // no payload
}

function dToonDetails(toonId) {
  console.log('getting dToon details');
  // dispatch to set reducer with card details
  dispatch({ type: 'FETCH_CARD_DETAILS', payload: toonId })
  navigate(`/cardDetails/${toonId}`);
}

  return (
    <div>
      <h1>dToon Store</h1>

      <h2>So. Many. Cards.</h2>

      {dToons.map((toon, i) => (
        <div key={i} onClick={() => dToonDetails(toon.id)}>
          <p>id: {toon.id}</p>
          <img className='toonImage' src={toon.image} alt='toon image here' />
        </div>
      ))}

    </div>
  )
}

export default StorePage
