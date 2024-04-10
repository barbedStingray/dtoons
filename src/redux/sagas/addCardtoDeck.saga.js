import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* addCardToDeck(action) {
    try {
        console.log('adding new card to deck saga');
        console.log('action.payload', action.payload);
        console.log('action.payload', action.payload.dToonId);

        // ? I have to get the original id of the toon, not userCollection ID
        const result = yield axios.get(`/api/dToons/getCardId/${action.payload.dToonId}`);
        // console.log('newCardId', result);
        // console.log('newCardId', result.data[0].id);
        // console.log('deckId', action.payload.deckId);
        const deckId = action.payload.deckId;
        const newCardId = result.data[0].id;
        // console.log('new variables', deckId, newCardId);

        // then post your toon to the deck
        yield axios.post(`/api/dToons/addCard`, {deckId, newCardId});

        // Regenerate your deck reducer
        yield put({ type: 'FETCH_CARDS_FOR_DECK', payload: deckId });

        
    } catch (error) {
      console.log(`error in adding new card to deck saga`);
      alert(`error in adding new card to deck saga`);
    }
  }

  function* addCardToDeckSaga() {
    yield takeLatest('ADD_CARD_TO_DECK', addCardToDeck);
  }

  
  export default addCardToDeckSaga;
