import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';


const MydToons = () => {

  const user = useSelector((store) => store.user);
  const userCollection = useSelector((store) => store.userCollection);

  const dispatch = useDispatch();

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
    // console.log('openStates', openStates);
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
        {userCollection.map((dToon) => (
          <ExpandableCard 
            key={dToon.id}
            dToon={dToon} 
            toggleCardOpenState={toggleCardOpenState}
            openStates={openStates}
          />
        ))}
      </div>
    </div>
  )
}

export default MydToons
