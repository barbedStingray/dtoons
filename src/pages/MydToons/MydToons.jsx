import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';
import './MydToons.css';

import useCollectDtoons from '../../components/Scripts/useCollectDtoons';



const MydToons = () => {

  const user = useSelector((store) => store.user);
  // const userCollection = useSelector((store) => store.userCollection);

  // const dispatch = useDispatch();


  // * custom hook to set user collection
  const [userDtoons, dToonStatus] = useCollectDtoons(user.id);
  // console.log('CUSTOM HOOK:', userDtoons, dToonStatus);


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
    <div className='mydToons'>
      <h1>dToon Collection</h1>

      <input
        type='text'
        placeholder='Character'
        onChange={(e) => handleCharacterSearch(e.target.value)}
      />


      <div className='mydToon-collection'>
        <div className='mydToon-rowAdjust'>
          {/* {JSON.stringify(userCollection)} */}
          {userDtoons.map((dToon) => (
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
