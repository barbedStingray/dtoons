import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* fetchCardsForDeck(action) {
    try {
        console.log('in fetch cards for deck saga', action.payload);

        // GET request for single Deck
        const deck = yield axios.get(`/api/dToons/deck/${action.payload}`);
        console.log('deck', deck.data);

        // dispatch action to set reducer
        yield put({ type: 'SET_CARDS_FOR_DECK', payload: deck.data });
        

    } catch (error) {
      console.log(`error in fetch cards for deck saga`);
      alert(`Error in fetch cards for deck saga!`);
    }
  }

  function* fetchCardsForDeckSaga() {
    yield takeLatest('FETCH_CARDS_FOR_DECK', fetchCardsForDeck);
  }

  
  export default fetchCardsForDeckSaga;
