import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const DecksPage = () => {

  const user = useSelector((store) => store.user);
  const userDecks = useSelector((store) => store.userDecks);

  const dispatch = useDispatch();
  const navigate = useNavigate();

// useEffect that returns your Deck names
// also returns your star power of each deck? 
const [deckName, setDeckName] = useState('');


function createNewDeck(deck) {
  console.log(`creating new deck`, user.id, deck);
  dispatch({ type: 'CREATE_NEW_DECK', payload: user.id, deck });
  setDeckName('');
}

useEffect(() => {
  fetchUserDecks();
}, []);

function fetchUserDecks() {
  dispatch({ type: 'FETCH_USER_DECKS', payload: user.id });
}

function viewEditDeck(deckID) {
  console.log('view/edit deck id', deckID);
  navigate(`/editDeck/${deckID}`);
}




  return (
    <div>
        <h1>View Your Decks</h1>

        <p>Add a Deck!</p>
        <input 
          type='text'
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder='Deck Name...'
        />
        <button onClick={() => createNewDeck(deckName)}>+Deck</button>
        {JSON.stringify(deckName)}
        {JSON.stringify(userDecks)}

        

        {userDecks.map((deck) => (
          <div key={deck.id}>
            <p>{deck.deckname}</p>
            <button onClick={() => viewEditDeck(deck.id)}>Edit</button>
          </div>
        ))}

    </div>
  )
}

export default DecksPage
