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
  // const [userDtoons, dToonStatus] = useCollectDtoons(user.id);
  // console.log('CUSTOM HOOK:', userDtoons, dToonStatus);

  // Search Params
  const [searchResults, setSearchResults] = useState([]); // returned data from db
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  // Filter states
  const [searchCharacter, setSearchCharacter] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [searchPoints, setSearchPoints] = useState([]);
  const [searchRarity, setSearchRarity] = useState([]);

  // const [searchResults, setSearchResults] = useFetchSearchResults(user.id, [], null, null, null); // returned data from db
  // const [searchCharacter, setSearchCharacter] = useState('');
  console.log('searchResults', searchResults);




  async function searchCollection(userId, page = 1) {
    console.log('searching user collection');

    try {
      const dbResults = await axios.get(`/api/dToons/search/existing`, {
        params: {
          userId,
          colors: selectedColors,
          letters: searchCharacter,
          points: searchPoints,
          rarity: searchRarity,
          page,
          limit: itemsPerPage
        }
      });

      console.log('RESSULTS', dbResults.data);
      const { results, totalCount, totalPages } = dbResults.data;
      setSearchResults(results);
      setTotalPages(totalPages); // Set total pages based on backend
      // setTotalCount(totalCount);

    } catch (error) {
      console.log('error searching the collection', error);
    }
  }

  useEffect(() => {
    searchCollection(user.id, currentPage);
  }, [currentPage, selectedColors, searchCharacter, searchPoints, searchRarity]);





  // checks if "next" button should be disabled
  const isNextDisabled = currentPage >= totalPages;
  // handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  // const colorSelectOptions = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'silver', 'black', 'white', 'pink'];

  return (
    <div className='mydToons'>

      <div className='searchBar'>
        <h1>dToon Collection</h1>

        <input type='text' placeholder='character' />

        {/* <div>
          {colorSelectOptions.map((color) => (
            <div><p>{color}</p></div>
          ))}
        </div> */}


        <div className='pagination'>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={isNextDisabled}>Next</button>
        </div>


      </div>

      <div className='mydToon-collection'>
        <div className='mydToon-rowAdjust'>
          {/* {JSON.stringify(userCollection)} */}
          {searchResults.map((dToon) => (
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
