import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';


// Generate individual dToon
function* fetchCardDetails(action) {
    try {
        console.log('in fetch cardDetails saga');

        // GET request for dToon Store
        const cardDetails = yield axios.get(`/api/dToons/cardDetails/${action.payload}`);


        // dispatch action to set reducer
        yield put({ type: 'SET_CARD_DETAILS', payload: cardDetails.data });


    } catch (error) {
      console.log(`error in GET cardDetails`);
      alert(`Error in GET cardDetails!`);
    }
  }

  function* cardDetailsSaga() {
    yield takeLatest('FETCH_CARD_DETAILS', fetchCardDetails);
  }

  
  export default cardDetailsSaga;
