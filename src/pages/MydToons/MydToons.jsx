import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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



  // * Searching params
  const [searchResults, setSearchResults] = useState([]);

  async function searchCollection(colors, letters, points, rarity) {
    console.log('searching user collection');

    try {
      const dbResults = await axios.get(`/api/dToons/search/existing`, 
        { params: { colors, letters, points, rarity }}
      );
      setSearchResults(dbResults.data);

    } catch (error) {
      console.log('error searching the collection', error);
    }
  }
  useEffect(() => {
    searchCollection([], '', null, 'rare');
  }, []);
  // this will accept when multiple states change such as colors


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


  return (
    <div className='mydToons'>

      <div className='searchBar'>
        <h1>dToon Collection</h1>

        <input type='text' placeholder='character' />

        <div className='colorSearch'>
          <input type='radio' id='blue' value='blue'/>
          <label htmlFor='blue'> Blue</label>
          <input type='radio' id='red' value='red'/>
          <label htmlFor='red'> Red</label>
          <input type='radio' id='green' value='green'/>
          <label htmlFor='green'> Green</label>

        </div>
        {JSON.stringify(searchResults)};


      </div>

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
