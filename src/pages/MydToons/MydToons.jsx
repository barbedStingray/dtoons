import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import ExpandableCard from '../../components/ExpandableCard/ExpandableCard';
import './MydToons.css';

import useFetchUserDecks from '../../components/Scripts/useFetchUserDecks';
import useSearchResults from '../../components/Scripts/useSearchResults';
import useDeckCards from '../../components/Scripts/useDeckCards';

const MydToons = () => {

  const user = useSelector((store) => store.user);
  console.log('USER.id', user.id);


  // Filter states and Pagination (useSearchResults)
  const [searchCharacter, setSearchCharacter] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedRarity, setSelectedRarity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, totalPages] = useSearchResults(user.id, currentPage, searchCharacter, selectedColors, selectedPoints, selectedRarity); // custom hook
  // const [searchResults, setSearchResults] = useState([]); // original
  // console.log('searchResults', searchResults);


  // set userDecks
  const [userDecks, userDecksStatus] = useFetchUserDecks(user.id); // fetching user decks
  const [deckId, setDeckId] = useState(null);
  const [deckOfCards, deckStatus, addCard, removeCard] = useDeckCards(deckId);
  const [deckName, setDeckName] = useState('');









  // SEARCH RELATED
  const colorSelectOptions = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'silver', 'black', 'white', 'pink'];
  const pointSelectOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const raritySelectOptions = ['common', 'rare', 'epic', 'legend', 'mythic']
  function handleSearchValue(value, stateArray, setState) {
    console.log(`add ${value} to search`);
    const updatedArray = stateArray.includes(value)
      ? stateArray.filter((item) => item !== value)
      : [...stateArray, value];
    setState(updatedArray);
    setCurrentPage(1); // page back to one after new search criteria
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
        <h1>Search Params</h1>

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
              <div key={rare} onClick={() => handleSearchValue(rare, selectedRarity, setSelectedRarity)}
                className={`color-option ${selectedRarity.includes(rare) ? `selected` : ''}`}
              ><p>{rare}</p></div>
            ))}
          </div>
        </div>

        <button onClick={clearAllFilters}>Clear ALL</button>
      </div>

      <div className='mydToon-collection'>
        <div className='mydToon-rowAdjust'>
          {searchResults.map((dToon) => (
            <ExpandableCard key={dToon.id} dToon={dToon} />
          ))}
        </div>
        <div className='pagination'>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
        </div>

      </div>

      <div className='userDecksDisplay'>

        <div>
          <h1>View Your Decks</h1>

          <p>Add a Deck!</p>
          <input
            type='text'
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder='Deck Name...'
          />
          {/* <button onClick={() => createNewDeck(deckName)}>+Deck</button> */}
          {/* {JSON.stringify(userDecks)} */}
          {userDecks.map((deck) => (
            <div key={deck.id}>
              <p>{deck.deckname}</p>
              <button onClick={() => setDeckId(deck.id)} >Edit</button>
            </div>
          ))}
          <div>
            display for the 'editDeck'
            <br />
            {JSON.stringify(deckName)}
            {/* <div className='deckView' ref={drop}> */}
            <div className='deckView'>
              {deckOfCards.map((dToon) => (
                <div key={dToon.id}>
                  <ExpandableCard
                    // key={dToon.id}
                    dToon={dToon}
                  // toggleCardOpenState={toggleCardOpenState}
                  // openStates={openStates}
                  />
                  {/* <img className='toonImage' src={dToon.image} alt='toon image' /> */}
                  {/* <button onClick={() => removeCard(dToon.id, deckId)}>-</button> */}
                </div>
              ))}
            </div>

          </div>

        </div>


      </div>

    </div>
  )
}

export default MydToons
