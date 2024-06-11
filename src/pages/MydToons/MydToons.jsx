import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';
import './MydToons.css';

// import useCollectDtoons from '../../components/Scripts/useCollectDtoons';
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
  const [searchResults, setSearchResults] = useState([]); // This can be a custom hook
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  // Filter states
  const [searchCharacter, setSearchCharacter] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedRarity, setSelectedRarity] = useState([]);

  // console.log('searchResults', searchResults);



  // this is fetching from the users collection
  async function searchCollection(userId, page = 1) {
    console.log('searching user collection');

    try {
      const dbResults = await axios.get(`/api/dToons/search/existing`, {
        params: {
          userId,
          colors: selectedColors,
          letters: searchCharacter,
          points: selectedPoints,
          rarity: selectedRarity,
          page,
          limit: itemsPerPage
        }
      });

      console.log('RESSULTS', dbResults.data);
      const { results, totalCount, totalPages } = dbResults.data;
      setSearchResults(results);
      setTotalPages(totalPages); // Set total pages based on backend
      // setTotalCount(totalCount); // maybe for later?
    } catch (error) {
      console.log('error searching the collection', error);
    }
  }

  useEffect(() => {
    searchCollection(user.id, currentPage);
  }, [currentPage, selectedColors, searchCharacter, selectedPoints, selectedRarity]);



  const colorSelectOptions = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'silver', 'black', 'white', 'pink'];
  const pointSelectOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const raritySelectOptions = ['common', 'rare', 'epic', 'legend', 'mythic']



  function handleSearchValue(value, stateArray, setState) {
    console.log(`add ${value} to search`);
    const updatedArray = stateArray.includes(value)
      ? stateArray.filter((item) => item !== value)
      : [...stateArray, value];
    setState(updatedArray);
    setCurrentPage(1); // sets current page back to one after new search criteria
  }

  function clearAllFilters() {
    setSearchCharacter('');
    setSelectedColors([]);
    setSelectedPoints([]);
    setSelectedRarity([]);
  }



  return (
    <div className='mydToons'>

      <div className='searchBar'>
        <h1>dToon Collection</h1>

        <input type='text' placeholder='character'
          value={searchCharacter}
          onChange={(e) => setSearchCharacter(e.target.value)}
        />

        <div className='color-number'>
          <div>
            {colorSelectOptions.map((color) => (
              <div key={color}
                onClick={() => handleSearchValue(color, selectedColors, setSelectedColors)}
                className={`color-option ${selectedColors.includes(color) ? `selected ${color}` : ''}`}
              ><p>{color}</p></div>
            ))}
          </div>
          <div>
            {pointSelectOptions.map((point) => (
              <div key={point}
                onClick={() => handleSearchValue(point, selectedPoints, setSelectedPoints)}
                className={`color-option ${selectedPoints.includes(point) ? `selected` : ''}`}
              ><p>{point}</p></div>
            ))}
          </div>
          <div>
            {raritySelectOptions.map((rare) => (
              <div key={rare} onClick={() => handleSearchValue(rare, selectedRarity, setSelectedRarity)}><p>{rare}</p></div>
            ))}
          </div>
        </div>

        <button onClick={clearAllFilters}>Clear ALL</button>


        <div className='pagination'>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
        </div>


      </div>

      <div className='mydToon-collection'>
        <div className='mydToon-rowAdjust'>
          {searchResults.map((dToon) => (
            <ExpandableCard key={dToon.id} dToon={dToon} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default MydToons
