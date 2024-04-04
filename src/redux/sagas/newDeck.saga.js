import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* createNewDeck(action) {
    try {
        console.log('in CREATE new deck saga');
        console.log('action', action.deck);

        yield axios.post(`/api/dToons/newDeck/${action.payload}`, { deck: action.deck });

        const userDecks = yield axios.get(`/api/dToons/userDecks/${action.payload}`);
        console.log('userDecks', userDecks.data);
        yield put({ type: 'SET_USER_DECKS', payload: userDecks.data })

    } catch (error) {
      console.log(`error in CREATE new deck saga`);
      alert(`Error in CREATE new deck saga`);
    }
  }

  function* createNewDeckSaga() {
    yield takeLatest('CREATE_NEW_DECK', createNewDeck);
  }

  
  export default createNewDeckSaga;
