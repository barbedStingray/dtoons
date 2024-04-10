import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';


const MydToons = () => {

  const user = useSelector((store) => store.user);
  const userCollection = useSelector((store) => store.userCollection);

  const dispatch = useDispatch();



  useEffect(() => {
    fetchUserdToons();
  }, []);


  function fetchUserdToons() {
    console.log('fetching users dToons');
    dispatch({ type: `FETCH_USER_COLLECTION`, payload: user.id });
  }


  // const [openStates, setOpenStates] = useState([]);

  // const toggleCardOpenState = (index) => {
  //   // console.log('toggling card index');
  //   setOpenStates((prevStates) => {
  //     console.log('openStates', openStates);
  //     const newStates = [...prevStates];
  //     newStates[index] = !newStates[index];
  //     return newStates;
  //   });
  // }

  const handleCharacterSearch = (character) => {
    console.log('getting characters', character);
  }





  return (
    <div>
      <h1>dToon Collection</h1>

      <input
        type='text'
        placeholder='Character'
        onChange={(e) => handleCharacterSearch(e.target.value)}
      />


      <div className='cardCollection'>
        <div className='rowContainer'>
          {/* {JSON.stringify(userCollection)} */}
          {userCollection.map((dToon) => (
            <ExpandableCard
              key={dToon.id}
              dToon={dToon}
              // toggleCardOpenState={toggleCardOpenState}
              // openStates={openStates}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MydToons
