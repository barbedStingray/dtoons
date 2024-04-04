import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate List of dToons
function* fetchUserDecks(action) {
    try {
        console.log('in FETCH decks saga');
        console.log('action', action.payload);

        const userDecks = yield axios.get(`/api/dToons/userDecks/${action.payload}`);
        console.log('userDecks', userDecks.data);
        yield put({ type: 'SET_USER_DECKS', payload: userDecks.data })

    } catch (error) {
      console.log(`error in GET user decks saga`);
      alert(`error in GET user decks saga`);
    }
  }

  function* fetchUserDecksSaga() {
    yield takeLatest('FETCH_USER_DECKS', fetchUserDecks);
  }

  
  export default fetchUserDecksSaga;
