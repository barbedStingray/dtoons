import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion as m } from 'framer-motion';


const MydToons = () => {

  const user = useSelector((store) => store.user);
  const userCollection = useSelector((store) => store.userCollection);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [openStates, setOpenStates] = useState([]);


  useEffect(() => {
    fetchUserdToons();
  }, []);


  function fetchUserdToons() {
    console.log('fetching users dToons');
    dispatch({ type: `FETCH_USER_COLLECTION`, payload: user.id });
  }

const toggleCardOpenState = (index) => {
  // console.log('toggling card index');
  setOpenStates((prevStates) => {
    console.log('openStates', openStates);
    const newStates = [...prevStates];
    newStates[index] = !newStates[index];
    return newStates;
  });
}





  return (
    <div>
      <h1>dToon Collection</h1>

      <div className='cardCollection'>
        {/* {JSON.stringify(userCollection)} */}
        
        
        {userCollection.map((card) => (
          <m.div
            key={card.id}
            className='card'
            onClick={() => toggleCardOpenState(card.id)}
            layout
            transition={{ layout: { duration: 1, type: 'spring' } }}
          >
            <m.div layout='position'>
              <img className='toonImage' src={card.image} alt='toon image' />
            </m.div>

            {openStates[card.id] && (
              <m.div
                className='expand'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p>Title: {card.cardtitle}</p>
                <p>Character: {card.character}</p>
                <p>Color: {card.color}</p>
              </m.div>
            )}

          </m.div>
        ))}
      </div>

      {/* dToon details display */}
      <div>

      </div>

    </div>
  )
}

export default MydToons
