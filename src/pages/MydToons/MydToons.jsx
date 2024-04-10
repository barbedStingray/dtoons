import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion as m } from 'framer-motion';


const MydToons = () => {

  const user = useSelector((store) => store.user);
  const userCollection = useSelector((store) => store.userCollection);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [theCard, setTheCard] = useState(1);


  useEffect(() => {
    fetchUserdToons();
  }, []);


  function fetchUserdToons() {
    console.log('fetching users dToons');
    dispatch({ type: `FETCH_USER_COLLECTION`, payload: user.id });
  }







  return (
    <div>
      <h1>dToon Collection</h1>

      <div className='cardCollection'>
        {/* {JSON.stringify(userCollection)} */}
        
        
        {userCollection.map((card) => (
          <m.div
            className='card'
            onClick={() => setIsOpen(!isOpen)}
            layout
            transition={{ layout: { duration: 1, type: 'spring' } }}
          >
            <m.div layout='position'>
              <img className='toonImage' src={card.image} alt='toon image' />
            </m.div>

            {isOpen && (
              <m.div
                className='expand'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p>THIS IS ALL THE DTOON DATA</p>
                <p>This is some more dToon information</p>
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
