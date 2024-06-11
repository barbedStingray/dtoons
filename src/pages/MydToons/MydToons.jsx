import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';
import './MydToons.css';

import useCollectDtoons from '../../components/Scripts/useCollectDtoons';
// import useFetchSearchResults from '../../components/Scripts/useFetchSearchResults';



const MydToons = () => {

  const user = useSelector((store) => store.user);
  // const userCollection = useSelector((store) => store.userCollection);
  console.log('USER.id', user.id);
  // const dispatch = useDispatch();


  // * custom hook to set user collection
  const [userDtoons, dToonStatus] = useCollectDtoons(user.id);
  // console.log('CUSTOM HOOK:', userDtoons, dToonStatus);

  // Search Params
  const [searchResults, setSearchResults] = useState([]); // returned data from db
  // const [searchResults, setSearchResults] = useFetchSearchResults(user.id, [], null, null, null); // returned data from db
  const [searchCharacter, setSearchCharacter] = useState('');
  console.log('searchResults', searchResults);




  async function searchCollection(userId, colors, letters, points, rarity) {
    console.log('searching user collection');

    try {
      const dbResults = await axios.get(`/api/dToons/search/existing`,
        { params: { userId, colors, letters, points, rarity } }
      );
      setSearchResults(dbResults.data);

    } catch (error) {
      console.log('error searching the collection', error);
    }
  }
  useEffect(() => {
    searchCollection(user.id, [], '', null, '');
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

  const colorSelectOptions = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'silver', 'black', 'white', 'pink'];


  return (
    <div className='mydToons'>

      <div className='searchBar'>
        <h1>dToon Collection</h1>

        <input type='text' placeholder='character' />

        <div>
          {colorSelectOptions.map((color) => (
            <div><p>{color}</p></div>
          ))}
        </div>


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
