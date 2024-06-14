import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DragnDrop from '../../components/DragnDrop/DragnDrop';
import './MydToons.css';

import useFetchUserDecks from '../../components/Scripts/useFetchUserDecks';
import useSearchResults from '../../components/Scripts/useSearchResults';
import DeckPreview from '../../components/DeckPreview/DeckPreview';
import EditDeck from '../../components/EditDeck/EditDeck';
import createNewDeck from '../../components/Scripts/createNewDeck';

const MydToons = () => {

  const user = useSelector((store) => store.user);
  // console.log('USER.id', user.id);

  // Filter states and Pagination (useSearchResults)
  const [searchCharacter, setSearchCharacter] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedRarity, setSelectedRarity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, totalPages] = useSearchResults(user.id, currentPage, searchCharacter, selectedColors, selectedPoints, selectedRarity); // custom hook

  // post New Deck
  const [deckName, setDeckName] = useState('');
  const [deckListUpdated, setDeckListUpdated] = useState(false);

  const refreshUserDecks = () => {
    setDeckListUpdated(!deckListUpdated);
  }

  // set userDecks
  const [userDecks, userDecksStatus] = useFetchUserDecks(user.id, deckListUpdated);
  const [deckDisplay, setDeckDisplay] = useState(null);
  const [deckId, setDeckId] = useState(null);


  function generateDeckDisplay() {
    switch (deckDisplay) {
      case 'deckList':
        return (
          <div>
            {userDecks.map((deck) => (
              <div className='deckClick' key={deck.id}>
                <DeckPreview deck={deck} setDeckId={setDeckId} setDeckDisplay={setDeckDisplay} />
              </div>
            ))}
          </div>
        );
      case 'editDeck':
        return <EditDeck deckId={deckId} setDeckDisplay={setDeckDisplay} />;
      default:
        return <div><p>No Deck Display</p></div>;
    }
  }






  // SEARCH RELATED
  const colorSelectOptions = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'silver', 'black', 'white', 'pink'];
  const pointSelectOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const raritySelectOptions = ['common', 'rare', 'epic', 'legend', 'mythic']
  
  // adding values to the arrays for parameters of search
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
            <DragnDrop dToon={dToon} key={dToon.id} />
            // <ExpandableCard key={dToon.id} dToon={dToon} />
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
          <button onClick={() => createNewDeck(user.id, deckName, refreshUserDecks)}>+Deck</button>
          <div onClick={() => setDeckDisplay(deckDisplay === null ? 'deckList' : null)} className='viewDecksDiv'></div>
          {generateDeckDisplay(deckDisplay)}
        </div>


      </div>

    </div>
  )
}

export default MydToons;