import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import './StorePage.css';



const StorePage = () => {

  const dToons = useSelector((store) => store.dToonsStore);
  const user = useSelector((store) => store.user);
  // const newToons = useSelector((store) => store.congratsNewdToons);

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

  const [selectedId, setSelectedId] = useState(null);
  console.log('selectedId', selectedId);


  return (
    <div className='dToonStore'>

      <div className='dToonTitles'>
        <h1>STORE dToons</h1>
        <button onClick={buydToonPack}>Buy dToon Pack</button>
        {/* This will eventually be a scrolling display */}
        <h2>So. Many. Cards.</h2>
      </div>

      <div className='dToonStoreDisplay'>
        {dToons.map((toon, i) => (
          <motion.div layoutId={toon.id} onClick={() => setSelectedId(toon.id)} key={i} >
            <motion.img className='toonImageTest' src={toon.image} alt='toon image here' />
          </motion.div>
        ))}
      </div>

      <div></div>
      <AnimatePresence>
        {selectedId && (
          dToons.map((toon, i) => {
            if (toon.id === selectedId) {
              return (
                <motion.div className='dToonModal' layoutId={selectedId} key='dToonModaltoon'>
                  <motion.img className='toonImageTest' src={toon.image} alt='toon image here' />
                  <motion.h3>{toon.cardtitle}</motion.h3>
                  <motion.h5>{toon.id}</motion.h5>
                  <motion.button onClick={() => setSelectedId(null)} />
                </motion.div>
              );
            }
            return null;
          })
        )}
      </AnimatePresence>
    </div>
  )
}

export default StorePage
